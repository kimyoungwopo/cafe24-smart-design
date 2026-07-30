export const CAFE24_PATTERNS = {
  layout: /<!--\s*@layout\(([^)]+)\)\s*-->/g,
  import: /<!--\s*@import\(([^)]+)\)\s*-->/g,
  css: /<!--\s*@css\(([^)]+)\)\s*-->/g,
  js: /<!--\s*@js\(([^)]+)\)\s*-->/g,
  module: /\bmodule=["']([^"']+)["']/g,
  variable: /\{\$[^}]+\}/g,
  action: /\{\$action_[^}]+\}/g,
  commentOption: /<!--\s*\$[a-zA-Z0-9_]+\s*=?.*?-->/g
};

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function collectMatches(code, regex, group = 1) {
  const matches = [];
  const pattern = new RegExp(regex.source, regex.flags);
  let match;
  while ((match = pattern.exec(code || '')) !== null) {
    matches.push((match[group] || match[0]).trim());
  }
  return unique(matches);
}

export function analyzeCafe24Code(code = '') {
  return {
    layouts: collectMatches(code, CAFE24_PATTERNS.layout),
    imports: collectMatches(code, CAFE24_PATTERNS.import),
    css: collectMatches(code, CAFE24_PATTERNS.css),
    js: collectMatches(code, CAFE24_PATTERNS.js),
    modules: collectMatches(code, CAFE24_PATTERNS.module),
    variables: collectMatches(code, CAFE24_PATTERNS.variable, 0),
    actions: collectMatches(code, CAFE24_PATTERNS.action, 0),
    commentOptions: collectMatches(code, CAFE24_PATTERNS.commentOption, 0)
  };
}

export const FILE_HINTS = [
  { test: /\/product\/list\.html$/, page: '상품 목록', risk: 'medium', counterpart: '/mobile/product/list.html' },
  { test: /\/product\/detail\.html$/, page: '상품 상세', risk: 'high', counterpart: '/mobile/product/detail.html' },
  { test: /\/order\//, page: '주문/장바구니', risk: 'high' },
  { test: /\/member\//, page: '회원', risk: 'high' },
  { test: /\/basket\//, page: '장바구니', risk: 'high' },
  { test: /\/payment\//, page: '결제', risk: 'high' },
  { test: /\/board\//, page: '게시판', risk: 'medium' },
  { test: /\/index\.html$/, page: '메인', risk: 'medium', counterpart: '/mobile/index.html' }
];

export function getFileHint(editorFile = '') {
  const hint = FILE_HINTS.find((item) => item.test.test(editorFile));
  if (!hint) return { page: '일반/커스텀 페이지', risk: 'low' };
  const { test, ...safeHint } = hint;
  return safeHint;
}

if (typeof window !== 'undefined') {
  window.Cafe24Analyzer = { analyzeCafe24Code, getFileHint, FILE_HINTS };
}
