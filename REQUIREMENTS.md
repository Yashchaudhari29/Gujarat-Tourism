# Requirements Matrix: Gujarat Gaurav (Heritage, Leadership & Development)

| ID | Category | Requirement | Planned Implementation | Verification Method | Status |
|---|---|---|---|---|---|
| R1 | Preservation | Preserve existing website, layouts, 3D atlas, district stories, audio. | Add strictly additive components; do not modify existing data structures unnecessarily. | Visual inspection, test suite. | Implemented |
| R2 | Architecture | Add "Gujarat Gaurav: Heritage, Leadership & Development" section. | Create `GujaratGaurav.jsx` component and mount it. | Component renders on homepage. | Implemented |
| R3 | Navigation | Add 3 entry points: District Contributions, Leadership, Development. Add Main Navbar link. | Update `Header.jsx` navbar. Create 3 tabs/cards in the new section. | Click testing, routing checks. | Implemented |
| R4 | Content (Districts) | Deep coverage of 34 districts (identity, heritage, economy, connections). | Generate `gaurav-districts.js` with structured data for all 34. | Data validation script. | Implemented |
| R5 | Content (Leadership) | Narendra Modi timeline, authentic photo, documented initiatives. | Generate `gaurav-leadership.js`. Fetch official photo. | Content review, image load check. | Implemented |
| R6 | Content (Directory) | Gujarat & Union Council of Ministers directory with portfolios. | Generate `gaurav-ministers.js`. | Content review. | Implemented |
| R7 | Content (Schemes) | 14 themes of initiatives (Need, Policy, Implementation, Benefits, Sources). | Generate `gaurav-schemes.js`. | Content review, thematic filter check. | Implemented |
| R8 | UI/UX | Immersive scroll sequence, glass styling, restrained parallax, responsive. | CSS in `styles.css`, intersection observers for scroll reveals. | Visual inspection across breakpoints. | Implemented |
| R9 | Interactions | "Follow an initiative", "Understand the number", Sources drawer. | Create specific detail dialog templates in `experience.js`. | Click and modal testing. | Implemented |
| R10 | Accessibility | Keyboard navigation, reduced motion, text scaling. | Use semantic HTML, `prefers-reduced-motion` media queries. | Keyboard/Tab testing. | Implemented |
| R11 | Testing | Verify all routes, search, filters, empty states, and run npm tests. | Run `npm run build && npm test`. Manual QA flow. | Test output logs. | Implemented |
| R12 | Delivery | Direct implementation in project. No ZIP file generated. | Commit changes to workspace directly. | Workspace inspection. | Implemented |
