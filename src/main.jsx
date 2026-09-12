import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Production hydrates the prerendered page; development mounts into the empty shell.
const container=document.getElementById("root");
const initialPath=window.location.pathname.replace(/\/+$/, "") || "/";
if(container.hasChildNodes() && initialPath === '/') {
  hydrateRoot(container,<App initialPath="/" />);
} else {
  if(container.hasChildNodes()) container.innerHTML = '';
  createRoot(container).render(<App initialPath={initialPath} />);
}
