import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const SNAPSHOT_PATH = new URL('data/source-snapshots.json', ROOT);
const REPORT_PATH = new URL('research/cafe24-source-watch.md', ROOT);

const SOURCES = [
  {
    id: 'smartdesign-support-main',
    name: '스마트디자인 서포트 메인',
    url: 'https://sdsupport.cafe24.com/',
    category: 'official',
  },
  {
    id: 'module-list',
    name: '모듈 전체 목록',
    url: 'https://sdsupport.cafe24.com/product/list.html?cate_no=61',
    category: 'official',
  },
  {
    id: 'variables-and-modules-guide',
    name: '변수와 모듈 이해하기',
    url: 'https://sdsupport.cafe24.com/board/tip/read_intro.html?no=191&board_no=5',
    category: 'official',
  },
  {
    id: 'modifier-advanced',
    name: '모디파이어 고급편',
    url: 'https://sdsupport.cafe24.com/board/tip/read_begin.html?no=633&board_no=1002',
    category: 'official',
  },
  {
    id: 'loop-guide',
    name: '반복문 사용하기',
    url: 'https://sdsupport.cafe24.com/board/tip/read_intro.html?no=635&board_no=5',
    category: 'official',
  },
  {
    id: 'developer-smart-design',
    name: '개발자 센터 스마트디자인',
    url: 'https://developers.cafe24.com/design/front/smart',
    category: 'official',
  },
  {
    id: 'module-layout-index',
    name: '페이지별 모듈 소스: 메인/레이아웃',
    url: 'https://sdsupport.cafe24.com/module/layout/index.html',
    category: 'module-source',
  },
  {
    id: 'module-product-list',
    name: '페이지별 모듈 소스: 상품 목록',
    url: 'https://sdsupport.cafe24.com/module/product/list.html',
    category: 'module-source',
  },
  {
    id: 'module-product-detail',
    name: '페이지별 모듈 소스: 상품 상세',
    url: 'https://sdsupport.cafe24.com/module/product/detail.html',
    category: 'module-source',
  },
  {
    id: 'module-board-free-list',
    name: '페이지별 모듈 소스: 게시판 목록',
    url: 'https://sdsupport.cafe24.com/module/board/free/list.html',
    category: 'module-source',
  },
  {
    id: 'help-image-variable-size',
    name: '이미지 변수 & 사이즈 조절',
    url: 'https://support.cafe24.com/hc/ko/articles/8469945418137',
    category: 'help-center',
  },
];

function normalizeContent(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}

function excerpt(value) {
  return value.slice(0, 240).replace(/\|/g, '\\|');
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 cafe24-smart-design-source-watch/1.0',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    const raw = await response.text();
    const normalized = normalizeContent(raw);
    return {
      ...source,
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      bytes: raw.length,
      textBytes: normalized.length,
      hash: digest(normalized),
      excerpt: excerpt(normalized),
      error: null,
    };
  } catch (error) {
    return {
      ...source,
      ok: false,
      status: 0,
      finalUrl: source.url,
      bytes: 0,
      textBytes: 0,
      hash: null,
      excerpt: '',
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function readPrevious() {
  if (!existsSync(SNAPSHOT_PATH)) return { sources: {} };
  return JSON.parse(await readFile(SNAPSHOT_PATH, 'utf8'));
}

function classify(current, previous) {
  const prior = previous.sources?.[current.id];
  if (!prior) return current.ok ? 'new' : 'new_fetch_failed';
  if (!current.ok) {
    const sameFailure = prior.ok === false && prior.status === current.status && prior.error === current.error;
    return sameFailure ? 'unchanged_fetch_failed' : 'fetch_failed';
  }
  if (prior.hash !== current.hash) return 'changed';
  return 'unchanged';
}

function renderReport({ checkedAt, rows }) {
  const changed = rows.filter((row) => row.state === 'new' || row.state === 'changed');
  const failed = rows.filter((row) => row.state.includes('fetch_failed'));
  const unchanged = rows.filter((row) => row.state === 'unchanged');
  const lines = [];
  lines.push('# Cafe24 source watch');
  lines.push('');
  lines.push(`Last checked: ${checkedAt}`);
  lines.push('');
  lines.push('This report tracks public Cafe24 Smart Design reference pages and flags source changes that may require manual registry/doc updates.');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- New/changed sources: ${changed.length}`);
  lines.push(`- Unchanged sources: ${unchanged.length}`);
  lines.push(`- Fetch failures: ${failed.length}`);
  lines.push('');
  if (changed.length) {
    lines.push('## Review required');
    lines.push('');
    lines.push('| State | Source | Category | URL | Excerpt |');
    lines.push('|---|---|---|---|---|');
    for (const row of changed) {
      lines.push(`| ${row.state} | ${row.name} | ${row.category} | ${row.url} | ${row.excerpt} |`);
    }
    lines.push('');
    lines.push('Next step: inspect the changed official source and update `data/*.json`, `references/*.md`, and `cafe24-modules-variables.html` only after confirming the change manually.');
    lines.push('');
  }
  if (failed.length) {
    lines.push('## Fetch failures');
    lines.push('');
    lines.push('| Source | Status | Error | URL |');
    lines.push('|---|---:|---|---|');
    for (const row of failed) {
      lines.push(`| ${row.name} | ${row.status} | ${String(row.error || '').replace(/\|/g, '\\|')} | ${row.url} |`);
    }
    lines.push('');
  }
  lines.push('## All watched sources');
  lines.push('');
  lines.push('| State | Status | Source | Category | Hash | URL |');
  lines.push('|---|---:|---|---|---|---|');
  for (const row of rows) {
    lines.push(`| ${row.state} | ${row.status} | ${row.name} | ${row.category} | ${row.hash ? row.hash.slice(0, 12) : '-'} | ${row.url} |`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const checkedAt = new Date().toISOString();
  const previous = await readPrevious();
  const currentRows = [];
  for (const source of SOURCES) {
    currentRows.push(await fetchSource(source));
  }
  const rows = currentRows.map((row) => ({ ...row, state: classify(row, previous) }));
  const actionable = rows.filter((row) => row.state === 'new' || row.state === 'changed' || row.state === 'new_fetch_failed' || row.state === 'fetch_failed');
  if (!actionable.length) {
    console.log(`Cafe24 source watch checked ${rows.length} sources.`);
    console.log('Actionable rows: 0');
    console.log('No watched source changed; leaving tracked files untouched.');
    return;
  }

  const next = {
    checkedAt,
    sources: Object.fromEntries(rows.map((row) => [row.id, {
      name: row.name,
      url: row.url,
      category: row.category,
      ok: row.ok,
      status: row.status,
      finalUrl: row.finalUrl,
      bytes: row.bytes,
      textBytes: row.textBytes,
      hash: row.hash,
      excerpt: row.excerpt,
      lastCheckedAt: checkedAt,
      lastChangedAt: row.state === 'new' || row.state === 'changed'
        ? checkedAt
        : previous.sources?.[row.id]?.lastChangedAt || null,
      error: row.error,
    }])),
  };
  await mkdir(new URL('data/', ROOT), { recursive: true });
  await mkdir(new URL('research/', ROOT), { recursive: true });
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(next, null, 2)}\n`);
  await writeFile(REPORT_PATH, renderReport({ checkedAt, rows }));

  console.log(`Cafe24 source watch checked ${rows.length} sources.`);
  console.log(`Actionable rows: ${actionable.length}`);
  for (const row of actionable) console.log(`- ${row.state}: ${row.name} (${row.url})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
