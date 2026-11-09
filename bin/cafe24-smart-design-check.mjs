#!/usr/bin/env node
import { lstat, readdir, readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { checkSkin, loadRegistry } from '../scripts/skin-check.mjs';

const usage = `Usage: cafe24-smart-design-check [--strict] [--json] <file-or-directory> [...]

Recursively check .html/.htm files against the local reference registry.
Unknown items require review; they are not necessarily invalid.
--strict  exit 1 when findings are present (default: exit 0)
--json    print machine-readable results
--help    show this message`;

async function collect(path, files) {
  const info = await lstat(path);
  if (info.isSymbolicLink()) return;
  if (info.isDirectory()) {
    for (const name of (await readdir(path)).sort()) {
      if (name === '.git' || name === 'node_modules') continue;
      await collect(resolve(path, name), files);
    }
  } else if (info.isFile() && ['.html', '.htm'].includes(extname(path).toLowerCase())) files.add(path);
}

try {
  const args = process.argv.slice(2);
  if (args.includes('--help')) { console.log(usage); process.exit(0); }
  const options = new Set(args.filter((arg) => arg.startsWith('--')));
  const invalid = [...options].filter((option) => !['--strict', '--json'].includes(option));
  const paths = args.filter((arg) => !arg.startsWith('--'));
  if (invalid.length || !paths.length) throw new Error(`${invalid.length ? `Unknown option: ${invalid.join(', ')}\n` : ''}${usage}`);
  const files = new Set();
  for (const path of paths) await collect(resolve(path), files);
  if (!files.size) throw new Error('No .html or .htm files found.');
  const registry = await loadRegistry();
  const results = [];
  for (const file of files) {
    const findings = checkSkin(await readFile(file, 'utf8'), registry);
    results.push({ file, findings });
  }
  const count = results.reduce((sum, result) => sum + result.findings.length, 0);
  if (options.has('--json')) console.log(JSON.stringify({ files: results, findings: count }, null, 2));
  else {
    for (const { file, findings } of results) for (const finding of findings) {
      console.log(`${file}:${finding.line} [${finding.kind}] ${finding.value}: ${finding.message}`);
    }
    console.log(`${results.length}개 파일 검사, ${count}개 항목 확인 필요. Registry는 전체 목록이 아니며 실제 동작과 변수 범위는 확인하지 않습니다.`);
  }
  if (count && options.has('--strict')) process.exitCode = 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
