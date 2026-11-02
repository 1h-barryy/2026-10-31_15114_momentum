import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
test('entrypoint references, module imports and original PNG assets exist', () => {
  const html = readFileSync(new URL('index.html', root), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!match[1].startsWith('data:')) assert.ok(existsSync(new URL(match[1], root)), match[1]);
  }
  for (const file of readdirSync(new URL('src/', root))) {
    const url = new URL(`src/${file}`, root);
    const source = readFileSync(url, 'utf8');
    for (const match of source.matchAll(/from '([^']+)'/g)) assert.ok(existsSync(new URL(match[1], url)), match[1]);
  }
  for (const file of ['player-portrait-v2.png','rival-portrait-v2.png','player-fighter-sheet.png','rival-fighter-sheet.png','rooftop-arena.png']) {
    const data = readFileSync(new URL(`assets/${file}`, root));
    assert.equal(data.subarray(1,4).toString(), 'PNG');
    assert.ok(data.readUInt32BE(16) > 0 && data.readUInt32BE(20) > 0);
  }
});
