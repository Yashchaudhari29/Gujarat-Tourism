# Requirements Matrix: Five Explorers Add-on

| ID | Explorer / Category | Requirement | Implementation Plan | Verification | Status |
|---|---|---|---|---|---|
| E1 | Integration | Preserve existing work, add "Explore deeper" navigation without crowding navbar. | Add 'Deep Dive' nav link opening a submenu or hub. | Visual check, routing check. | Verified |
| E2 | Historical Atlas | Map through time with era buttons, layer toggles, avoiding backward projection of modern borders. | Create `HistoricalAtlas.jsx` with timeline controls and data layers. | Interact with timeline, check data. | Verified |
| E3 | Historical Atlas | Clickable sites opening glass panel with context/evidence. | Integrate `DetailDialog` or custom overlay for historical nodes. | Click test on nodes. | Verified |
| E4 | Connections | "Why here?" explorer showing geography, resources, networks. | Create `ConnectionsExplorer.jsx` with node/edge relationship UI. | Node click and edge verification. | Verified |
| E5 | Story Discovery | Object-centric stories (textiles, beads, inscriptions) with 2D/3D viewers. | Create `StoryDiscovery.jsx` with artifact cards and annotation view. | Visual check of artifact cards. | Verified |
| E6 | People (Documentary) | Substantial Gujarati scripts (6-10 mins) with chapters, overview, pronunciation notes. | Generate deep JSON profiles. Create `DocumentaryPeople.jsx` for reading view. | Word count and structure check. | Verified |
| E7 | Environment | Seasonal Gujarat explorer with season/location selector. | Create `EnvironmentExplorer.jsx` showing seasonal impacts. | Toggling seasons/locations. | Verified |
| E8 | Data Integrity | Sourced claims, distinct entity records, accurate attribution. | Subagents to provide source metadata in JSON outputs. | Data schema validation. | Verified |
| E9 | Delivery | Direct implementation, no ZIP unless requested, test report. | Commit to workspace, run `npm test`. | Test logs. | Verified |
