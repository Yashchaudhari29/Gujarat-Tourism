# Gujarat Unveiled — progress checkpoint

Snapshot saved on 2026-09-12 at the user's request. This is unfinished work, not a completed audit or verified release. No remote deployment was made.

## Saved implementation
- Dedicated route handling and leadership directory/profile components; district and development page components.
- Navigation links and updated reading/layout styles.
- District scripts collected into the reading data file.
- All 34 supplied district audio configurations unpublished pending verification; original audio files preserved. Earlier audit identified duplicated short Ahmedabad audio across district folders.
- Player edits preserve the final scene and reject recordings shorter than the configured timeline instead of rescaling timestamps.
- Existing source, images, recordings, source records and licensing notices preserved.

These are saved code changes, not claims that their browser behavior or all content has been verified.

## Verification of this snapshot
- npm run build: PASS (Vite production build and prerender). Large main-bundle warning remains.
- npm test: FAIL. Legacy player checks PASS. District-player assertion fails at scripts/check-district-player.cjs:20: actual 10, expected 15. Migration check is not reached because the test command stops on failure.
- Browser, mobile, accessibility, media-rights, complete factual and Gujarati editorial audits: not completed for this checkpoint.

## Outstanding work
1. Finish checking leadership and profile navigation, 400–500 word content, formal wording, authentic portraits and tag relationships.
2. Fix explorer route compatibility and seasonal data-shape handling; the seasonal crash identified in the audit remains unresolved.
3. Finish responsive styles, backgrounds, contrast and all five explorer flows.
4. Reconcile district-player tests with legitimate timing requirements and test missing/invalid media, topic replay, seeks and cleanup.
5. Complete the requirement/coverage audit against all three attached prompts; substantial district and personality research remains unverified.
6. Test direct URL refresh, back/forward navigation and the actual deployment's SPA fallback. Current prerender script only prerenders the homepage.
7. Verify map controls, pinned selection, dialog focus and preservation of the existing site.

## Run locally
Use a current supported Node.js release compatible with Vite 7, then:

    npm ci
    npm run dev

Production commands:

    npm run build
    npm run preview

Do not regenerate or publish district narration from the preserved short audio. Use actual user-provided district recordings with measured scene times.

## Archive contents
Editable project source, package and lock files, public assets, scripts, documentation, and the three attached requirement documents under handoff-requirements/. Excludes node_modules, dist, .git, runtime caches and environment credential files. Dependencies and build output are reproducible. Original CHECKPOINT-README.md is retained as historical documentation; this note describes the newer snapshot.
