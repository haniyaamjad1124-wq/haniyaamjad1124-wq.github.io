// @ts-nocheck
/* The entrance wall, as one self-contained scene.

   This is the approved prototype's script, moved into a module with as few changes as
   possible: it builds the shelves, books, keepsakes, lamps and pots inside the element it is
   given and runs the cat. React only mounts and unmounts it (see WallScene.tsx).

   It is deliberately not type-checked. It is imperative DOM code written and tuned as plain
   JavaScript; typing it line by line would be a rewrite, not a port. The surface the rest of
   the app touches (mountWall and its options) is typed in WallScene.tsx. */

export const WALL_HTML = `<div class="stage" id="stage">
    <div class="plaque" id="plaque" aria-hidden="true"><i></i>You have entered the space of a weird cat lady<i></i></div>
    <div class="cast" id="cast"><svg class="ribbon" id="ribbon" viewBox="0 0 1400 770" aria-hidden="true"></svg></div>
    <span class="wcat" id="cat" aria-hidden="true">
      <span class="say" id="say"><svg class="cloud" viewBox="0 0 200 116" preserveAspectRatio="none" focusable="false"><path class="fill" d="M52 104 C24 106 6 86 16 64 C4 42 26 20 50 30 C58 8 96 0 116 20 C138 6 174 18 174 46 C198 54 198 92 168 100 C158 110 138 108 128 102 C118 112 86 112 76 103 C68 108 58 108 52 104 Z"/><path class="line" d="M52 104 C24 106 6 86 16 64 C4 42 26 20 50 30 C58 8 96 0 116 20 C138 6 174 18 174 46 C198 54 198 92 168 100 C158 110 138 108 128 102 C118 112 86 112 76 103 C68 108 58 108 52 104 Z"/></svg><span class="say-text"></span><i class="spark"></i><i class="spot"></i><i class="dot d1"></i><i class="dot d2"></i></span>
      <svg class="cat pose-sit" viewBox="0 0 184 150" focusable="false">
        <path class="cat-tail" d="M118 120 C150 118 164 96 154 76 C146 60 124 60 122 78" fill="none" stroke="var(--cat-ink)" stroke-width="13" stroke-linecap="round"/>
        <path d="M30 150 C26 110 40 84 78 78 C118 72 136 100 138 150 Z" fill="var(--cat-ink)"/>
        <g class="cat-head">
          <path d="M44 48 L50 14 L74 40 Z" fill="var(--cat-ink)"/>
          <path d="M116 48 L110 14 L86 40 Z" fill="var(--cat-ink)"/>
          <path d="M54 44 L54 24 L68 40 Z" fill="#df5c2c"/>
          <path d="M106 44 L106 24 L92 40 Z" fill="#df5c2c"/>
          <ellipse cx="80" cy="62" rx="40" ry="34" fill="var(--cat-ink)"/>
          <g class="cat-eyes">
            <ellipse cx="65" cy="60" rx="10" ry="11" fill="#f5ca62"/>
            <ellipse cx="95" cy="60" rx="10" ry="11" fill="#f5ca62"/>
            <ellipse cx="66" cy="61" rx="3.2" ry="8" fill="var(--cat-ink)"/>
            <ellipse cx="96" cy="61" rx="3.2" ry="8" fill="var(--cat-ink)"/>
            <circle cx="69" cy="56" r="2" fill="#fff"/>
            <circle cx="99" cy="56" r="2" fill="#fff"/>
          </g>
          <path d="M76 73 L84 73 L80 79 Z" fill="#df5c2c"/>
          <path d="M80 79 C80 84 74 86 71 83 M80 79 C80 84 86 86 89 83" fill="none" stroke="#f1ebda" stroke-width="1.6" stroke-linecap="round"/>
          <g stroke="#f1ebda" stroke-width="1.4" stroke-linecap="round" opacity=".9">
            <path d="M52 72 L30 68"/><path d="M52 77 L30 80"/><path d="M108 72 L130 68"/><path d="M108 77 L130 80"/>
          </g>
        </g>
        <g class="sit-legs">
          <path d="M70 106 C68 122 68 132 68 140 M94 106 C96 122 96 132 96 140" fill="none" stroke="#1f2228" stroke-width="2" stroke-linecap="round" opacity=".7"/>
          <g class="sit-paw-l">
            <ellipse cx="66" cy="141" rx="14" ry="9" fill="#3b3f48"/>
            <path d="M58.5 142 L58.5 135.5 M66 143 L66 135.5 M73.5 142 L73.5 135.5" stroke="#f1ebda" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
          </g>
          <g class="sit-paw-r">
            <ellipse cx="98" cy="141" rx="14" ry="9" fill="#3b3f48"/>
            <path d="M90.5 142 L90.5 135.5 M98 143 L98 135.5 M105.5 142 L105.5 135.5" stroke="#f1ebda" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
          </g>
        </g>
        <g class="cat-paw">
          <path d="M122 120 C134 104 142 88 146 76" fill="none" stroke="var(--cat-ink)" stroke-width="16" stroke-linecap="round"/>
          <circle cx="148" cy="70" r="12" fill="var(--cat-ink)"/>
          <path d="M140 66 L142 60 M148 64 L148 57 M156 66 L154 60" stroke="#f1ebda" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>
        </g>
      <g class="cat-lick">
          <ellipse cx="80" cy="86" rx="3.4" ry="5.5" fill="#e88f8f"/>
          <path d="M66 138 C60 118 68 104 78 98" fill="none" stroke="#3b3f48" stroke-width="15" stroke-linecap="round"/>
          <circle cx="80" cy="97" r="10.5" fill="#3b3f48"/>
          <path d="M74 93 L75 87 M80 91 L80 85 M86 93 L85 87" stroke="#f1ebda" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
        </g>
      </svg>
      <svg class="cat pose-walk" viewBox="0 0 184 150" focusable="false">
        <path class="walk-tail" d="M50 98 C28 96 20 72 30 54" fill="none" stroke="var(--cat-ink)" stroke-width="11" stroke-linecap="round"/>
        <rect class="leg a back" x="57" y="104" width="11" height="44" rx="5.5" fill="#22252b"/>
        <rect class="leg b front" x="109" y="104" width="11" height="44" rx="5.5" fill="#22252b"/>
        <path d="M44 100 C44 78 70 72 98 74 C122 76 136 86 136 102 C136 116 122 122 98 122 L62 122 C50 122 44 114 44 100 Z" fill="var(--cat-ink)"/>
        <rect class="leg b back" x="68" y="104" width="11" height="44" rx="5.5" fill="var(--cat-ink)"/>
        <rect class="leg a front" x="120" y="104" width="11" height="44" rx="5.5" fill="var(--cat-ink)"/>
        <g class="walk-head">
          <path d="M122 58 L127 32 L142 50 Z" fill="var(--cat-ink)"/><path d="M148 50 L160 31 L166 56 Z" fill="var(--cat-ink)"/>
          <path d="M127 52 L129 40 L137 50 Z" fill="#df5c2c"/><path d="M152 50 L159 40 L161 53 Z" fill="#df5c2c"/>
          <ellipse cx="144" cy="72" rx="27" ry="23" fill="var(--cat-ink)"/>
          <g class="cat-eyes">
            <ellipse cx="139" cy="70" rx="6.4" ry="7.4" fill="#f5ca62"/><ellipse cx="157" cy="70" rx="6" ry="7.4" fill="#f5ca62"/>
            <ellipse cx="140.5" cy="70.5" rx="2.1" ry="5.4" fill="var(--cat-ink)"/><ellipse cx="158.5" cy="70.5" rx="2" ry="5.4" fill="var(--cat-ink)"/>
          </g>
          <path d="M147 79 L153 79 L150 83.5 Z" fill="#df5c2c"/>
          <g stroke="#f1ebda" stroke-width="1.2" stroke-linecap="round" opacity=".9"><path d="M163 79 L178 76"/><path d="M163 83 L178 85"/><path d="M134 80 L120 78"/></g>
        </g>
      </svg>
      <svg class="cat pose-back" viewBox="0 0 184 150" focusable="false">
        <path class="pcb-tail" d="M92 116 C93 130 100 140 112 143 C120 145 126 141 127 135" fill="none" stroke="var(--cat-ink)" stroke-width="9" stroke-linecap="round"/>
        <g class="pcb-legs">
          <g class="pcb-leg-l"><path d="M76 108 C74 120 73 130 73 139" fill="none" stroke="var(--cat-ink)" stroke-width="14" stroke-linecap="round"/><ellipse cx="73" cy="142" rx="8.5" ry="6.5" fill="#3b3f48"/><path d="M69 144 V140 M73 145 V140 M77 144 V140" stroke="#f1ebda" stroke-width="1.3" stroke-linecap="round" opacity=".75"/></g>
          <g class="pcb-leg-r"><path d="M108 108 C110 120 111 130 111 139" fill="none" stroke="var(--cat-ink)" stroke-width="14" stroke-linecap="round"/><ellipse cx="111" cy="142" rx="8.5" ry="6.5" fill="#3b3f48"/><path d="M107 144 V140 M111 145 V140 M115 144 V140" stroke="#f1ebda" stroke-width="1.3" stroke-linecap="round" opacity=".75"/></g>
        </g>
        <g class="pcb-body">
          <path d="M68 66 C60 84 60 102 66 114 C74 124 110 124 118 114 C124 102 124 84 116 66 C106 58 78 58 68 66 Z" fill="var(--cat-ink)"/>
          <path d="M92 70 C91 88 91 104 92 118" fill="none" stroke="#3b3f48" stroke-width="2" stroke-linecap="round" opacity=".8"/>
          <g class="pcb-arm-l"><path d="M74 72 C62 58 55 44 52 28" fill="none" stroke="var(--cat-ink)" stroke-width="14" stroke-linecap="round"/><circle cx="52" cy="24" r="9.5" fill="#3b3f48"/><path d="M47 18 L45 11 M52 16 L52 8 M57 18 L59 11" stroke="#f1ebda" stroke-width="1.7" stroke-linecap="round" opacity=".9"/></g>
          <g class="pcb-arm-r"><path d="M110 72 C122 58 129 44 132 28" fill="none" stroke="var(--cat-ink)" stroke-width="14" stroke-linecap="round"/><circle cx="132" cy="24" r="9.5" fill="#3b3f48"/><path d="M127 18 L125 11 M132 16 L132 8 M137 18 L139 11" stroke="#f1ebda" stroke-width="1.7" stroke-linecap="round" opacity=".9"/></g>
          <path d="M68 38 L70 8 L88 28 Z" fill="var(--cat-ink)"/><path d="M116 38 L114 8 L96 28 Z" fill="var(--cat-ink)"/>
          <ellipse cx="92" cy="46" rx="29" ry="24" fill="var(--cat-ink)"/>
        </g>
      </svg>
    </span>
  </div>`;

export function mountWall(root, { navigate, resumeUrl, onRetier }) {
  const $ = id => root.querySelector("#" + id);
  // everything that must be undone when the scene is unmounted
  let disposed = false, frame = 0;
  const undo = [];
  const listen = (target, type, fn, options) => { target.addEventListener(type, fn, options); undo.push(() => target.removeEventListener(type, fn, options)); };
  const later = (fn, ms) => { const id = setTimeout(() => { if (!disposed) fn(); }, ms); undo.push(() => clearTimeout(id)); return id; };

  // the seven spine colours of the live site, used exactly as they are
  const palette = { cream: "#f1ebda", yellow: "#f5ca62", orange: "#df5c2c", rust: "#b94525", blue: "#3f59c3", deepblue: "#2b409a", periwinkle: "#8798d4" };
  const names = Object.keys(palette);
  const weights = { cream: 4, yellow: 4, orange: 4, rust: 2, blue: 4, deepblue: 2, periwinkle: 3 };
  const shelves = [
    { name: "Work", path: "/work" },
    { name: "Play", path: "/play" },
    { name: "About", path: "/about" },
    { name: "Resume", path: resumeUrl || "/resume.pdf", external: true },
  ];

  /* ---------- four level shelves, in stage units ---------- */
  /* The wall is laid out afresh for the width of the window, in four sizes. Narrower windows
     get a narrower wall with fewer books and no plants instead of the same wall shrunk, so the
     lettering stays a readable size. Keepsakes without lettering are drawn smaller on the
     narrowest two; the ones with words on them (and the bookend labels) keep their size.
       plain / text: how large keepsakes without / with lettering are drawn
       gap: the least bare shelf between two clusters      top: headroom above the first shelf */
  const TIERS = [
    { name: "wide",  min: 1180, W: 1400, L: 196, R: 1204, plain: 1.22, text: 1.22, gap: 22, pots: true,  top: 178 },
    { name: "mid",   min: 860,  W: 1040, L: 52,  R: 988,  plain: 1.22, text: 1.22, gap: 22, pots: true,  top: 178 },
    { name: "small", min: 620,  W: 760,  L: 26,  R: 734,  plain: 1.08, text: 1.22, gap: 14, pots: false, top: 178 },
    { name: "phone", min: 320,  W: 480,  L: 8,   R: 472,  plain: 0.85, text: 1.05, gap: 6,  pots: false, top: 272, phone: true, end: [94, 80], sizes: { car: 0.68, slate: 0.86 } },
    // screens narrower than 320px: as the phone wall, without the blackboard
    { name: "tiny",  min: 0,    W: 480,  L: 8,   R: 472,  plain: 0.85, text: 1.05, gap: 6,  pots: false, top: 272, phone: true, end: [94, 80], sizes: { car: 0.68 } },
  ];
  // The widest wall the window has room for. A short window shrinks the wall to fit its height
  // anyway, so there a wider wall than the width alone suggests fits at that same size.
  const tierFor = width => {
    const top = document.querySelector(".stage").parentNode.getBoundingClientRect().top + window.scrollY;
    return TIERS.find(t => width >= t.min || (!t.phone && t.W * Math.max(0.55, (window.innerHeight - top - 68) / (592 + t.top)) <= width - 16));
  };
  // (a phone reports a wider window than its screen while anything on the page overflows)
  const viewW = () => Math.min(window.innerWidth, window.screen.width || Infinity);
  const tier = tierFor(viewW());
  const TEXTY = ["kettlebell", "bib", "cert", "slate", "bank", "cap"];   // keepsakes with lettering on them
  // a finger, not a mouse: nothing hovers, so the cat is steered by taps
  const TOUCH = window.matchMedia("(hover: none)").matches;
  const W = tier.W, H = 592 + tier.top;
  const L = tier.L, R = tier.R;  // the stretch of each shelf that carries books
  const OVERHANG = Math.min(36, L - 2);   // how far each plank runs past the books at either end
  const Y0 = tier.top, GAP = 182;    // first shelf, and the drop between shelves
  const THICK = 13;
  const END_W = tier.end ? tier.end[0] : 104, END_H = tier.end ? tier.end[1] : 92;   // the bookend
  const FALL_MS = 620, SWAT_HIT_MS = 190, PAW_REACH = 0.47;

  const rowY = r => Y0 + r * GAP;
  const centre = r => rowY(r);
  const d = shelves.map((_, r) => `M${L - OVERHANG} ${rowY(r)} L${R + OVERHANG} ${rowY(r)}`).join(" ");
  $("ribbon").innerHTML =
    `<path class="edge" d="${d}"/><path class="face" d="${d}"/><path class="light" d="${d}" transform="translate(0 -2.5)"/>`;
  const surface = (r, x) => centre(r, x) - THICK / 2;   // where a book's foot rests
  const slopeDeg = (r, x) => (Math.atan((centre(r, x + 6) - centre(r, x - 6)) / 12) * 180) / Math.PI;

  /* ---------- books: a few loose clusters per run, with bare shelf between them ---------- */
  const rng = seed => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = (r, not) => {
    const bag = names.filter(n => n !== not).flatMap(n => Array(weights[n]).fill(n));
    return bag[Math.floor(r() * bag.length)];
  };
  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

  /* ---------- the keepsakes on the shelves ----------
     Drawn as real objects in their own materials (brushed metal, brass, leather, wood,
     paper), with light from the upper right like the rest of the wall: a lit side,
     a shaded side, a highlight and a contact shadow. Materials are defined once below. */
  root.insertAdjacentHTML("beforeend", `<svg class="ws-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="mSilver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0f3"/><stop offset=".55" stop-color="#c3c7ce"/><stop offset="1" stop-color="#8e939c"/></linearGradient>
    <linearGradient id="mSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8e939c"/><stop offset=".45" stop-color="#eef0f3"/><stop offset="1" stop-color="#a2a7b0"/></linearGradient>
    <linearGradient id="mBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b98a2c"/><stop offset=".5" stop-color="#f3d27a"/><stop offset="1" stop-color="#c2912f"/></linearGradient>
    <radialGradient id="mGold" cx=".66" cy=".3" r=".8"><stop offset="0" stop-color="#ffe7a0"/><stop offset=".45" stop-color="#e3ad35"/><stop offset="1" stop-color="#96691a"/></radialGradient>
    <linearGradient id="mLeather" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d49a62"/><stop offset=".5" stop-color="#b0723c"/><stop offset="1" stop-color="#7f4c24"/></linearGradient>
    <linearGradient id="mLeatherDk" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a86a36"/><stop offset="1" stop-color="#6d3f1d"/></linearGradient>
    <linearGradient id="mWood" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c58a5c"/><stop offset=".5" stop-color="#96603a"/><stop offset="1" stop-color="#6b3e26"/></linearGradient>
    <radialGradient id="mRed" cx=".66" cy=".28" r=".85"><stop offset="0" stop-color="#f4705a"/><stop offset=".5" stop-color="#c7331f"/><stop offset="1" stop-color="#7c1a11"/></radialGradient>
    <linearGradient id="mRedBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f06a52"/><stop offset=".6" stop-color="#c5301d"/><stop offset="1" stop-color="#8a1d12"/></linearGradient>
    <linearGradient id="mPaper" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfbf4"/><stop offset="1" stop-color="#e2dac6"/></linearGradient>
    <linearGradient id="mNavy" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5aa6"/><stop offset=".5" stop-color="#2a3672"/><stop offset="1" stop-color="#161d45"/></linearGradient>
    <linearGradient id="mScreen" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b313c"/><stop offset="1" stop-color="#0c0e12"/></linearGradient>
    <linearGradient id="mBoard" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a44"/><stop offset="1" stop-color="#1c2521"/></linearGradient>
    <linearGradient id="mGlare" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="mPot" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#e09a68"/><stop offset=".55" stop-color="#c2703f"/><stop offset="1" stop-color="#8f4c27"/></linearGradient>
    <linearGradient id="mLeaf" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc46a"/><stop offset="1" stop-color="#3f7334"/></linearGradient>
    <linearGradient id="mLeafDk" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f9a4a"/><stop offset="1" stop-color="#2c5526"/></linearGradient>
    <radialGradient id="mGraphite" cx=".66" cy=".28" r=".85"><stop offset="0" stop-color="#7b818c"/><stop offset=".5" stop-color="#4b5059"/><stop offset="1" stop-color="#2a2d33"/></radialGradient>
    <radialGradient id="mRubber" cx=".7" cy=".25" r=".9"><stop offset="0" stop-color="#4a4f58"/><stop offset="1" stop-color="#101216"/></radialGradient>
  </defs></svg>`);
  const things = {
    laptop: { w: 88, h: 54, say: "B2B SaaS. Strictly purr-fessional software.", svg: `
      <radialGradient id="gLap"><stop offset="0" stop-color="#a9baff" stop-opacity=".62"/><stop offset=".5" stop-color="#8ea4f5" stop-opacity=".24"/><stop offset="1" stop-color="#8ea4f5" stop-opacity="0"/></radialGradient>
      <radialGradient id="gLapIn" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#7f96f0" stop-opacity=".3"/><stop offset="1" stop-color="#7f96f0" stop-opacity="0"/></radialGradient>
      <ellipse cx="44" cy="22" rx="62" ry="44" fill="url(#gLap)"/>
      <rect x="12" y="0" width="64" height="44.5" rx="3" fill="url(#mSilver)"/>
      <rect x="13.6" y="1.6" width="60.8" height="41" rx="2" fill="#0b0d10"/>
      <rect x="15.5" y="3.5" width="57" height="36.5" fill="url(#mScreen)"/><rect x="15.5" y="3.5" width="57" height="36.5" fill="url(#gLapIn)"/>
      <path d="M20 34.5 H68 M20 27 H68 M20 19.5 H68 M20 12 H68" stroke="#fff" stroke-opacity=".07" stroke-width=".7"/>
      <rect class="bar b1" x="23" y="26" width="6" height="8.5" rx=".6" fill="#6f86e0"/><rect class="bar b2" x="32" y="20" width="6" height="14.5" rx=".6" fill="#e8734a"/><rect class="bar b3" x="41" y="13" width="6" height="21.5" rx=".6" fill="#f5ca62"/>
      <path class="trend t1" d="M52 30 L57 24 L61 27 L67 15" fill="none" stroke="#9fb0f0" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="trend t2" d="M52 16 L57 21 L61 18 L67 29" fill="none" stroke="#8fe3b0" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M46 3.5 H72.5 V30 Z" fill="url(#mGlare)" opacity=".5"/>
      <path d="M0 45 H88 L85 51.5 Q84 54 81 54 H7 Q4 54 3 51.5 Z" fill="url(#mSilver)"/>
      <rect x="0" y="44.4" width="88" height="1.5" rx=".7" fill="#f7f8fa"/><path d="M14 46 H74 L78 50 H10 Z" fill="#9db2ff" opacity=".22"/><rect x="36" y="46.4" width="16" height="2" rx="1" fill="#8e939c"/>` },
    // a phone lying on its back, seen from the side and foreshortened on top, with a coin
    // standing half out of a slot in its screen
    reader: { w: 78, h: 26, say: "Fintech. She makes paw-ments painless.", svg: `
      <radialGradient id="gPhone" cx=".5" cy="1" r=".5"><stop offset="0" stop-color="#a9baff" stop-opacity=".6"/><stop offset=".5" stop-color="#8ea4f5" stop-opacity=".2"/><stop offset="1" stop-color="#8ea4f5" stop-opacity="0"/></radialGradient>
      <path d="M-3 13 A44 46 0 0 1 85 13 Z" fill="url(#gPhone)"/>
      <path d="M7 20 H75 V22.4 Q75 25.6 71.8 25.6 H10.2 Q7 25.6 7 22.4 Z" fill="url(#mSilver)"/>
      <path d="M14 10.6 H68 Q70.6 10.6 71.6 12.6 L75 20 H7 L10.4 12.6 Q11.4 10.6 14 10.6 Z" fill="#c9ced6"/>
      <path d="M15.4 11.9 H66.6 Q68.4 11.9 69.1 13.3 L71.6 18.8 H10.4 L12.900 13.3 Q13.6 11.9 15.4 11.9 Z" fill="#5672e0"/>
      <path d="M40 11.9 H66.6 Q68.4 11.9 69.1 13.3 L71.6 18.8 H58 Z" fill="#fff" opacity=".1"/>
      <rect x="14.5" y="16.6" width="13" height="1.2" rx=".6" fill="#fff" opacity=".35"/><rect x="14.5" y="16.6" width="8.5" height="1.2" rx=".6" fill="#f5ca62"/>
      <rect x="58" y="13.300" width="8" height="1.1" rx=".5" fill="#fff" opacity=".4"/><rect x="60.5" y="15.4" width="6.6" height="1" rx=".5" fill="#fff" opacity=".25"/>
      <ellipse cx="41" cy="15.2" rx="11" ry="1.7" fill="#14161a"/>
      <clipPath id="cSlot"><rect x="26" y="-40" width="30" height="55.3"/></clipPath>
      <g clip-path="url(#cSlot)"><g class="coin coin-b"><circle cx="41" cy="15" r="9" fill="url(#mGold)"/><circle cx="41" cy="15" r="6.6" fill="none" stroke="#a8740f" stroke-width=".9" opacity=".7"/>
          <path d="M38 10.6 H44 M38 13 H44 M38 10.6 H40 Q43.2 10.6 43.2 13 Q43.2 15.4 40 15.4 H38.4 L43 19.6" fill="none" stroke="#8a5d0a" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M35 9.5 Q38 6.6 42.5 6.8" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".6"/></g><g class="coin coin-a"><circle cx="41" cy="15" r="9" fill="url(#mGold)"/><circle cx="41" cy="15" r="6.6" fill="none" stroke="#a8740f" stroke-width=".9" opacity=".7"/>
          <path d="M38 10.6 H44 M38 13 H44 M38 10.6 H40 Q43.2 10.6 43.2 13 Q43.2 15.4 40 15.4 H38.4 L43 19.6" fill="none" stroke="#8a5d0a" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M35 9.5 Q38 6.6 42.5 6.8" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".6"/></g></g>
      <path d="M30 15.2 A11 1.7 0 0 0 52 15.2" fill="none" stroke="#14161a" stroke-width="1"/>
      <path d="M7 20 H75" stroke="#fff" stroke-width=".8" opacity=".6"/>
      <rect x="16" y="21.6" width="7" height="1.3" rx=".6" fill="#8d929c"/><rect x="26" y="21.6" width="4" height="1.3" rx=".6" fill="#8d929c"/>
      <path d="M67 20 H75 V22.4 Q75 25.6 71.8 25.6 H69 Q71 24.400 71 22 Z" fill="#000" opacity=".12"/>` },
    // a chunky toy racer: stepped red blocks, fat tyres, a helmeted driver
    car: { w: 124, h: 52, say: "Formula 1. She loves a fast lap. I prefer a warm one.", svg: `
      <rect x="3" y="7" width="23" height="6" rx="1.2" fill="#30343d"/><rect x="3" y="7" width="23" height="1.5" rx=".7" fill="#6a707b"/>
      <rect x="3" y="7" width="4" height="13" rx="1" fill="url(#mRedBody)"/>
      <rect x="13" y="13" width="7" height="13" fill="#30343d"/>
      <rect x="20" y="37" width="86" height="5" rx="1.2" fill="#30343d"/>
      <rect x="12" y="24" width="34" height="15" rx="2" fill="url(#mRedBody)"/>
      <rect x="40" y="19" width="30" height="20" rx="2.5" fill="url(#mRedBody)"/>
      <rect x="68" y="27" width="30" height="12" rx="2" fill="url(#mRedBody)"/>
      <path d="M96 31 H112 Q118 31 119 36 V39 H96 Z" fill="url(#mRedBody)"/>
      <rect x="13.5" y="24.8" width="26" height="2" rx="1" fill="#fff" opacity=".22"/><rect x="42" y="19.9" width="26" height="2.2" rx="1.1" fill="#fff" opacity=".24"/>
      <rect x="71" y="27.8" width="25" height="1.9" rx=".9" fill="#fff" opacity=".22"/><rect x="98" y="31.8" width="15" height="1.6" rx=".8" fill="#fff" opacity=".2"/>
      <path d="M46 24 V39 M70 27 V39 M98 31 V39" stroke="#000" stroke-width=".8" opacity=".28"/>
      <rect x="36" y="11" width="8" height="10" rx="1.5" fill="#30343d"/><rect x="36" y="11" width="8" height="1.6" rx=".8" fill="#6a707b"/>
      <path d="M46 20 Q46 16.5 50 16.5 H64 Q68 16.5 68 20 Z" fill="#30343d"/>
      <circle cx="56" cy="12.5" r="8.6" fill="url(#mGold)"/>
      <path d="M57 9.2 H64 Q65.6 12.4 64.4 15.6 H57 Q55 12.4 57 9.2 Z" fill="#30343d"/><path d="M58 10.3 H63.2" stroke="#fff" stroke-width=".9" opacity=".35" stroke-linecap="round"/>
      <path d="M48.6 8.6 Q54 3.6 61.6 5.6" fill="none" stroke="#fff" stroke-width="1.5" opacity=".75" stroke-linecap="round"/>
      <rect x="104" y="40" width="18" height="4.4" rx="1.2" fill="#30343d"/><rect x="104" y="40" width="18" height="1.2" rx=".6" fill="#6a707b"/><rect x="118.5" y="34.5" width="3.5" height="9.9" rx="1" fill="#30343d"/>
      ${[30, 92].map(x => `<g class="wheel"><circle cx="${x}" cy="40.6" r="11.2" fill="url(#mRubber)"/><circle cx="${x}" cy="40.6" r="6" fill="url(#mRed)"/>
        <circle cx="${x}" cy="40.6" r="4.4" fill="none" stroke="#16181c" stroke-width=".8" opacity=".5"/><path d="M${x - 5.4} 40.6 H${x + 5.4} M${x} 35.2 V46" stroke="#7d1512" stroke-width="1.2"/>
        <path d="M${x - 10} 40.6 h2.4" stroke="#f5ca62" stroke-width="1.6"/><circle cx="${x}" cy="40.6" r="2.3" fill="url(#mSilver)"/></g>`).join("")}` },
    // a graphite kettlebell with a brushed-steel handle, lettered ATHLETE
    kettlebell: { w: 46, h: 58, say: "Hyrox. She trains hard. I am more of a cat-lete in theory.", svg: `
      <path d="M11.5 30 V13.5 Q11.5 4.5 20.5 4.5 H25.5 Q34.500 4.5 34.5 13.5 V30" fill="none" stroke="url(#mSteel)" stroke-width="6.2" stroke-linejoin="round"/>
      <path d="M27 5.6 Q33.6 6.4 33.8 13.5 V24" fill="none" stroke="#f4f5f7" stroke-width="1.3" stroke-linecap="round" opacity=".75"/>
      <ellipse cx="23" cy="38.5" rx="19.5" ry="18.5" fill="url(#mGraphite)"/>
      <path d="M12 53 H34 L33 58 H13 Z" fill="#2a2d33"/>
      <path d="M9.5 33.4 H36.5 M9.5 44.6 H36.5" stroke="#e9ebee" stroke-width=".8" opacity=".5"/>
      <text x="23" y="41.3" text-anchor="middle" font-family="Raleway, system-ui, sans-serif" font-weight="800" font-size="6.3" letter-spacing=".5" fill="#eceef1">ATHLETE</text>
      <ellipse cx="31" cy="26" rx="4.5" ry="2.4" transform="rotate(35 31 26)" fill="#fff" opacity=".22"/>` },
    // a race bib: distance and two small marks on a white header, the runner's number on a colour band
    bib: { w: 62, h: 50, say: "A 10K. She ran it feline fine.", svg: `
      <path d="M2 0 H60 Q62 0 62 2 V43 L55 50 H2 Q0 50 0 48 V2 Q0 0 2 0 Z" fill="#df5c2c"/>
      <path d="M2 0 H60 Q62 0 62 2 V19 H0 V2 Q0 0 2 0 Z" fill="url(#mPaper)"/>
      <path d="M0 19 H62 V20.2 H0 Z" fill="#000" opacity=".12"/>
      <path d="M62 43 L55 50 L55.5 44.5 Z" fill="#f0b59c"/><path d="M62 43 L55.5 44.5 L55 50" fill="none" stroke="#8f3414" stroke-width=".5" opacity=".6"/>
      <text x="31" y="11.6" text-anchor="middle" font-family="Raleway, system-ui, sans-serif" font-weight="800" font-size="10.5" letter-spacing=".4" fill="#17191d">10K</text>
      <rect x="22" y="13.8" width="18" height="1.1" rx=".5" fill="#17191d" opacity=".5"/><rect x="26" y="15.9" width="10" height=".9" rx=".4" fill="#17191d" opacity=".3"/>
      <path d="M8.5 14.5 L12.5 7.5 L14.8 11 L16.4 8.8 L19.5 14.5 Z" fill="#2b409a"/><rect x="8.5" y="15.4" width="11" height="1.1" rx=".5" fill="#f5ca62"/>
      <circle cx="49" cy="10" r="3.6" fill="none" stroke="#2b409a" stroke-width="1.2"/><path d="M47.4 10 L48.6 11.3 L50.8 8.8" fill="none" stroke="#2b409a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="44" y="15.4" width="10" height="1.1" rx=".5" fill="#17191d" opacity=".35"/>
      <text x="30.5" y="41.5" text-anchor="middle" font-family="Raleway, system-ui, sans-serif" font-weight="800" font-size="21" letter-spacing=".3" fill="#fff">2417</text>
      ${[[3.6, 3.6], [58.4, 3.6], [3.6, 46.4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#17191d" opacity=".35"/><circle cx="${x + .3}" cy="${y - .3}" r=".9" fill="url(#mSilver)"/>`).join("")}` },
    // a small flap shoulder bag: monogram canvas of tiny H's (for Haniya) and diamonds, a dark flap, a plain brass turn-lock and a short chain strap
    handbag: { w: 66, h: 46, say: "Fashion. She owns the cat-walk.", svg: `
      <path d="M8 15 C9 -5 57 -5 58 15" fill="none" stroke="url(#mBrass)" stroke-width="2.3" stroke-linecap="round" stroke-dasharray="2.4 1.7"/>
      <rect x="4" y="13" width="58" height="33" rx="4.5" fill="url(#mLeather)"/>
      <pattern id="pMono" width="9" height="8" patternUnits="userSpaceOnUse" patternTransform="translate(1.5 1)">
        <path d="M1.2 1 V4.6 M3.8 1 V4.6 M1.2 2.8 H3.8" fill="none" stroke="#56300f" stroke-width=".85" stroke-linecap="round"/>
        <path d="M6.7 5 L7.7 6.2 L6.7 7.4 L5.7 6.2 Z" fill="#56300f"/>
      </pattern>
      <rect x="4" y="13" width="58" height="33" rx="4.5" fill="url(#pMono)" opacity=".5"/>
      <path d="M52 13 H57.5 Q62 13 62 17.5 V41.5 Q62 46 57.5 46 H52 Q56 44 56 40 V19 Q56 15 52 13 Z" fill="#000" opacity=".14"/>
      <path d="M4 17.5 Q4 13 8.5 13 H57.5 Q62 13 62 17.5 V27 Q33 37.5 4 27 Z" fill="url(#mLeatherDk)"/>
      <path d="M6.5 26 Q33 35 59.5 26" fill="none" stroke="#e9bb8c" stroke-width=".8" stroke-dasharray="2 2" opacity=".6"/>
      <path d="M7.5 42.6 H58.5" fill="none" stroke="#7f4c24" stroke-width=".8" stroke-dasharray="2 2" opacity=".55"/>
      <circle cx="8" cy="15" r="2.3" fill="url(#mBrass)"/><circle cx="58" cy="15" r="2.3" fill="url(#mBrass)"/>
      <rect x="28.4" y="28.6" width="9.2" height="8.6" rx="2" fill="url(#mBrass)"/><rect x="31.3" y="31.2" width="3.4" height="3.4" rx="1" fill="#7a5514"/>
      <path d="M40 14.5 H56 Q60 14.5 60 18 V24 Q50 20 40 14.5 Z" fill="#fff" opacity=".1"/>` },
    chart: { w: 60, h: 52, say: "Economics major. Ask her about purr-chasing power.", svg: `
      <rect x="0" y="0" width="60" height="52" rx="1.5" fill="url(#mWood)"/>
      <rect x="3.4" y="3.4" width="53.2" height="45.2" fill="none" stroke="#4d2b18" stroke-width=".9"/>
      <rect x="4" y="4" width="52" height="44" fill="#f3f6ef"/>
      <pattern id="pGraph" x="4" y="4" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0 H0 V4" fill="none" stroke="#4f9db8" stroke-width=".45" opacity=".55"/></pattern>
      <pattern id="pGraphB" x="0" y="4" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0 H0 V12" fill="none" stroke="#3f8aa6" stroke-width=".8" opacity=".6"/></pattern>
      <rect x="4" y="4" width="52" height="44" fill="url(#pGraph)"/><rect x="4" y="4" width="52" height="44" fill="url(#pGraphB)"/>
      <path d="M12 9 V40 H51" fill="none" stroke="#3a3d44" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M17 14 Q28 31 47 35" fill="none" stroke="#3f59c3" stroke-width="1.9" stroke-linecap="round"/>
      <path d="M17 35 Q32 31 47 14" fill="none" stroke="#df5c2c" stroke-width="1.9" stroke-linecap="round"/>
      <path d="M31 28 V40 M12 28 H31" stroke="#3a3d44" stroke-width=".7" stroke-dasharray="1.6 1.6"/>
      <circle cx="31" cy="28" r="2.1" fill="#17191d"/>
      <path d="M30 4 H56 V34 Z" fill="url(#mGlare)" opacity=".7"/>` },
    cap: { w: 64, h: 36, say: "MBA. Master of Business Cat-ministration.", svg: `
      <path d="M14 16 V28 Q32 38 50 28 V16 L32 24 Z" fill="#141a3d"/>
      <path d="M38 21.5 L50 16 V28 Q44 31.6 38 33 Z" fill="#2a3672" opacity=".8"/>
      <g class="stole"><path d="M14 25 Q32 35 50 25 V29 Q32 39 14 29 Z" fill="url(#mBrass)"/><path d="M14 25 Q32 35 50 25" fill="none" stroke="#fff" stroke-width=".6" opacity=".45"/>
      <path d="M14.200 26 L20.400 29.600 Q21.800 43 19.600 57 L17.200 54.400 L14.400 57.400 Q16.200 42 14.200 26 Z" fill="url(#mBrass)"/>
      <path d="M43.600 31.400 L49.600 28.200 Q51 40 49 51 L46.600 48.600 L44 51.400 Q45.400 40 43.600 31.400 Z" fill="url(#mBrass)"/>
      <path d="M17.400 30 Q18.800 42 17.200 53 M46.600 32 Q47.800 40 46.600 47.500" fill="none" stroke="#7a5514" stroke-width=".6" opacity=".5"/>
      <path d="M15 51.500 L19.900 52.300 M44.400 46.200 L49.300 46.800" stroke="#7a5514" stroke-width=".7" opacity=".55"/></g>
      <text x="26" y="27.600" text-anchor="middle" font-family="Raleway, system-ui, sans-serif" font-weight="800" font-size="5.200" letter-spacing=".8" fill="#f5ca62">MBA</text>
      <path d="M32 0 L64 12 L32 24 L0 12 Z" fill="url(#mNavy)"/>
      <path d="M0 12 L32 24 L64 12" fill="none" stroke="#7d8bd0" stroke-width=".9" opacity=".8"/>
      <path d="M32 12 Q46 12.5 56 15.5 V26" fill="none" stroke="#e3ad35" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M54 25.5 H58 L58.6 34 H53.4 Z" fill="url(#mBrass)"/><ellipse cx="32" cy="12" rx="3" ry="1.6" fill="url(#mBrass)"/>` },
    // a course certificate: deep violet sheet in a pale frame, serif heading between two sprigs
    cert: { w: 70, h: 52, say: "Certified AI-first PM. A real paw-duct manager.", svg: `
      <linearGradient id="gCert" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c1f52"/><stop offset=".6" stop-color="#1e163c"/><stop offset="1" stop-color="#33246a"/></linearGradient>
      <rect x="0" y="0" width="70" height="52" rx="1.5" fill="#e6e1d3"/><rect x="0" y="0" width="70" height="1.4" rx=".7" fill="#fff" opacity=".7"/>
      <rect x="2.6" y="2.6" width="64.8" height="46.8" fill="none" stroke="#a9a290" stroke-width=".7"/>
      <rect x="3.6" y="3.6" width="62.8" height="44.8" fill="url(#gCert)"/>
      <rect x="5.6" y="5.6" width="58.8" height="40.8" fill="none" stroke="#9c8fd6" stroke-width=".5" opacity=".6"/>
      <path d="M3.6 44 Q24 38 42 43 T66.4 37 V48.4 H3.6 Z" fill="#6a56c0" opacity=".16"/><path d="M3.6 46.500 Q26 41 44 45.500 T66.4 41" fill="none" stroke="#a99be6" stroke-width=".4" opacity=".4"/>
      <path d="M33 8.2 L35 10.4 L33 12.6 L31 10.4 Z" fill="#b3a4f2"/><rect x="36.4" y="9.800" width="5" height="1.2" rx=".6" fill="#fff" opacity=".8"/>
      <ellipse cx="15.0" cy="21.0" rx="1.9" ry=".8" transform="rotate(35 15.0 21.0)" fill="#8f7fd0" opacity=".4"/><ellipse cx="14.1" cy="18.4" rx="1.9" ry=".8" transform="rotate(43 14.1 18.4)" fill="#8f7fd0" opacity=".4"/><ellipse cx="13.2" cy="15.8" rx="1.9" ry=".8" transform="rotate(51 13.2 15.8)" fill="#8f7fd0" opacity=".4"/><ellipse cx="12.3" cy="13.2" rx="1.9" ry=".8" transform="rotate(59 12.3 13.2)" fill="#8f7fd0" opacity=".4"/><ellipse cx="55.0" cy="21.0" rx="1.9" ry=".8" transform="rotate(-35 55.0 21.0)" fill="#8f7fd0" opacity=".4"/><ellipse cx="55.9" cy="18.4" rx="1.9" ry=".8" transform="rotate(-43 55.9 18.4)" fill="#8f7fd0" opacity=".4"/><ellipse cx="56.8" cy="15.8" rx="1.9" ry=".8" transform="rotate(-51 56.8 15.8)" fill="#8f7fd0" opacity=".4"/><ellipse cx="57.7" cy="13.2" rx="1.9" ry=".8" transform="rotate(-59 57.7 13.2)" fill="#8f7fd0" opacity=".4"/>
      <text x="35" y="18.800" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="4.800" letter-spacing=".7" fill="#e9e6f2">CERTIFICATE</text>
      <rect x="27" y="21" width="16" height=".8" rx=".4" fill="#cfc8ea" opacity=".6"/>
      <text x="35" y="33" text-anchor="middle" font-family="Raleway, system-ui, sans-serif" font-weight="800" font-size="10" letter-spacing=".7" fill="#fff">AI PM</text>
      <rect x="12" y="39" width="12" height="1.2" rx=".6" fill="#fff" opacity=".8"/><rect x="14.5" y="41.800" width="7" height=".8" rx=".4" fill="#fff" opacity=".35"/>
      <path d="M45 39.800 q1.500 -3 3 0 t3 -.5 q1.500 -2.500 3 0 t3.500 -.6" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round" opacity=".9"/><rect x="46" y="41.800" width="11" height=".8" rx=".4" fill="#fff" opacity=".35"/>
      <path d="M34 3.6 H66.4 V30 Z" fill="url(#mGlare)" opacity=".35"/>` },
    slate: { w: 64, h: 50, say: "She taught children through an NGO. A purr-fect teacher.", svg: `
      <rect x="0" y="0" width="64" height="50" rx="1.5" fill="url(#mWood)"/>
      <rect x="3.4" y="3.4" width="57.2" height="43.2" fill="none" stroke="#4d2b18" stroke-width=".9"/>
      <rect x="4" y="4" width="56" height="42" fill="url(#mBoard)"/>
      <ellipse cx="40" cy="20" rx="17" ry="8" fill="#fff" opacity=".045"/>
      <filter id="fChalk" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.5"/></filter>
      <g filter="url(#fChalk)" fill="none" stroke="#f3f0e6" stroke-linecap="round" stroke-linejoin="round">
        <g stroke-width="1.9" opacity=".9">
          <path d="M12.5 28.4 L17.4 14.4 L22.8 28 M14.4 23.4 L21 22.7"/>
          <path d="M28.2 14.6 L27.6 28.3 M28 15 Q35.6 14 34.9 18.3 Q34.3 21.2 28.3 21.5 Q36.9 21.2 36.1 25.5 Q35.300 28.800 27.700 28.200"/>
          <path d="M51.5 17.8 Q48.5 13.500 44.600 15.700 Q40.900 18.300 41.500 23.100 Q42.300 28.800 47.500 28.300 Q50.500 27.900 51.900 25.100"/>
        </g>
        <g stroke-width=".7" stroke="#1f2a25" opacity=".55" stroke-dasharray=".8 2.6">
          <path d="M12.5 28.4 L17.4 14.4 L22.8 28"/><path d="M28.2 14.6 L27.6 28.3 M28 15 Q35.6 14 34.9 18.3 Q34.3 21.2 28.3 21.5 Q36.9 21.2 36.1 25.5 Q35.300 28.800 27.700 28.200"/>
          <path d="M51.5 17.8 Q48.5 13.500 44.600 15.700 Q40.900 18.300 41.500 23.100 Q42.300 28.800 47.500 28.300 Q50.500 27.900 51.900 25.100"/>
        </g>
        <path d="M17 34.200 Q24 32.600 31 33.800 T46.500 33.400" stroke-width="1.1" opacity=".55"/>
      </g>
      <rect x="45" y="41.2" width="10" height="3" rx="1.2" fill="#f3f0e6"/><rect x="45" y="43.2" width="10" height="1" rx=".5" fill="#b9b3a2"/>` },
    // a tablet on a stand, showing a lesson: a video with a play button, the chapters down
    // the side and a progress bar underneath
    tablet: { w: 84, h: 62, say: "Edtech, her main chapter. Press play. I will paws it.", svg: `
      <radialGradient id="gTab"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".5"/><stop offset=".5" stop-color="#f5ca62" stop-opacity=".16"/><stop offset="1" stop-color="#f5ca62" stop-opacity="0"/></radialGradient>
      <linearGradient id="gVid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a64d2"/><stop offset="1" stop-color="#2b409a"/></linearGradient>
      <ellipse cx="42" cy="28" rx="64" ry="46" fill="url(#gTab)"/>
      <path d="M30 54 H54 L60 62 H24 Z" fill="url(#mSilver)"/><rect x="24" y="60.600" width="36" height="1.400" rx=".7" fill="#8e939c"/>
      <rect x="2" y="0" width="80" height="56" rx="4.500" fill="url(#mSilver)"/>
      <rect x="3.600" y="1.600" width="76.800" height="52.800" rx="3.200" fill="#0b0d10"/>
      <rect x="6" y="4" width="72" height="48" rx="1" fill="#f8f2e0"/>
      <rect x="6" y="4" width="72" height="6.500" fill="#df5c2c"/><circle cx="10.500" cy="7.200" r="1.500" fill="#fff"/><rect x="14" y="6.500" width="16" height="1.500" rx=".7" fill="#fff" opacity=".9"/>
      <rect x="10" y="13.500" width="42" height="24" rx="2" fill="url(#gVid)"/>
      <path d="M10 33 L20 24 L27 30 L36 20 L52 34 V35.500 Q52 37.500 50 37.500 H12 Q10 37.500 10 35.500 Z" fill="#fff" opacity=".12"/>
      <circle cx="31" cy="25.500" r="7.200" fill="#fff" opacity=".96"/>
      <path class="tab-play" d="M28.800 21.600 L35.600 25.500 L28.800 29.400 Z" fill="#df5c2c"/>
      <path class="tab-pause" d="M28.300 22 V29 M33.700 22 V29" stroke="#df5c2c" stroke-width="2.200" stroke-linecap="round"/>
      <rect x="10" y="41.500" width="42" height="2.400" rx="1.200" fill="#d8cfb6"/><rect class="tab-prog" x="10" y="41.500" width="42" height="2.400" rx="1.200" fill="#f5b83a"/>
      <rect x="10" y="46.500" width="20" height="1.500" rx=".7" fill="#17191d" opacity=".5"/><rect x="33" y="46.500" width="9" height="1.500" rx=".7" fill="#17191d" opacity=".25"/>
      <rect x="57" y="14" width="4.6" height="4.6" rx="1" fill="#df5c2c"/><rect x="63.6" y="15.6" width="9" height="1.5" rx=".7" fill="#17191d" opacity=".4"/><path d="M58 16.4 l1.100 1.100 l2 -2.200" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/><rect x="57" y="21.5" width="4.6" height="4.6" rx="1" fill="#df5c2c"/><rect x="63.6" y="23.1" width="7" height="1.5" rx=".7" fill="#17191d" opacity=".4"/><path d="M58 23.9 l1.100 1.100 l2 -2.200" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/><rect x="57" y="29" width="4.6" height="4.6" rx="1" fill="#cfc6ad"/><rect x="63.6" y="30.6" width="9" height="1.5" rx=".7" fill="#17191d" opacity=".4"/>
      <path class="tab-star" d="M66 37.500 L67.800 41.300 L72 41.800 L68.900 44.600 L69.800 48.700 L66 46.600 L62.200 48.700 L63.100 44.600 L60 41.800 L64.200 41.300 Z" fill="#f5b83a" stroke="#c98a12" stroke-width=".5"/>
      <path d="M48 4 H78 V32 Z" fill="url(#mGlare)" opacity=".45"/>
      <circle cx="42" cy="2.800" r=".7" fill="#3a3f48"/>` },
    // a small NBFC office in the shape of a bank: stone steps, four columns and a pediment, with a slot under the frieze
    // that a bond comes out of
    bank: { w: 64, h: 60, say: "NBFC compliance. Every rule fur-mally followed.", svg: `
      <rect x="0" y="55" width="64" height="5" rx="1" fill="#cfc8b4"/><rect x="0" y="55" width="64" height="1" fill="#fff" opacity=".5"/>
      <rect x="3" y="50.500" width="58" height="4.500" fill="#ddd6c3"/><rect x="3" y="50.500" width="58" height="1" fill="#fff" opacity=".5"/>
      <rect x="6" y="25" width="52" height="25.500" fill="#8f8a7c"/>
      <path d="M27.500 50.500 V37 Q27.500 33 32 33 Q36.500 33 36.500 37 V50.500 Z" fill="#1b2350"/><path d="M32 33.500 V50.500" stroke="#3f59c3" stroke-width=".6" opacity=".7"/>
      <rect x="8" y="26.5" width="6" height="22" fill="url(#mPaper)"/><rect x="7" y="25" width="8" height="2" rx=".5" fill="#f4efe0"/><rect x="7" y="48" width="8" height="2" rx=".5" fill="#d8d1bd"/><path d="M10 27.5 V47.500 M12 27.5 V47.500" stroke="#17191d" stroke-width=".5" opacity=".14"/><rect x="22" y="26.5" width="6" height="22" fill="url(#mPaper)"/><rect x="21" y="25" width="8" height="2" rx=".5" fill="#f4efe0"/><rect x="21" y="48" width="8" height="2" rx=".5" fill="#d8d1bd"/><path d="M24 27.5 V47.500 M26 27.5 V47.500" stroke="#17191d" stroke-width=".5" opacity=".14"/><rect x="36" y="26.5" width="6" height="22" fill="url(#mPaper)"/><rect x="35" y="25" width="8" height="2" rx=".5" fill="#f4efe0"/><rect x="35" y="48" width="8" height="2" rx=".5" fill="#d8d1bd"/><path d="M38 27.5 V47.500 M40 27.5 V47.500" stroke="#17191d" stroke-width=".5" opacity=".14"/><rect x="50" y="26.5" width="6" height="22" fill="url(#mPaper)"/><rect x="49" y="25" width="8" height="2" rx=".5" fill="#f4efe0"/><rect x="49" y="48" width="8" height="2" rx=".5" fill="#d8d1bd"/><path d="M52 27.5 V47.500 M54 27.5 V47.500" stroke="#17191d" stroke-width=".5" opacity=".14"/>
      <rect x="4" y="16" width="56" height="9" fill="#e9e3d2"/><rect x="4" y="16" width="56" height="1.100" fill="#fff" opacity=".6"/><rect x="4" y="24" width="56" height="1" fill="#000" opacity=".14"/>
      <text x="32" y="21.900" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="4.600" letter-spacing="1.600" fill="#5a5547">NBFC</text>
      <path d="M2 16 L32 2 L62 16 Z" fill="url(#mPaper)"/><path d="M8.500 14.300 L32 3.900 L55.500 14.300 Z" fill="none" stroke="#a69f8b" stroke-width=".7"/>
      <circle cx="32" cy="10.300" r="2.600" fill="url(#mBrass)"/>
      <path d="M44 16 L62 16 L32 2 L36 4 Z" fill="#000" opacity=".06"/>
      <rect x="17.500" y="24.200" width="29" height="1.500" rx=".7" fill="#17191d"/>
      <g class="bond">
        <rect x="19" y="25" width="26" height="18" rx=".9" fill="#f6f1e1"/><rect x="20.400" y="26.400" width="23.200" height="15.200" fill="none" stroke="#3f59c3" stroke-width=".8"/>
        <rect x="23.500" y="29" width="17" height="1.500" rx=".7" fill="#17191d" opacity=".7"/><rect x="23.500" y="32.300" width="10" height="1" rx=".5" fill="#17191d" opacity=".35"/><rect x="23.500" y="34.900" width="8" height="1" rx=".5" fill="#17191d" opacity=".35"/><rect x="23.500" y="37.500" width="6" height="1" rx=".5" fill="#17191d" opacity=".35"/>
        <circle cx="38.200" cy="36.200" r="3" fill="url(#mGold)"/>
      </g>` },
    padlock: { w: 44, h: 56, say: "SAWO Labs. Passwords? Fur-get them.", svg: `
      <g class="lock-up">
      <path d="M12 30 V18 C12 3 32 3 32 18 V30" fill="none" stroke="#7f858e" stroke-width="5.4" stroke-linecap="round"/>
      <path d="M26.5 6.6 C30.6 8.6 32.4 12.6 32.4 18 V26" fill="none" stroke="#f4f5f7" stroke-width="1.5" stroke-linecap="round" opacity=".9"/>
      <rect x="4" y="26" width="36" height="30" rx="4" fill="url(#mBrass)"/>
      <rect x="4" y="26" width="36" height="1.4" rx=".7" fill="#fff" opacity=".5"/>
      <path d="M4 30 Q4 26 8 26 H11 Q8 27 8 31 V51 Q8 55 11 56 H8 Q4 56 4 52 Z" fill="#000" opacity=".16"/>
      <path d="M7 49.5 H37" stroke="#7a5514" stroke-width=".8" opacity=".6"/>
      <circle cx="22" cy="37" r="5.6" fill="#7a5514" opacity=".35"/><circle cx="22" cy="37" r="3" fill="#17191d"/><rect x="20.8" y="38" width="2.4" height="8" rx="1" fill="#17191d"/>
      </g>
      <g class="lock-down">
        <rect x="-13" y="48.4" width="22" height="4.6" rx="2.3" fill="#7f858e"/><rect x="-13" y="48.4" width="22" height="1.3" rx=".6" fill="#f4f5f7" opacity=".8"/>
        <rect x="5" y="43.5" width="36" height="12.5" rx="3" fill="url(#mBrass)"/><rect x="5" y="43.5" width="36" height="1.4" rx=".7" fill="#fff" opacity=".5"/>
        <path d="M8 52.4 H38" stroke="#7a5514" stroke-width=".8" opacity=".6"/>
      </g>` },
  };
  // Thin, upright things. The cat cannot stand on a sheet of paper or a screen edge, so it walks
  // in front of these at shelf level; everything else is solid and it walks over the top.
  for (const name of ["laptop", "bib", "chart", "cert", "slate", "tablet"]) things[name].flat = true;   // (the laptop is made walkable again when placed)
  // drawn a little larger than the books' scale, so they hold their own beside them
  for (const [name, t] of Object.entries(things)) {
    const k = (tier.sizes && tier.sizes[name]) || (TEXTY.includes(name) ? tier.text : tier.plain);
    t.vw = t.w; t.vh = t.h; t.w = Math.round(t.w * k); t.h = Math.round(t.h * k);
  }
  const thing = name => {
    const t = things[name], node = el("div", "thing");
    if (t.flat) node.classList.add("is-flat");
    node.style.width = t.w + "px"; node.style.height = t.h + "px";
    // a soft contact shadow underneath grounds each object on the shelf
    node.innerHTML = `<svg viewBox="0 0 ${t.vw} ${t.vh}" width="${t.w}" height="${t.h}" focusable="false">
      <ellipse cx="${t.vw / 2 - 2}" cy="${t.vh - 0.6}" rx="${t.vw * 0.48}" ry="2.2" fill="#000" opacity=".4"/>${t.svg}</svg>`;
    return node;
  };
  // what sits on each run, in order, going downhill from the bookend
  const PLANS = {
    wide: [
      /* Work   */ [{ books: 4 }, { obj: "laptop" }, { books: 3, slump: true }, { obj: "reader" }, { books: 4 }, { obj: "car" }],
      /* Play   */ [{ books: 5 }, { obj: "kettlebell" }, { books: 5, lean: "bib" }, { obj: "handbag" }, { books: 4, slump: true }],
      /* About  */ [{ books: 3 }, { books: 3, lean: "chart" }, { pile: 3, top: "cap" }, { books: 3, lean: "cert" }, { books: 3, lean: "slate" }],
      /* Resume */ [{ books: 5 }, { obj: "tablet" }, { books: 4, slump: true }, { obj: "bank" }, { books: 4 }, { obj: "padlock" }],
    ],
    mid: [
      [{ books: 3 }, { obj: "laptop" }, { books: 2, slump: true }, { obj: "reader" }, { books: 3 }, { obj: "car" }],
      [{ books: 3 }, { obj: "kettlebell" }, { books: 3, lean: "bib" }, { obj: "handbag" }, { books: 3, slump: true }],
      [{ books: 2 }, { books: 2, lean: "chart" }, { pile: 2, top: "cap" }, { books: 2, lean: "cert" }, { books: 2, lean: "slate" }],
      [{ books: 3 }, { obj: "tablet" }, { books: 3, slump: true }, { obj: "bank" }, { books: 3 }, { obj: "padlock" }],
    ],
    small: [
      [{ books: 2 }, { obj: "laptop" }, { obj: "reader" }, { books: 2 }, { obj: "car" }],
      [{ books: 2 }, { obj: "kettlebell" }, { books: 2, lean: "bib" }, { obj: "handbag" }, { books: 2, slump: true }],
      [{ books: 1 }, { books: 1, lean: "chart" }, { pile: 2, top: "cap" }, { books: 1, lean: "cert" }, { books: 1, lean: "slate" }],
      [{ books: 2 }, { obj: "tablet" }, { books: 2, slump: true }, { obj: "bank" }, { books: 1 }, { obj: "padlock" }],
    ],
    // on phones the heavier keepsakes each stand on a book of their own (fit: a book cut to their width)
    phone: [
      [{ books: 2 }, { pile: 1, fit: true, top: "laptop" }, { books: 1 }, { obj: "reader" }, { pile: 1, fit: true, top: "car" }],
      [{ pile: 1, fit: true, top: "kettlebell" }, { books: 2, lean: "bib" }, { obj: "handbag" }, { books: 2 }],
      [{ books: 1, lean: "chart" }, { obj: "cap" }, { books: 1, lean: "cert" }, { obj: "slate" }],
      [{ books: 2 }, { obj: "tablet" }, { books: 2 }, { pile: 1, fit: true, top: "bank" }, { books: 1 }, { obj: "padlock" }],
    ],
    tiny: [
      [{ books: 2 }, { pile: 1, fit: true, top: "laptop" }, { books: 1 }, { obj: "reader" }, { pile: 1, fit: true, top: "car" }],
      [{ pile: 1, fit: true, top: "kettlebell" }, { books: 2, lean: "bib" }, { obj: "handbag" }, { books: 2 }],
      [{ books: 1, lean: "chart" }, { obj: "cap" }, { books: 2 }, { books: 1, lean: "cert" }],
      [{ books: 2 }, { obj: "tablet" }, { books: 2 }, { pile: 1, fit: true, top: "bank" }, { books: 1 }, { obj: "padlock" }],
    ],
  };
  const plans = PLANS[tier.name];

  const SCRATCHED = ["handbag", "slate", "cert", "chart", "bib"];   // things the cat scratches
  // the solid outline of each keepsake, for books that fall against it (see kick, below)
  const HIT = {   // [how far in from its edge the solid part starts, how much of its height is solid]
    laptop: [0.14, 1], reader: [0.16, 0.95], car: [0.04, 0.6], kettlebell: [0.16, 0.72], bib: [0.04, 0.92],
    handbag: [0.06, 0.72], chart: [0.04, 0.94], cert: [0.04, 0.94], slate: [0.04, 0.94], bank: [0.05, 0.78],
    padlock: [0.1, 0.56], cap: [0, 0.62], tablet: [0.04, 0.94],
  };
  const fit = $("fit");
  const stage = $("stage");
  stage.style.width = W + "px"; stage.style.height = H + "px";
  stage.classList.add("t-" + tier.name);
  if (tier.phone) stage.classList.add("t-phone");
  document.getElementById("ribbon").setAttribute("viewBox", `0 0 ${W} ${H}`);
  const cast = $("cast");
  const cat = $("cat");
  const groups = [], rowEls = [], lits = [], locks = [];
  const lights = el("div", "lights");
  stage.insertBefore(lights, cat);
  /* ---------- four plant pots, one per shelf, that the cat shoves along as it walks through ---------- */
  // They sit in their own layer, outside the one that casts the long shadows, so sliding them
  // does not redraw those shadows.
  const potLayer = el("div", "pots");
  stage.insertBefore(potLayer, lights);
  const POT_W = 40, POT_H = 66, pots = [];
  const POT = `<path d="M7 45 H33 L29.6 66 H10.4 Z" fill="url(#mPot)"/><rect x="4" y="38" width="32" height="8" rx="2" fill="url(#mPot)"/>
    <rect x="4" y="38" width="32" height="1.6" rx=".8" fill="#f3b98c" opacity=".8"/><path d="M7 46 H33 L32.6 48.5 H7.4 Z" fill="#000" opacity=".2"/>`;
  const PLANTS = [
    /* snake plant */ `<path d="M15 39 C7 30 6 19 7 8 C13 17 16 28 17 39 Z" fill="url(#mLeafDk)"/><path d="M25 39 C33 31 34 21 33 11 C27 19 24 29 23 39 Z" fill="url(#mLeafDk)"/>
      <path d="M20 39 C14 27 15 12 19 1 C24 12 25 27 20 39 Z" fill="url(#mLeaf)"/><path d="M19.6 6 C18.6 18 19 30 20 38" fill="none" stroke="#dff0b8" stroke-width=".9" opacity=".6"/>`,
    /* cactus */ `<rect x="13" y="12" width="14" height="28" rx="7" fill="url(#mLeaf)"/><path d="M27 27 H31 Q34 27 34 23 V19" fill="none" stroke="url(#mLeafDk)" stroke-width="5" stroke-linecap="round"/>
      <path d="M13 30 H10 Q7 30 7 26 V24" fill="none" stroke="url(#mLeafDk)" stroke-width="5" stroke-linecap="round"/>
      <path d="M17 16 V36 M23 16 V36" stroke="#2c5526" stroke-width=".8" opacity=".5"/><circle cx="20" cy="11" r="3.4" fill="#e8734a"/><circle cx="20" cy="11" r="1.3" fill="#f5ca62"/>`,
    /* leafy */ `<path d="M20 39 V16 M20 30 Q12 26 10 19 M20 26 Q28 22 31 14" fill="none" stroke="#3f7334" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="9" cy="16" rx="6.5" ry="8" transform="rotate(-24 9 16)" fill="url(#mLeafDk)"/><ellipse cx="32" cy="11" rx="6.5" ry="8.5" transform="rotate(26 32 11)" fill="url(#mLeaf)"/>
      <ellipse cx="20" cy="9" rx="7" ry="9" fill="url(#mLeaf)"/><path d="M20 2 V16" stroke="#dff0b8" stroke-width=".8" opacity=".5"/>`,
    /* succulent */ `<path d="M20 40 C8 38 3 30 3 23 C11 25 17 31 20 40 Z" fill="url(#mLeafDk)"/><path d="M20 40 C32 38 37 30 37 23 C29 25 23 31 20 40 Z" fill="url(#mLeafDk)"/>
      <path d="M20 40 C11 33 10 23 12 15 C18 21 21 30 20 40 Z" fill="url(#mLeaf)"/><path d="M20 40 C29 33 30 23 28 15 C22 21 19 30 20 40 Z" fill="url(#mLeaf)"/>
      <path d="M20 40 C15 30 16 20 20 12 C24 20 25 30 20 40 Z" fill="#a9d68a"/>`,
  ];
  const perches = []; // per run: things the cat can stand on, in stage units

  shelves.forEach((shelf, r) => {
    const rand = rng(977 + r * 131);
    const group = el("div", "group");
    const list = [];
    const place = (node, x, w, h) => {
      const xc = x + w / 2, foot = surface(r, xc);
      node.style.left = x + "px"; node.style.top = foot - h + "px";
      node.style.setProperty("--slope", slopeDeg(r, xc).toFixed(2) + "deg");
      group.appendChild(node);
      const item = { node, x0: x, x1: x + w, x: xc, top: foot - h, standing: false, flat: node.classList.contains("is-flat"), row: r };
      list.push(item);
      return item;
    };
    // Tooling on the spines and the magazines draw on their own run of random numbers, so
    // adding or changing them never moves a book, a keepsake or a pot.
    const deco = rng(4201 + r * 59);
    let sets = 0;      // one numbered set a shelf is plenty
    const MARKS = ["", "m-bands", "m-bands", "m-label", "m-label", "m-dot", "m-title", "m-frame", "m-frame", "m-panel", "m-blocks", "m-blocks"];
    const ROMAN = ["I", "II", "III", "IV"];
    const dark = hex => { const n = parseInt(hex.slice(1), 16); return 0.299 * (n >> 16) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255) < 120; };
    const spine = (w, h, color, vol) => {
      const b = el("div", "wbook");
      b.style.width = w + "px"; b.style.height = h + "px";
      b.style.setProperty("--c", palette[color]);
      if (dark(palette[color])) b.classList.add("dk");
      if (vol) {       // one volume of a set
        b.classList.add("m-series");
        const n = el("span", "num"); n.textContent = ROMAN[vol - 1]; b.appendChild(n);
        return b;
      }
      const mark = MARKS[Math.floor(deco() * MARKS.length)];
      if (mark) b.classList.add(mark);
      return b;
    };
    // a few magazines: one book's worth of shelf taken by a handful of thin, floppy spines
    const magazines = (w, h) => {
      const count = Math.max(3, Math.round(w / 6.5)), each = w / count, list = [];
      for (let i = 0; i < count; i++) {
        const tall = h - 4 - Math.floor(deco() * 15);
        const m = el("div", "wbook mag");
        m.style.width = each + "px"; m.style.height = tall + "px";
        m.style.setProperty("--c", palette[pick(deco, null)]);
        list.push({ node: m, at: i * each, w: each, h: tall });
      }
      return list;
    };

    const end = el("div", "bookend");
    const label = el("span"); label.textContent = shelf.name; end.appendChild(label);
    // every shelf is labelled by a bookend at its left end
    const openRight = false;
    if (openRight) end.classList.add("right");
    {
      // the bookend's top is a slope up to its upright plate, not a flat box
      end.style.width = END_W + "px"; end.style.height = END_H + "px";
      const it = place(end, openRight ? R - END_W : L, END_W, END_H);
      const rise = END_H * 0.62, run = END_W * 0.58;
      it.slope = x => {
        const along = openRight ? it.x1 - x : x - it.x0;
        return it.top + rise * Math.max(0, 1 - along / run);
      };
    }
    // The lit state of the bookend is a separate copy laid over it, outside the layer that casts
    // the shadows. Fading it in then repaints nothing in that layer, so the shadows stay steady.
    const lit = end.cloneNode(true);
    lit.classList.add("lit");
    const glow = el("div", "lamp-glow");
    glow.style.left = parseFloat(end.style.left) + END_W / 2 - 235 + 40 + "px";
    glow.style.top = parseFloat(end.style.top) + 46 - 165 + "px";
    const dim = el("div", "rowdim");
    dim.style.top = rowY(r) - 166 + "px";
    lights.append(dim, glow, lit);
    lit.glow = glow; lit.dim = dim;
    lits.push(lit);

    // Each shelf's plan is laid out from the bookend outwards (u counts away from it).
    // The shelves are level, so nothing needs a peg to stop it sliding.
    const span = R - L - END_W - 3;
    const at = (u, w) => (openRight ? R - END_W - 3 - u - w : L + END_W + 3 + u);
    const placeU = (node, u, w, h) => place(node, at(u, w), w, h);
    const peg = u => {
      const node = el("div", "stopper");
      const x = at(u, 9), xc = x + 4.5, foot = surface(r, xc);
      node.style.left = x + "px"; node.style.top = foot - 24 + "px";
      node.style.setProperty("--slope", slopeDeg(r, xc).toFixed(2) + "deg");
      group.appendChild(node);
    };
    // something that has slumped onto its neighbour pivots on the foot nearest it
    // what the keepsake is, for the cat's dealings with it (see "what the cat does with things")
    const tag = (item, kind) => {
      item.kind = kind;
      item.node.classList.add("k-" + kind);
      const foot = surface(r, item.x);
      // The laptop is walked across on its keyboard, in front of the screen.
      if (kind === "laptop") { const keys = item.top + things.laptop.h - 13; item.flat = false; item.slope = () => keys; }
      // the marks the cat leaves when it scratches something
      if (SCRATCHED.includes(kind)) item.node.insertAdjacentHTML("beforeend",
        `<svg class="claws" viewBox="0 0 30 30" focusable="false"><path d="M7 5 L13 25"/><path d="M14 4 L20 25"/><path d="M21 5 L26 24"/></svg>`);
    };
    // a leaner's top hangs over the gap between its foot and whatever it rests on, so that gap
    // is not free space for anything else to fall into
    const leansOver = (item, gap) => { if (openRight) item.x0 -= gap; else item.x1 += gap; };
    const slumped = (node, h, deg) => {
      node.style.setProperty("--tilt", (openRight ? -deg : deg) + "deg");
      node.style.setProperty("--origin", openRight ? "0% 100%" : "100% 100%");
      return Math.ceil(h * Math.sin((deg * Math.PI) / 180)) + 1;
    };
    let last = null, height = 92;
    const PEG = { w: 0, put: () => {} };
    const segments = plans[r].map(seg => {
      const parts = [];
      if (seg.obj) {
        const t = things[seg.obj];
        parts.push({ w: t.w, put: u => { const it = placeU(thing(seg.obj), u, t.w, t.h); it.say = t.say; it.hit = HIT[seg.obj]; tag(it, seg.obj); } }, PEG);
      } else if (seg.pile) {
        const pile = el("div", "stack");
        let widest = 0, tall = 0;
        for (let i = 0; i < seg.pile; i++) {
          const c = pick(rand, last); last = c;
          const w = seg.fit ? things[seg.top].w + 10 + Math.floor(rand() * 8) : 100 + Math.floor(rand() * 20) - i * 6, h = 16 + Math.floor(rand() * 6);
          pile.appendChild(spine(w, h, c)); widest = Math.max(widest, w); tall += h;
        }
        const t = things[seg.top];
        pile.appendChild(thing(seg.top)); tall += t.h;
        parts.push({ w: widest, put: u => { const it = placeU(pile, u, widest, tall); it.say = t.say; it.hit = HIT[seg.top]; tag(it, seg.top); } }, PEG);
      } else {
        if (seg.lean) {
          const t = things[seg.lean], node = thing(seg.lean);
          const gap = slumped(node, t.h, 11);
          parts.push({ w: t.w + gap, put: u => { const it = placeU(node, u, t.w, t.h); it.say = t.say; it.hit = HIT[seg.lean]; tag(it, seg.lean); leansOver(it, gap); } });
        }
        if (seg.slump) {
          const c = pick(rand, last); last = c;
          const w = 22 + Math.floor(rand() * 8), h = 84 + Math.floor(rand() * 18), deg = 8 + Math.floor(rand() * 5);
          const b = spine(w, h, c);
          b.dataset.tilt = (openRight ? -deg : deg) + "deg";
          const gap = slumped(b, h, deg);
          parts.push({ w: w + gap, put: u => { const it = placeU(b, u, w, h); it.standing = true; leansOver(it, gap); } });
        }
        let set = null, setColor = null;     // a run of volumes: one colour, one height, numbered
        for (let i = 0; i < seg.books; i++) {
          let c = pick(rand, last); last = c;
          const w = 22 + Math.floor(rand() * 11);
          height = Math.max(80, Math.min(106, height + Math.floor(rand() * 19) - 9));
          let h = height, vol = 0;
          if (!set && !sets && seg.books - i >= 3 && deco() < 0.3 && ++sets) set = { c, h, k: 0, n: Math.min(seg.books - i, 3 + Math.floor(deco() * 2)) };
          if (set) {
            c = set.c; h = set.h; vol = ++set.k;
            if (set.k === set.n) { setColor = set.c; set = { done: true, k: 0, n: -1 }; }
          } else if (setColor !== null) { if (c === setColor) c = pick(deco, setColor); setColor = null; }
          if (set && set.done) set = null;
          const b = spine(w, h, c, vol);
          if (rand() < 0.06) {
            const band = palette[pick(rand, c)], top = 44 + Math.floor(rand() * 22), tall = 9 + Math.floor(rand() * 7);
            if (!vol) {       // a volume of a set keeps its numeral
              b.className = "wbook band";
              b.style.setProperty("--band", band);
              b.style.setProperty("--band-top", top + "%");
              b.style.setProperty("--band-h", tall + "%");
            }
          }
          if (!vol && i > 0 && w >= 25 && deco() < 0.2) {
            const mags = magazines(w, h);     // the same width as the book they replace
            parts.push({ w, put: u => { for (const m of mags) placeU(m.node, u + (openRight ? w - m.at - m.w : m.at), m.w, m.h).standing = true; } });
          } else parts.push({ w, put: u => { placeU(b, u, w, h).standing = true; } });
        }
        parts.push(PEG);
      }
      return parts;
    });
    // spread what is left of the run evenly between the segments, as bare shelf
    const used = segments.flat().reduce((sum, part) => sum + part.w, 0);
    const gap = Math.max(tier.gap, Math.min(120, (span - used) / (segments.length - 1)));
    // Uneven spacing reads as a lived-in shelf: on each shelf one gap is tight, so an object
    // sits close against its neighbour, one is wide, and the rest fall in between.
    const gaps = segments.slice(1).map(() => 0.75 + rand() * 0.4);
    const tight = Math.floor(rand() * gaps.length);
    let wide = Math.floor(rand() * gaps.length);
    if (wide === tight) wide = (wide + 1) % gaps.length;
    gaps[tight] = 0.3; gaps[wide] = 1.9;
    const share = gaps.length / gaps.reduce((sum, g) => sum + g, 0);   // keep the same total
    let u = 0, clearing = null;
    segments.forEach((parts, i) => {
      if (i) {
        const width = Math.max(Math.min(12, tier.gap), gap * gaps[i - 1] * share);
        if (i - 1 === wide) clearing = [u, u + width];   // the wide gap is where this shelf's pot lives
        u += width;
      }
      for (const part of parts) { part.put(u); u += part.w; }
    });
    if (tier.pots && clearing && clearing[1] - clearing[0] >= POT_W + 14) {
      const a = at(clearing[0], 0), b = at(clearing[1], 0);
      const lo = Math.min(a, b) + 4, hi = Math.max(a, b) - 4 - POT_W;
      const x = lo + (hi - lo) * (0.25 + rand() * 0.5), foot = surface(r, x + POT_W / 2);
      const node = el("div", "pot");
      node.style.left = x + "px"; node.style.top = foot - POT_H + "px";
      node.innerHTML = `<svg viewBox="0 0 40 66" width="${POT_W}" height="${POT_H}" focusable="false"><ellipse cx="18" cy="65.4" rx="15" ry="2" fill="#000" opacity=".4"/>${PLANTS[(r + 1) % PLANTS.length]}${POT}</svg>`;
      potLayer.appendChild(node);
      // flat: true keeps the cat from climbing it; it walks at shelf level and pushes instead
      const pot = { node, row: r, home: x, x0: x, x1: x + POT_W, x: x + POT_W / 2, top: foot - POT_H, lo, hi, flat: true, standing: false, pot: true, hit: [0.1, 0.44] };
      pots.push(pot); list.push(pot);
    }
    cast.appendChild(group);
    groups.push(group);
    perches.push(list);

    const row = el("a", "row");
    row.href = shelf.path;
    row.setAttribute("aria-label", shelf.name);
    row.style.top = rowY(r) - 160 + "px";
    stage.insertBefore(row, cat);
    rowEls.push(row);
  });

  for (const list of perches) for (const p of list) if (p.kind === "padlock") locks.push(p);

  /* ---------- the headline plate hangs under the middle of the top shelf ---------- */
  const plaque = $("plaque");
  plaque.style.left = (L + R) / 2 + "px";
  plaque.style.top = rowY(0) + THICK / 2 + 9 + "px";

  /* ---------- fit the whole wall to the screen ---------- */
  let scale = 1;
  const measure = () => {
    const top = fit.getBoundingClientRect().top + window.scrollY;
    // The wall is fitted to the window both ways, so the bottom shelf is never left below the
    // fold. A window that is very short for its width is the exception: there it stops
    // shrinking at 55% of full size and the page scrolls instead.
    const wide = (viewW() - 16) / W, tall = (window.innerHeight - top - 26) / H;
    scale = Math.max(0.2, Math.min(wide, Math.max(tall, 0.55), 1.5));
    stage.style.transform = `scale(${scale})`;
    fit.style.width = W * scale + "px";
    fit.style.height = H * scale + "px";
  };
  measure();
  // a window resized across one of the sizes above gets the wall for its new size
  const retier = () => { if (onRetier) onRetier(); };
  listen(window, "resize", () => { if (tierFor(viewW()) !== tier) retier(); else measure(); });

  /* ---------- where the cat's feet go: the tallest thing under it, else the bare shelf ---------- */
  // The book the cat is about to push is never its footing: it stands beside that book, on
  // whatever else is there, so it does not drop when the book goes.
  let shoved = null;
  // half: how far either side of x counts as under the cat. A perch with a sloping top
  // (the lamp bookends) gives its height at that point rather than one height for all of it.
  const footAt = (r, x, half = 20) => {
    let top = surface(r, x);
    for (const p of perches[r]) {
      if (p.flat || p === shoved || p.x1 <= x - half || p.x0 >= x + half || p.node.classList.contains("pushed")) continue;
      top = Math.min(top, p.slope ? p.slope(Math.min(p.x1, Math.max(p.x0, x))) : p.top);
    }
    return top;
  };
  // for choosing how to rest: the footing right under a point, and how much the surface tilts there
  const restFoot = (x, wide) => footAt(catRow, x, wide ? 20 : 3);
  const restLean = x => {
    const p = perches[catRow].find(q => !q.flat && q !== shoved && q.x0 <= x && q.x1 >= x && !q.node.classList.contains("pushed"));
    if (!p) return 0;
    if (p.slope) return (Math.atan((p.slope(x + 4) - p.slope(x - 4)) / 8) * 180) / Math.PI;
    return p.leanDeg || 0;
  };
  const nearestBook = (r, x) => {
    let best = null, dist = Infinity;
    for (const p of perches[r]) {
      if (!p.standing) continue;
      const dd = Math.abs(p.x - x);
      if (dd < dist) { dist = dd; best = p; }
    }
    return best;
  };

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cur = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  let catRow = 0, hoverRow = null, busy = false, onArrive = null, walking = false, activeShown = -2, straight = [];
  // where the cat has been asked to go; catRow is the shelf it is physically on
  let goalRow = 0;
  const clampX = x => Math.min(R - 10, Math.max(L + 10, x));
  const standOn = (r, x) => {
    // a leaning book is somewhere to walk over, not to stop: aim for whichever end of it is nearer
    const ramp = perches[r].find(p => p.ramp && x > p.x0 && x < p.x1);
    if (ramp) x = Math.abs(x - ramp.low) < Math.abs(x - ramp.high) ? ramp.low - Math.sign(ramp.high - ramp.low) * 24 : ramp.high + Math.sign(ramp.high - ramp.low) * 14;
    target.x = clampX(x); goalRow = r;
  };
  let faceDir = -1;
  const setFace = f => { faceDir = f; cat.style.setProperty("--face", f); };
  const showActive = () => {
    const a = hoverRow ?? catRow;
    if (a === activeShown) return;
    activeShown = a;
    lits.forEach((lit, i) => { lit.classList.toggle("on", i === a); lit.glow.classList.toggle("on", i === a); lit.dim.classList.toggle("on", i !== a); });
    stage.classList.add("has-active");
  };
  // a leaning book stands up straight while any part of the cat is over it
  const straighten = () => {
    const half = cat.offsetWidth * 0.5 + 6;
    const now = perches[catRow].filter(p => p.node.dataset.tilt && Math.abs(p.x - cur.x) < half && Math.abs(cur.y - p.top) < 60).map(p => p.node);
    for (const n of straight) if (!now.includes(n)) n.style.setProperty("--tilt", n.dataset.tilt);
    for (const n of now) n.style.setProperty("--tilt", "0deg");
    straight = now;
  };

  // standing on a keepsake, the cat says what it is about
  const sayEl = $("say"), sayText = sayEl.querySelector(".say-text");
  let said = null, hint = true, sayShift = 0;
  const HINT = TOUCH ? "Tap a keepsake and I will show you. Tap a shelf to open it." : "Move the pointer and I will follow. Click a shelf to open it.";
  const WELCOME = [
    "Work. Where the purr-ojects live.",
    "Play. All work and no play makes a dull kitty.",
    "About. The tail of how she got here.",
    "Resume. Nine lives, one page.",
  ];
  const welcomed = WELCOME.map(() => false);
  let welcome = null;
  const speak = () => {
    const on = busy || jump || goalRow !== catRow ? null : perches[catRow].find(p => p.say && cur.x > p.x0 - 4 && cur.x < p.x1 + 4 && Math.abs(target.x - cur.x) < 30);
    // until the visitor first moves the cat, a sitting cat explains itself
    // the first time it is on a shelf it introduces the shelf, for a few seconds
    const arrived = goalRow === catRow && (!jump || jump.row === catRow);
    if (!hint && !busy && arrived && !welcomed[catRow]) {
      welcomed[catRow] = true;
      welcome = { line: WELCOME[catRow], until: performance.now() + 3600 };
    }
    if (welcome && (performance.now() > welcome.until || busy || !arrived)) welcome = null;
    const line = hint && !busy ? (walking ? null : HINT) : welcome ? welcome.line : on ? on.say : null;
    if (line === said) return;
    said = line;
    if (line) sayText.textContent = line;
    sayEl.classList.toggle("show", !!line);
  };

  standOn(0, L + (R - L) * 0.62);
  cur.x = target.x; cur.y = footAt(0, cur.x);

  /* ---------- the cat moves like a cat ----------
     It walks at its own pace rather than tracking the pointer, hops when the footing changes
     height, leaps between shelves, and when it has nowhere to go it sits facing you and,
     after a moment, licks a paw. */
  /* ---------- kicking a book over ----------
     Jumping down off the end of a row of books kicks the end book. It tips over its outer foot
     and keeps going until something stops it, exactly as a real one would:
       - the next thing is tall and close: the book's top corner comes to rest against its side;
       - the next thing is lower than that: the book comes down onto its top edge and rests there;
       - nothing within a book's height: it falls flat on the shelf;
       - no room, the end of the plank, or something already leaning on it: it stays put.
     Each thing's outline is its box, trimmed where the box is mostly air (a bag's handle,
     a stamp's handle, a plant above its pot). */
  const DEG = 180 / Math.PI;
  const kick = dir => {
    const list = perches[catRow];
    const gone = p => p.node.classList.contains("pushed");
    // the book the cat is standing on, at the end of its row in the direction of travel
    const under = list.filter(p => p.standing && !p.kicked && !p.node.dataset.tilt && !gone(p)
      && p.x1 > cur.x - 22 && p.x0 < cur.x + 22 && Math.abs(p.top - cur.y) < 30);
    const book = under.sort((a, b) => dir * (b.x - a.x))[0];
    if (!book) return;
    const edge = dir > 0 ? book.x1 : book.x0;
    const h = book.node.offsetHeight, w = book.node.offsetWidth, foot = book.top + h;
    // everything on that side, as (distance to its solid face, height of that face)
    let rest = 90, support = null;   // (this `rest` is the angle the book comes to rest at)
    for (const q of list) {
      if (q === book || gone(q)) continue;
      const inset = q.hit ? q.hit[0] * (q.x1 - q.x0) : 0;
      const face = dir > 0 ? q.x0 + inset : q.x1 - inset;
      let g = dir * (face - edge);
      if (dir * (q.x - book.x) <= 0 || g < -6) continue;        // behind the book
      g = Math.max(0, g);
      const tall = Math.max(0, foot - (q.stoodTop ?? q.top)) * (q.hit ? q.hit[1] : 1);   // a lock lying down counts as standing
      let at;
      if (g * g + tall * tall <= h * h) at = Math.atan2(g, tall) * DEG;     // comes down onto its top edge
      else if (g < h) at = Math.asin(g / h) * DEG;                         // top corner meets its side
      else at = 90;                                                        // out of reach
      if (at < rest) { rest = at; support = q; }
    }
    // the end of the plank is not something to lean on: a book only goes down there if it can lie on it
    const plankLeft = dir > 0 ? R + OVERHANG - edge : edge - (L - OVERHANG);
    if (rest === 90 && plankLeft < h + 2) return;
    if (rest < 7) return;                                                   // no room worth the fuss
    if (support && support.kind === "padlock") return;   // leave the padlock free: the cat knocks that over itself
    book.kicked = true; book.leanDeg = dir * rest;
    book.node.style.setProperty("--origin", dir > 0 ? "100% 100%" : "0% 100%");
    book.node.style.setProperty("--tilt", (dir * rest).toFixed(2) + "deg");
    // where it now is
    const flat = rest === 90, rad = rest / DEG;
    const reach = flat ? h : h * Math.sin(rad) ;
    if (dir > 0) { book.x0 = flat ? edge : book.x0; book.x1 = edge + reach; } else { book.x1 = flat ? edge : book.x1; book.x0 = edge - reach; }
    book.x = (book.x0 + book.x1) / 2;
    book.top = flat ? foot - w : foot - h * Math.cos(rad) - w * Math.sin(rad);
    if (flat) book.standing = false;             // lying down: something to step on, not to knock off
    else if (rest >= 22) {
      // Leaning well over, it is a ramp, not a book to stand on top of or to push. Its upper
      // face runs from its lifted foot up to the corner resting on whatever stopped it, and
      // the cat walks up and down that face instead of through it.
      book.standing = false; book.ramp = true;
      const lowX = edge - dir * w * Math.cos(rad), lowY = foot - w * Math.sin(rad);
      const highX = lowX + dir * h * Math.sin(rad), highY = lowY - h * Math.cos(rad);
      book.x0 = Math.min(lowX, highX); book.x1 = Math.max(lowX, highX); book.x = (book.x0 + book.x1) / 2;
      book.low = lowX; book.high = highX;
      book.slope = x => lowY + (highY - lowY) * Math.min(1, Math.max(0, (x - lowX) / (highX - lowX)));
    }
    // a padlock with a book resting on it stays standing from now on
    if (support && support.kind === "padlock") {
      support.pinned = true;
      if (support.stoodTop != null) { support.node.classList.remove("down"); support.top = support.stoodTop; support.stoodTop = null; }
    }
    // pots: one a book is resting on cannot be pushed out from under it; one further along
    // can no longer be pushed back into the space the book now takes
    for (const pot of pots) {
      if (pot.row !== catRow) continue;
      if (pot === support) { pot.pinned = true; continue; }
      if (dir > 0 && pot.x > edge) pot.lo = Math.max(pot.lo, edge + reach + 3);
      if (dir < 0 && pot.x < edge) pot.hi = Math.min(pot.hi, edge - reach - 3 - POT_W);
    }
  };
  /* Walking along the bare shelf into a pot, the cat pushes it ahead until it meets whatever is
     next on the shelf; then the pot just rocks as the cat squeezes past. */
  const CAT_FRONT = 24;
  const rock = pot => {
    if (pot.rocking) return;
    pot.rocking = true; pot.node.classList.add("rock");
    setTimeout(() => { pot.node.classList.remove("rock"); pot.rocking = false; }, 460);
  };
  const slide = (pot, x) => {
    pot.x0 = x; pot.x1 = x + POT_W; pot.x = x + POT_W / 2;
    pot.node.style.transform = `translateX(${(x - pot.home).toFixed(1)}px)`;
  };
  const pushPots = moving => {
    if (!moving || jump) return;
    for (const pot of pots) {
      if (pot.row !== catRow || Math.abs(cur.y - surface(catRow, cur.x)) > 18) continue;
      if (faceDir > 0 && cur.x < pot.x && cur.x + CAT_FRONT > pot.x0) {
        const x = Math.max(pot.x0, Math.min(pot.hi, cur.x + CAT_FRONT));
        if (!pot.pinned && x > pot.x0 + 0.3) slide(pot, x); else rock(pot);
      } else if (faceDir < 0 && cur.x > pot.x && cur.x - CAT_FRONT < pot.x1) {
        const x = Math.min(pot.x0, Math.max(pot.lo, cur.x - CAT_FRONT - POT_W));
        if (!pot.pinned && x < pot.x0 - 0.3) slide(pot, x); else rock(pot);
      }
    }
  };
  const WALK_SPEED = 430;          // stage px per second, flat out
  const CLIMB_SPEED = 300;         // going up a shelf, hand over hand
  const STEP_UP = 34;              // height changes up to this are stepped, not hopped
  let jump = null, climb = null, swung = 0, still = 0, lastTime = performance.now(), landedAt = 0;

  /* ---------- what the cat does with things ----------
     Walking onto a keepsake sets something off. Most happen in passing. For a few the cat
     stops for a moment to use its paw (hold), then carries on to wherever it was going. */
  let hold = null, onItem = null;
  const after = (ms, fn) => setTimeout(fn, ms);
  const flash = (node, cls, ms) => { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); after(ms, () => node.classList.remove(cls)); };
  const pawAt = ms => { hold = { until: performance.now() + ms, started: false }; };
  // the keepsake itself: when it stands on a book of its own, the thing on top of that pile
  const body = item => item.node.querySelector(":scope > .thing") || item.node;
  const ACTS = {
    // the dashboard changes each time it walks across the keyboard
    laptop: item => body(item).classList.toggle("alt"),
    // two coins come up out of the phone, one after the other
    reader: item => flash(body(item), "minting", 1850),
    // the wheels spin
    car: item => flash(body(item), "spin", 2400),
    // the kettlebell rocks
    kettlebell: item => flash(body(item), "shake", 520),
    // it presses play: the lesson runs to the end and earns a star
    tablet: item => {
      if (performance.now() < (item.again || 0)) return;
      item.again = performance.now() + 7000;
      pawAt(1200);
      after(450, () => flash(body(item), "playing", 3700));
    },
    // the stole on the cap comes untied and slips off; it is back three seconds later
    cap: item => {
      if (performance.now() < (item.again || 0)) return;
      item.again = performance.now() + 8000;
      pawAt(1200);
      after(450, () => flash(body(item), "untied", 4100));
    },
    // the bank prints a bond, which floats down past the shelf
    bank: item => flash(body(item), "issuing", 3450),
  };
  // the things it scratches: the marks fade away again after a few seconds, and it leaves
  // the thing alone for a while before it will scratch it again
  for (const kind of SCRATCHED) ACTS[kind] = item => {
    if (performance.now() < (item.again || 0)) return;
    item.again = performance.now() + 16000;
    pawAt(1700);
    after(760, () => { item.node.classList.add("scratched"); flash(item.node, "shake", 520); });
    after(760 + 5500, () => item.node.classList.remove("scratched"));
  };
  // Only the keepsake it was going to sets something off: it passes everything else on the way
  // by, and does its turn with that one once it gets there.
  const meet = () => {
    const there = !jump && goalRow === catRow && Math.abs(target.x - cur.x) < 30;
    const under = !there ? null : perches[catRow].find(p => p.kind && cur.x > p.x0 - 2 && cur.x < p.x1 + 2) || null;
    if (under === onItem) return;
    onItem = under;
    if (under && !busy && ACTS[under.kind]) ACTS[under.kind](under, faceDir);
  };
  // The padlock is knocked flat as the cat reaches it, and stands itself back up a while
  // later, once the cat has moved off. Lying down it is a low slab the cat steps over.
  const tipLocks = moving => {
    if (!moving || jump || busy) return;
    for (const lock of locks) {
      if (lock.down || lock.pinned || lock.row !== catRow) continue;
      if (goalRow !== catRow || target.x < lock.x0 - 40 || target.x > lock.x1 + 40) continue;   // only a padlock it was going to
      const gap = faceDir > 0 ? lock.x0 - cur.x : cur.x - lock.x1;
      if (gap > 30 || gap < -(lock.x1 - lock.x0)) continue;
      const stoodTop = lock.top, foot = lock.top + lock.node.offsetHeight;
      lock.down = true;
      lock.node.style.setProperty("--dir", faceDir);
      lock.node.classList.add("down");
      lock.stoodTop = stoodTop;
      lock.top = foot - 15;
      const standUp = () => {
        if (lock.stoodTop == null) { lock.down = false; return; }     // already stood up, to hold a fallen book
        if (catRow === lock.row && cur.x > lock.x0 - 34 && cur.x < lock.x1 + 34) { after(1200, standUp); return; }
        lock.node.classList.remove("down");
        lock.top = stoodTop; lock.stoodTop = null;
        after(450, () => { lock.down = false; });
      };
      after(5200, standUp);
    }
  };
  // which drawing is showing, and the turn from one to the other
  let pose = "sit", turning = false;
  const turnTo = next => {
    if (turning || pose === next) return;
    const swap = () => { pose = next; cat.classList.toggle("pose-walking", next === "walk"); };
    if (reduced()) { swap(); return; }
    turning = true;
    cat.classList.add("turn-out");
    setTimeout(() => {
      swap();
      cat.classList.remove("turn-out"); cat.classList.add("turn-in");
      setTimeout(() => { cat.classList.remove("turn-in"); turning = false; }, next === "sit" ? 340 : 160);
    }, 130);
  };
  const leap = (x1, row, height, seconds, crouch) => {
    jump = { x0: cur.x, y0: cur.y, x1, y1: footAt(row, x1), row, height, seconds, wait: crouch, t: 0 };
    setFace(x1 < cur.x ? -1 : 1);
  };
  const setClass = (name, on) => { if (cat.classList.contains(name) !== on) cat.classList.toggle(name, on); };
  /* ---------- how the cat rests ---------- */
  const SVG_NS = "http://www.w3.org/2000/svg";
  const sitSvg = cat.querySelector(".pose-sit");
  // the whole sitting cat breathes together: its parts go inside one group
  {
    const breath = document.createElementNS(SVG_NS, "g");
    breath.setAttribute("class", "cat-breath");
    while (sitSvg.firstChild) breath.appendChild(sitSvg.firstChild);
    sitSvg.appendChild(breath);
    for (const pupil of sitSvg.querySelectorAll('.cat-eyes ellipse[rx="3.2"]')) pupil.classList.add("pupil");
    // a front paw that hangs over the edge when it has stopped at one
    breath.insertAdjacentHTML("beforeend", `<g class="cat-dangle">
      <path d="M116 128 C126 138 129 150 127 163" fill="none" stroke="#3b3f48" stroke-width="13" stroke-linecap="round"/>
      <circle cx="127" cy="165" r="8.5" fill="#3b3f48"/>
      <path d="M122 167 L121.5 172 M127 168 L127 173 M132 167 L132.5 172" stroke="#f1ebda" stroke-width="1.5" stroke-linecap="round" opacity=".85"/></g>`);
    // the loaf: a low, wide body with the paws tucked under and the tail laid along the ground,
    // wearing the same head
    const loaf = document.createElementNS(SVG_NS, "svg");
    loaf.setAttribute("class", "cat pose-loaf"); loaf.setAttribute("viewBox", "0 0 184 150"); loaf.setAttribute("focusable", "false");
    loaf.innerHTML = `<g class="cat-breath">
      <path d="M136 141 C160 144 172 130 162 118" fill="none" stroke="var(--cat-ink)" stroke-width="12" stroke-linecap="round"/>
      <path d="M22 150 C16 120 36 99 80 99 C126 99 148 120 142 150 Z" fill="var(--cat-ink)"/>
      <ellipse cx="64" cy="146.5" rx="11" ry="4.5" fill="#3b3f48"/><ellipse cx="96" cy="146.5" rx="11" ry="4.5" fill="#3b3f48"/>
      <g transform="translate(0 29)">${sitSvg.querySelector(".cat-head").outerHTML}</g></g>`;
    sitSvg.after(loaf);
  }
  const rest = { kind: "sit", flip: 1, lean: 0, wide: false, lx: 0, ly: 0 };
  const setRest = (kind, flip, lean) => {
    if (kind !== rest.kind) {
      rest.kind = kind;
      cat.classList.toggle("is-loaf", kind === "loaf");
      cat.classList.toggle("at-edge", kind === "edge");
    }
    if (flip !== rest.flip) { rest.flip = flip; cat.style.setProperty("--sitflip", flip); }
    if (Math.abs(lean - rest.lean) > 0.3) { rest.lean = lean; cat.style.setProperty("--lean", lean.toFixed(1) + "deg"); }
  };
  // as it stops: read the footing just either side of it
  const chooseRest = () => {
    const x = cur.x, here = restFoot(x, true);
    const off = d => restFoot(x + d, false) - here;              // how far the footing drops d px away
    const lean = Math.max(-14, Math.min(14, restLean(x)));
    rest.wide = Math.abs(lean) < 2 && [-36, -24, -12, 12, 24, 36].every(d => Math.abs(off(d)) < 5);
    if (off(18) > 28 && off(-10) < 6) setRest("edge", 1, lean);       // the drop is on its right
    else if (off(-18) > 28 && off(10) < 6) setRest("edge", -1, lean); // on its left: the drawing is mirrored
    else setRest("sit", 1, lean);
  };
  // while it rests: loaf after a good while on wide, level footing; sit up again for a push
  const tendRest = (settled, still, busy) => {
    if (busy) { setRest("sit", 1, 0); return; }
    if (settled && rest.kind === "sit" && rest.wide && still > 9.4) {
      setRest("loaf", 1, 0);
      cat.classList.add("settling");
      setTimeout(() => cat.classList.remove("settling"), 400);
    }
  };
  // its eyes follow the pointer
  let pointerAt = null;
  listen(window, "pointermove", e => { pointerAt = { x: e.clientX, y: e.clientY }; });
  const look = () => {
    if (!pointerAt) return;
    const box = cat.getBoundingClientRect();
    const dx = pointerAt.x - (box.left + box.width / 2), dy = pointerAt.y - (box.top + box.height * 0.4);
    const far = Math.hypot(dx, dy) || 1, pull = Math.min(1, far / 90);
    const lx = (dx / far) * 3.4 * pull * rest.flip, ly = (dy / far) * 2.2 * pull;
    if (Math.abs(lx - rest.lx) + Math.abs(ly - rest.ly) < 0.15) return;
    rest.lx = lx; rest.ly = ly;
    cat.style.setProperty("--look-x", lx.toFixed(2) + "px");
    cat.style.setProperty("--look-y", ly.toFixed(2) + "px");
  };

  const loop = now => {
    // on phones the wall is hidden and the old entrance is showing: do nothing
    if (root.offsetParent === null) { lastTime = now; frame = requestAnimationFrame(loop); return; }
    const dt = Math.min(0.05, (now - lastTime) / 1000); lastTime = now;
    const dx = target.x - cur.x, far = Math.abs(dx);
    // does it have somewhere to be?
    // held: it has stopped to use its paw on something, and goes on when it has finished
    if (hold && (now > hold.until || busy)) { hold = null; cat.classList.remove("is-pawing"); }
    const wants = !hold && (!!jump || !!climb || goalRow !== catRow || far > (walking ? 1.5 : 7));
    if (swung && now > swung) { swung = 0; cat.classList.remove("turn-in"); }
    let moving = false;
    if (reduced()) {
      catRow = goalRow; cur.x = target.x; cur.y = footAt(catRow, cur.x); jump = null; turnTo("sit");
      if (climb) { climb = null; cat.classList.remove("climbing", "climb-up", "turn-out", "turn-in"); }
    } else if (!wants) {
      if (pose !== "sit" && !turning) { chooseRest(); if (hold) setRest("sit", 1, 0); }
      turnTo("sit");                                // stop, and turn to face you
      cur.y += (footAt(catRow, cur.x) - cur.y) * Math.min(1, dt * 20);
    } else if (pose !== "walk") {
      setFace(dx < 0 ? -1 : 1);
      turnTo("walk");                               // turn side-on first, then set off
    } else if (jump) {
      moving = true;
      if (jump.wait > 0) jump.wait -= dt;         // gathering itself before the leap
      else {
        jump.t = Math.min(1, jump.t + dt / jump.seconds);
        const t = jump.t;
        cur.x = jump.x0 + (jump.x1 - jump.x0) * t;
        cur.y = jump.y0 + (jump.y1 - jump.y0) * t - jump.height * 4 * t * (1 - t);
        if (t >= 1) { catRow = jump.row; cur.y = footAt(catRow, cur.x); jump = null; landedAt = now; }
      }
    } else if (climb) {
      // up the wall to a higher shelf: it turns to the wall, goes up paw over paw, and turns back
      moving = true;
      if (climb.wait > 0) { climb.wait -= dt; if (climb.wait <= 0) { cat.classList.remove("turn-out"); cat.classList.add("climbing", "climb-up", "turn-in"); swung = now + 170; } }
      else {
        cur.y = Math.max(climb.y1, cur.y - CLIMB_SPEED * dt);
        if (cur.y <= climb.y1) {
          cat.classList.remove("climbing", "climb-up"); cat.classList.add("turn-in");   // the side-on cat swings round
          swung = now + 170;
          catRow = climb.row; cur.y = footAt(catRow, cur.x); climb = null; landedAt = now;
        }
      }
    } else if (goalRow < catRow) {
      climb = { row: goalRow, y1: footAt(goalRow, cur.x), wait: 0.12 };
      cat.classList.add("turn-out");
      moving = true;
    } else if (goalRow !== catRow) {
      // down to a lower shelf: a leap, mostly down, a little towards where it is headed
      const x1 = clampX(cur.x + Math.max(-150, Math.min(150, dx)));
      const drop = Math.abs(footAt(goalRow, x1) - cur.y);
      leap(x1, goalRow, 30 + drop * 0.12, 0.3 + drop / 1500, 0.1);
      moving = true;
    } else {
      moving = true;
      setFace(dx < 0 ? -1 : 1);
      const step = Math.min(far, Math.min(WALK_SPEED, far * 7 + 50) * dt) * Math.sign(dx);
      const nx = cur.x + step, ny = footAt(catRow, nx);
      if (Math.abs(ny - cur.y) > STEP_UP) {
        // More than a step. If it is a drop with more footing at about this height just
        // ahead, clear the gap in one bound instead of hopping down and back up.
        const dir = Math.sign(dx);
        let across = null;
        if (ny > cur.y) for (let d = 30; d <= 130 && !across; d += 10) {
          const x2 = nx + dir * d;
          if (dir * (target.x - x2) < 0 || x2 !== clampX(x2)) break;
          if (Math.abs(footAt(catRow, x2) - cur.y) <= STEP_UP) across = { x: x2, d };
        }
        // never bound over a pot: come down and push it
        if (across && pots.some(pot => pot.row === catRow && pot.x > Math.min(cur.x, across.x) && pot.x < Math.max(cur.x, across.x))) across = null;
        if (ny > cur.y) kick(dir);   // leaving the top of a row of books
        if (across) leap(across.x, catRow, 14, 0.24 + across.d / 900, 0);
        else {
          const x1 = clampX(nx + dir * 18);
          const rise = Math.abs(footAt(catRow, x1) - cur.y);
          leap(x1, catRow, 12 + rise * 0.3, 0.18 + rise / 600, 0);
        }
      } else { cur.x = nx; cur.y += (ny - cur.y) * Math.min(1, dt * 14); }   // small changes: it just steps
    }
    // on the top shelf there is no room above the cat: the cloud goes beside it, towards the middle
    // on the top shelf of the wider walls there is no room above the cat, so it speaks to one side
    const aside = !tier.phone && catRow === 0 && !jump;
    setClass("say-side", aside && cur.x >= W / 2);
    setClass("say-side-r", aside && cur.x < W / 2);
    // a bubble over the cat's head is kept inside the wall when the cat is near either end
    const half = sayEl.offsetWidth / 2 + 6;
    const shift = aside || W < half * 2 ? 0 : Math.min(W - half, Math.max(half, cur.x)) - cur.x;
    if (shift !== sayShift) { sayShift = shift; sayEl.style.setProperty("--shift", shift.toFixed(1) + "px"); }
    pushPots(moving);
    cat.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -100%)`;
    const airborne = !!jump && jump.wait <= 0 && pose === "walk";
    walking = wants;
    setClass("is-jumping", airborne);
    setClass("is-crouching", !!jump && jump.wait > 0);
    setClass("is-walking", moving && !airborne);
    setClass("just-landed", moving && now - landedAt < 180);
    // sitting still: after a moment it licks a paw for a while, rests, and starts again
    const settled = !wants && pose === "sit" && !turning;
    still = settled && !busy ? still + dt : 0;
    setClass("is-licking", !hold && rest.kind === "sit" && still > 1.4 && (still - 1.4) % 6.4 < 2.8);
    tendRest(settled, still, busy);
    if (pose === "sit") look();
    if (settled && onArrive) { const f = onArrive; onArrive = null; f(); }
    if (hold && pose === "sit" && !turning && !hold.started) { hold.started = true; cat.classList.add("is-pawing"); }
    meet();
    tipLocks(moving);
    showActive();
    straighten();
    speak();
    if (!disposed) frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  const NUDGE = 55;    // stage px the pointer must travel to rouse a sitting cat
  let anchor = null, tapped = false;
  // sent to a keepsake by a tap: the cat goes to it, or does its turn again if it is there already
  const visit = (r, item) => {
    hint = false; anchor = null; hoverRow = null;
    welcomed[r] = true; welcome = null;      // the keepsake's own line, not the shelf's greeting
    if (onItem === item && !walking) {
      item.again = 0; said = null; sayEl.classList.remove("show");
      if (ACTS[item.kind]) ACTS[item.kind](item, faceDir);
      return;
    }
    standOn(r, item.x);
  };
  const localX = e => (e.clientX - stage.getBoundingClientRect().left) / scale;
  rowEls.forEach((row, r) => {
    row.addEventListener("pointermove", e => {
      if (busy || e.pointerType === "touch") return;
      hoverRow = r;
      // A sitting cat stays put for small movements. It only gets up once the pointer (or a
      // finger dragging) has travelled a fair way from where it last followed it.
      if (!walking && anchor && Math.hypot(e.clientX - anchor.x, e.clientY - anchor.y) / scale < NUDGE) return;
      if (anchor) hint = false;   // the first pointer position only tells us where they are
      anchor = { x: e.clientX, y: e.clientY };
      standOn(r, localX(e));
    });
    row.addEventListener("pointerleave", () => { hoverRow = null; });
    row.addEventListener("focus", () => { hoverRow = r; });
    row.addEventListener("blur", () => { hoverRow = null; });
    row.addEventListener("pointerdown", e => { tapped = e.pointerType !== "mouse"; });
    row.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;   // new tab, new window
      e.preventDefault();
      if (busy) return;
      if (tapped && e.detail !== 0) {
        // A finger on a keepsake sends the cat over to it, to do its turn and say its line.
        // Anywhere else on the shelf, bookend included, it knocks a book over and the page opens.
        const x = localX(e), y = (e.clientY - stage.getBoundingClientRect().top) / scale;
        const item = perches[r].find(q => q.kind && x > q.x0 - 8 && x < q.x1 + 8 && y > q.top - 12);
        if (item) { visit(r, item); return; }
        const books = perches[r].filter(q => q.standing);
        if (books.length) push(r, books[Math.floor(Math.random() * books.length)]);
        return;
      }
      const p = nearestBook(r, e.detail === 0 ? cur.x : localX(e));
      if (p) push(r, p);
    });
  });

  // Left alone for a while, the cat strolls to one of the keepsakes, sits on it and says its
  // line. Any pointer movement puts that off; a real move or a click takes it back to you.
  const REST_BEFORE_WANDER = 5000;
  let lastActivity = performance.now(), visiting = null;
  listen(window, "pointermove", () => { lastActivity = performance.now(); });
  listen(window, "pointerdown", () => { lastActivity = performance.now(); });
  const sights = perches.flatMap((list, r) => list.filter(p => p.say).map(p => ({ r, x: p.x, p })));
  const wander = () => {
    if (!busy && !walking && !reduced() && performance.now() - lastActivity > REST_BEFORE_WANDER) {
      const others = sights.filter(sight => sight !== visiting);
      visiting = others[Math.floor(Math.random() * others.length)];
      hoverRow = null;     // a pointer left parked on a shelf no longer holds the light: it follows the cat
      standOn(visiting.r, visiting.x);
    }
    later(wander, 7000 + Math.random() * 4000);
  };
  later(wander, REST_BEFORE_WANDER);

  function push(r, p) {
    busy = true; hint = false; shoved = p;
    anchor = null; // after a click, the next movement counts from scratch
    // the page opens from where the book fell
    const done = () => {
      const box = stage.getBoundingClientRect();
      navigate(shelves[r].path, !!shelves[r].external, { x: box.left + p.x * scale, y: box.top + (p.top + 50) * scale });
    };
    if (reduced()) { done(); return; }
    const reach = cat.offsetWidth * PAW_REACH;
    let side = cur.x <= p.x ? -1 : 1;
    if (side < 0 && p.x - reach < L + 10) side = 1;
    if (side > 0 && p.x + reach > R - 10) side = -1;
    standOn(r, p.x + side * reach);
    onArrive = () => {
      setFace(-side);
      p.node.style.setProperty("--fall", -side);
      cat.classList.add("is-pushing");
      later(() => p.node.classList.add("pushed"), SWAT_HIT_MS);
      later(done, SWAT_HIT_MS + FALL_MS);
    };
  }

  // coming back to this page from the browser's history, with a book still on the floor
  listen(window, "pageshow", () => {
    for (const node of root.querySelectorAll(".pushed")) node.classList.remove("pushed");
    cat.classList.remove("is-pushing");
    busy = false; onArrive = null; shoved = null;
  });

  return {
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      for (const fn of undo) fn();
      root.querySelector(".ws-defs")?.remove();
      fit.innerHTML = WALL_HTML;     // back to the untouched markup React rendered
      fit.removeAttribute("style");
    },
  };
}
