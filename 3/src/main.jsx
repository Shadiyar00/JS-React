import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// No <StrictMode> on purpose: in dev it renders every component twice,
// which would make the console.log re-render investigation confusing.
createRoot(document.getElementById("root")).render(<App />);
