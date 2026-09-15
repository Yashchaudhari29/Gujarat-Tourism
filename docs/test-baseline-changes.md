# Preservation checks: intentional reconciliation

The uploaded project already failed the old whole-stylesheet hash: its government/explorer additions predate this audit. Its atlas geometry test also used a deleted ` let dismissTimer;` marker and therefore hashed the wrong range.

The old `scripts/migration-baseline.json` is retained unchanged. Its content hash, every original public/built asset hash, atlas animation hash, 11-story / 44-chapter / 34-district counts and existing homepage checks remain enforced.

`scripts/preservation-baseline.json` records the uploaded source commit's exact 50,022-byte CSS prefix and the scene-construction range. Tests require those original bytes and scene construction to stay intact while allowing appended route styles and the explicitly requested camera/selection/lifecycle repairs. Missing geometry markers fail explicitly. These hashes were taken from the uploaded git baseline, not from the edited output.

The player test now imports the actual exported factory and enforces authored timestamps; it no longer expects duration-dependent rescaling. Route, page, explorer, atlas math and prerender integrity tests cover the added behavior. `npm run build` must precede `npm test` because preservation and prerender checks inspect production output.

The camera aspect expression is normalized only from `initialSize.aspect` to the original width/height ratio before comparing the protected scene hash. This permits the tested zero-size viewport repair while still enforcing camera FOV, pose, clipping, all lights and geometry. No other scene text is normalized.
