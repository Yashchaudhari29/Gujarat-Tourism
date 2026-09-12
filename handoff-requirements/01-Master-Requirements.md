You are continuing an existing website called Gujarat Unveiled. Work as a senior React/Three.js engineer, Gujarati documentary editor, historical researcher, information architect and accessibility tester. Implement the work in the attached project. Deliver actual code, complete content, research records, test evidence. Planning alone is not completion.

1. The outcome\
   Create a coherent interactive atlas in which a visitor can select any Gujarat district, understand its identity quickly, explore substantial source-backed information, and watch available Gujarati narrated visual stories. Connect geography, history, living heritage, livelihoods, public institutions and modern development. Add a visually integrated Leadership, Governance & Development section covering Narendra Modi's journey, documented contributions and government initiatives, alongside other relevant ministers and institutions.\
   The visitor-facing experience must feel accessible and engaging while offering serious educational depth. Never display examination names, syllabus labels or coaching language. Avoid shallow summaries, repeated filler and exaggerated claims.\
   No software or research process guarantees zero errors. Reduce risk through small verified changes, traceable evidence, explicit uncertainty and honest acceptance reports. Do not write “perfect”, “fully verified” or “100% accurate” without defining and demonstrating the tested scope.
2. Inspect and protect the checkpoint\
   Extract the ZIP. Read CHECKPOINT-README.md first; it supersedes older migration descriptions in README.md. Inventory the actual files before proposing changes. Respect applicable repository instructions and environment permissions.\
   Known architecture, subject to inspection:\
   React + Vite, local assets, an existing Three.js atlas and native audio controllers.\
   src/components/: current page sections.\
   src/data/content.js: existing 34-district directory and 11 stories / 44 chapters.\
   src/data/districts.js: slugs and related-story mapping.\
   src/data/knowledge.js and src/runtime/knowledge.js: detailed-reading additions.\
   src/runtime/experience.js: dialogs and interactions.\
   src/runtime/atlas.js: map controls and selection.\
   src/runtime/story-player.js: legacy narration.\
   src/runtime/district-player.js: new supplied-recording playback.\
   scripts/district-media.mjs: folder/configuration validation.\
   src/data/district-recordings.json: generated catalog.\
   public/district-media/: 34 recording folders.\
   public/assets/: existing pictures, font, Three.js, geography and narration.\
   src/styles.css: established design plus recent feature additions.\
   Known checkpoint limitations:\
   The production build passed at export; this is not interaction-test evidence.\
   npm test failed because the isolated legacy-player test does not provide the new renderKnowledge dependency.\
   Migration assertions need careful reconciliation with authorized feature changes.\
   Map and supplied-audio changes need targeted verification.\
   New district recording configurations are unpublished; script files are placeholders.\
   Expanded long narratives for all 34 districts are not yet complete.\
   No new user recording has been supplied.\
   The checkpoint was not deployed over the live site.\
   Create a backup or source-control checkpoint before editing. Do not delete unfinished additions merely because they require repair. Do not overwrite a remote site without existing authorization and usable deployment access.
3. Non-negotiable visual and feature preservation\
   Preserve the current layout, typography, colors, liquid-glass styling, photographs, section order, existing stories and interactions. Preserve the exact phrases LISTEN TO THE LAND and A place is only half the story. Preserve existing media attribution and licenses.\
   Add content through the established cards, dialogs and design patterns. The new leadership section is an addition, not a new homepage theme. Do not replace the atlas with a generic map or redesign the site into a government portal. Keep React + Vite unless an evidenced blocker demands otherwise. Do not introduce unnecessary framework changes or mass dependency upgrades.\
   Before modifying components, capture an inventory of sections and available baseline screenshots if permitted. Compare later changes against this baseline. Keep intentional additions distinct from accidental visual regressions.
4. District coverage and geographic correctness\
   Cover the 34 districts in the supplied directory: Kutch, Ahmedabad, Amreli, Anand, Aravalli, Banaskantha, Bharuch, Bhavnagar, Botad, Chhota Udepur, Dahod, Dang, Devbhumi Dwarka, Gandhinagar, Gir Somnath, Jamnagar, Junagadh, Kheda, Mehsana, Mahisagar, Morbi, Narmada, Navsari, Panchmahal, Patan, Porbandar, Rajkot, Surat, Surendranagar, Tapi, Vadodara, Valsad, Vav-Tharad and Sabarkantha.\
   Verify the official district list again when implementing. Preserve stable IDs and slugs; handle alternate English spellings through aliases rather than duplicate records. Verify each landmark's present district. Historical districts, cultural regions, municipalities, constituencies and modern administrative districts are not interchangeable.\
   The official Vav-Tharad district page states that it was carved from Banaskantha on 2 October 2025. Account for this split in landmarks, talukas, areas and statistics. Do not copy historical Banaskantha totals into both districts. Store the geography and reference year for every statistic; mark unavailable new-boundary data as unavailable rather than inventing a breakdown.\
   Create a coverage matrix for all districts. Track text, research, landmarks, media rights, scene planning, narration and testing independently. One completed district is a template, not completion of all 34.
5. District information architecture\
   Give every district a clear “Explore this district” experience. Use an overview followed by discoverable topic navigation; do not cram dozens of tabs onto a mobile screen. Keep selected topic, scroll position and navigation predictable. Where practical, support shareable URLs identifying a district and topic, with working browser back/forward behavior.\
   Research the following parameters for each district. Group them into about 8–12 readable sections and render only relevant, supported content. Missing evidence belongs in the editorial register, not in invented visitor-facing prose.\
   A. Identity and orientation\
   Gujarati and English names, pronunciation notes for editors, administrative headquarters and formation history.\
   Location within Gujarat, neighboring districts, broad coordinates, cultural region and connections.\
   Five specific reasons the district matters, with a brief explanation for each.\
   A 60–90 second reading overview and a small verified “at a glance” panel.\
   Explain what makes it different from adjacent districts without ranking communities.\
   B. Physical geography and environment\
   Terrain, geology, soils, rivers, watersheds, coastline, wetlands, forests and seasonal patterns.\
   Water availability, irrigation, groundwater and salinity where relevant.\
   Earthquake, flood, cyclone, drought, erosion or heat exposure, using official evidence.\
   Explain causal connections: how landscape shapes settlement, crops, architecture and livelihoods.\
   Use river and terrain overlays only where sourced geography is available.\
   C. Historical sequence\
   Archaeology and early settlement; ancient trade routes and material evidence.\
   Relevant dynasties, regional states, Sultanate/Mughal/Maratha/colonial periods and princely-state histories.\
   Independence movement, social reform, state formation and district reorganization.\
   A clickable timeline separating event dates from later traditions and interpretations.\
   Explain continuity and change, not just lists of rulers and dates.\
   D. Heritage and architecture\
   Archaeological sites, temples, mosques, Jain sites, stepwells, forts, palaces, civic buildings, museums, libraries and historic neighborhoods.\
   Draw a comprehensive inventory from official protected-monument lists and district records. Add documented living and locally significant heritage beyond the protected list.\
   For each item: identity, location, period, patron or builder when known, architectural features, function, historical context, significance, protection designation, conservation issues, media and citations.\
   Distinguish UNESCO inscription from tentative-list entry, national/state protection, and tourism promotion.\
   Explain features visitors can actually observe in a photograph: plan, materials, arches, carvings, water systems and spatial organization.\
   Do not promise literally every heritage object has been documented. Publish the inventory scope, sources and remaining gaps.\
   E. Living culture\
   Crafts, materials, production stages, tools, motifs, community knowledge and contemporary livelihoods.\
   GI registration only when verified; distinguish the registered product's geographic scope from one workshop's location.\
   Language varieties, oral literature, performing arts, music, festivals, fairs, food and ritual traditions.\
   Document differences between communities respectfully. Do not treat a district as culturally uniform.\
   Attribute oral traditions. Never present sacred beliefs as archaeological proof or fabricate artisan testimony.\
   F. Livelihoods and economic contribution\
   Major crops and cropping conditions, dairying, fisheries, pastoralism, handicrafts and local markets.\
   Industrial clusters, MSMEs, ports, logistics, tourism, mining and services where relevant.\
   Explain the district's contribution to Gujarat and India through concrete supply chains and institutional roles.\
   For percentages, identify year, numerator, denominator and whether the figure measures output, employment, capacity, exports or value.\
   Avoid unsupported “largest”, “only”, “world capital” and national market-share claims.\
   Include workers, cooperatives, small producers and environmental costs, not only prominent corporations.\
   G. People, institutions and knowledge\
   Historical leaders, reformers, writers, scientists, artists, educators and civic contributors with a verified district connection.\
   Schools, universities, research institutes, museums, cooperatives and public-health institutions.\
   Explain each institution's actual contribution and distinguish founder, sponsor, alumnus and later supporter.\
   Include women's contributions and less-publicized local contributors when evidence supports them.\
   H. Society and public services\
   Settlement patterns, education, literacy, health, nutrition, access to water, livelihoods and inclusion using appropriate official datasets.\
   Distinguish survey estimates from administrative counts; identify data limitations.\
   Explain panchayat, municipality, district administration and state/Union responsibilities without conflating them.\
   Do not use outdated census data as if it describes the current year.\
   I. Ecology, wildlife and conservation\
   Habitats, characteristic species, migration, protected areas and conservation work.\
   Interactive habitat or food-web explanations, using sourced relationships.\
   Human–wildlife coexistence, livelihoods and conservation challenges where relevant.\
   Do not publish sensitive nesting locations, rare-species coordinates or restricted border details.\
   J. Development and resilience\
   Transport, energy, water, digital infrastructure, housing, education and healthcare projects.\
   For each: responsible agency, location, objective, milestones, status date, sanctioned budget versus expenditure, and intended versus demonstrated outcomes.\
   Explain disaster recovery and resilience through institutions, communities, engineering and policy.\
   Separate proposed, approved, funded, under construction, partially operational and completed stages.\
   Keep “Vision 2047” and other commitments visibly identified as visions, not achieved results.\
   K. Historical and geographic connections\
   Cross-link trade, migration, architectural styles, shared watersheds, crafts and institutions across districts.\
   Offer optional “Follow the water”, “Ancient trade”, “Craft journeys” and “Freedom movement” trails only where the underlying links are documented.\
   Explain why each district relationship exists; never add arbitrary connections to fill a graph.\
   L. Learning and reflection\
   Gujarati glossary, chronology, “why this matters” explanations and source-backed frequently asked questions.\
   Optional comparison of two or three districts with like-for-like dated metrics.\
   Reflection prompts about history, ecology and governance without test-preparation branding.\
   A references drawer and a correction-report pathway. If no backend exists, provide an honest copy/download correction form rather than a fake successful submission.
6. Depth, Gujarati writing and editorial workflow\
   Use the four supplied district scripts as a depth and tone reference, not as verified facts. Preserve originals separately and maintain a correction log. If not attached, identify this input gap; do not invent having read them.\
   For each district, produce:\
   A short orientation summary.\
   A distinct, substantial Gujarati master narration intended for roughly 10–15 minutes.\
   Structured detailed-reading sections that can extend beyond the narrated version.\
   Independent deep dives for important landmarks and subjects.\
   Chapter-level sources, a glossary and a visual scene plan.\
   Use a declared estimated speaking rate only for planning. For example, a planning band of 110–130 spoken words per minute implies roughly 1,100–1,950 words across 10–15 minutes; Gujarati tokenization and delivery vary. Count actual words, check narrative quality and obtain the final duration from the user's recording. Do not pad to reach a number or claim an exact runtime before audio exists.\
   Write natural Gujarati with clear explanations, varied sentence lengths and transitions suitable for narration. Explain technical concepts in Gujarati before optional English terminology. Mark pronunciation questions and suggested pauses in a separate narrator document, not as text that will accidentally be spoken.\
   Each important subject should answer: What is it? Where is it? When did it develop? How does it work? Why does it matter? What evidence supports this? How does it connect to the district today?\
   Do not invent dialogues, eyewitness accounts, quotations, statistics or imagined scenes presented as recordings of real events. A clearly identified interpretive illustration may convey atmosphere but cannot establish historical facts.
7. Research and current data\
   Browse and read supporting material. Search-result snippets are discovery aids, not sufficient verification. Prefer ASI, UNESCO, state archaeology, district records, Gujarat Tourism, museum collections, institutional archives and scholarly literature for heritage. Use Census, MoSPI, state statistics, NFHS/IIPS, RBI, budgets, ministry reports, parliamentary answers and relevant project authorities for public data. Use CAG and credible independent evaluations to assess results where available.\
   For schemes, read the actual guidelines and recent implementation reports, not only launch speeches. Use official statements as evidence of what the government announced or reported; independent outcome claims need appropriate evidence.\
   For every substantive claim or statistic, store:\
   Stable claim ID and the exact claim supported.\
   Publisher, title and direct URL.\
   Publication/update date, access date and data reference period separately.\
   Relevant page/table/section for reports.\
   Geographic scope, units, method and caveats where applicable.\
   Evidence type: historical record, interpretation, official reported output, evaluation, forecast or tradition.\
   Review status and unresolved conflicts.\
   “Latest available” does not mean “measured today”. A webpage footer updated this month does not make every embedded number current. Verify personnel and portfolios at implementation time; never reuse a previous cabinet list unquestioningly.\
   Resolve conflicting records rather than silently choosing the more exciting claim. Material examples from the reference scripts include Ladakh's status, Dholavira superlatives, Lothal dock interpretations, foundation dates, Banni area rankings, industrial shares, company locations, wildlife counts, project capacities and Olympic hosting claims.\
   Use small quotations only when necessary, within copyright limits; write original synthesis. Never invent book editions or page numbers. Save only source material permitted by its license; do not bundle copyrighted books or full articles into the project.
8. Leadership, Governance & Development — new interactive section\
   Add this section using the existing visual language. Provide a prominent, authentic photograph of Narendra Modi, an accessible timeline and thematic exploration of his public career, documented initiatives and contributions to Gujarat and India.\
   Use an authentic, appropriately licensed or permission-cleared portrait with attribution, alternative text and source metadata. Government-hosted does not automatically mean unrestricted reuse. Do not fabricate a photograph of a real event, impersonate his voice or animate a photorealistic face to say words he did not speak. Create depth using a layered photo card, subtle parallax and accessible controls; a simulated living avatar is unnecessary.\
   Narendra Modi journey\
   Research his Vadnagar connection and documented early public/political career.\
   Present Gujarat Chief Minister and Prime Minister periods with exact, sourced dates.\
   The PMO profile records Gujarat CM service from October 2001 to May 2014, earlier PM terms in 2014–2019 and 2019–2024, and the third swearing-in on 9 June 2024. Recheck the current endpoint when implementing.\
   Place events in proper chronology: the January 2001 earthquake preceded his appointment as CM. Distinguish initial emergency response from reconstruction work undertaken later under his administration.\
   Explain documented achievements, policy choices, institutional responsibilities and reported results in clear Gujarati.\
   Recognize the work of previous governments, state and local bodies, civil servants, scientists, workers, civil society and private/cooperative actors where relevant. A project completed during one tenure may have begun under another.\
   Distinguish leading, proposing, approving, funding, implementing and inaugurating a project. An inauguration photograph alone does not prove authorship or effectiveness.\
   Themes to investigate, not assertions of success\
   Gujarat electricity, water, investment, industrial and disaster-recovery initiatives during the CM period, with origins and documented effects.\
   National financial inclusion, sanitation, housing, health, drinking water, cooking energy, agriculture, digital infrastructure, manufacturing, transport, renewable energy and disaster resilience.\
   Relevant examples for investigation include Jan Dhan, Swachh Bharat, PMAY, Ayushman Bharat, Jal Jeevan Mission, Ujjwala, PM-KISAN, Digital India, Make in India, PM Gati Shakti and applicable state initiatives.\
   Assess origins and institutional roles in systems such as Aadhaar and UPI rather than attributing all development to a single person.\
   International cooperation and climate initiatives with documented Gujarat or national relevance.\
   For each theme, show the problem, intervention, timeline, implementing institutions, evidence of progress, limitations and district connections. Do not turn speeches or targets into measured achievements. Do not force unrelated schemes into each district.\
   Present achievements clearly and respectfully while including material implementation gaps or contested interpretations supported by evidence. This is an educational civic record, not electoral persuasion, party advertising or a personality ranking. Do not manufacture balance with unsupported accusations; do not suppress relevant documented limitations either.\
   Other ministers and public institutions\
   Create a searchable directory of the current Gujarat Council of Ministers and current Union Council of Ministers based on verified official records; clearly date the roster.\
   Provide deeper profiles for ministers whose portfolios and documented work connect to the site's district subjects. Link responsibilities to agencies, schemes and projects.\
   Store tenure periods and historical portfolios so an initiative is attributed to the officeholder at the relevant time, not automatically to the current minister.\
   For each profile: name in Gujarati/English, authentic portrait if cleared, role, jurisdiction, responsibilities, tenure, verified initiatives, related districts, reported outputs, evaluations and sources.\
   Explain the difference between an MP, MLA, minister, chief minister, prime minister and district administrator where useful.\
   Link a person to a district using an explicit relationship: birthplace, constituency, project responsibility or historical association. These relationships are not interchangeable.\
   Where current roster or image rights cannot be verified, identify the precise gap rather than inventing data or using a misleading substitute portrait.\
   Scheme/project record\
   Each scheme or project needs: stable ID; Gujarati/English name; administering department; legal/guideline source; launch and amendment dates; objective; intended beneficiaries; funding structure; implementation agency; applicable geography; relevant leadership tenure; status; dated outputs; measured outcomes if available; evaluation limitations; sources; and verified district links.\
   Keep sanctioned funds separate from released funds and actual expenditure. Keep registrations separate from active service use. Keep national numbers separate from Gujarat and district numbers. Do not infer causation merely from improvement during a leader's term.\
   Interactive behavior\
   A readable timeline with optional restrained depth/rotation and an equivalent keyboard-operable list.\
   Select a period or policy theme to open a glass information panel.\
   Optional linked view: leader → portfolio → initiative → district → documented result. Use only verified relationships.\
   “Gujarat” and “India” scope filters; date filters must not mix incompatible time periods.\
   Clear distinctions among milestone, government-reported result, independently evaluated finding and future commitment.\
   No autoplay speeches or audio. Preserve captions and reduced-motion behavior.\
   Lazy-load this section's heavier media; it must not slow the initial atlas.
9. Media and supplied narration\
   The user supplies new Gujarati audio. Do not synthesize district narration or substitute a device voice. Preserve the existing legacy narration and attribution independently.\
   Use the existing folder convention, for example:\
   public/district-media/kutch/\
   audio.mp3\
   script.txt\
   story.json\
   scene-plan.json\
   images/\
   Use the existing district slugs. Do not overwrite a supplied recording or edited script during a build. Generated catalogs must derive from source files; manually edited content must remain durable.\
   Before audio is supplied, finish written stories, citations, image research and untimed scene plans. Store unknown timings as null in the planning format, not fabricated seconds in a playable manifest. Keep published false and show a useful reading experience instead of a broken Play button.\
   When audio is available, align the actual recording to chapter/scene boundaries. Use the audio currentTime as the sole playback clock. Provide full-story and topic-range playback, seek, pause/resume, speed, volume, mute, captions, previous/next chapter, fullscreen and a readable transcript.\
   One user Play click must start available narration directly; no separate music-enablement step. Handle browser restrictions, unsupported formats, metadata delay, interrupted requests and retry states honestly. Never claim to control operating-system mute or disconnected speakers.\
   Changing scenes must not restart or interrupt the recording. Closing or switching stories must stop and release the prior media. Test last-scene behavior, replay at the end, topic boundaries, invalid manifest duration and rapid repeated clicks.\
   Choose visual assets that actually depict the subject. Reusing a Kutch image as a different district's landmark is unacceptable. Store creator, source, license, attribution, location, caption, alt text and any illustrative/reconstruction label for every asset. Do not assume an image search grants reuse rights. Reuse existing assets without removal. Source new images progressively and disclose any blocked rights clearance.\
   Describe the result as synchronized animated visual storytelling. Do not claim an exported MP4 exists unless actual video rendering/export is implemented and tested.
10. Map and navigation acceptance behavior\
    Finish horizontal orbit, vertical orbit and Z-axis roll. Make north restore a stable north-up view even after several rotations, without unnecessary multiple spins. Reset restores the intended default camera state.\
    Click selects and pins a district. Pointer exit does not dismiss the pinned popup. Hover over another marker does not unexpectedly replace it. Selecting a new district, explicit close and Escape behave predictably. Popup controls must not initiate map dragging. Keyboard navigation and touch must work.\
    Preserve the current visual atlas. If exact district polygons are added, use authoritative or clearly attributed licensed boundaries with dates, validate their district mapping and provide a geographic limitation note. Do not relabel a stylized shape or marker cloud as a surveyed boundary map. Current administrative geometry must not silently inherit pre-split Banaskantha boundaries.\
    Provide accessible search as an equivalent route to every district. On weak devices or unavailable WebGL, show a functional lightweight map/directory with the same content access.
11. Data architecture and maintainability\
    Implement structured records rather than concatenating large amounts of unvalidated HTML. Adapt the existing architecture incrementally. Separate districts, heritage items, narrative chapters, people, tenure records, schemes, projects, media and sources using stable IDs and validated relationships.\
    Use reusable Gujarati-reading components and common rendering for repeated patterns. Keep content outside UI component logic. Store a schema version. Validate required fields, references, language text, HTTPS source URLs, media filenames and supported file types.\
    Treat imported script/configuration text as untrusted input. Escape text; sanitize any supported rich text; prevent path traversal and unsafe URL schemes. Do not add public upload endpoints without authentication, validation, quotas and a clear need. The user's requested folder workflow does not require an anonymous upload service.\
    Separate statuses: drafted, evidence-reviewed, narrator-reviewed, media-ready and published. Do not mark content as human reviewed automatically. Add a local content validation command and a coverage report. Add a manual recheck command or documented procedure for changing rosters and project data. Do not claim scheduled updates unless an actual scheduled mechanism exists.\
    Create a relation validator so schemes, ministers, topics and places cannot link to missing districts. Comparison widgets must use compatible definitions, years and geography. Do not rank leaders by invented success scores.
12. Performance, accessibility and testing\
    Keep the atlas stable across unrelated React updates. Dispose of GPU resources, observers, event listeners and audio controllers. Use lazy loading, responsive images, appropriate compression and limited media preloading. Do not fetch all 34 full recordings at startup. Respect prefers-reduced-motion and the existing user toggle across all added animation.\
    Test keyboard focus, dialog containment/restoration, Escape, labels, captions, screen-reader reading order, contrast, 200% zoom and Gujarati line wrapping. Hover cannot be the only way to discover information. Make touch targets usable and avoid horizontal overflow.\
    Run npm ci, npm run build and npm test. Fix the missing renderKnowledge fixture dependency properly. Retain meaningful legacy content/asset preservation tests. Amend assertions only for specifically authorized changes; never remove failing tests to manufacture success.\
    Add targeted automated tests for configuration validation, unknown district IDs, dangerous paths, missing files, timing gaps/overlaps, out-of-range topics, media shorter than the plan, direct playback, seek synchronization, pause/resume, rapid clicks, end/replay behavior, cleanup and missing-audio states. Use test fixtures clearly separated from published narration.\
    If the environment permits browser automation, test the production build with desktop and mobile viewports. Inspect console and failed network requests. Test Chrome/Edge, Firefox and Safari where actually available; emulation is not evidence of a real-device test. Record exact environments. When a browser or device is unavailable, mark that check blocked and provide manual reproduction steps.\
    Verify all district routes and topic relationships through data tests; exercise representative complex journeys end-to-end, then explicitly check exceptional cases. Review visual changes against the baseline. Assess initial load and repeated story/map usage for unnecessary requests, duplicate loops and growing resource use. Report measured performance and test conditions rather than unsupported scores.\
    Do not guarantee Gujarati accent correctness through software tests. Supply a narrator-review checklist and pronunciation glossary for human review.
13. Execution sequence and progress protection\
    Audit source, preserve baseline, reproduce build/test failures and create a scope checklist.\
    Repair the known regressions and define compatible content schemas.\
    Verify the 34-district inventory and establish the source/coverage registers.\
    Complete one full district text/research/scene-plan/reading flow and verify integration. This is an internal milestone, not the final deliverable.\
    Research and complete remaining districts in manageable batches. Update the coverage report after each batch.\
    Implement and populate the leadership/governance section with verified dated records.\
    Integrate eligible media; finish recording manifests only when real recordings exist.\
    Complete regression, accessibility, content and permitted browser checks.\
    Produce the final source ZIP, research/content exports and evidence report.\
    Proceed with authorized reversible work. Do not ask repeated permission for routine implementation decisions. Missing audio does not block the written content, source research, UI, scene plans or player tests. If a critical input is unavailable, finish independent work and report the exact blocked step.\
    Maintain PROGRESS.md and CONTINUATION.md with completed tasks, file paths, commands/results, data gaps and the next concrete step. Save a downloadable checkpoint at meaningful milestones or before context exhaustion. Never silently drop requirements when context becomes limited.
14. Deliverables and completion gate\
    Deliver a complete editable project ZIP excluding node\_modules, Git credentials, private tokens and unnecessary caches. Include package-lock.json, source, public assets with licenses, scripts and reproducible run/build instructions.\
    Also include:\
    All 34 Gujarati master scripts and detailed district records.\
    Heritage inventory and district coverage matrix.\
    Chapter-level source registry and editorial correction log.\
    Per-district visual plans and documented recording templates.\
    Leadership profiles, dated office/portfolio records and scheme/project relationships.\
    Narrator pronunciation/review sheets with unreviewed status where appropriate.\
    Media attribution register.\
    Test report: test, environment, expected result, actual result, pass/fail/blocked, evidence.\
    Concise instructions for placing audio, completing timings, validating and rebuilding.\
    Exact remaining gaps, clearly separating unavailable user recordings from unfinished implementation.\
    Do not describe all districts as complete when scripts remain empty, repeated or skeletal. Do not describe narration as ready when no recording exists. Do not describe current information as verified if the supporting source is stale or was never opened. The live site must only be updated when deployment is authorized; a successful local build is not a deployment.
15. Research starting points\
    The following URLs were opened while preparing this handoff. They are starting points, not a substitute for checking each claim and the current implementation date:\
    Gujarat government district directory: [https://igod.gov.in/sg/GJ/E042/organizations](https://igod.gov.in/sg/GJ/E042/organizations)\
    Vav-Tharad formation and headquarters: [https://vavtharad.nic.in/about-district/](https://vavtharad.nic.in/about-district/)\
    PMO biography and tenure chronology: [https://www.pmindia.gov.in/en/pms-profile/](https://www.pmindia.gov.in/en/pms-profile/)\
    PMO Union portfolios page, labeled “As on 25.07.2026” when consulted: [https://www.pmindia.gov.in/en/news\_updates/portfolios-of-the-union-council-of-ministers-2/](https://www.pmindia.gov.in/en/news_updates/portfolios-of-the-union-council-of-ministers-2/)\
    UNESCO Dholavira: [https://whc.unesco.org/en/list/1645/](https://whc.unesco.org/en/list/1645/)\
    UNESCO Historic City of Ahmadabad: [https://whc.unesco.org/en/list/1551/](https://whc.unesco.org/en/list/1551/)\
    UNESCO Rani-ki-Vav: [https://whc.unesco.org/en/list/922/](https://whc.unesco.org/en/list/922/)\
    UNESCO tentative-list Lothal entry: [https://whc.unesco.org/en/tentativelists/5918/](https://whc.unesco.org/en/tentativelists/5918/)\
    Discover and verify the current Gujarat ministerial directory and each relevant department's records. A PMO biography can support chronology and attributed government claims; it is not an independent evaluation of every policy outcome. Check newer notifications before treating any dated roster as current.\
    Begin by inspecting the attached project and making the first concrete improvements. Continue through the completion gate without replacing implementation with a proposal.
