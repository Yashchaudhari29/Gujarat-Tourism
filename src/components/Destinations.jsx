import { RegionCards } from "./ContentCards.jsx";
import { memo } from "react";

// Preserve the existing element structure and styling during migration.
export default memo(function Destinations() {
  return (<section className="destinations section-wrap" id="destinations"><div className="section-heading"><div><span className="eyebrow">{"ONE STATE. MANY WORLDS."}</span><h2>{"Where will curiosity take you?"}</h2></div><span className="section-counter">{"01 — 05 / REGIONS"}</span></div><div className="region-cards" id="region-cards"><RegionCards /></div></section>);
});
