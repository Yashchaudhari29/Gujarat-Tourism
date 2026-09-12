# Gujarat Unveiled - Requirement Matrix

| ID | Obligation | Existing Implementation | Relevant Files | Remaining Action | Verification Method | Evidence | Status |
|---|---|---|---|---|---|---|---|
| R1.1 | Fix district-player test (10 != 15) | Tests expected 15, actual is 10. | scripts/check-district-player.cjs | Fixed expected value to 10 based on actual timestamp. | run `npm test` | `npm test` passes | verified |
| R1.2 | Fix Explorer route mismatch | `Explorers.jsx` used hash paths, `App.jsx` passed `/explore/*` | src/components/Explorers.jsx, src/routes.js | Updated route mapping and component checks | Manual code review, test route matching | `Explorers.jsx` logic updated | verified |
| R1.3 | Fix seasonal data-shape error | `Environment` component passed object instead of string | src/components/Explorers.jsx | Updated component to use `season.id` and map `region_id` to `name` | Manual code review | Component updated | verified |
| R1.4 | Fix deep-link hydration | `main.jsx` blindly hydrated `App` | src/main.jsx | Added check: if `initialPath === '/'` hydrate, else `innerHTML=''` and `createRoot` | Code inspection | Code implemented | verified |
| R2.1 | Implement Leadership Directory (Modi first, authentic portrait) | Placeholder components | src/components/PersonalitiesPage.jsx, src/data/personalities-data.json | Expand data, ensure Modi is first with portrait on left on desktop | UI check, data check | - | not started |
| R2.2 | Biographies for personalities (400-500 words) | Small summaries | src/data/personalities-data.json | Research and write bios | Word count script | - | not started |
| R3.1 | Finish government showcase | Placeholder data/components | src/components/DevelopmentPage.jsx, src/data/schemes.json | Add verifiable records, metrics, district links | Content check | - | not started |
| R4.1 | 34 Districts content coverage | Basic placeholders | src/data/district-texts.json | Write chapters, add 10-15min narration text, heritage lists | Script length check | - | not started |
| R5.1 | 5 Explorers full implementation | Placeholders for Historical Atlas, Connections, Objects, People, Environment | src/components/Explorers.jsx | Implement maps, timelines, cards with real data | UI check, data check | - | not started |
