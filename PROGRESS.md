# Gujarat Unveiled — updated checkpoint, 14 September 2026

This is the latest editable project with verified technical fixes. The complete research/content expansion is NOT finished. No remote site has been deployed or overwritten.

## Fixes saved
- Exact page-route matching, usable not-found pages, legacy bookmark aliases and query-aware personality filtering.
- Separate leadership/profile, district/chapter and initiative pages; stable initiative name URLs with numeric aliases.
- Five working explorer directories, 32 detail records and four regional environment pages. Seasonal selections use proper IDs and persist in URLs across region navigation.
- District text headings become chapter navigation. Missing data and malformed source handling improved.
- Production build generates 118 page URLs with matching hydration markers. Homepage fallback hydration uses its actual prerendered route before switching to the live URL.
- District player validates configuration, preserves authored timestamps, rejects short audio, handles topics/replay/final frames, speed, late metadata and cleanup. Original audio is preserved; all 34 suspect district recordings remain unpublished.
- Atlas hidden-size camera repair, shortest north reset, root-relative popup images and better selection/listener cleanup.
- Narendra Modi profile wording replaced with a dated, source-linked draft; see actual profile source metadata. Other profiles and all district claims still need broader editorial review.

## Verification on this snapshot

| Test | Environment | Result |
| --- | --- | --- |
| npm run build | Node 24.19.0 / Vite 7.3.1 | PASS; 118 routes prerendered |
| Route parser and aliases | Node | PASS |
| Page rendering, chapters, filters, initiative slugs/errors | Node + React SSR | PASS |
| Five explorers, 32 detail pages, 12 season/region combinations | Node + React SSR | PASS |
| Hidden viewport and north-alignment math | Node | PASS |
| Legacy narration behavior | Mocked media/DOM tests | PASS |
| District player timing, topics, invalid media, races and cleanup | Real factory with mocked media/DOM | PASS |
| Original assets/content and protected styles/scene | SHA-256 + content checks | PASS; 11 stories, 44 chapters, 34 districts |
| 118 route HTML files, local references and hydration markers | Build-output inspection | PASS |
| npm test aggregate | Node | PASS, exit 0 |
| Production browser spot-check | Cloud Chrome | BLOCKED: local preview URL returned net::ERR_BLOCKED_BY_CLIENT |

Automated SSR checks do not prove browser hydration, touch behavior, GPU rendering, accessibility or actual speakers/audio. Those remain unverified in a browser. Existing package dependencies were available; npm ci was not rerun in this verification pass. A main-bundle warning remains (approximately 1.13 MB before gzip).

## Remaining work
1. Full factual/editorial audit of all 34 Gujarati district narratives, current boundaries/statistics and source links. Existing inaccuracies/superlatives still need correction.
2. Complete sourced 400–500 word biographies across the personality inventory and longer Gujarati documentary material where requested. Many supplied profiles are not yet evidence-reviewed; documentary scripts are still short.
3. Historical Atlas presently provides period-based evidence pages, not the requested geographic historical map layers. Sourced coordinates/cartography are still needed.
4. Expand explorer coverage beyond the current 3 eras/15 sites, 5 connections, 8 objects, 4 documentary people and 4 ecological regions.
5. Verify minister portfolios, initiative status/outcomes, media reuse rights and portrait provenance. Generic existing references do not constitute claim-level verification.
6. Supply authentic district audio and measured scene timestamps, then verify real recording synchronization. Human Gujarati pronunciation/pacing review remains necessary.
7. Browser/mobile/keyboard/accessibility, live host fallback and WebGL checks; optimize large bundle after addressing the concrete loading path.

## Run

    npm ci
    npm run dev

For production verification:

    npm run build
    npm test
    npm run preview

Build before tests: several tests inspect dist. Serve using HTTP, not by double-clicking index.html. Deploy dist only when ready. Known page directories are prerendered; unknown/legacy URLs may need the host's SPA fallback to /index.html. The app assumes deployment at the domain root.

## Files and handoff
Use this complete project instead of the older checkpoint. For an existing working copy, see CHANGED-FILES.md for differences from Gujarat-Unveiled-Progress-Checkpoint.zip; merge carefully if you made newer changes. This archive excludes dependencies, build output, git metadata, caches and environment credentials. Original assets and licensing notices remain.

PROGRESS-CHECKPOINT.md is superseded by this document. Earlier REQUIREMENTS and handoff documents describe desired scope, not completed acceptance. No claim of zero errors or complete historical verification is made.
