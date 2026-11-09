import { readFile } from 'node:fs/promises';

const data = async (name) => JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), 'utf8'));

export async function loadRegistry() {
  const [modules, variables, modifiers] = await Promise.all(['modules', 'variables', 'modifiers'].map(data));
  return { modules, variables, modifiers };
}

export function moduleKnown(name, modules) {
  const id = name.toLowerCase();
  return modules.some(({ id: known }) => {
    const pattern = known.toLowerCase().split('{no}').map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\d+');
    if (new RegExp(`^${pattern}$`).test(id)) return true;
    // Numbered main product groups share the documented base module pattern.
    return /^product_listmain_\d+$/.test(id) && /^product_listmain_\d+$/.test(known.toLowerCase());
  });
}

export function checkSkin(code, registry) {
  const variables = new Set(registry.variables.map(({ name }) => name));
  const modifiers = new Set(registry.modifiers.map(({ name }) => name));
  const findings = [];
  // Preserve offsets and newlines while excluding HTML comments from analysis.
  const source = code.replace(/<!--[\s\S]*?-->/g, (comment) => comment.replace(/[^\n]/g, ' '));
  const add = (kind, value, offset) => findings.push({
    kind, value, line: source.slice(0, offset).split('\n').length,
    message: 'registry에 없어 공식 자료 또는 실제 스킨에서 확인이 필요합니다.',
  });
  for (const match of source.matchAll(/(?:^|[\s<])module\s*=\s*(["'])(.*?)\1/gi)) {
    if (!moduleKnown(match[2], registry.modules)) add('module', match[2], match.index + match[0].toLowerCase().indexOf('module'));
  }
  for (const match of source.matchAll(/\{\$([^{}]+)\}/g)) {
    const [name, ...pipes] = match[1].split('|');
    const variable = name.trim();
    if (!variables.has(variable)) add('variable', variable, match.index);
    for (const pipe of pipes) {
      const modifier = pipe.trim().split(':')[0].trim();
      if (modifier && !modifiers.has(modifier)) add('modifier', modifier, match.index);
    }
  }
  return findings;
}
