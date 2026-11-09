import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkSkin, loadRegistry } from '../scripts/skin-check.mjs';

const exec = promisify(execFile);
const registry = await loadRegistry();

test('skin checker recognizes registry items and numbered module families', () => {
  const html = `<div module="product_listnormal">{$product_name|numberformat}</div>
<div module="board_list_1002">{$product_name}</div>
<div module="product_listmain_15" data-module="custom">{$product_name}</div>`;
  assert.deepEqual(checkSkin(html, registry), []);
});

test('skin checker locates unknown items and skips comments', () => {
  const html = `<!-- <div module="bad">{$unknown|bad}</div> -->
<div module="unknown_module">{$unknown|bad:1}</div>`;
  assert.deepEqual(checkSkin(html, registry).map(({ kind, value, line }) => ({ kind, value, line })), [
    { kind: 'module', value: 'unknown_module', line: 2 },
    { kind: 'variable', value: 'unknown', line: 2 },
    { kind: 'modifier', value: 'bad', line: 2 },
  ]);
});

test('CLI reports JSON and strict mode fails on findings', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'cafe24-check-'));
  try {
    await writeFile(join(dir, 'skin.html'), '<div module="unknown_module">{$product_name}</div>');
    const bin = fileURLToPath(new URL('../bin/cafe24-smart-design-check.mjs', import.meta.url));
    const output = await exec(process.execPath, [bin, '--json', dir]);
    assert.equal(JSON.parse(output.stdout).findings, 1);
    await assert.rejects(exec(process.execPath, [bin, '--strict', dir]), (error) => error.code === 1);
    await assert.rejects(exec(process.execPath, [bin, join(dir, 'missing')]), (error) => error.code === 2);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
