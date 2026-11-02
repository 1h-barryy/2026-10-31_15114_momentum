import test from 'node:test';
import assert from 'node:assert/strict';
import { KeyboardInput } from '../src/input.js';

function fixture() {
  const target = new EventTarget(), document = new EventTarget();
  const input = new KeyboardInput(target, document);
  const key = (type, code, repeat = false) => {
    const event = new Event(type, { cancelable: true });
    Object.assign(event, { code, repeat }); target.dispatchEvent(event);
  };
  return { target, document, input, key };
}
test('J and K require a fresh key edge, including duplicate non-repeat keydowns', () => {
  for (const [code, action] of [['KeyJ','attackPressed'], ['KeyK','dodgePressed']]) {
    const { input, key } = fixture();
    key('keydown', code); assert.equal(input.read()[action], true);
    key('keydown', code, true); assert.equal(input.read()[action], false);
    key('keydown', code); assert.equal(input.read()[action], false);
    key('keyup', code); key('keydown', code); assert.equal(input.read()[action], true);
  }
});
test('both movement pairs work and blur/hidden clear pending actions and movement', () => {
  const { input, key, target, document } = fixture();
  for (const [code, direction] of [['KeyA',-1],['KeyD',1],['ArrowLeft',-1],['ArrowRight',1]]) {
    key('keydown', code); assert.equal(input.read().direction, direction);
    key('keyup', code); assert.equal(input.read().direction, 0);
  }
  for (const hidden of [false, true]) {
    key('keydown', 'KeyJ'); key('keydown', 'KeyK'); key('keydown', 'KeyD');
    if (hidden) { document.hidden = true; document.dispatchEvent(new Event('visibilitychange')); }
    else target.dispatchEvent(new Event('blur'));
    assert.deepEqual(input.read(), { direction: 0, attackPressed: false, dodgePressed: false });
  }
});
