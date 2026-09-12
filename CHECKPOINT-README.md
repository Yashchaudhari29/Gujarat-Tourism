# Gujarat Unveiled — source checkpoint, 11 September 2026

This ZIP is an immediate backup of the current React + Vite workspace, including work in progress. It is not a claim that the requested 34 long district scripts are complete. Start with this file; README.md describes the earlier framework migration.

## Run the editable source
Use Node.js 22.12+ or 24, and npm. Extract the ZIP, open the Gujarat-Unveiled folder, then run:

```sh
npm ci
npm run dev
```

For a production build:

```sh
npm run build
npm run preview
```

A freshly built dist/ folder is also included. Serve that directory with an HTTP server; do not double-click index.html. For example, from this project folder: `python3 -m http.server 8000 --directory dist`.

## Included
- React components, original styles and imagery, local Gujarati font, vendored Three.js, geographic assets, and the existing 11 stories / 44 narrated chapters.
- Current map work: north reset, vertical orbit and roll, and persistent district selection.
- Detailed-reading additions for existing heritage/art/wildlife subjects.
- All 34 district folders in public/district-media/ and the new supplied-recording player and configuration validator.
- Package lock, build scripts, existing tests, and a build of this checkpoint.

## Your district recordings
For Kutch, put your recording in `public/district-media/kutch/audio.mp3`. Other districts use their named folder, for example ahmedabad, rajkot, vadodara, and vav-tharad.

Place the matching Gujarati text in script.txt and scene images in images/. Edit story.json to add consecutive scene timestamps in seconds, source links, and optional topic ranges. Only set published to true when the audio, text, images and exact timings are ready. Rebuild after changing files.

Each scene needs start, end, title, text and image (for example images/dholavira.jpg). Scene 1 starts at zero. Optional focus is two percentages, for example 50% 40%. Each topic needs id, title, start and end. Each source needs title and an HTTPS url. The validator rejects missing required files or invalid timing ranges during build.

No user audio has been supplied yet. All 34 new recording configurations are deliberately unpublished; script.txt files are placeholders. Existing narration still works independently. New recordings do not use a synthesized voice fallback.

## Work still pending
- The newly requested long Gujarati narratives for all 34 districts are not yet written into this checkpoint. The four scripts supplied in the conversation are depth references, not completed imports.
- Further historical source reconciliation, narrator pronunciation review, scene assets, and exact audio synchronization remain to be completed.
- The map and supplied-audio player changes still need their targeted interaction verification.
- npm run build PASSED for this checkpoint. npm test currently FAILS because the old isolated player test does not supply the newly added renderKnowledge dependency. Migration preservation assertions also need reconciliation with the newly authorized feature additions. Tests are included unchanged so unfinished validation is visible.

This backup has not been deployed over the live site. No node_modules, Git history, credentials or hosting account configuration are included. Install dependencies with npm ci. Existing media attribution and licensing notices are in public/assets/, including the noncommercial Meta MMS narration attribution; retain these notices.
