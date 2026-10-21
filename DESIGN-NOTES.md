# Design notes — current source snapshot

These notes describe the implementation in this archive, including the About portrait review placeholders that were present in the working tree at export time. They are not a redesign brief.

## Typography

- The only site family is **Raleway**, with `Arial, sans-serif` fallback. `client/src/index.css` imports `/fonts/raleway.css`; the root stylesheet uses `--sans: "Raleway", Arial, sans-serif`, and the body is 14px / weight 400 with antialiasing.
- The local font stylesheet `client/public/fonts/raleway.css` declares normal-style faces with `font-display: swap`: `raleway-0.ttf` weight 400, `raleway-1.ttf` 500, `raleway-2.ttf` 600, `raleway-3.ttf` 700, and `raleway-4.ttf` 800. The bundled license is `client/public/fonts/raleway-license.txt`.
- Labels use 9px, weight 500, uppercase, 1.5px tracking by default. Main headings are responsive and mostly weight 500; body/paragraph copy uses Raleway 400.

## Palette

Core theme variables from `client/src/index.css`:

| Name | Hex | Use |
|---|---|---|
| Paper / warm ivory | `#f5f3ed` | Main interior page background |
| Ink / dark olive-charcoal | `#252c28` | Main interior text |
| Muted | `#888a80` | Secondary labels/body text |
| Divider | `#dcded2` | Fine rules and borders |
| Cobalt | `#3f59c3` | Accent and bookshelf blue |
| Burnt orange | `#df5c2c` | Accent and bookshelf orange |
| Saffron | `#f5ca62` | Accent and bookshelf yellow |
| Leaf green | `#48644c` | Focus ring and green theme accent |
| Entry charcoal | `#17191d` | Bookshelf landing-page background |
| Entry cream | `#f1ebda` | Landing-page foreground and cream spines |

The bookshelf’s seven named spine colors are explicitly set in `Bookshelf.tsx`: cream `#f1ebda`, yellow `#f5ca62`, orange `#df5c2c`, rust `#b94525`, blue `#3f59c3`, deep blue `#2b409a`, and periwinkle `#8798d4`.

Additional named colors currently used as secondary text, illustration/page accents, portrait-placeholder surfaces, borders, and shadows in `client/src/index.css`:

| Name | Hex | Role |
|---|---|---|
| Forest green | `#3b553d` | Reminiscence title/accent |
| Indigo blue | `#334bac` | Legacy entry CTA color rule |
| Sage gray | `#717b70` | Secondary green-gray text |
| Warm gray | `#77776f` | Portrait placeholder status text |
| Gray green | `#777e79` | Small entry label |
| Sage | `#77896d` | Reminiscence kicker |
| Olive sage | `#7a8770` | Journal label |
| Moss sage | `#7c9673` | Legacy media icon rule |
| Soft sage | `#809073` | Secondary sage shade |
| Dusty sage | `#829078` | Reminiscence footnote |
| Warm stone | `#85847c` | Crosshair |
| Periwinkle | `#8798d4` | Bookshelf spine |
| Mid sage-gray | `#8b957e` | Legacy media tab text |
| Pale sage-gray | `#8c947f` | Landscape caption |
| Light sage-gray | `#8c977f` | Empty media state |
| Warm gray | `#8e8b83` | Empty Work label |
| Taupe gray | `#aaa79d` | Empty About-copy placeholder |
| Cool gray | `#b4b4b5` | Legacy entry caption |
| Translucent taupe | `#b7b3a54d` | Portrait-guide lines (about 30% opacity) |
| Stone | `#bbbcb4` | Legacy shelf label |
| Pale green | `#c6d1bc` | Legacy media-tab border |
| Gray sage | `#c7ccc1` | Portrait/soft neutral surface |
| Very faint green-gray | `#c7cec021` | Entry menu border (about 13% opacity) |
| Cool pale gray | `#d2d1cc` | Monochrome portrait placeholder |
| Warm gray | `#d3d1c8` | Colour portrait placeholder gradient |
| Portrait border | `#d4d1c7` | Portrait-frame border |
| Translucent pale green | `#bdceb180` | Text-selection highlight (50% opacity) |
| Pale green highlight | `#dce5cf60` | Reminiscence pointer spotlight (about 38% opacity) |
| Warm pale gray | `#e2dfd6` | Colour portrait placeholder gradient |
| Light sage | `#e4e9d9` | Pale green surface |
| Pearl gray | `#e5e4e0` | Monochrome placeholder gradient |
| Translucent pale sage | `#e5ecdca0` | Legacy active tab (about 63% opacity) |
| Pale green | `#e7eedf` | Landscape image backing on narrower screens |
| Warm off-white | `#e9e6de` | Portrait placeholder gradient |
| Soft warm gray | `#eae8e1` | Empty Work panel |
| Off-white | `#efeeea` | Monochrome placeholder gradient |
| Very light neutral | `#f4f3ef` | Monochrome portrait silhouette |
| Saffron glow | `#f5ca623e` | Work pointer spotlight (about 24% opacity) |
| Paper overlay | `#f5f3edcc` | Portrait status-chip background (about 80% opacity) |
| White highlight | `#ffffff20` | Spine top edge (about 13% opacity) |
| White highlight | `#ffffff26` | Spine inset highlight (about 15% opacity) |
| Black inset shade | `#00000013` | Spine inset shadow (about 7% opacity) |
| Black shadow | `#00000030` | Selected-spine shadow (about 19% opacity) |
| Nearly transparent charcoal | `#21232308` | Mobile navigation shadow (about 3% opacity) |

The keyword color `white` is used for skip-link text; transparent gradients use the CSS keyword `transparent`. A few rules for removed entry captions/media tabs remain in the stylesheet but those elements are not rendered by the current page components.

## Bookshelf entrance and Work entry

- `client/src/components/portfolio/Bookshelf.tsx` hard-codes **four rows of fourteen spines (56 total)** as color-name sequences, then maps each name through the seven-color palette. Spines are CSS `<span>` elements; they are not cover images or individually navigable page links.
- Nine row/column IDs receive a fixed starting tilt: `0-3: −18°`, `0-6: 15°`, `0-9: −12°`, `1-5: 16°`, `1-8: −17°`, `2-7: 14°`, `2-10: −19°`, `3-5: 14°`, and `3-8: −16°`. Other spines start at 0°. Transform origin is 50% / 86%.
- Base geometry: 24px spine width × 83px height, 17px horizontal gap, 22px row gap. At widths ≥1500px it becomes 25×89px, 19px horizontal gap, 24px row gap.
- Each row listens for pointer movement. For non-touch pointers and when reduced-motion is off, the nearest spines lift in a soft row wave up to 8px; displacement fades linearly by column distance over a radius of 3 books. `pointerleave` clears the wave.
- Hover lifts a spine 14px, straightens it to 0°, scales it to 1.08 and brightens it to 1.13. Keyboard focus lifts by 7px while retaining its tilt. The clicked selection lifts 19px, straightens, scales to 1.13 and brightens to 1.12; non-selected books dim to 0.3 opacity during entry.
- Spine transform easing/duration is `0.32s cubic-bezier(0.2, 0.7, 0.2, 1)`; filter and opacity use `0.3s` (default CSS easing). Dimmed siblings use `0.18s` transition duration. Row/label rules not used by the current component are retained in CSS.
- One accessible anchor wraps the entire shelf canvas and points to `/work`; clicking any spine or blank canvas area opens Work by default. Pointer clicks on blank space select the nearest spine; keyboard activation selects the first. Modified/middle clicks and reduced-motion clicks retain the ordinary anchor behavior. On ordinary activation, the selected spine is recorded, then after **120ms** a cancelable `portfolio:navigate` event requests `/work` with the selected spine’s center as the reveal origin; a full-page `/work` navigation is the fallback. `pageshow` clears any stale selection when returning.

## FluidSurface pointer surface

`client/src/components/portfolio/FluidSurface.tsx` is a wrapper accepting `className` and optional `children`. It is used on the empty Work-project panel (`.work-empty`) and Reminiscence hero (`.rumi-hero`), not on About. On non-touch pointer movement with reduced-motion disabled, it normalizes pointer x/y within the wrapper, writes `--pointer-x` and `--pointer-y` as percentages, and writes `--drift-x` as `(x − 0.5) × 22px` and `--drift-y` as `(y − 0.5) × 18px`. On pointer leave it recenters the spotlight at 50%/50% and resets both drift values to 0px. It has no separate numeric props or autonomous animation loop.

- Work: warm gray panel with saffron radial spotlight (`#f5ca623e`, fading to transparent at 65%) and a crosshair that drifts with the pointer; crosshair transform transition is `0.7s`.
- Reminiscence: cream background with a pale-green radial spotlight (`#dce5cf60`, fading by 70%); the landscape illustration drifts with a `1.1s cubic-bezier(0.2, 0.8, 0.2, 1)` transform transition.

## Route transitions and keyframes

The SPA navigation hook is `client/src/components/portfolio/usePortfolioNavigation.ts`. It handles internal unmodified same-origin route links, updates history and page metadata, scrolls to the top, focuses `#main-content`, and synchronizes back/forward navigation. It uses the browser View Transition API when available; shelf navigation passes the clicked spine center. Ordinary page navigation originates at the viewport center. A custom 450ms fallback clears arrival styles where the API is unavailable or throws. If reduced motion is requested, route changes are immediate and transitions are disabled.

Every named CSS keyframe and route transition in `client/src/index.css`:

| Animation | Duration/easing | Effect |
|---|---|---|
| `route-out` | 0.28s `ease` (0.5s for shelf entry) | Old root fades out |
| `route-in` | 0.38s `cubic-bezier(0.22, 1, 0.36, 1)` | New root fades in while moving up 8px |
| `shelf-page-reveal` | 0.56s `cubic-bezier(0.22, 0.68, 0.22, 1)` | Circular clip expands from clicked book center to 150vmax |
| `page-settle` | 0.42s `cubic-bezier(0.22, 1, 0.36, 1)` | Arriving page content fades in while moving up 15px |
| Shared header view-transition group | 0.42s `cubic-bezier(0.22, 1, 0.36, 1)` | Keeps header visually continuous between routes |

Other explicit transition timings: ordinary button color/background `0.2s`; shelf label color/opacity `0.25s`; legacy media-tab color/background `0.25s`; book filter/opacity `0.3s`; book transform `0.32s` with the easing above; entry crosshair transform `0.7s`; landscape transform `1.1s` with its easing above. Default CSS easing applies where no easing is specified. Reduced-motion CSS disables transitions and animations, including all View Transition pseudo-elements and page-settle effects.

## Responsive breakpoints

`client/src/index.css` uses: min-width **1500px** (larger shelf); max-width **1000px** (Reminiscence becomes a single column); max-width **800px** (tablet spacing/type); max-width **600px** (mobile menu, smaller shelf, one-column projects and portrait cards); max-width **380px** (narrowest shelf); max-height **520px** combined with min-width **601px** (short landscape screens); plus `prefers-reduced-motion: reduce`.

The current About two-option comparison is a two-column 4:5 portrait-card layout on wider viewports, max width 1120px and `clamp(18px, 4vw, 58px)` gap; at ≤600px it stacks into one column with 32px gap. The second card is grayscale. Both intentionally show “Source photo pending” and guide overlays until the specified originals are available.

## Intentionally empty or placeholder content

- `/work`: `projects` is an empty array and each page `body` is empty. The UI displays “NO PROJECTS ADDED YET” rather than invented work.
- `/about`: biography text remains empty. The two portrait frames are placeholders for the LL colour retouch and ab black-and-white option; no source photo is embedded in this archive.
- `/reminiscence`: the image is shown, but journal/media arrays and body text are empty. `content/reminiscence/POST_TEMPLATE.md` is an unpublished template; there are no published personal posts.
- `client/src/data/sections.ts` has three page definitions, empty `projects` and `rumiMedia` arrays, and an image URL currently pointing to Manus Storage. The root `public/images/india-journey.webp` is a preserved local copy from the Pages export; the separate deployment exporter rewrote the live bundle to that local path.
- The root landing title is visually hidden for accessibility; visible shelf-label and bottom-caption content is not rendered. Navigation remains: Haniya Amjad returns home; Work, Reminiscence, About, and Resume appear in the header.