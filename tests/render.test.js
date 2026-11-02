import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ArenaRenderer } from '../src/render.js';
import { createGame } from '../src/engine.js';

test('windup and resolving strikes remain visible even when the rival is hit', () => {
  const cpu = createGame().cpu;
  const pose = () => ArenaRenderer.prototype.frameFor(cpu, 100);
  cpu.phase = 'windup'; cpu.hitFlash = .18;
  assert.equal(pose(), 3);
  cpu.phase = 'recovery'; cpu.attackVisual = .26;
  assert.equal(pose(), 4);
  cpu.attackVisual = 0; cpu.hitFlash = 0;
  assert.equal(pose(), 5);
  cpu.phase = 'idle'; cpu.moving = true; cpu.walkDistance = 48;
  assert.equal(pose(), 2);
  cpu.moving = false; assert.equal(pose(), 0);
});
test('all atlas poses have valid bounds and grounded anchors; action stance centers do not jump', () => {
  const atlas = JSON.parse(readFileSync(new URL('../assets/fighters-atlas.json', import.meta.url)));
  for (const actor of Object.values(atlas)) {
    assert.equal(actor.frames.length, 8);
    for (const frame of actor.frames) {
      const [x,y,w,h] = frame.rect;
      assert.ok(x >= 0 && y >= 0 && x+w <= 1536 && y+h <= 1024);
      assert.ok(frame.anchor[0] > 0 && frame.anchor[0] < w);
      assert.equal(frame.anchor[1], h-2);
      assert.ok(frame.outline.length > 3);
    }
  }
  for (const index of [4,6,7]) assert.ok(atlas.player.frames[index].anchor[0] >= 170);
  assert.ok(atlas.cpu.frames[7].anchor[0] >= 170);
});
