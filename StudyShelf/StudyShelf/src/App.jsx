import { useEffect, useState } from "react";
import Catalog from "./components/Catalog.jsx";
import ResourceDetail from "./components/ResourceDetail.jsx";
import ResourceForm from "./components/ResourceForm.jsx";
import StatusPanel from "./components/StatusPanel.jsx";
function Header({ route }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark">▥</span>StudyShelf
        <span className="brand-dot">.</span>
      </a>
      <nav aria-label="Main navigation">
        <a className={route === "/" ? "active" : ""} href="#/">
          The collection
        </a>
        <a className={route === "/add" ? "active" : ""} href="#/add">
          Add resource <span>＋</span>
        </a>
      </nav>
      <span className="header-note">STAY CURIOUS ↗</span>
    </header>
  );
}
export default function App() {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "/",
  );
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const match = route.match(/^\/resource\/([^/]+)$/);
  return (
    <div className="shell">
      <Header route={route} />
      <main>
        {route === "/" ? (
          <Catalog />
        ) : route === "/add" ? (
          <ResourceForm />
        ) : match ? (
          <ResourceDetail key={match[1]} id={match[1]} />
        ) : (
          <StatusPanel
            title="Page not found"
            message="Return to the collection using the navigation above."
          />
        )}
      </main>
      <footer>
        <a className="brand" href="#/">
          StudyShelf.
        </a>
        <p>One resource. One new possibility.</p>
        <span>A PERSONAL LEARNING CATALOG · 2026</span>
      </footer>
    </div>
  );
}
