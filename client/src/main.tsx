import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initMetaPixel } from "./hooks/useMetaPixel";

// Initialize Meta Pixel before rendering
initMetaPixel();

createRoot(document.getElementById("root")!).render(<App />);
