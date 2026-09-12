import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Production hydrates the prerendered page; development mounts into the empty shell.
const container=document.getElementById("root");
if(container.hasChildNodes())hydrateRoot(container,<App initialPath={window.location.pathname.replace(/\/+$/, "") || "/"} />);
else createRoot(container).render(<App initialPath={window.location.pathname.replace(/\/+$/, "") || "/"} />);
