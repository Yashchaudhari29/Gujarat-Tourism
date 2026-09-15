# Saved checkpoint — 15 September 2026

Start with **CONTINUE-HERE.md**. It contains the detailed continuation prompt, outstanding work, limitations, commands and optional improvement suggestions.

This is NOT the final completed website. Full-text bilingual coverage is incomplete. The user-reported Amreli issue and final image framing still require live visual verification. The incomplete-translation notice remains intentionally visible until coverage is genuinely complete.

## Included

- Source code and package lockfile.
- Local photographs, other existing assets and data.
- Saved partial translation shards, their immutable source IDs, and merged runtime dictionaries.
- A fresh `dist/` production build.
- Verification output in `scripts/checkpoint-verification.json`.
- Historical project requirements and notes. Their earlier completion claims are superseded by `CONTINUE-HERE.md`.

## Checks run for this archive

All completed successfully: content inventory generation, content/media audit, Vite production compilation, prerendering, prerender/asset checks, route checks, and page-render checks.

This does not mean the full npm test suite, all responsive/browser interactions, all factual claims or complete translation coverage were verified. See the detailed prompt for remaining acceptance checks.

## Run

Use a current compatible Node.js installation and run `npm ci`, then `npm run dev`. For a production build run `npm run build`; use `npm run preview` to preview that build. The dependency folder is intentionally excluded from the ZIP.

Translation resumption does not require a translation service. Complete the saved batch output JSON files, then run `node scripts/merge-translations.mjs`. Do not regenerate the frozen shard source index over unfinished translations.

The ZIP excludes Git internals, dependency/cache folders, credentials and older ZIPs. Git history is saved separately in the local project repository.
