function difference(before = [], after = []) {
  const afterSet = new Set(after || []);
  return [...new Set(before || [])].filter((item) => !afterSet.has(item));
}

const DANGEROUS_PATHS = [/\/order\//, /\/member\//, /\/basket\//, /\/payment\//, /\/checkout\//];

export function diffAnalysis(before = {}, after = {}, context = {}) {
  const removed = {
    modules: difference(before.modules, after.modules),
    variables: difference(before.variables, after.variables),
    actions: difference(before.actions, after.actions),
    layouts: difference(before.layouts, after.layouts),
    imports: difference(before.imports, after.imports),
    css: difference(before.css, after.css),
    js: difference(before.js, after.js),
    commentOptions: difference(before.commentOptions, after.commentOptions)
  };

  const checks = [];
  const warnings = [];
  if (removed.modules.length) {
    checks.push('removed-modules');
    warnings.push(`module 속성 삭제: ${removed.modules.join(', ')}`);
  }
  if (removed.variables.length) {
    checks.push('removed-variables');
    warnings.push(`변수 삭제: ${removed.variables.slice(0, 8).join(', ')}${removed.variables.length > 8 ? ' ...' : ''}`);
  }
  if (removed.actions.length) {
    checks.push('removed-actions');
    warnings.push(`action 변수 삭제: ${removed.actions.join(', ')}`);
  }
  for (const key of ['layouts', 'imports', 'css', 'js', 'commentOptions']) {
    if (removed[key].length) {
      checks.push(`removed-${key}`);
      warnings.push(`${key} 삭제/변경: ${removed[key].join(', ')}`);
    }
  }

  const editorFile = context.editorFile || '';
  const dangerousFile = DANGEROUS_PATHS.some((pattern) => pattern.test(editorFile));
  if (dangerousFile) {
    checks.push('dangerous-file');
    warnings.push(`위험 파일 경로 감지: ${editorFile} — 주문/회원/결제 흐름은 실제 preview 전 완료 금지`);
  }

  let risk = 'low';
  if (warnings.length) risk = 'medium';
  if (removed.actions.length || dangerousFile) risk = 'high';

  return { removed, warnings, checks: [...new Set(checks)], risk };
}

if (typeof window !== 'undefined') {
  window.Cafe24Diff = { diffAnalysis };
}
