import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));

test('registry files expose useful Cafe24 reference data', async () => {
  const modules = await readJson('data/modules.json');
  const variables = await readJson('data/variables.json');
  const modifiers = await readJson('data/modifiers.json');

  assert.ok(modules.length >= 20, 'expected at least 20 modules');
  assert.ok(variables.length >= 80, 'expected at least 80 variables');
  assert.equal(modifiers.length, 13, 'expected 13 documented modifiers');

  assert.ok(modules.some((module) => module.id === 'product_listnormal'));
  assert.ok(variables.some((variable) => variable.name === 'product_name'));
  const displayModifier = modifiers.find((modifier) => modifier.name === 'display');
  assert.ok(displayModifier);
  assert.equal(displayModifier.syntax, '{$v|display}');
});

test('registry ids are unique and references are internally consistent', async () => {
  const modules = await readJson('data/modules.json');
  const variables = await readJson('data/variables.json');
  const modifiers = await readJson('data/modifiers.json');

  for (const [label, records, key] of [
    ['module', modules, 'id'],
    ['variable', variables, 'name'],
    ['modifier', modifiers, 'name'],
  ]) {
    const ids = records.map((record) => record[key]);
    assert.equal(new Set(ids).size, ids.length, `${label} ids must be unique`);
  }

  const variableNames = new Set(variables.map((variable) => variable.name));
  for (const module of modules) {
    assert.match(module.id, /^[A-Za-z][A-Za-z0-9_{}]*$/);
    assert.ok(module.category, `${module.id} needs category`);
    assert.ok(module.description, `${module.id} needs description`);
    for (const variable of module.variables ?? []) {
      assert.ok(variableNames.has(variable), `${module.id} references unknown variable ${variable}`);
    }
  }
});
