import fs from "node:fs";
import path from "node:path";
import { render, staticRoutes, metadata } from "../dist/render/prerender.js";

const base = path.resolve("dist/public");
const template = fs.readFileSync(path.join(base, "index.html"), "utf8");
const escape = value =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
for (const route of [...staticRoutes, "/404"]) {
  const meta = metadata(route);
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(route)}</div>`
  );
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escape(meta.title)}</title>`
  );
  html = html.replace(
    /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/?>)/g,
    `$1${escape(meta.description)}$2`
  );
  html = html.replace(
    /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/g,
    `$1${escape(meta.title)}$2`
  );
  if (!meta.known)
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex" /></head>'
    );
  const destination =
    route === "/404"
      ? path.join(base, "404.html")
      : path.join(base, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}
fs.writeFileSync(
  path.join(base, "manus-routes.json"),
  JSON.stringify(
    {
      routes: staticRoutes.map(route => ({
        path: route,
        title: metadata(route).title.split(" — ")[0],
      })),
    },
    null,
    2
  ) + "\n"
);
console.log(
  `Prerendered ${staticRoutes.length} public pages and a 404 document.`
);
