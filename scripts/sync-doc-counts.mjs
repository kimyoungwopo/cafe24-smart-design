import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const counts = await Promise.all(['modules', 'variables', 'modifiers'].map(async (name) => JSON.parse(await readFile(new URL(`data/${name}.json`, root), 'utf8')).length));
const [modules, variables, modifiers] = counts;
const files = ['README.md', 'index.html', 'cafe24-modules-variables.html'];
let changed = false;
for (const file of files) {
  const path = new URL(file, root);
  const original = await readFile(path, 'utf8');
  let content = original
    .replace(/모듈 \d+개 · 변수 \d+개 · 수정자 \d+종/g, `모듈 ${modules}개 · 변수 ${variables}개 · 수정자 ${modifiers}종`)
    .replace(/모듈 \d+개, 변수 \d+개, 수정자 \d+종/g, `모듈 ${modules}개, 변수 ${variables}개, 수정자 ${modifiers}종`)
    .replace(/registry ok: \d+ modules, \d+ variables, \d+ modifiers/g, `registry ok: ${modules} modules, ${variables} variables, ${modifiers} modifiers`)
    .replace(/<strong>\d+<\/strong><span>Modules<\/span>/g, `<strong>${modules}</strong><span>Modules</span>`)
    .replace(/<strong>\d+<\/strong><span>Variables<\/span>/g, `<strong>${variables}</strong><span>Variables</span>`)
    .replace(/<strong>\d+<\/strong><span>Modifiers<\/span>/g, `<strong>${modifiers}</strong><span>Modifiers</span>`);
  if (content !== original) {
    changed = true;
    if (!process.argv.includes('--check')) await writeFile(path, content);
    console.log(`${process.argv.includes('--check') ? 'Out of date' : 'Updated'}: ${file}`);
  }
}
if (changed && process.argv.includes('--check')) process.exitCode = 1;
if (!changed) console.log('Document registry counts are synchronized.');
