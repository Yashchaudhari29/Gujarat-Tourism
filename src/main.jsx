import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './readability.css';

const container = document.getElementById('root');
// Hydrate exactly the route that generated this HTML, even when a host serves
// index.html as its SPA fallback for another URL. App then reads the live URL.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App initialPath={container.dataset.prerenderPath || '/'}/>);
} else {
  createRoot(container).render(<App initialPath={window.location.pathname} initialSearch={window.location.search}/>);
}
