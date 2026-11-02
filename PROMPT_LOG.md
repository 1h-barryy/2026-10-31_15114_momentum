# Prompt log

## Rooftop Arena V2 generation — 2026-11-01

The user requested a production 16:9 matte rooftop background with a quiet center, simplified skyline layers and dusty mauve/slate dusk. Used built-in image generation, then a targeted refinement to remove the bright sun disk and foreground drop-off and simplify the floor. Saved the selected PNG as assets/rooftop-arena-v2.png; original retained, activation flag unchanged. Exact executed prompts are in ART_DIRECTION.md (V2 arena provenance). No in-game visual approval is claimed.

## V2 art-production preparation — 2026-11-01

The user requested a Stylized Cinematic 2.5D / Matte Game Illustration production specification, grounded contact-shadow fixes and a safe asset-swap path, explicitly rejecting another broad grade or pretend replacement artwork. Read the four handoff documents, inspected source sheets/arena and renderer/atlas processing. Added the supplemental V2 production note (now consolidated in ART_DIRECTION.md) and an active V2 ART_DIRECTION.md section while preserving historical prompts. Added explicit opt-in asset paths with whole-fighter-bundle fallback and metadata validation; replaced the central solid oval with pose-local soft contacts; removed the redundant sprite filter. No original PNG, combat rule, anchor or HUD redesign was introduced. Source support-point annotations require manual motion validation; no new art or live visual approval is claimed.

## Phase 2 visual QA — 2026-11-01

The user requested four consistent desktop screenshots and a visual assessment before further artwork changes, explicitly allowing a documented capture limitation with manual instructions. The local server returned HTTP 200. Browser-host access was unavailable; native Chrome tab selection failed with missing input geometry and then a user-input conflict. No Momentum gameplay screenshots were obtained. Added the supplemental visual QA note (now consolidated in README.md and ART_DIRECTION.md) with evidence status, inspected renderer processing, source-asset limitations, provisional replacement priorities and a precise four-state manual capture procedure. No rendering, gameplay, grading or source-asset changes were made in this pass; no visual approval was claimed.

## Visual refinement — 2026-11-01

The user requested an art-direction refinement and visual cleanup pass: retain the existing identities and rooftop concept while reducing gloss, detail and competing lighting. The request explicitly called for an actual implementation audit, a practical ART_DIRECTION.md, code-side cleanup and precise replacement-asset guidance.

Implemented a cached, restrained stage grade and floor wash; mild grading of cached fighter poses and HUD portraits; smaller hit bursts/shake; one faint dodge afterimage; flatter HUD materials. Reorganized art guidance ahead of the preserved original prompts, with per-pose requirements, per-asset replacement briefs and integration/review gates. No new images were generated or source PNGs replaced. No screenshot was attached to this request; findings use inspected assets and source, and live visual approval remains pending.

This records the user requests that shaped the game and the implementation. Terminal setup and unrelated messages are omitted. Quoted excerpts are verbatim; commentary below them describes the resulting work rather than inventing additional user prompts.

## Design

### Opening request — excerpt, assignment brief omitted

> I need to do this for 15-114, I have to prompt a game someone else have to vibe code
>
> and the only thing on my mind is street fighters, but the females are very attractive and the males are built asf, some are boji 薄肌, and their facial features are hair are literally LADS 爱与深空
>
> design your game (**without** generating code) and write \`SPEC.md\`. Come to class with it ready to commit.
>
> I don't know, I don't even game due to family, like this is pushing my boundaries of knowledge

The user supplied the course assignment, including the three-hour scope, SPEC-only first commit, acceptance criteria, priorities, handoff documents, and the instruction that creative decisions belong to the student. The AI recommended reducing the scope and asked the user to choose gameplay and presentation.

### User's gameplay and presentation answers

> Which activity sounds most enjoyable during a fight?
> Move around, dodge, and land hits in real time
>
> How would you want the characters represented within this small project?
> Expressive character portraits beside simple fighting figures

### User's distinctive-rule answer

> Which rule would make you want to play another round?
> Risk and reward: consecutive hits increase your damage, but getting hit loses the bonus

The answer was repeated with the same choice. The AI drafted SPEC.md around these choices and supplied editable defaults for controls, damage, opponent behavior, timing, the working title, and priorities. No game code was created during that step.

## Phase 1 build — 2026-10-28

### User request

> ok now let's get to building

The AI used the current SPEC.md and built a Phase 1 foundation in plain JavaScript, HTML, and CSS. It implemented movement, attack recovery/range, basic enemy AI and telegraphing, momentum damage, health, KO/draw, restart, UI, and temporary original SVG portraits. It added engine tests and handoff documentation. Dodge and final portrait polish were left as explicit Phase 2 tasks.

This source package was created separately from the student's GitHub checkout. Its existence does not mean it has been committed or pushed to GitHub.

## Phase 2

## Avatar and game-screen revisions — 2026-10-28

User feedback, verbatim:

> bro, two things: first of all, the characters are the exact same garbage slop as before; second, the UI/UX website design is trash

> this is not what I wanted; I want the same 1:1 figure and actual avatars

> yes, like this; how update it for both characters

> stop working immediately after you finish and give me something I can push onto Git instantly

The assistant replaced the primitive in-arena drawing with two matching eight-pose character sheets and a shared sprite renderer. It rebuilt the page as a full-screen fight, added the spec's dodge mechanic and readiness indicator, body spacing, short impact pauses, sound with mute, pause/resume, and fullscreen controls. The animation sheets and background were generated using the exact prompts recorded in ART_DIRECTION.md. The engine has 16 passing tests. Browser QA confirmed both avatars render, movement and punch input work, health and streak change on a hit, and dodge shows a cooldown.

The source download excludes Git history and hosting identity, so it can be copied into the student's existing repository after the original SPEC-only commit. Downloading this package does not itself push it to GitHub.

### Partner continuation

Append the actual prompts you use and a short account of the changes you accept, reject, or adjust. Do not mark acceptance criteria complete until they have been checked.

## Inherited-build audit — 2026-11-01

Actual user request excerpt:

> Your assignment is to audit the inherited build, fix any gaps, and deliver a polished, playable, stable handoff. Do the work in the codebase; do not stop after giving recommendations or writing a plan.

The request required reading the specification and handoff/art documents, verifying the inherited claims, preserving combat rules and original assets, making targeted functional and visual fixes, adding deterministic regressions, and reporting unverified browser work honestly. No new art was requested or generated.

The clean baseline passed 16 tests using `npm.cmd test` (PowerShell blocked `npm.ps1`). Implemented: cancellation of impact-buffered actions on pause; strict keyboard edges; distance-driven walking that stops at collisions; persistent enemy telegraph/strike poses; grounded idle drawing; four corrected horizontal stance anchors; complete start instructions and larger HUD labels. A small dependency-free Node static launcher was added because Python was absent. Combat balance values, all PNG source art, crop bounds/outlines, and SPEC.md were preserved.

Verification: 23 tests pass, JavaScript syntax checks and HTTP asset/module checks pass, and source sheets were inspected. Browser automation was unavailable; native Computer Use stopped because it could not determine Chrome's current URL confidently. Consequently no successful browser playtest, sound check or viewport sign-off is claimed. README.md now separates tested rules from presentation checks still needed. No commit or push was made.


## Visual Refinement 2026-11-01

Prompt:

>The characters and rooftop look too much like AI-generated promotional art. Reduce excessive highlights, glossy materials, background noise, and visual clutter. Keep the same characters, setting, and gameplay. Update the art guidance and make practical renderer changes.

Purpose: The artwork had a lot of detail, but the fighters did not stand out enough from the background.

Result: Codex adjusted the background treatment, reduced some effects, and simplified the HUD. However, some visual problems remained in the original images.

## Art Direction V2 2026-11-01

Prompt:

>Do not repeat broad desaturation, blur, or darkening. Move toward a restrained stylized 2.5D look with matte surfaces, clearer silhouettes, and a calmer rooftop. Improve foot-contact shadows and prepare a reversible V2 asset-loading workflow without changing combat.

Purpose: The first cleanup reduced brightness, but the overall presentation still felt inconsistent.

Result: Codex improved the character contact shadows, prepared V2 asset loading with fallback, and updated the art specifications.