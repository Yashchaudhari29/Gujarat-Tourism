import { StoryCards } from "./ContentCards.jsx";
import { memo } from "react";

// Preserve the existing element structure and styling during migration.
export default memo(function Stories() {
  return (<section className="stories-section section-wrap" id="stories"><div className="section-heading"><div><span className="eyebrow">{"LISTEN TO THE LAND"}</span><h2>{"A place is only half the story."}</h2></div><p>{"The other half belongs to its people."}</p></div><div className="story-grid"><StoryCards /></div><p className="fiction-note">{"Original educational scripts based on the linked sources. Press Play to hear the included Gujarati AI narration. These are animated photo stories, not filmed documentaries."}</p></section>);
});
