import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { analyzeCafe24Code, getFileHint } from '../extension/src/analyzer.js';
import { diffAnalysis } from '../extension/src/diff.js';
import { buildPrompt } from '../extension/src/prompt-builder.js';
import { runBlueTeamChecks } from '../extension/src/blue-team.js';

const sampleCode = `<!--@layout(/layout/basic/layout.html)-->
<!--@js(/layout/basic/js/main.js)-->
<!--@css(/layout/basic/css/main.css)-->
<!--@import(/smart-banner/shop1/smart-banner-admin-RES00001.html)-->
<div module="Layout_statelogon">
  <a href="{$action_logout}">로그아웃</a>
  {$name}
</div>
<div module="product_listmain_1">
  <!-- $count = 8 -->
  <a href="{$link_product_detail}">{$product_name}</a>
  <span>{$product_price|numberformat}</span>
</div>`;

test('analyzeCafe24Code extracts Cafe24 imports, modules, variables, actions, and comment options', () => {
  const result = analyzeCafe24Code(sampleCode);

  assert.deepEqual(result.layouts, ['/layout/basic/layout.html']);
  assert.deepEqual(result.js, ['/layout/basic/js/main.js']);
  assert.deepEqual(result.css, ['/layout/basic/css/main.css']);
  assert.deepEqual(result.imports, ['/smart-banner/shop1/smart-banner-admin-RES00001.html']);
  assert.deepEqual(result.modules, ['Layout_statelogon', 'product_listmain_1']);
  assert.ok(result.variables.includes('{$product_name}'));
  assert.ok(result.variables.includes('{$product_price|numberformat}'));
  assert.deepEqual(result.actions, ['{$action_logout}']);
  assert.deepEqual(result.commentOptions, ['<!-- $count = 8 -->']);
});

test('diffAnalysis reports removed Cafe24 contracts and high risk for action removal', () => {
  const before = analyzeCafe24Code(sampleCode);
  const after = analyzeCafe24Code(sampleCode
    .replace(' module="Layout_statelogon"', '')
    .replace('<a href="{$action_logout}">로그아웃</a>', '')
  );

  const diff = diffAnalysis(before, after, { editorFile: '/member/login.html' });

  assert.equal(diff.risk, 'high');
  assert.ok(diff.removed.modules.includes('Layout_statelogon'));
  assert.ok(diff.removed.actions.includes('{$action_logout}'));
  assert.ok(diff.warnings.some((warning) => warning.includes('action')));
  assert.ok(diff.warnings.some((warning) => warning.includes('/member/')));
  assert.ok(diff.checks.includes('removed-actions'));
});

test('getFileHint maps Cafe24 editor files to page risk and mobile counterpart hints', () => {
  assert.deepEqual(getFileHint('/product/list.html'), {
    page: '상품 목록',
    risk: 'medium',
    counterpart: '/mobile/product/list.html'
  });

  assert.deepEqual(getFileHint('/order/basket.html'), {
    page: '주문/장바구니',
    risk: 'high'
  });
});

test('buildPrompt includes context, detected contracts, guardrails, and preview caveat', () => {
  const analysis = analyzeCafe24Code(sampleCode);
  const prompt = buildPrompt({
    context: { editorFile: '/index.html', skinNo: '1', skinCode: 'base', shopNo: '1' },
    analysis,
    request: '메인 상품 카드 간격을 정리해줘.'
  });

  assert.match(prompt, /현재 파일: \/index\.html/);
  assert.match(prompt, /product_listmain_1/);
  assert.match(prompt, /\{\$action_logout\}/);
  assert.match(prompt, /임의 변수 생성/);
  assert.match(prompt, /카페24 테스트 스킨 또는 샘플쇼핑몰 preview/);
  assert.match(prompt, /메인 상품 카드 간격을 정리해줘\./);
});

test('runBlueTeamChecks enforces no auto-save, no secret collection, and manual QA gates', () => {
  const result = runBlueTeamChecks({
    capabilities: { autoSave: false, autoUpload: false, externalNetwork: false },
    permissions: ['storage', 'activeTab', 'scripting'],
    diffReport: { checks: ['removed-actions'] },
    fileHints: [{ counterpart: '/mobile/product/list.html' }]
  });

  assert.equal(result.summary.fail, 0);
  assert.ok(result.items.some((item) => item.id === 'editor-not-blocked' && item.status === 'manual'));
  assert.ok(result.items.some((item) => item.id === 'no-auto-save' && item.status === 'pass'));
  assert.ok(result.items.some((item) => item.id === 'no-secret-read' && item.status === 'pass'));
});

test('manifest keeps the MVP read-only and loads extension modules through content loader', async () => {
  const manifest = JSON.parse(await readFile(new URL('../extension/manifest.json', import.meta.url), 'utf8'));
  const script = manifest.content_scripts[0];

  assert.equal(manifest.manifest_version, 3);
  assert.ok(manifest.permissions.includes('storage'));
  assert.ok(!manifest.permissions.includes('cookies'));
  assert.ok(!manifest.permissions.includes('webRequest'));
  assert.ok(script.js.includes('src/content-loader.js'));
  assert.ok(manifest.web_accessible_resources[0].resources.includes('src/*.js'));
  assert.ok(script.matches.some((match) => match.includes('/disp/admin/editor/')));
});

test('fixture contains editor URL context and representative Cafe24 code', async () => {
  const fixture = await readFile(new URL('../extension/dev-fixtures/editor.html', import.meta.url), 'utf8');

  assert.match(fixture, /editorFile=\/index\.html/);
  assert.match(fixture, /module="Layout_statelogon"/);
  assert.match(fixture, /\{\$action_logout\}/);
  assert.match(fixture, /Blue Team/);
});
