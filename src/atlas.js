export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${url}`));
    image.src = url;
  });
}

// Isolate each silhouette in memory. Some generated poses extend beyond a grid
// cell; clipping by its outline prevents a neighboring pose from appearing.
export async function loadFighters(url = 'assets/fighters-atlas.json') {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Could not load fighter animation data.');
  const metadata = await response.json();
  if (!metadata.player || !metadata.cpu) throw new Error('Atlas requires both fighters.');
  const actors = {};
  for (const [name, actor] of Object.entries(metadata)) {
    const sheet = await loadImage(`assets/${actor.file}`);
    validateActor(actor, sheet.naturalWidth, sheet.naturalHeight);
    const frames = actor.frames.map(frame => {
      const [x, y, width, height] = frame.rect;
      const image = document.createElement('canvas');
      image.width = width; image.height = height;
      const context = image.getContext('2d');
      context.beginPath();
      frame.outline.forEach(([px, py], index) => index ? context.lineTo(px, py) : context.moveTo(px, py));
      context.closePath();
      context.clip();
      context.drawImage(sheet, x, y, width, height, 0, 0, width, height);
      return { image, anchor: frame.anchor, contacts: frame.contacts || [] };
    });
    actors[name] = { frames, referenceHeight: actor.referenceHeight };
  }
  return actors;
}

export function validateActor(actor, width, height) {
  const finite = values => Array.isArray(values) && values.every(Number.isFinite);
  if (!(actor.referenceHeight > 0) || !Number.isFinite(actor.referenceHeight) || actor.frames?.length !== 8) {
    throw new Error('Atlas requires eight poses and a positive reference height.');
  }
  for (const f of actor.frames) {
    if (!finite(f.rect) || f.rect.length !== 4) throw new Error('Invalid pose bounds.');
    const [x,y,w,h] = f.rect;
    if (x < 0 || y < 0 || w <= 0 || h <= 0 || x+w > width || y+h > height) throw new Error('Pose outside sheet.');
    if (!finite(f.anchor) || f.anchor.length !== 2 || f.anchor[0] < 0 || f.anchor[0] > w || f.anchor[1] < 0 || f.anchor[1] > h) throw new Error('Invalid pose anchor.');
    if (!Array.isArray(f.outline) || f.outline.length < 3 || !f.outline.every(p => finite(p) && p.length === 2)) throw new Error('Invalid pose outline.');
    if (f.contacts !== undefined && (!Array.isArray(f.contacts) || !f.contacts.every(p => finite(p) && p.length === 3 && p[0] >= 0 && p[0] <= w && p[1] >= 0 && p[1] <= h && p[2] > 0 && p[2] <= w/2))) throw new Error('Invalid foot contacts.');
  }
}
