import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeContent, classify } from '../scripts/research-cafe24-sources.mjs';

test('module list view counters do not produce source changes', () => {
  assert.equal(normalizeContent('<p>상품 조회수: 12</p>', 'module-list'), normalizeContent('<p>상품 조회수: 1,234</p>', 'module-list'));
  assert.notEqual(normalizeContent('<p>상품 조회수: 12</p>', 'other'), normalizeContent('<p>상품 조회수: 13</p>', 'other'));
  assert.notEqual(normalizeContent('<p>상품 A 조회수: 12</p>', 'module-list'), normalizeContent('<p>상품 B 조회수: 12</p>', 'module-list'));
});

test('source classification distinguishes migration, failure and recovery', () => {
  const previous = { sources: { x: { ok: true, hash: 'old', normalizationVersion: 1 } } };
  assert.equal(classify({ id: 'x', ok: true, hash: 'old' }, previous), 'unchanged');
  assert.equal(classify({ id: 'x', ok: true, hash: 'new' }, previous), 'changed');
  assert.equal(classify({ id: 'x', ok: false, status: 403 }, previous), 'fetch_failed');
  assert.equal(classify({ id: 'module-list', ok: true, hash: 'new' }, { sources: { 'module-list': { hash: 'old' } } }), 'rebaseline');
  assert.equal(classify({ id: 'x', ok: true, hash: 'new' }, { sources: { x: { hash: 'old' } } }), 'changed');
  assert.equal(classify({ id: 'x', ok: true, hash: 'old' }, { sources: { x: { ok: false, hash: 'old', normalizationVersion: 1 } } }), 'recovered');
});
