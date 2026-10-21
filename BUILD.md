# Build and deployment reference

## Source snapshot and layout

This archive captures the project working tree as it stood on 21 October 2026, including the uncommitted source changes already present at export time. No application source, design, animation, or content was changed for this export. The root `index.html` is a copy of canonical `client/index.html`; the root `public/` is a convenience mirror containing the requested static assets and GitHub Pages sidecar files. Vite uses **`client/` as its root** and **`client/public/` as its public directory**. The canonical files are the copies under `client/`.

The archive includes the project source (`client/`, `server/`, `shared/`, `drizzle/`, scripts, content, configuration and lockfile) and excludes `.git/`, `node_modules/`, `dist/`, Manus logs, and internal planning/reference notes. The two deployment-history files are archived records, not active deployment scripts.

## Toolchain and commands

- Node.js used: **v22.13.0**.
- pnpm used: **10.18.0**, pinned in `package.json` as `pnpm@10.18.0`.
- Install: `pnpm install --frozen-lockfile`
- Development: `PORT=3000 pnpm dev:static` (default port **3000**, host `0.0.0.0`, strict port binding). `PORT` is optional; if omitted, the script uses 3000.
- Static build: `pnpm build:static`
- Main static output folder: **`dist/public/`**. The command also creates `dist/render/` as an intermediate prerender bundle. Publish the rendered pages and assets in `dist/public/`, not `dist/render/`.

`build:static` runs `scripts/content.mjs`, `vite build`, an SSR build for prerendering, then `scripts/prerender.mjs`. It produces `/`, `/work`, `/reminiscence`, `/about`, `404.html`, hashed JS/CSS, and static assets. The content script also refreshes the generated empty blog-post data and route manifest.

## Environment variables

No environment variable is required to install or run the static production build. `PORT` only changes the development server port (default 3000). The Vite platform-config plugin can emit these optional, browser-public values if supplied: `MANUS_PROJECT_ID`, `MANUS_OAUTH_PORTAL_URL`, `MANUS_API_URL`, and `MANUS_API_BROWSER_KEY`; they are not needed by this portfolio’s static pages. The static deployment exporter removes the Manus platform config endpoint and script. Never put private credentials in `VITE_*` variables or client code.

## How the live GitHub Pages deployment was made

The source ZIP in this archive is **not** the static deployment ZIP; do not upload this source archive as the website root. The historical deployment to `haniyaamjad1124-wq/haniyaamjad1124-wq.github.io` on branch `main` used a separate static-export procedure:

1. Run `pnpm build:static` from the source-project root; Vite emits `dist/public/`.
2. Run the separate `refresh_deployment.py` exporter. The archived copy is `deployment-history/refresh_deployment.py`. The original script used Manus workspace absolute paths, copied the static pages/assets into a Pages site tree, retained/copies `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`, and the India journey artwork, added canonical URLs, and removed Manus-only route/config artifacts. It rewrote the Manus Storage artwork URL to `/images/india-journey.webp`, built and verified a separate static-site ZIP, and prepared an upload manifest. The archived script is provenance, not a portable command as-is; update its path constants before reusing it elsewhere.
3. A temporary, manually dispatched `.github/workflows/install-portfolio-zip.yml` was committed to `main`. The prebuilt **static-site ZIP** (not this source ZIP) was uploaded to the repository root; its checksum and exact member list were checked by the workflow before extraction. The workflow then committed only the installed static files to `main`. The exact temporary workflow is preserved under `deployment-history/install-portfolio-zip.yml`.
4. The workflow was removed in a separate owner-authenticated UI commit to trigger GitHub Pages’ normal deployment. A later one-file owner UI commit fixed the `/about` alias. The temporary workflow is no longer active. Its embedded checksum is tied to the historical static ZIP and it will reject this source archive or a newly generated package unless deliberately regenerated.

The deployed Pages tree contains the domain marker `CNAME` with `haniyamjad.com`. Root `public/` in this source archive includes the requested Pages sidecars and a copy of the India journey art; the active Vite build still reads its canonical assets from `client/public/`.

## Build versus deployed asset verification

**The exported source does not reproduce the exact asset filenames currently recorded for the live site.** Building this exported working tree with `pnpm build:static` produces:

| Export build output | Size | SHA-256 |
|---|---:|---|
| `dist/public/assets/index-DXcOYbfL.js` | 218,575 bytes | `bce60f14486e2c8f6ee00e81aeb8595a96146a7685cd3b7b30c835b62d1103dc` |
| `dist/public/assets/index-aqTO_7ID.css` | 100,399 bytes | `43f03f2c8b19609220695a3e99f0ca53c8945b1bf6be27995aebefa9b2335533` |

The saved final live-deployment verification records `index-D2aqZHhk.js` and `index-Cyb8DT5D.css`. The differences are expected from source changes already present in the exported working tree and the separate Pages post-processing step: the exported source has the direct Resume **file** URL and two pending About portrait-option placeholders; the deployed JS still has the older Resume **folder** URL. The source points the Reminiscence artwork at Manus Storage, while the Pages bundle was rewritten to `/images/india-journey.webp`. Therefore the JS and CSS filenames/hashes differ; the source export has not been represented as byte-identical to the deployed build. The CSS in this export includes the new About placeholder styling as well.

The matching live filenames above come from the saved final deployment record and repository blob verification; no user browser was used for this export.