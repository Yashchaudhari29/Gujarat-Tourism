import { memo } from "react";

// Preserve the existing element structure and styling during migration.
export default memo(function DetailDialog() {
  return (<dialog id="detail" aria-labelledby="detail-title"><button className="close-dialog" aria-label="Close story">{"×"}</button><div id="detail-content"></div></dialog>);
});
