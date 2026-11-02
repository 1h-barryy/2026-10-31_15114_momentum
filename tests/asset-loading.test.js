import test from 'node:test';
import assert from 'node:assert/strict';
import { loadWithFallback } from '../src/assets.js';
import { validateActor } from '../src/atlas.js';
import { contactPositions } from '../src/render.js';
import { readFileSync } from 'node:fs';

test('missing or invalid V2 bundle falls back atomically; missing originals still fail', async () => {
  const calls = [];
  const warn = console.warn; console.warn = () => {};
  try {
    const result = await loadWithFallback('v2', 'original', async url => {
      calls.push(url); if (url === 'v2') throw new Error('invalid candidate'); return { player: 1, cpu: 2 };
    });
    assert.deepEqual(calls, ['v2','original']);
    assert.equal(result.source, 'original');
    assert.deepEqual(result.value, { player: 1, cpu: 2 });
    await assert.rejects(loadWithFallback('v2','original', async () => { throw new Error('missing'); }));
    const loaded = await loadWithFallback('v2','original', async url => url);
    assert.equal(loaded.source, 'v2');
  } finally { console.warn = warn; }
});

test('original atlas contacts validate and malformed replacement bounds are rejected', () => {
  const atlas = JSON.parse(readFileSync(new URL('../assets/fighters-atlas.json', import.meta.url)));
  for (const actor of Object.values(atlas)) validateActor(actor,1536,1024);
  const bad = structuredClone(atlas.player); bad.frames[4].rect[2] = 9999;
  assert.throws(() => validateActor(bad,1536,1024), /outside/);
  assert.equal(atlas.player.frames[1].contacts.length, 1);
  assert.equal(atlas.cpu.frames[7].contacts.length, 1);
});

test('contacts follow the exact sprite anchor, scale, facing and recoil origin', () => {
  const frame = { anchor:[100,400], contacts:[[20,400,30],[180,390,30]] };
  const right = contactPositions(frame,500,1,.5);
  const left = contactPositions(frame,500,-1,.5);
  assert.equal(right[0].x,460); assert.equal(left[0].x,540);
  assert.equal(right[1].y,right[0].y-5);
  assert.equal(right[0].radius,15);
  assert.equal(contactPositions(frame,493,1,.5)[0].x,453);
  assert.deepEqual(contactPositions({anchor:[0,0]},0,1,1),[]);
});
