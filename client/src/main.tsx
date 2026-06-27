import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Meta Pixel is initialized globally in index.html
createRoot(document.getElementById("root")!).render(<App />);
