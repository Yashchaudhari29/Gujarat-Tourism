# Gujarat Unveiled — checkpoint and continuation prompt

Checkpoint date: 15 September 2026. This is an unfinished development checkpoint, **not a finished release**. This document supersedes earlier completion claims in this folder. Read `scripts/checkpoint-verification.json` for the results of the checkpoint build; do not infer that every test passed.

## What is saved

- The React/Vite source, local media, styles, existing content, translation dictionaries, partial translation batches and build scripts.
- The personality catalogue contains 64 distinct profiles. Its 25 displayed tags each have six members. Membership counts do not establish the accuracy or depth of every biography.
- There are 34 district photo mappings and 34 distinct image files by content hash in the latest earlier media audit. Individual visual relevance/cropping still needs review, particularly the user's reported Amreli problem.
- The expanded Historical Atlas has 21 entries. Explore Deeper also has expanded connections, objects, people and ecology collections with detail routes.
- A shared language context and JSX translation layer exist. English/Gujarati switching changes saved translations locally, without a translation service at reading time. Full coverage is NOT complete.
- The duplicate global language bar has been removed from `App.jsx`. Body-level controls remain, including a control below the home hero. Selected-language styling uses a light button on a green control background.
- Readability CSS gives dark text to light article surfaces. The Amreli image has a contain-fit rule; the Statue of Unity has top-aligned framing. These are code changes, not proof that the user's visual complaints are resolved.
- Gulam Mohammed Sheikh's birth date/place have a sourced override in `src/data/person-facts.json`. Other new profiles still need a complete metadata pass.

## Translation progress at packaging

| Batch | Saved records | Total records | Remaining |
| --- | ---: | ---: | ---: |
| gu-1 | 160 | 523 | 363 |
| gu-2 | 160 | 508 | 348 |
| gu-3 | 150 | 503 | 353 |
| gu-4 | 160 | 505 | 345 |
| en-1 | 115 | 287 | 172 |
| en-2 | 135 | 282 | 147 |

These are record counts, NOT percentages of words, translation quality or entire-site coverage. Long article paragraphs and short labels count as one record each. Gujarati UI translations in `src/locale/ui-gu.json` are separate. Dynamic dialogs/player content and newly changed strings may require additional entries beyond these batches.

Inputs: `scripts/translation-shards/{batch}.json` contain `{id, source}` records. Outputs: `src/locale/shards/{batch}.json` map numeric IDs to translated strings. The immutable ID lookup for these batches is `scripts/translation-shards/source-index.json`.

**Do not regenerate or reorder that source index while resuming the existing batches.** Do not run `prepare-translation-shards.mjs` over unfinished work. `collect-translations.mjs` updates a separate current inventory; it does not replace the frozen shard index. `merge-translations.mjs` checks IDs against the frozen input and writes the runtime `en.json` and `gu.json` dictionaries. Keep hand-authored UI overrides separate so merges cannot erase them.

## Copy/paste continuation prompt

You are continuing an existing Gujarat Unveiled React/Vite website. Work in the extracted project folder. Preserve existing work, local images, narration and content; do not redesign the application from scratch. First read `CONTINUE-HERE.md`, `package.json`, and `scripts/checkpoint-verification.json`. Inspect the actual code and browser state rather than trusting old claims that all work is complete. The user wants the complete functionality below, and wants honest reporting of anything unfinished.

### 1. Finish offline English/Gujarati text coverage — highest priority

Translate ALL visible text, not only headings or navigation. Cover paragraphs, long district narratives, personality introductions and chapters, development schemes, historical explanations, environment/seasonal entries, objects, connections, captions, filters, search labels, empty/error states, related-content labels, dialogs and player text. Keep the full meaning, dates, qualifications, named works and historical distinctions. Do not replace a long article with a short summary or generic repeated filler. Do not invent facts while translating.

Resume the six partial batches using their existing source IDs and preserve completed translations. Use natural, readable Gujarati, with appropriate transliteration of names and conventional technical acronyms. Translate Gujarati source narratives into equally complete English. Audit machine-like or awkward phrasing, mixed-language fragments and mistranslated names. Do not claim a native-speaker review unless one actually occurred.

Run `node scripts/merge-translations.mjs` after the outputs are valid JSON. Run `node scripts/audit-localization.mjs` to examine missing strings emitted by the JSX translation layer in both language modes. The output is `scripts/missing-rendered-translations.json`. Treat this as a rendered-page audit, not an exhaustive audit of imperative code or every UI interaction. Audit seasonal/filter/search branches and dynamic dialogs separately.

Inspect `src/runtime/experience.js`, `knowledge.js`, story/district players, and the 3D atlas: many fragments are assembled through `innerHTML` or `textContent`, outside JSX. Make their text respond to the same language state. Preserve event handlers, current story position and map interactions when changing language. Do not implement an unsafe global DOM replacement that breaks React, mutates URLs/IDs, or translates executable code. Feed any additional visible source strings into a separate stable translation batch.

Only after complete coverage and real page checks, remove the unfinished-translation notice and set `src/locale/status.js` appropriately. Do NOT hide the notice while silently leaving English paragraphs on Gujarati pages. Both languages should work offline after assets load, with no translation request on each click.

### 2. Resolve the two image complaints precisely

Do not replace or reframe the other 32 district photographs just to fix these two.

- Amreli: the current mapping in `src/data/district-photos.json` points to `/assets/districts/amreli.jpg`, a locally saved Shiyalbet image from the district administration website. The user still reports it missing. Reproduce the problem in the LIVE preview, separately on the 3D hover card, district directory and district detail page. Check the actual requested URL, HTTP response, file-name case, image decode, natural dimensions, CSS dimensions, visibility/opacity, flex shrink, container clipping and stale preview assets. A file existing on disk is not enough. Resolve the actual failure and verify it visually. If replacement is necessary, use an accurate, documented Amreli photograph and retain attribution. Do not use a port logo or an unrelated stock image.
- Narmada / Statue of Unity: ensure the statue's face is visible in the hover card and larger page views. Use a suitable top focal point or contain-fit where appropriate. Do not crop to only the feet. Check portrait-source photos inside wide frames at desktop and mobile widths.

The attempted alternate Amreli filename was not completed; do not assume `amreli-shiyalbet.jpg` exists or is active. Inspect the current mapping. Keep asset URLs root-relative for nested routes and static hosting.

### 3. Keep language controls in the page body, never overlapping navigation

There must not be a global duplicate strip immediately below/over the navigation. Keep one clearly positioned control in each reading page's body. On the homepage, keep the control within the content area, not over the header or hero navigation. Hidden preserved homepage DOM must not produce an additional visible control on inner routes.

The selected language must be unmistakable: a light selected button against a green control surface, clear contrasting text, accurate `aria-pressed`, visible keyboard focus and good touch targets. Keep the language labels English and ગુજરાતી readable in either mode. Make switching work in both directions and persist the chosen language across routes and refreshes. Test the actual article text, not only the selected button or `html.lang` attribute.

### 4. Complete personality information, tags and portraits

Retain at least five or six genuinely relevant people for every visible tag. Do not pad counts with duplicate profiles, misleading category assignments or unconnected people. The current catalogue has six members for each tag, but review the substantive relevance, particularly tags grouped together automatically.

For all profiles, add verified date/year of birth, birthplace, Gujarat connection, major work, chronology, institutions, contributions, historical context and legacy. Distinguish birthplace from where someone worked. Mark uncertain historic dates as approximate; do not invent a day/month where only a year is supported. Hide unknown metadata cleanly until verified rather than showing `Born ·` or a fabricated value.

Replace generic repeated context with meaningful person-specific depth. Retain accurate local portraits, source links and licensing/attribution information. Label traditional depictions as such rather than authentic photographs. Verify both card and detail-page images; initials are a fallback, not completion. The runtime now imports `src/data/portrait-manifest.json`; acquisition scripts may still write `public/assets/portraits/manifest.json`. Consolidate or synchronise these so future media updates cannot leave the UI using stale data.

Every personality tag shown as an actionable tag must link to the matching `/leadership?tag=...` filtered page, including tags on profile pages and related sections. Avoid nesting a tag link inside an already-linked whole card. Gujarati display labels must retain stable underlying English tag keys in URLs. Verify directory filters, related links, browser back/forward and name/tag search in both languages.

### 5. Finish content depth across all requested collections

Explore Deeper must provide substantive, analytical chapters—not a handful of sentences or duplicated paragraphs. Use history, geographical setting, institutions, processes, evidence, social/economic/environmental implications, conservation and present relevance where appropriate. The user asked for rigorous descriptive/analytical content but does NOT want the term “UPSC” displayed in the site.

Historical Atlas: retain the expanded entries, add necessary images with accurate captions, and ensure every card opens a dedicated detail route. Avoid representing a regional map as a photograph of a specific excavation, a nearby palace as a different monument, or modern commemorative imagery as contemporary historical evidence. Some rare sites/artifacts may need explicitly labelled contextual images. Do not fabricate an exact artifact provenance or image.

Development: provide substantial explanations of each scheme's public need, design, implementing bodies, intended beneficiaries, practical access process, required checks, limitations, evidence and current official source links. Distinguish national from Gujarat-specific programmes and historic phases from current rules. Recheck claims about benefits, amounts, eligibility, deadlines and implementation status against official sources; several supplied summaries may be outdated or overgeneralised. A policy target is not proof of a measured result. Include Gujarati and English for the full explanations, not only theme names.

Preserve the navigation requirements: remove “ગુજરાત ગૌરવ” from the navbar only; retain relevant body content. Development links to `/development`; Districts links to `/districts`. Keep the related favicon. All 34 directory entries must resolve to real district pages, including Vav-Tharad. Distinguish approximate map reference points from administrative boundaries.

### 6. Readability and responsive verification

Check every light surface has dark readable body text, and every dark/green surface has light readable text. Do not apply a broad white-text or dark-text override that fixes one page and breaks another. Check paragraphs, metadata, active/inactive pills, buttons, captions, overlays, menus, inputs and focus states in both languages. Gujarati line-height, wrapping and font coverage need special attention. Keep long headings and chapter navigation from overlapping images or backgrounds.

Test at approximately 360, 390, 768, 1280 and 1920 pixels. Verify no horizontal overflow, clipped buttons, trapped scrolling or overlapping sticky elements. Test mouse hover, keyboard focus, touch activation and reduced-motion settings. Use actual screenshots and loaded image dimensions. Do not report browser verification when only a build or filesystem audit ran.

### 7. Build, test, save and deliver honestly

Use `npm ci`, `npm run dev` and `npm run build` in a normal Node/npm installation. On the original Windows host, npm's launcher sometimes failed; direct alternatives are `node node_modules/vite/bin/vite.js --host 127.0.0.1`, `node scripts/collect-translations.mjs`, `node node_modules/vite/bin/vite.js build`, then `node scripts/prerender.mjs`. Never prerender repeatedly over an already-prerendered index without a fresh Vite build.

Run the existing tests plus media/content/localization audits. Refresh route inventories after content changes. Test direct navigation and refreshes on nested routes, not only in-app clicks. Review `scripts/check-explorers.mjs` for Windows file-URL portability if it fails. Fix genuine errors; do not modify preservation baselines or weaken assertions merely to make tests pass. Do not delete old user material as a shortcut.

After finishing, commit in the PROJECT repository only. Before any `git add`, confirm `git rev-parse --show-toplevel` is the project, not `C:/Users/yashc`. The initial parent user-folder repository contained unrelated files and must not be staged or committed. Do not invent author identity if Git needs configuration, and do not push remotely unless separately requested.

Create a new clearly named final ZIP only after the required checks succeed. Include source, local assets, lockfile, fresh production build, setup instructions, source/credit information and verification results. Exclude `node_modules`, credentials, cache folders and older ZIPs. Verify archive entries and extraction, and state exactly which requirements are complete or still blocked. Do not call this current checkpoint a final release.

## Optional improvements after the required work

1. Replace exact-string translation keys with stable content IDs and a typed bilingual content schema; add a coverage gate and glossary for names and technical terms.
2. Split routes/content into lazy-loaded bundles. The current main bundle is large; avoid sending every biography, district narrative and both languages before they are needed.
3. Generate responsive AVIF/WebP variants, keep explicit image sizes/aspect ratios, lazy-load below-the-fold media and preload only the primary visible image. Preserve original files and provenance.
4. Establish design tokens for dark/light surfaces, typography, contrast and language controls; reduce competing legacy CSS overrides.
5. Add a robust bilingual search index, consistent cross-links, breadcrumbs, related stories, reading-time indicators and optional bookmarks.
6. Make 3D enhancement optional and lazy; retain a complete accessible district directory when WebGL is unavailable or reduced motion is requested.
7. Add route-level error boundaries, helpful image fallbacks, automated link/media checks, an accessible mobile menu and keyboard tests.
8. Add dated source metadata, image credits/licensing, editorial review status and a maintainable update process for schemes and administrative changes.
9. Add title/meta descriptions, canonical URLs, a sitemap and appropriate structured data after the final content/hosting URL is known.
10. Consider offline caching only with explicit version/update behaviour; stale cached images and content must not conceal new fixes. Measure performance before adding libraries or animation.

These enhancements are suggestions, not a claim that they are already implemented. Prioritise full translations, the two reported image problems, functional controls, accurate content and reliable delivery before adding more features.
