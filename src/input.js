export class KeyboardInput {
  constructor(target = window, visibilityTarget = document) {
    this.held = new Set();
    this.attackQueued = false;
    this.dodgeQueued = false;
    target.addEventListener('keydown', event => {
      if (!['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight', 'KeyJ', 'KeyK'].includes(event.code)) return;
      event.preventDefault();
      const fresh = !event.repeat && !this.held.has(event.code);
      this.held.add(event.code);
      if (event.code === 'KeyJ' && fresh) this.attackQueued = true;
      if (event.code === 'KeyK' && fresh) this.dodgeQueued = true;
    });
    target.addEventListener('keyup', event => this.held.delete(event.code));
    target.addEventListener('blur', () => this.clear());
    visibilityTarget.addEventListener('visibilitychange', () => { if (visibilityTarget.hidden) this.clear(); });
  }

  read() {
    const left = this.held.has('KeyA') || this.held.has('ArrowLeft');
    const right = this.held.has('KeyD') || this.held.has('ArrowRight');
    const result = { direction: Number(right) - Number(left), attackPressed: this.attackQueued, dodgePressed: this.dodgeQueued };
    this.attackQueued = false;
    this.dodgeQueued = false;
    return result;
  }

  clear() { this.held.clear(); this.attackQueued = false; this.dodgeQueued = false; }
}
