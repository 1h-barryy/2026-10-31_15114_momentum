# Momentum art direction and provenance

## Current selection and review status

The active target is restrained cinematic semi-realism: black-haired adult female player with ponytail/green identifiers, silver-haired adult male rival with violet identifiers, and a blue-violet dusk rooftop. Favor broad forms, clear silhouettes, matte materials and a quiet combat band. Avoid mirror floors, dense window lights, bloom, glowing hair strands and promotional composition. Do not compensate with another global blur/darkening pass.

- Default stage: assets/rooftop-arena-v2.png (1672?941, approximately 16:9), enabled by useArenaV2 in src/assets.js. Fitted to 1280?720 without the legacy grade. It exists and is selected, but live V2 visual approval is pending.
- Fallback: assets/rooftop-arena.png, preserved with its legacy cached stage filter/wash.
- Gameplay figures: assets/player-fighter-sheet.png and assets/rival-fighter-sheet.png, 1536?1024; assets/fighters-atlas.json.
- HUD: assets/player-portrait-v2.png and assets/rival-portrait-v2.png, 1024?1536. These names are inherited, not new continuation portraits.
- useFightersV2 remains false. assets/fighters-atlas-v2.json and replacement fighter sheets do not exist. No new portrait set exists.

The original sheets still contain detailed glossy clothing/hair and similar walk A/B poses. These are baked art limitations; renderer filters cannot redesign them. A complete replacement set is not required for the original assignment. Review current art before proposing further work.

## Rendering and integration contract

Canvas order is stage, player shadow/body/warning, rival shadow/body/warning, then hit effects; HTML HUD/menus overlay it. Original poses are polygon-clipped without an additional sprite grade. Portraits retain mild CSS grading. V2 bypasses the old stage saturation/contrast/brightness/blur and floor wash.

The atlas has player and cpu entries, each with a sheet basename in file, positive referenceHeight and exactly eight frames: guard, walk A, walk B, windup, punch, recovery, hit, evade. Per-frame metadata:

- rect: [sheetX, sheetY, width, height], measured from actual complete pose bounds.
- outline: crop-local polygon. True alpha is needed inside enclosed limb gaps; outline clipping alone cannot remove enclosed background.
- anchor: crop-local [x,y], mapped to simulation x and floor y=615. Preserve a stable body/stance origin.
- contacts: crop-local [x,y,radius] triples for actual sole support; raised boots need no shadow. Missing/empty contacts produce no artificial central oval.

Scale is 360/referenceHeight for player and 360?1.045/referenceHeight for rival. Use guard-based reference height across all poses, not per-frame normalization. Facing mirrors x; contacts follow the same anchor, scale and recoil as the sprite. Current contact points are approximate visual annotations requiring motion review. Do not plant a lifted locomotion boot merely to align shadows.

Current implementation uses distance-driven walking, guard when blocked/stopped, no idle bob, and warning/strike priority over hit reaction. Player attack connects immediately; artwork must not invent a pre-hit delay. Combat timings and rules remain in SPEC.md.

If assets are ever replaced, preserve originals and measure a matching atlas rather than reusing grid coordinates. Supply both fighters and eight valid poses together; validate transparency, complete hands/hair/boots, shared proportions, lighting and both facings. The optional loader rejects invalid metadata and falls back as a whole fighter bundle; arena fallback is independent. Original-load failure reaches the retry screen. Flip useArenaV2 to false only for an intentional comparison/revert. Portrait paths are explicit in index.html, with no automatic portrait replacement.

Future art, only if required after review: retain identities; simplify cloth/hair into broad matte forms; maintain distinct load/contact/recovery/evade silhouettes and coherent alternating gait. Prefer approved master characters and individually controlled poses over accepting drift in a generated sheet. Keep portrait framing/headroom and the existing roughly 70?83 HUD crop; no new portraits are needed merely for version naming. Arena composition should have a flat lower-third platform, low boundary, quiet central 60%, layered skyline, dusty mauve left/slate-blue right and sparse warm edge lights. No fixed fighter shadows, text or UI in environment art.

## Manual visual signoff

At 1280?720 content size, 100% zoom and consistent DPR/reduced-motion settings, record a short focused match. Extract idle, enemy windup before strike, early player punch/contact, and K evade during its 0.2-second window. Record browser/version and settings. Inspect native-size silhouettes, floor perspective, feet/contact shadows, both facings, frame bleed/clipped limbs, HUD, gold warning, hit numbers and reset text. Also review motion, game-over and restart. Keep screenshots outside the repository unless submission needs them.

Prior browser-host/native input failures prevented the four-state capture set. A later native session showed the original-stage title at a 1280?720 game frame, then URL-confidence failure stopped control before V2 reload. No V2 match or subjective visual approval is established. Passing tests do not replace this gate.

## V2 arena provenance

Created in the earlier 2026-11-01 generation pass with the built-in image-generation tool, not during documentation cleanup. A targeted edit removed the first candidate's bright sun disk and foreground drop-off and simplified floor texture. Selected file: assets/rooftop-arena-v2.png. The output was 1672?941 rather than requested 2560?1440; no hidden crop/upscale was performed. Standalone inspection was recorded; live fighter/HUD comparison remains pending. Original arena retained. Exact executed prompts follow.

## Initial prompt

Use case: stylized-concept. Asset type: production environment background for Momentum, a fixed side-view 2.5D fighting game. Generate a new opaque 16:9 landscape PNG, preferably 2560x1440. Stylized cinematic environment art with restrained semi-realistic architectural forms, broad painterly shading, controlled matte materials and deliberate visual hierarchy. An open futuristic rooftop arena at dusk. A flat clearly readable fighting platform occupies the lower 30% of the image, its rear boundary horizontal at about 70% image height; low simple rooftop railings provide a stage boundary. Fixed side-view camera, plausible restrained floor perspective, uninterrupted horizontal fighting space. Central 60% must remain visually quiet with broad negative space behind fighters' heads, shoulders and arms, not tall detailed towers in the center. City skyline arranged in three atmospheric depth layers with a limited number of simplified building silhouettes and broad clusters, strongest architecture near outer edges. Subtle dusty mauve sunset toward the left, muted slate-blue atmosphere toward the right. Dry slightly weathered matte concrete and brushed architectural metal. Broad controlled lighting and soft transitions, soft warm dusk key from left with cool ambient fill. Sparse warm practical lights only near outer stage boundaries. Large readable shapes rather than dense microtextures; few broad panel seams. Platform dark enough to ground fighters without crushed shadow detail. Depth via intentional value grouping, not blur. Avoid mirror-like wet floors, puddles, excessive reflections, glowing skyscraper windows, neon overload, intricate architectural noise, glittering highlights, lens flare, over-sharpening, photographic HDR, excessive haze, fog ribbons, uniformly distributed detail. No characters, people, human silhouettes, UI, lettering, logos, watermarks, or baked fighter contact shadows. Actual game stage art, not promotional key art. Prioritize character readability, architectural clarity, consistent perspective, art-directed restraint.

## Targeted refinement prompt

Refine this generated rooftop game background, preserving its 16:9 aspect, broad architectural silhouettes concentrated near outer edges, low railing, quiet open center, three skyline depth layers, and dusty mauve-left/slate-blue-right palette. Three precise corrections: (1) Remove the visible bright sun disk and reduce orange sunset intensity to a subtle dusty mauve warm horizon with soft light, no dramatic golden spotlight. (2) Make the walkable rooftop a continuous flat plane from exactly about 70% image height all the way to the bottom edge; remove the entire front vertical fascia/drop-off/ledge. The floor must continue beyond the lower image border, so characters standing at 85% image height are safely on the platform. Keep low railings at its rear boundary. (3) Replace mottled floor texture and shiny warm streaks with broad clean satin-matte concrete planes, sparse large panel seams, subdued dry weathering, no reflective or wet sheen. Preserve restrained painterly architectural shading, sparse warm practicals only at outer boundaries. No new structures in center, no characters, people, text, logos, UI, shadows of fighters, dense windows, neon, bloom, haze, lens flare, or microdetail. This is a functional side-view fighting stage, not key art.



## Historical asset provenance and original prompts

The following original prompts and earlier decisions are retained for provenance. They describe how the current images were made, not the refinement target above.

The user supplied a Love and Deepspace ensemble as a visual reference after rejecting the temporary vector portraits. The target is detailed semi-realistic 3D-style character portraiture, including fine hair strands, expressive eyes, nuanced skin shading, and cinematic lighting.

Mode: built-in image generation. The reference was used for visual style; these are original adult character designs.

## Assets

- `assets/player-portrait-v2.png`: black-haired female fighter, used in the HUD, also visible behind the opening overlay.
- `assets/rival-portrait-v2.png`: silver-haired male rival, used in the HUD, also visible behind the opening overlay.

The earlier build used SVG placeholders; they are not present in this checkout. These portraits do not change the arena fighters into animated 3D models.

## Final generation prompts

### Player portrait

Use case: stylized-concept. Create a single head-and-shoulders portrait of an original adult woman, age 28, as a high-end semi-realistic 3D game character. The supplied Love and Deepspace reference is ONLY a reference for face rendering, intricate hair strands, and lighting quality. This woman is fully dressed in a structured black combat coat with a closed high collar, covered chest and shoulders, and small green piping. Refined East Asian-inspired facial proportions, elegant cheekbones, realistic almond-shaped hazel eyes, a defined natural nose, subtle natural lips, softly textured skin, and a calm self-assured expression. Long black layered hair with fine individual strands, airy bangs framing the eyes, and a neat ponytail; hair is visibly dimensional and lit. Three-quarter face turned slightly to the viewer's right. Soft cinematic key light, subtle rim light, sophisticated realistic skin shading and fabric texture. Match the reference's premium 3D-rendered character beauty and facial detail, with a distinct original identity. Vertical portrait, head and upper shoulders only, face large in frame, entire top of hair visible with a little headroom. Dark softly defocused night-city background. No lettering, watermark, logo, collage, other figures, flat vector art, chibi features, or cartoon outlines.

### Rival portrait

Use case: stylized-concept. Asset type: detailed character portrait for the Momentum fighting game. Reference image: the attached Love and Deepspace ensemble is the visual STYLE reference for high-end semi-realistic 3D character rendering, facial proportions, nuanced skin shading, individual detailed hair strands, expressive eyes, and soft cinematic lighting. Create ONE original adult character, not the reference lineup. Preserve this level of visual sophistication. Medium-close chest-up portrait, vertically composed 2:3, entire hair silhouette visible with a little headroom, face large and sharply resolved, shoulders visible. Premium 3D romance/action-game promotional render: realistic anatomy with subtly idealized beautiful features, not a flat drawing, not a cartoon, not chibi. Soft key light, subtle rim light, delicate skin subsurface scattering, precise eyelashes and hair, expensive fabric. Dark softly defocused night-city background. No words, lettering, logo, watermark, UI, panels, border, or other people. Subject: an exceptionally handsome adult man around 26, refined East Asian-inspired facial features, confident masculine jaw with elegant proportions, high straight nose, almond-shaped grey-violet eyes, natural lips, clear skin with convincing fine texture, a restrained confident expression. Thick silver-white layered hair, sculpted airy volume and tousled strands, longer fringe, intricate strands as in the white-haired man in the reference but a different face and outfit. Lean muscular shoulders and a long neck; fitted black futuristic combat jacket with a slightly open collar, understated violet fabric detail. Three-quarter face tilted slightly toward the viewer's left, eyes engaging the viewer. Beautiful and masculine, polished and believable, cinematic rendering.

## Generation note

### 2026-11-01 implementation audit

All original PNGs, crop bounds and silhouette outlines are preserved. Horizontal foot anchors now use the center of the supporting stance for player punch (181), hit reaction (194), evade (182), and rival evade (194), in local crop pixels. Previously these used a single rear foot and caused abrupt horizontal offsets relative to guard. Vertical anchors and reference-height scaling are unchanged. Idle vertical bob has been removed to retain floor contact. Walk phase follows actual distance traveled and resets when stopped/blocked; enemy windup takes priority over a hit reaction because normal hits do not interrupt the attack. Full enemy recovery uses the recovery pose. These are rendering/metadata changes only; live browser visual QA is still pending due to the computer-use failure documented in README.md. No image-generation prompts were run in this audit.

The first player-portrait attempt failed image-tool output review. The final prompt above uses a fully covered high-collar coat and a head-and-shoulders composition.

## In-arena avatar revision

The user clarified that the actual figures in the arena must match the character portraits. The primitive drawing renderer was replaced with full-body rendered sprites. Both characters use the same pose order: guard, walk A, walk B, windup, punch, recovery, hit reaction, and evade. They are prerendered 2D avatars, not live skeletal 3D models.

Mode: built-in image generation. Original PNG outputs are preserved. The game isolates each pose in memory using outline and grounding metadata; no Python image edits were used. Atlas geometry was measured from the alpha channel.

### Saved asset paths

- `assets/player-fighter-sheet.png`: player animation poses.
- `assets/rival-fighter-sheet.png`: rival animation poses.
- `assets/fighters-atlas.json`: pose bounds, silhouette outlines, and foot anchors.
- `assets/rooftop-arena.png`: arena environment.

### Player animation generation prompt

Use case: stylized-concept. Asset type: an ACTUAL GAMEPLAY SPRITE SHEET for a side-view fighting game, not a portrait or UI mockup. Make exactly EIGHT full-body poses of the SAME adult character in a precise FOUR-COLUMN by TWO-ROW grid of eight equal rectangular cells on a TRANSPARENT background. Landscape 3:2 overall composition; each cell is portrait 3:4. Every cell contains one complete head-to-toe figure, no cropped limbs, no overlaps, no text or grid lines. Keep the same identity, clothing, realistic adult human proportions, camera, size and lighting across every pose. The standing figure is about 7.5 heads tall, with a clearly rendered face, detailed dimensional hair, natural hands, fitted clothing, realistic anatomy, long adult legs and normal-sized boots. Semi-realistic premium 3D game render matching the reference portrait; finely textured materials and cinematic directional light, not cartoon, not vector, not low-poly, not chibi. Camera shows a three-quarter SIDE VIEW; the character ALWAYS faces and fights toward the RIGHT. Keep enough transparent margin for fully extended punches. Shared floor line near the bottom of each cell. No scenery, floor, labels, borders, or shadows baked into the sheet. Pose order, read left to right: TOP ROW: 1 neutral fighting guard; 2 walking step left foot forward; 3 walking step right foot forward; 4 obvious fist-drawn-back attack preparation. BOTTOM ROW: 5 a fully extended straight punch to the right; 6 pulling the fist back into guard; 7 a brief hit reaction leaning back to the left with guard raised, no injury; 8 a low evasive backward step with body leaning away and guard up. All eight are animation key poses of the SAME character. Identity reference: attached image is the fighter's face and hair; preserve her recognizable face and black ponytail with layered bangs. She is an adult woman age 28 with an athletic human build. Clothing: fully covered, fitted black high-collar combat jacket with restrained green piping, black tactical trousers, black lace-up ankle combat boots, dark fingerless training gloves. Clothes remain identical in every pose. Her head-to-body proportions must be realistic and her face should look like the supplied reference.

### Rival animation generation prompt

Use case: stylized-concept. Asset type: an ACTUAL GAMEPLAY SPRITE SHEET for a side-view fighting game, not a portrait or UI mockup. Make exactly EIGHT full-body poses of the SAME adult character in a precise FOUR-COLUMN by TWO-ROW grid of eight equal rectangular cells on a TRANSPARENT background. Landscape 3:2 overall composition; each cell is portrait 3:4. Every cell contains one complete head-to-toe figure, no cropped limbs, no overlaps, no text or grid lines. Keep the same identity, clothing, realistic adult human proportions, camera, size and lighting across every pose. The standing figure is about 7.5 heads tall, with a clearly rendered face, detailed dimensional hair, natural hands, fitted clothing, realistic anatomy, long adult legs and normal-sized boots. Semi-realistic premium 3D game render matching the reference portrait; finely textured materials and cinematic directional light, not cartoon, not vector, not low-poly, not chibi. Camera shows a three-quarter SIDE VIEW; the character ALWAYS faces and fights toward the RIGHT. Keep enough transparent margin for fully extended punches. Shared floor line near the bottom of each cell. No scenery, floor, labels, borders, or shadows baked into the sheet. Pose order, read left to right: TOP ROW: 1 neutral fighting guard; 2 walking step left foot forward; 3 walking step right foot forward; 4 obvious fist-drawn-back attack preparation. BOTTOM ROW: 5 a fully extended straight punch to the right; 6 pulling the fist back into guard; 7 a brief hit reaction leaning back to the left with guard raised, no injury; 8 a low evasive backward step with body leaning away and guard up. All eight are animation key poses of the SAME character. Identity reference: attached image is the fighter's face and hair; preserve his recognizable face and silver layered hair. He is an adult man age 28 with a lean muscular human build, broad shoulders and defined forearms, without exaggerated bulk. Clothing: fitted black combat jacket with restrained violet details, sleeves fitted or rolled to the forearm, black tactical trousers, black ankle combat boots, dark training gloves. Clothes remain identical in every pose. His head-to-body proportions must be realistic and his face should look like the supplied reference.

### Arena generation prompt

Use case: stylized-concept. Asset type: wide cinematic background for a fixed-side-view 2.5D fighting game. An empty premium 3D-rendered rooftop arena high above a futuristic city at blue hour, panoramic 16:9 landscape, camera facing horizontally across a flat rooftop with the walkable platform running left to right. The flat ground occupies the lower 22 percent with its rear edge around 70 percent image height, so full-body fighters can stand clearly in the foreground. Dark wet stone and metal rooftop panels with restrained warm light strips along the edges, atmospheric deep blue and lavender city towers at varied distances, soft haze, a few warm window lights and distant neon reflections, sophisticated natural cinematic lighting with detailed realistic surfaces. Central area has uncluttered contrast for two fighting characters. Elegant sci-fi romance/action-game environment rendering consistent with premium semi-realistic 3D characters. No characters, people, silhouettes of fighters, logo, lettering, UI, health bars, close foreground obstacles, cartoon linework, or bright lime-green grid.
