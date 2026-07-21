import { analyzeCafe24Code, getFileHint } from './analyzer.js';
import { getEditorCode } from './editor-adapter.js';
import { diffAnalysis } from './diff.js';
import { buildPrompt } from './prompt-builder.js';
import { runBlueTeamChecks } from './blue-team.js';

const PERMISSIONS = ['storage', 'activeTab', 'scripting'];
const CAPABILITIES = { autoSave: false, autoUpload: false, externalNetwork: false };

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function storageGet(key) {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get(key, (result) => resolve(result[key] || null));
      return;
    }
    try {
      resolve(JSON.parse(localStorage.getItem(key) || 'null'));
    } catch (_) {
      resolve(null);
    }
  });
}

function storageSet(key, value) {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ [key]: value }, () => resolve(true));
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    } catch (_) {
      resolve(false);
    }
  });
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  return Promise.resolve();
}

function renderList(items = []) {
  if (!items.length) return '<span class="c24g-muted">없음</span>';
  return `<ul>${items.slice(0, 12).map((item) => `<li><code>${escapeHtml(item)}</code></li>`).join('')}${items.length > 12 ? `<li>외 ${items.length - 12}개</li>` : ''}</ul>`;
}

function snapshotKey(context) {
  return `cafe24-guard:snapshot:${location.host}:${context.skinNo || '-'}:${context.shopNo || '-'}:${context.editorFile || '-'}`;
}

export const Cafe24GuardPanel = {
  state: { context: null, code: '', source: '', analysis: null, fileHint: null, diffReport: null },

  mount(context) {
    if (document.getElementById('c24g-panel')) return;
    this.state.context = context;
    this.state.fileHint = getFileHint(context.editorFile || '');

    const panel = document.createElement('aside');
    panel.id = 'c24g-panel';
    panel.innerHTML = `
      <div class="c24g-head">
        <div>
          <strong>Cafe24 Guard</strong>
          <span>${escapeHtml(context.editorFile || '(unknown file)')}</span>
        </div>
        <button type="button" class="c24g-collapse" aria-label="패널 접기">−</button>
      </div>
      <div class="c24g-body">
        <div class="c24g-badges">
          <span>skin ${escapeHtml(context.skinNo || '-')}</span>
          <span>${escapeHtml(context.skinCode || '-')}</span>
          <span>shop ${escapeHtml(context.shopNo || '-')}</span>
          <span class="risk-${escapeHtml(this.state.fileHint.risk)}">${escapeHtml(this.state.fileHint.page)} · ${escapeHtml(this.state.fileHint.risk)}</span>
        </div>
        <div class="c24g-actions">
          <button type="button" data-c24g-action="analyze">현재 코드 분석</button>
          <button type="button" data-c24g-action="snapshot">변경 전 스냅샷 저장</button>
          <button type="button" data-c24g-action="diff">저장 전 위험 검사</button>
          <button type="button" data-c24g-action="blue">Blue Team 검수</button>
          <button type="button" data-c24g-action="prompt">AI 프롬프트 복사</button>
        </div>
        <div class="c24g-output" aria-live="polite">현재 코드 분석을 먼저 실행하세요.</div>
      </div>`;
    document.documentElement.append(panel);
    panel.querySelector('.c24g-collapse').addEventListener('click', () => panel.classList.toggle('is-collapsed'));
    panel.addEventListener('click', (event) => {
      const button = event.target.closest('[data-c24g-action]');
      if (!button) return;
      this.handleAction(button.dataset.c24gAction);
    });
  },

  output(html) {
    const node = document.querySelector('#c24g-panel .c24g-output');
    if (node) node.innerHTML = html;
  },

  analyze() {
    const result = getEditorCode(document);
    this.state.code = result.code;
    this.state.source = result.source;
    if (!result.code) {
      this.output('<div class="c24g-warn">에디터 코드를 찾지 못했습니다. HTML보기에서 코드를 선택해 복사한 뒤 fallback 기능을 추가해야 합니다.</div>');
      return null;
    }
    this.state.analysis = analyzeCafe24Code(result.code);
    const a = this.state.analysis;
    this.output(`
      <div class="c24g-section"><strong>분석 소스</strong> ${escapeHtml(result.source)}</div>
      <div class="c24g-grid">
        <span>Layout ${a.layouts.length}</span><span>Import ${a.imports.length}</span><span>CSS ${a.css.length}</span><span>JS ${a.js.length}</span>
        <span>Modules ${a.modules.length}</span><span>Variables ${a.variables.length}</span><span>Actions ${a.actions.length}</span><span>Options ${a.commentOptions.length}</span>
      </div>
      <details open><summary>감지된 module</summary>${renderList(a.modules)}</details>
      <details><summary>감지된 action</summary>${renderList(a.actions)}</details>
      <div class="c24g-info">로컬 분석만으로 완료 처리하지 말고 카페24 테스트 스킨/샘플쇼핑몰 preview에서 최종 확인하세요.</div>`);
    return this.state.analysis;
  },

  async saveSnapshot() {
    const analysis = this.state.analysis || this.analyze();
    if (!analysis) return;
    const saved = await storageSet(snapshotKey(this.state.context), {
      savedAt: new Date().toISOString(),
      context: this.state.context,
      code: this.state.code,
      analysis
    });
    this.output(`<div class="c24g-ok">스냅샷 저장 ${saved ? '완료' : '시뮬레이션 완료'}: ${escapeHtml(this.state.context.editorFile || '')}</div>`);
  },

  async runDiff() {
    const current = this.state.analysis || this.analyze();
    if (!current) return;
    const snapshot = await storageGet(snapshotKey(this.state.context));
    if (!snapshot?.analysis) {
      this.output('<div class="c24g-warn">저장된 스냅샷이 없습니다. 먼저 변경 전 스냅샷을 저장하세요.</div>');
      return;
    }
    const report = diffAnalysis(snapshot.analysis, current, this.state.context);
    this.state.diffReport = report;
    this.output(`
      <div class="c24g-section"><strong>위험도</strong> <span class="risk-${report.risk}">${report.risk}</span></div>
      ${report.warnings.length ? `<ul class="c24g-warnings">${report.warnings.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul>` : '<div class="c24g-ok">삭제된 Cafe24 계약 요소가 감지되지 않았습니다.</div>'}
      <div class="c24g-info">저장은 사용자가 카페24 기본 저장 버튼으로 직접 수행해야 합니다.</div>`);
  },

  runBlueTeam() {
    const report = runBlueTeamChecks({
      capabilities: CAPABILITIES,
      permissions: PERMISSIONS,
      diffReport: this.state.diffReport || { checks: ['removed-actions'] },
      fileHints: [this.state.fileHint].filter(Boolean)
    });
    this.output(`
      <div class="c24g-section"><strong>Blue Team 검수</strong> pass ${report.summary.pass || 0} · manual ${report.summary.manual || 0} · fail ${report.summary.fail || 0}</div>
      <ul class="c24g-blue">${report.items.map((item) => `<li class="${item.status}"><b>${item.status.toUpperCase()}</b> ${escapeHtml(item.label)}<br><span>${escapeHtml(item.message)}</span></li>`).join('')}</ul>`);
  },

  async copyPrompt() {
    const analysis = this.state.analysis || this.analyze();
    if (!analysis) return;
    const prompt = buildPrompt({ context: this.state.context, analysis });
    await copyText(prompt);
    this.output('<div class="c24g-ok">AI 안전 프롬프트를 클립보드에 복사했습니다.</div>');
  },

  handleAction(action) {
    if (action === 'analyze') this.analyze();
    if (action === 'snapshot') this.saveSnapshot();
    if (action === 'diff') this.runDiff();
    if (action === 'blue') this.runBlueTeam();
    if (action === 'prompt') this.copyPrompt();
  }
};

if (typeof window !== 'undefined') {
  window.Cafe24GuardPanel = Cafe24GuardPanel;
}
