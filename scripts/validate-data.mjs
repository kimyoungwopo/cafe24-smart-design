import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));

const fail = (message) => {
  console.error(`✖ ${message}`);
  process.exitCode = 1;
};

const assertString = (record, field, label) => {
  if (typeof record[field] !== 'string' || record[field].trim() === '') {
    fail(`${label} must include non-empty ${field}`);
  }
};

const assertUnique = (records, key, label) => {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[key])) fail(`${label} has duplicate ${key}: ${record[key]}`);
    seen.add(record[key]);
  }
};

const modules = await readJson('data/modules.json');
const variables = await readJson('data/variables.json');
const modifiers = await readJson('data/modifiers.json');

if (!Array.isArray(modules) || modules.length < 20) fail('data/modules.json must contain at least 20 modules');
if (!Array.isArray(variables) || variables.length < 80) fail('data/variables.json must contain at least 80 variables');
if (!Array.isArray(modifiers) || modifiers.length !== 13) fail('data/modifiers.json must contain exactly 13 modifiers');

assertUnique(modules, 'id', 'modules');
assertUnique(variables, 'name', 'variables');
assertUnique(modifiers, 'name', 'modifiers');

const variableNames = new Set(variables.map((variable) => variable.name));

for (const module of modules) {
  assertString(module, 'id', 'module');
  assertString(module, 'category', module.id);
  assertString(module, 'description', module.id);
  assertString(module, 'source', module.id);
  if (!/^[A-Za-z][A-Za-z0-9_{}]*$/.test(module.id)) fail(`module id has suspicious syntax: ${module.id}`);
  if (!Array.isArray(module.variables)) fail(`${module.id} variables must be an array`);
  for (const variable of module.variables) {
    if (!variableNames.has(variable)) fail(`${module.id} references unknown variable: ${variable}`);
  }
}

for (const variable of variables) {
  assertString(variable, 'name', 'variable');
  assertString(variable, 'syntax', variable.name);
  assertString(variable, 'domain', variable.name);
  assertString(variable, 'description', variable.name);
  assertString(variable, 'source', variable.name);
  if (!variable.syntax.startsWith('{$') || !variable.syntax.endsWith('}')) fail(`${variable.name} has invalid Cafe24 syntax`);
}

for (const modifier of modifiers) {
  assertString(modifier, 'name', 'modifier');
  assertString(modifier, 'purpose', modifier.name);
  assertString(modifier, 'syntax', modifier.name);
  assertString(modifier, 'example', modifier.name);
  assertString(modifier, 'source', modifier.name);
  if (!modifier.syntax.includes(`|${modifier.name}`)) fail(`${modifier.name} syntax must include its pipe modifier name`);
  if (!modifier.example.includes(`|${modifier.name}`)) fail(`${modifier.name} example must include its pipe modifier name`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`✓ registry ok: ${modules.length} modules, ${variables.length} variables, ${modifiers.length} modifiers`);
