// Selected matte arena; the original remains a recoverable fallback.
export const ASSETS = Object.freeze({
  arena: 'assets/rooftop-arena.png',
  arenaV2: 'assets/rooftop-arena-v2.png',
  fighters: 'assets/fighters-atlas.json',
  fightersV2: 'assets/fighters-atlas-v2.json',
  useArenaV2: true,
  useFightersV2: false,
});

// A failed candidate never leaves a partial fighter set in the scene.
export async function loadWithFallback(preferred, original, loader) {
  if (preferred === original) return { value: await loader(original), source: original };
  try { return { value: await loader(preferred), source: preferred }; }
  catch (error) {
    console.warn(`Could not load ${preferred}; using ${original}.`, error);
    return { value: await loader(original), source: original };
  }
}
