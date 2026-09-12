# Gujarat Unveiled

React + Vite migration of the existing Gujarat atlas. The existing CSS, photographs, Gujarati narration, source links and Three.js scene are preserved.

## Development

Use Node 22.12+ (or Node 24) and npm.

```sh
npm ci
npm run dev
npm run build
npm test
```

`npm run build` produces a static site in `dist/`. The page is prerendered and then hydrated by React, so the layout and district directory are available before JavaScript finishes. Vite splits the atlas and React runtime into separate bundles. Audio loads by chapter using the original MP3 URLs.

## Organization

- `src/components/`: React page sections, content cards and the stateful district search/filter.
- `src/data/content.js`: the unchanged 11 stories, 44 chapters, 34 districts and citations.
- `src/runtime/experience.js`: existing dialog, craft, timeline and habitat behavior, connected through a React lifecycle hook.
- `src/runtime/story-player.js`: native audio playback; starts directly on the user's click and preserves pause/resume, seek, volume, captions and fullscreen.
- `src/runtime/atlas.js`: original Three.js scene, with explicit lifecycle cleanup. React search updates do not remount it.
- `src/styles.css`: original design rules. Only asset URLs were made root-relative for the build.
- `public/assets/`: original media, local Gujarati font, geographic data and the same vendored Three.js version.

The integration deliberately retains native media and scene controllers instead of rewriting their behavior during the framework migration. React owns stable page sections and the district directory; controllers own the dialog content and canvas within those hosts.

## Verification

`npm test` checks player state transitions and exact preservation of CSS, story data, media hashes, camera/lighting/geometry and animation parameters. It also checks the prerendered entry and generated bundles. These are source/build and simulated-player checks, not a guarantee of GPU performance or browser-level visual equivalence on every device.

Narration pronunciation review and the geographic/source limitations shown in the site are unchanged. This migration adds no new stories or visual features. MP3 model attribution remains in `public/assets/audio/CREDITS.txt`.

## Hosting

The existing project identity and static output directory remain in `.openai/hosting.json`. Build before packaging. `dist/` is generated, while source and assets are version-controlled. The earlier standalone HTML download remains an earlier portable edition; this React project is the maintained source.
