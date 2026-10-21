import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { metadata } from "./App";
import "./index.css";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const meta = metadata(path);
document.title = meta.title;
const description = document.querySelector('meta[name="description"]');
if (description) description.setAttribute("content", meta.description);
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App pathname={path} />);
else createRoot(root).render(<App pathname={path} />);
