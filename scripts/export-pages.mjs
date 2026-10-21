// Turn dist/public into a GitHub Pages tree.
// Removes Manus-only artifacts, adds the Pages sidecar files, writes the sitemap
// from the real route list. Run after `pnpm build:static`.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("dist/public");
const site = "https://haniyamjad.com";

for (const junk of ["__manus__", "api", "manus-routes.json"]) {
  fs.rmSync(path.join(out, junk), { recursive: true, force: true });
}

fs.writeFileSync(path.join(out, "CNAME"), "haniyamjad.com\n");
fs.writeFileSync(path.join(out, ".nojekyll"), "");
fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

const pages = [];
const walk = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") {
      const rel = path.relative(out, path.dirname(full)).split(path.sep).join("/");
      pages.push(rel ? `/${rel}/` : "/");
    }
  }
};
walk(out);
pages.sort();
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map(p => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`
);

// canonical tag on every prerendered page, if the prerender did not add one
const htmlFiles = pages.map(p => path.join(out, p === "/" ? "index.html" : p.slice(1), p === "/" ? "" : "index.html"));
htmlFiles.push(path.join(out, "404.html"));
for (const file of htmlFiles) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  // Manus platform script, nothing serves it on Pages
  html = html.replace(/\s*<script src="\/api\/platform\/config\.js"><\/script>/g, "");
  const rel = path.relative(out, file).split(path.sep).join("/");
  const route = rel === "index.html" ? "/" : rel.endsWith("/index.html") ? "/" + rel.slice(0, -"index.html".length) : null;
  if (route && !html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${site}${route}" />\n</head>`);
  }
  fs.writeFileSync(file, html);
}

console.log(`Pages export ready: ${pages.length} pages -> ${pages.join(", ")}`);
