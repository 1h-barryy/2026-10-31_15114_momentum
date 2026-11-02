# Momentum by Charlie Chen (github CheezyPegasus)

Desktop single-player rooftop fighting: one player versus one AI, each with 100 HP. Consecutive landed hits deal 10, 12, 14, 16, 18, 20, then 20 damage. Taking actual damage resets the streak; misses and successful dodges preserve it. Enemy hits deal 25 damage. [SPEC.md](SPEC.md) is the unchanged gameplay contract.

## Run and controls

From the repository with Node.js installed:

```sh
node scripts/serve.js
```

Open http://localhost:8000. Keep the terminal running; Ctrl+C stops it. No install/build step or dependencies. Use HTTP, not a file URL, for modules and atlas loading. The static server binds to 127.0.0.1:8000. Node 24 was checked on Windows. Package aliases: npm start, or npm.cmd start in Windows PowerShell. No macOS execution is claimed. The inherited Python launch route was not tested here because Python was unavailable.

| Input | Action |
| --- | --- |
| Enter / FIGHT | Start after assets load |
| A/D or left/right arrows | Move; automatically face rival |
| J | Attack once per press, subject to recovery |
| K | Dodge in held direction; otherwise away |
| Escape | Pause/resume |
| R after game over | Fresh match |
| On-screen buttons | Sound/mute, fullscreen, pause and dodge |

Tab blur pauses play. Dodge lasts 0.2 seconds with a 1-second cooldown and suppresses attacks. Watch the gold warning, dodge or leave range, then counterattack during recovery. Standing still and mashing loses in simulation. The round has no time limit.

## Active art and code map

Default arena: **assets/rooftop-arena-v2.png**, selected by useArenaV2: true in src/assets.js. Failure warns and falls back to assets/rooftop-arena.png. V2 bypasses the legacy stage grade/wash. **Selection is not live visual approval.**

Original fighters remain assets/player-fighter-sheet.png and assets/rival-fighter-sheet.png with assets/fighters-atlas.json. Original HUD portraits remain assets/player-portrait-v2.png and assets/rival-portrait-v2.png. Their v2 names predate this continuation. useFightersV2 is false; the optional fighters-atlas-v2.json is absent and not requested by default. No replacement fighter sheets or portraits were made.

| Path | Responsibility |
| --- | --- |
| index.html / styles.css | Canvas, menus, portrait HUD and layout |
| src/main.js | Startup, loop, HUD, result/restart, pause and buttons |
| src/config.js | Combat/timing/movement constants |
| src/engine.js / src/ai.js | Match, streak, dodge, outcomes / enemy behavior |
| src/input.js | Movement keys, action edges, focus-loss clearing |
| src/assets.js | Asset selection and fallback |
| src/atlas.js | Image/metadata loading, validation, clipped poses |
| src/render.js | Stage, anchored/mirrored poses, shadows, feedback |
| src/audio.js | Generated hit/swing/dodge sound and mute |
| assets/fighters-atlas.json | Eight-pose bounds, outlines, anchors, contacts |
| scripts/serve.js | Dependency-free local HTTP launcher |
| tests/engine.test.js | Combat, pause, movement and strategy regressions |
| tests/input.test.js | Synthetic key edges and focus-loss clearing |
| tests/render.test.js | Pose priority and atlas invariants |
| tests/assets.test.js | Entrypoint/import references and original PNGs |
| tests/asset-loading.test.js | Fallback, atlas rejection and mirrored contacts |

## Verification and original acceptance report

**2026-11-01: npm.cmd test ? 26 passed, 0 failed.** The package command is npm test; use npm.cmd test where PowerShell blocks npm.ps1. Node syntax checks and git diff --check also passed. Automated checks do not prove live input, rendering or audio.

Partial means implemented/test-supported but full acceptance evidence is incomplete, not necessarily defective. Complete below is limited to directly tested simulation-only requirements. Earlier claims of all items complete are not independent proof. E = tests/engine.test.js; I = tests/input.test.js; R = tests/render.test.js; L = tests/asset-loading.test.js.

| # / priority | Original requirement | Status | Evidence / remaining manual verification |
| --- | --- | --- | --- |
| 1 P0 | Launch and movement/attack/dodge/start/restart instructions | Partial | Server and index.html inspected; prior original-stage title observed. Fresh V2 launch/console check pending. |
| 2 P0 | Enter starts 100/100 HP, streak 0, next damage 10 | Partial | E fresh-state test; main.js Enter/startMatch. Actual Enter-to-HUD flow pending. |
| 3 P0 | Both movement pairs, automatic facing, arena bounds | Partial | E bounds/facing/spacing; I both pairs. Live keyboard/edge checks pending. |
| 4 P0 | J hits once in range; misses do no damage | Partial | E hit/miss/recovery; I action edges. Live J hit/miss check pending. |
| 5 P0 | Holding/repeating cannot bypass attack recovery | Partial | E recovery; I repeat/duplicate keydown. Real held/rapid J pending. |
| 6 P0 | Directional/default-away dodge, cooldown, no attack during it | Partial | E dodge/cooldown; engine attack gate; I K edges. Live directional/neutral K pending. |
| 7 P0 | Dodge-window strike has no damage/reset; outside window can hit | Complete | E in-range dodge immunity, preserved momentum and expiry tests resolve actual strike timing. No visual claim. |
| 8 P0 | AI approach/windup/recovery, escape, mash loses/counterplay wins | Partial | E range/windup and both strategy tests; R warning priority. Human warning readability and full-match counterplay pending. |
| 9 P0 | 10/12/14/16/18/20/20 progression and updated display | Partial | E progression/cap; main.js HUD. Observe successive display updates. |
| 10 P0 | Enemy hit 25 resets streak/next damage; miss/dodge preserves | Complete | E enemy reset, miss and dodge; nextHitDamage(0) gives 10. Visible reset feedback is #15. |
| 11 P0 | Correct win/loss/draw, HP clamp and frozen combat | Partial | E strategy outcomes and simultaneous KO/freeze; main.js labels. Live result overlays/HP pending. |
| 12 P0 | R restarts without old state/actions | Partial | E fresh state; main.js clears input/renderer and maps R. Live post-result restart pending. |
| 13 P1 | Two matching distinct portraits beside health bars | Partial | PNG/HTML paths; prior original-stage title showed both. Current V2 composition review pending. |
| 14 P1 | Legible health/streak/next damage/dodge readiness | Partial | main.js bindings/CSS inspected. Combat readability at 1280?720 pending. |
| 15 P1 | Distinct windup/hit/dodge/streak-reset feedback | Partial | R priority; L contacts; renderer effects/main.js reset text. Four-state motion review pending. |
| 16 P2 | Optional hit/dodge audio, high-streak accent and mute | Partial | audio.js and main.js wiring. Listening/mute/accent check pending. |

No criterion is known to be Missing. More conservative statuses than earlier reports reflect incomplete end-to-end evidence, not newly discovered regressions.

## Limitations and manual checks

No browser control was used in this documentation pass. Earlier browser-host/native input failures prevented gameplay captures. A later native session showed the original-stage title at a 1280?720 game frame, then URL-confidence failure stopped control before V2 reload. No live V2 approval, full match or audio signoff is established.

Use 1280?720 content size, 100% zoom and consistent DPR/reduced-motion settings; record browser/version. Record a focused match and extract idle, enemy windup, player punch/contact and dodge frames (only 0.2 seconds). Inspect silhouettes, shadows/feet, both facings, cropped limbs/frame bleed, HUD and warning/reset feedback at native size. Keep captures outside the repo unless needed for submission.

Complete all live checks in the table, including losing mash and successful counterplay, streak gain/reset/cap, game-over freeze/R restart, pause/resume/tab blur, sound/mute and fullscreen. Check DevTools errors and the V2 request; loader unit tests do not establish browser fallback behavior.

The figures use eight discrete prerendered poses, not skeletal 3D. Walk A/B are similar; clothing/hair highlights are baked in. Contact annotations need motion review. V2 is 1672?941 (approximately 16:9), fitted to 1280?720. No new features are required to address these limitations.

[HANDOFF_REPORT.md](HANDOFF_REPORT.md) separates inherited and continuation work. [ART_DIRECTION.md](ART_DIRECTION.md) preserves art prompts and atlas constraints; [PROMPT_LOG.md](PROMPT_LOG.md) records actual requests/decisions. Owner review and submission remain outstanding. No commit or push was made.
