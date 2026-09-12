import { memo } from "react";

// Preserve the existing element structure and styling during migration.
export default memo(function Footer() {
  return (<footer><div><a className="brand" href="/#explore"><span className="brand-icon">{"✳"}</span><span>{"GUJARAT "}<em>{"UNVEILED"}</em></span></a><p>{"Made for the endlessly curious."}</p></div><div className="footer-links"><button id="about">{"About this exploration"}</button><button id="credits">{"Sources & credits"}</button><button id="feedback">{"Share a thought ↗"}</button></div><span className="footer-sign">{"કેમ છો, curious traveller?"}</span></footer>);
});
