// @ts-nocheck
/* The header shelf's cat, as one self-contained script.

   This is the approved prototype's script, moved into a module with as few changes as
   possible. The books are ordinary links rendered by React (see Header in Layout.tsx); this
   runs the cat on the header rule and turns a click on a book into "the cat knocks it off,
   then the page changes".

   Deliberately not type-checked, for the same reason as wallSceneScript.ts: it is imperative DOM
   code tuned as plain JavaScript. Its surface (mountNavShelf and its options) is typed where
   it is used. */

export const NAV_CAT_HTML = `<span class="wcat" aria-hidden="true">
      <span class="say"><svg class="cloud" viewBox="0 0 200 116" preserveAspectRatio="none" focusable="false"><path class="fill" d="M52 104 C24 106 6 86 16 64 C4 42 26 20 50 30 C58 8 96 0 116 20 C138 6 174 18 174 46 C198 54 198 92 168 100 C158 110 138 108 128 102 C118 112 86 112 76 103 C68 108 58 108 52 104 Z"/><path class="line" d="M52 104 C24 106 6 86 16 64 C4 42 26 20 50 30 C58 8 96 0 116 20 C138 6 174 18 174 46 C198 54 198 92 168 100 C158 110 138 108 128 102 C118 112 86 112 76 103 C68 108 58 108 52 104 Z"/></svg><span class="say-text"></span><i class="spark"></i><i class="spot"></i><i class="dot d1"></i><i class="dot d2"></i></span>
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
    </span>`;

export function mountNavShelf(bar, { navigate }) {
  let disposed = false, frame = 0;
  const undo = [];
  const listen = (target, type, fn, options) => { target.addEventListener(type, fn, options); undo.push(() => target.removeEventListener(type, fn, options)); };
  const later = (fn, ms) => { const id = setTimeout(() => { if (!disposed) fn(); }, ms); undo.push(() => clearTimeout(id)); return id; };

  const nav = bar.querySelector(".shelfnav");
  const cat = bar.querySelector(".wcat"), sayEl = bar.querySelector(".say");
  const sayText = sayEl.querySelector(".say-text");
  const books = [...nav.querySelectorAll(".navbook")];
  const FALL_MS = 620, SWAT_HIT_MS = 190, PAW_REACH = 0.47;
  const WALK_SPEED = 380, STEP_UP = 24, NUDGE = 45, REST_BEFORE_WANDER = 6000;
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- the walkway: the rule under the header, the plank, and the tops of the books ---------- */
  let lineY = 0, minX = 0, maxX = 0, plank = { x0: 0, x1: 0, top: 0 }, perches = [];
  const measure = () => {
    lineY = bar.clientHeight;
    minX = 22; maxX = bar.clientWidth - 22;
    plank = { x0: nav.offsetLeft, x1: nav.offsetLeft + nav.offsetWidth, top: lineY - 5 };
    perches = books.map(node => {
      const x0 = nav.offsetLeft + node.offsetLeft;
      return { node, x0, x1: x0 + node.offsetWidth, x: x0 + node.offsetWidth / 2, top: nav.offsetTop + node.offsetTop };
    });
  };
  const clampX = x => Math.min(maxX, Math.max(minX, x));
  // The book the cat is about to push is never its footing: it stands beside that book, on
  // whatever else is there, so it does not drop when the book goes.
  let shoved = null;
  // the highest solid thing under the cat's feet
  // half: how far either side of x counts as under the cat
  const footAt = (x, half = 16) => {
    let top = x > plank.x0 - 14 && x < plank.x1 + 14 ? plank.top : lineY;
    for (const p of perches) if (p !== shoved && p.x1 > x - half && p.x0 < x + half && !p.node.classList.contains("pushed")) top = Math.min(top, p.top);
    return top;
  };
  // for choosing how to rest: the footing right under a point, and how much the surface tilts there
  const restFoot = (x, wide) => footAt(x, wide ? 16 : 3);
  const restLean = x => {
    const p = perches.find(q => q !== shoved && q.x0 <= x && q.x1 >= x && !q.node.classList.contains("pushed"));
    return p && p.node.hasAttribute("aria-current") ? 9 : 0;   // the current page's book is slumped
  };

  /* ---------- the cat: walks at its own pace, hops onto the books, sits facing you, licks a paw ---------- */
  const cur = { x: 0, y: 0 }, target = { x: 0 };
  let faceDir = -1, walking = false, busy = false, onArrive = null, jump = null, still = 0, landedAt = 0, lastTime = performance.now();
  let pose = "sit", turning = false, hint = true, said = null;
  const HINT = "Click a book. I will knock it down for you.";
  let note = null;   // a short remark that replaces the hint for a moment
  const setFace = f => { faceDir = f; cat.style.setProperty("--face", f); };
  const setClass = (name, on) => { if (cat.classList.contains(name) !== on) cat.classList.toggle(name, on); };
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
  const leap = (x1, height, seconds) => {
    jump = { x0: cur.x, y0: cur.y, x1, y1: footAt(x1), height, seconds, t: 0 };
    setFace(x1 < cur.x ? -1 : 1);
  };

  measure();
  // The cat's place is on the book of the page you are on. It starts there, and goes back
  // there when it has been left alone for a while after you have called it away.
  const homeX = () => { const p = perches.find(q => q.node.hasAttribute("aria-current")); return p ? p.x : null; };
  target.x = cur.x = clampX(homeX() ?? bar.clientWidth * 0.5); cur.y = footAt(cur.x);
  listen(window, "resize", () => { measure(); target.x = clampX(target.x); cur.x = clampX(cur.x); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

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
    // on phones the shelf is hidden and the menu button is showing: do nothing
    if (nav.offsetParent === null) { lastTime = now; frame = requestAnimationFrame(loop); return; }
    const dt = Math.min(0.05, (now - lastTime) / 1000); lastTime = now;
    const dx = target.x - cur.x, far = Math.abs(dx);
    const wants = !!jump || far > (walking ? 1.5 : 7);
    let moving = false;
    if (reduced()) { cur.x = target.x; cur.y = footAt(cur.x); jump = null; turnTo("sit"); }
    else if (!wants) {
      if (pose !== "sit" && !turning) chooseRest();
      turnTo("sit"); cur.y += (footAt(cur.x) - cur.y) * Math.min(1, dt * 20);
    }
    else if (pose !== "walk") { setFace(dx < 0 ? -1 : 1); turnTo("walk"); }
    else if (jump) {
      moving = true;
      jump.t = Math.min(1, jump.t + dt / jump.seconds);
      const t = jump.t;
      cur.x = jump.x0 + (jump.x1 - jump.x0) * t;
      cur.y = jump.y0 + (jump.y1 - jump.y0) * t - jump.height * 4 * t * (1 - t);
      if (t >= 1) { cur.y = footAt(cur.x); jump = null; landedAt = now; }
    } else {
      moving = true;
      setFace(dx < 0 ? -1 : 1);
      const step = Math.min(far, Math.min(WALK_SPEED, far * 7 + 50) * dt) * Math.sign(dx);
      const nx = cur.x + step, ny = footAt(nx);
      if (Math.abs(ny - cur.y) > STEP_UP) {
        // onto or off the books: a hop
        const x1 = clampX(nx + Math.sign(dx) * 20), rise = Math.abs(footAt(x1) - cur.y);
        leap(x1, 12 + rise * 0.3, 0.2 + rise / 600);
      } else { cur.x = nx; cur.y += (ny - cur.y) * Math.min(1, dt * 14); }
    }
    cat.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -100%)`;
    const airborne = !!jump && pose === "walk";
    walking = wants;
    // The header is too short for the cloud to sit above the cat, so it always sits beside it,
    // on the side with more room; up on the books it also hangs lower, to stay on the page.
    setClass("say-side", cur.x >= bar.clientWidth / 2);
    setClass("say-side-r", cur.x < bar.clientWidth / 2);
    setClass("say-low", cur.y < lineY - 20);
    setClass("is-jumping", airborne);
    setClass("is-walking", moving && !airborne);
    setClass("just-landed", moving && now - landedAt < 180);
    const settled = !wants && pose === "sit" && !turning;
    still = settled && !busy ? still + dt : 0;
    setClass("is-licking", rest.kind === "sit" && still > 1.4 && (still - 1.4) % 6.4 < 2.8);
    tendRest(settled, still, busy);
    if (pose === "sit") look();
    if (settled && onArrive) { const f = onArrive; onArrive = null; f(); }
    // until the visitor first does something, a sitting cat says what the books are for
    if (note && (performance.now() > note.until || busy)) note = null;
    const line = note ? note.line : hint && !busy && !walking ? HINT : null;
    if (line !== said) { said = line; if (line) sayText.textContent = line; sayEl.classList.toggle("show", !!line); }
    if (!disposed) frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  /* ---------- following the pointer along the header ---------- */
  // A sitting cat ignores small movements; it gets up once the pointer has travelled a fair way.
  let anchor = null, lastActivity = performance.now();
  listen(window, "pointermove", e => {
    lastActivity = performance.now();
    const box = bar.getBoundingClientRect();
    if (busy || e.clientY > box.bottom + 40) return;
    if (!walking && anchor && Math.hypot(e.clientX - anchor.x, e.clientY - anchor.y) < NUDGE) return;
    if (anchor) hint = false;
    anchor = { x: e.clientX, y: e.clientY };
    target.x = clampX(e.clientX - box.left);
  });
  // left alone, it goes back to its book (or, on a page with no book of its own, strolls
  // somewhere else on the rule) and sits down again
  const wander = () => {
    if (!busy && !walking && !reduced() && performance.now() - lastActivity > REST_BEFORE_WANDER) target.x = clampX(homeX() ?? minX + Math.random() * (maxX - minX));
    later(wander, 7000 + Math.random() * 5000);
  };
  later(wander, REST_BEFORE_WANDER);

  /* ---------- clicking a book: the cat goes to it and pushes it off the shelf ---------- */
  books.forEach((node, i) => listen(node, "click", e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;   // new tab, new window
    if (nav.offsetParent === null) return;
    const external = node.target === "_blank";
    // the page you are already on stays on the shelf: its book only gives a little shake
    if (node.hasAttribute("aria-current")) {
      e.preventDefault();
      hint = false;
      node.classList.remove("stay"); void node.offsetWidth; node.classList.add("stay");
      note = { line: "You are already here.", until: performance.now() + 2200 };
      return;
    }
    // The resume opens in a new tab straight away, as browsers only allow that during the click
    // itself; the cat still knocks its book down, and it is put back afterwards. Every other
    // book waits for the cat, then the page changes.
    if (!external) e.preventDefault();
    if (busy) return;
    busy = true; hint = false; anchor = null; lastActivity = performance.now();
    const p = perches[i], href = node.getAttribute("href");
    shoved = p;
    const putBack = () => { node.classList.remove("pushed"); cat.classList.remove("is-pushing"); busy = false; shoved = null; };
    const done = () => {
      if (external) { later(putBack, 900); return; }
      const box = bar.getBoundingClientRect();
      navigate(href, { x: box.left + p.x, y: box.top + p.top + 30 });
      later(putBack, 1200);   // in case the page did not change
    };
    if (reduced()) { done(); return; }
    // stand beside the book, on whichever side the cat is coming from and has room
    const reach = cat.offsetWidth * PAW_REACH;
    let side = cur.x <= p.x ? -1 : 1;
    if (side < 0 && p.x - reach < minX) side = 1;
    if (side > 0 && p.x + reach > maxX) side = -1;
    target.x = clampX(p.x + side * reach);
    onArrive = () => {
      setFace(-side);
      node.style.setProperty("--fall", -side);
      cat.classList.add("is-pushing");
      later(() => node.classList.add("pushed"), SWAT_HIT_MS);
      later(done, SWAT_HIT_MS + FALL_MS);
    };
  }));

  return {
    // the page changed: the books may have new sizes and a different one is now current
    refresh() {
      for (const node of books) node.classList.remove("pushed", "stay");
      cat.classList.remove("is-pushing");
      busy = false; onArrive = null; shoved = null;
      measure();
      // the cat walks over to the book of the page that has just opened
      const home = homeX();
      if (home !== null) { target.x = clampX(home); lastActivity = performance.now(); }
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      for (const fn of undo) fn();
    },
  };
}
