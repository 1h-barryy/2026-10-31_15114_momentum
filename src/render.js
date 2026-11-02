import { CONFIG as C } from './config.js';
import { loadFighters, loadImage } from './atlas.js';
import { ASSETS, loadWithFallback } from './assets.js';

export function contactPositions(frame, x, facing, scale) {
  return (frame.contacts || []).map(([px, py, radius]) => ({
    x: x + facing * (px - frame.anchor[0]) * scale,
    y: C.floor + (py - frame.anchor[1]) * scale,
    radius: radius * scale,
  }));
}

export class ArenaRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.actors = null;
    this.backgroundImage = null;
    this.effects = [];
    this.shake = 0;
    this.clock = 0;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.ready = Promise.all([
      loadWithFallback(ASSETS.useFightersV2 ? ASSETS.fightersV2 : ASSETS.fighters, ASSETS.fighters, loadFighters),
      loadWithFallback(ASSETS.useArenaV2 ? ASSETS.arenaV2 : ASSETS.arena, ASSETS.arena, loadImage),
    ]).then(([actors, background]) => {
      this.actors = actors.value;
      // V2 is authored for the stage: do not apply the legacy corrective grade.
      this.backgroundImage = background.source === ASSETS.arena
        ? this.prepareBackground(background.value) : background.value;
      this.assetSources = { fighters: actors.source, arena: background.source };
    });
  }

  resize() {
    this.ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = C.width * this.ratio;
    this.canvas.height = C.height * this.ratio;
  }

  clear() { this.effects = []; this.shake = 0; this.clock = 0; }

  // Grade only the stage, once at load time. Never blur fighters or HUD text.
  prepareBackground(image) {
    const stage = document.createElement('canvas');
    stage.width = C.width; stage.height = C.height;
    const c = stage.getContext('2d');
    c.fillStyle = '#242b3d'; c.fillRect(0, 0, C.width, C.height);
    c.save();
    c.filter = 'saturate(0.65) contrast(0.78) brightness(0.82) blur(0.65px)';
    c.drawImage(image, -2, -2, C.width + 4, C.height + 4);
    c.restore();
    // A cool value wash suppresses baked floor reflections without crushing
    // the midtones behind the black costumes into an equally black backdrop.
    const wash = c.createLinearGradient(0, 0, 0, C.height);
    wash.addColorStop(0, '#11182770');
    wash.addColorStop(.35, '#30384d30');
    wash.addColorStop(.65, '#30384d45');
    wash.addColorStop(.8, '#1c243b85');
    wash.addColorStop(1, '#111827a0');
    c.fillStyle = wash; c.fillRect(0, 0, C.width, C.height);
    return stage;
  }

  consume(events, game) {
    for (const event of events) {
      if (event.type !== 'hit') continue;
      const target = game[event.target];
      this.effects.push({x: event.x + target.facing * 48, y: C.floor - C.actorHeight * .64,
        damage: event.damage, life: .42, color: event.target === 'cpu' ? '#d8c7a7' : '#b2bdce'});
      if (!this.reducedMotion) this.shake = .06;
    }
  }

  draw(game, dt) {
    const c = this.ctx;
    c.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    c.globalAlpha = 1;
    this.clock += dt;
    this.shake = Math.max(0, this.shake - dt);
    c.save();
    if (this.shake) c.translate(Math.sin(this.clock * 190) * 1.5, Math.cos(this.clock * 113) * .75);
    this.background(c);
    if (this.actors) {
      this.fighter(c, game.player, game.time);
      this.fighter(c, game.cpu, game.time);
    }
    this.effects = this.effects.filter(effect => effect.life > 0);
    for (const effect of this.effects) {
      effect.life -= dt;
      const progress = 1 - effect.life / .42;
      c.save();
      c.globalAlpha = Math.max(0, effect.life / .42);
      c.strokeStyle = effect.color;
      c.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        const angle = i * Math.PI * 2 / 5 + .2;
        c.beginPath();
        c.moveTo(effect.x + Math.cos(angle) * (5 + progress * 16), effect.y + Math.sin(angle) * (5 + progress * 16));
        c.lineTo(effect.x + Math.cos(angle) * (22 + progress * 22), effect.y + Math.sin(angle) * (22 + progress * 22));
        c.stroke();
      }
      c.fillStyle = effect.color;
      c.shadowColor = '#050811'; c.shadowBlur = 3;
      c.font = 'bold 23px Arial'; c.textAlign = 'center';
      c.fillText(String(effect.damage), effect.x, effect.y - 48 - progress * 27);
      c.restore();
    }
    c.restore();
  }

  background(c) {
    c.fillStyle = '#0b1120'; c.fillRect(0, 0, C.width, C.height);
    if (this.backgroundImage) c.drawImage(this.backgroundImage, 0, 0, C.width, C.height);
  }

  frameFor(fighter, time) {
    if (fighter.dodgeRemaining > 0) return 7;
    // A hit does not cancel the AI strike: keep its warning pose visible.
    if (fighter.phase === 'windup') return 3;
    if (fighter.attackVisual > .12) return 4;
    if (fighter.hitFlash > .09) return 6;
    if (fighter.attackVisual > 0) return 5;
    if (fighter.phase === 'recovery') return 5;
    if (fighter.moving) return 1 + Math.floor(fighter.walkDistance / 48) % 2;
    return 0;
  }

  sprite(c, actor, frameIndex, x, facing, scale, alpha = 1, y = C.floor) {
    const frame = actor.frames[frameIndex];
    c.save();
    c.translate(x, y); c.scale(facing * scale, scale);
    c.globalAlpha = alpha;
    c.drawImage(frame.image, -frame.anchor[0], -frame.anchor[1]);
    c.restore();
  }

  fighter(c, f, time) {
    const actor = this.actors[f.id];
    const height = C.actorHeight * (f.id === 'cpu' ? 1.045 : 1);
    const scale = height / actor.referenceHeight;
    const frame = this.frameFor(f, time);
    const recoil = f.hitFlash > 0 ? -f.facing * f.hitFlash * 65 : 0;
    for (const contact of contactPositions(actor.frames[frame], f.x + recoil, f.facing, scale)) {
      c.save(); c.translate(contact.x, contact.y + 1);
      c.scale(contact.radius, Math.max(3, contact.radius * .22));
      const shade = c.createRadialGradient(0, 0, 0, 0, 0, 1);
      shade.addColorStop(0, '#06091166'); shade.addColorStop(.45, '#06091130'); shade.addColorStop(1, '#06091100');
      c.fillStyle = shade; c.fillRect(-1, -1, 2, 2); c.restore();
    }
    if (f.dodgeRemaining > 0 && !this.reducedMotion) {
      this.sprite(c, actor, 7, f.x - f.dodgeDirection * 24, f.facing, scale, .12);
    }
    this.sprite(c, actor, frame, f.x + recoil, f.facing, scale);
    if (f.phase === 'windup') {
      const x = f.x, y = C.floor - height - 29;
      c.save(); c.translate(x, y); c.rotate(Math.PI / 4);
      c.strokeStyle = '#ffe0a4'; c.fillStyle = '#17111ce0'; c.lineWidth = 1.5;
      c.fillRect(-11, -11, 22, 22); c.strokeRect(-11, -11, 22, 22);
      c.restore(); c.save(); c.fillStyle = '#ffe0a4'; c.font = 'bold 19px Georgia'; c.textAlign = 'center';
      c.fillText('!', x, y + 6);
      c.fillStyle = '#ffdb9c';
      c.fillRect(x - 24, y + 23, 48 * (1 - f.phaseTime / C.cpuWindup), 2);
      c.restore();
    }
  }
}
