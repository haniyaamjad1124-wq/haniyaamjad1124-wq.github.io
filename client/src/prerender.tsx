import React from "react";
import { renderToString } from "react-dom/server";
import App, { staticRoutes, metadata } from "./App";
export { staticRoutes, metadata };
export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}
