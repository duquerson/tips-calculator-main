import "@fontsource/space-mono/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
