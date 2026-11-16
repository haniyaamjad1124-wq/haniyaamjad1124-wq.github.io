// @ts-nocheck
/* The cat on the inner pages, away from the header.

   The approved prototype's script (page-cat-prototype.html), moved into a module. While the
   header cat is on screen, scrolling leaves it alone. Once the page has carried it out of view
   it comes back into the window down the right-hand margin, sliding on its claws, lets go
   halfway and drops onto the nearest divider; scrolling back up takes it to a divider above or
   home to its book. Hovering a picture or card for a second has it peek out of that picture; if
   it was on its way down, it jumps onto the picture first and carries on afterwards.

   It works on a copy of the header cat, which navShelf.ts animates, so mount it after that.
   Not type-checked, for the same reason as navShelf.ts. */

export function mountPageCat(bar, { dividers: DIVIDERS, peekable: PEEKABLE, frame: FRAME, books: BOOKS, host: HOST }) {
  let disposed = false, frame = 0;
  const undo = [];
  const listen = (target, type, fn, options) => { target.addEventListener(type, fn, options); undo.push(() => target.removeEventListener(type, fn, options)); };
  const later = (fn, ms) => { const id = setTimeout(() => { if (!disposed) fn(); }, ms); undo.push(() => clearTimeout(id)); return id; };
  const headerCat = bar.querySelector(".wcat");
  let scene = null;

  // started only once the header cat is showing (it is hidden on phones)
  const start = () => {

  // what it lands on, what it peeks out of, the picture inside one of those, the header's books,
  // and a cat the page already has at its foot
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, cls) => { const n = document.createElement(tag); n.className = cls; return n; };
  const layer = el("div", "pc-layer"); document.body.appendChild(layer);

  // the cat on the page: a copy of the header cat, plus a drawing of it from behind
  const BACK = `<svg class="cat pose-back" viewBox="0 0 184 150" focusable="false">
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
      </svg>`;
  const pc = headerCat.cloneNode(true);
  pc.removeAttribute("id"); pc.removeAttribute("style"); pc.querySelector(".say")?.remove();
  pc.className = "wcat pcat"; pc.style.setProperty("--face", "-1");
  pc.insertAdjacentHTML("beforeend", BACK); layer.appendChild(pc);
  const CW = headerCat.offsetWidth, CH = headerCat.offsetHeight;
  const PAWS = 1.2 * (1 - 22 / 150);         // how far up the cat its front paws are, from behind
  const PAW_GAP = 1.2 * (80 / 184) * CW;     // and how far apart

  // the peek: just its head, coming up over the bottom edge of a picture
  const peek = el("span", "pc-peek"); const PW = CW * 0.82, PH = CH * 0.82;
  peek.style.width = PW + "px"; peek.style.height = PH * 0.56 + "px";
  const peekSvg = headerCat.querySelector(".pose-sit").cloneNode(true); peekSvg.setAttribute("class", "");
  peekSvg.querySelectorAll(".cat-paw, .cat-lick").forEach(n => n.remove()); peekSvg.style.height = PH + "px";
  peek.appendChild(peekSvg); layer.appendChild(peek);

  const SLIDE_V = 150, SLIDE_ACC = 320;      // px/s: the slide's top speed, and how fast it gets there
  const GRAVITY = 2300;                      // px/s², once it lets go
  const CLIMB_V = 300;                       // px/s: going back up the lane, paw over paw
  const HOVER_WAIT = 1000, DUCK_MS = 210, GONE = 190;   // a picture must be hovered a full second
  const AFTER_PEEK = 2000;                   // after a peek, it sets off down the page this much later
  let dividers = [...document.querySelectorAll(DIVIDERS)];
  // Everything here runs on timers. When the cat is sent home (a new page, a click on a book)
  // whatever was pending is dropped: each timer belongs to the run it was set in.
  let run = 0;
  const after = (fn, ms) => { const mine = run; return later(() => { if (mine === run) fn(); }, ms); };
  const docY = node => node.getBoundingClientRect().top + window.scrollY;
  const place = (x, y) => { pc.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`; };
  // It always comes down the same lane: the page's right-hand margin, clear of the pictures.
  // The margin is the gap the header leaves at the right of the window.
  const pad = () => {
    const gap = document.documentElement.clientWidth - bar.getBoundingClientRect().right;
    return gap > 4 ? gap : parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad")) || 24;
  };
  const laneX = () => document.documentElement.clientWidth - Math.max(CW / 2 + 8, Math.min(pad() / 2, CW / 2 + 30)) + window.scrollX;

  /* ----- poses: sit (facing you), walk (side-on, also for jumps and falls), back (clinging) ----- */
  let pose = "sit";
  const setPose = (next, now) => {
    if (pose === next) return;
    const swap = () => { pose = next; pc.classList.toggle("pose-walking", next === "walk"); pc.classList.toggle("climbing", next === "back"); };
    if (now || reduced()) { swap(); return; }
    pc.classList.remove("turn-in"); pc.classList.add("turn-out");
    after(() => {
      swap(); pc.classList.remove("turn-out"); pc.classList.add("turn-in");
      after(() => pc.classList.remove("turn-in"), next === "sit" ? 340 : 170);
    }, 120);
  };
  const flash = (cls, ms) => { pc.classList.add(cls); after(() => pc.classList.remove(cls), ms); };

  /* ----- where the cat is, and what it is doing ----- */
  // home: in the header.   line: sitting on a divider.   resident: handed over to a cat that
  // already lives at the foot of the page, which is showing in its place.
  // slide: coming down the lane on its claws (and hanging on, when there is nowhere to land yet).
  // fall / leap: in the air.   peeking: gone from where it was, its head up in a picture.
  // inside: it jumped onto a picture on its way down; it comes back out and carries on.
  let S = { name: "home" }, busy = false;
  let wanted = null, peekOn = null, descendAt = 0;
  const steady = () => !busy && (S.name === "home" || S.name === "line" || S.name === "resident");
  const headerShowing = () => headerCat.getBoundingClientRect().bottom > 0;

  /* ----- a cat that already lives at the foot of the page ----- */
  // There is only ever one cat on screen. Where the page has its own cat at the bottom (peeking
  // over the footer line, or fixed to the bottom of the window) that one stays down until this
  // one arrives: this one jumps across to it, drops out of sight behind the line, and the
  // resident comes up in its place.
  if (!reduced()) document.body.classList.add("pc-on");
  const resident = () => document.querySelector(HOST);
  const isFixed = r => getComputedStyle(r).position === "fixed";
  const spot = r => { const q = r.getBoundingClientRect(); return { x: q.left + q.width / 2 + window.scrollX, y: q.bottom + window.scrollY }; };
  const residentOf = d => { const r = resident(); return r && !isFixed(r) && d.contains(r) ? r : null; };
  const catY = () => S.name === "home" ? headerCat.getBoundingClientRect().bottom + window.scrollY : S.name === "resident" ? spot(S.R).y : S.y;
  // out of sight where it is, and back again: whichever cat is standing in for it
  const hideNow = () => { if (S.name === "home") headerCat.classList.add("ducked"); else if (S.name === "resident") S.R.classList.remove("pc-arrived"); else pc.classList.add("ducked"); };
  const showAgain = () => { if (S.name === "home") headerCat.classList.remove("ducked"); else if (S.name === "resident") S.R.classList.add("pc-arrived"); else pc.classList.remove("ducked"); };

  const scratchAt = (x, y) => {
    const n = el("div", "pc-scratch"), w = PAW_GAP + 5;
    n.style.width = w + "px"; n.style.left = x - w / 2 + "px"; n.style.top = y - CH * PAWS + "px";
    layer.appendChild(n); return n;
  };
  const endScratch = () => { if (!S.scratch) return; const sc = S.scratch; sc.classList.add("fade"); after(() => sc.remove(), 3400); };
  // where it can come to rest from the lane: a divider on screen below it (with the page's own
  // cat on it, if it has one), or the page's cat fixed to the bottom of the window
  const targetFor = d => ({ el: d, R: residentOf(d) });
  const targetY = t => t.R ? spot(t.R).y : docY(t.el);
  const findTarget = y => {
    const r = resident();
    if (r && isFixed(r)) return { el: null, R: r };
    const here = y - window.scrollY;
    const seen = dividers.filter(n => { const t = n.getBoundingClientRect().top; return t > here + CH * 0.6 && t < window.innerHeight * 0.95; });
    const d = seen.find(residentOf) || seen[0];        // the page's own cat, if it is on screen, before a bare line
    return d ? targetFor(d) : null;
  };
  // Claws in, sliding. With somewhere to land it slides half the way and lets go. With nowhere
  // yet, it slides to the middle of the window and hangs on there, slipping down again as the
  // page moves, until somewhere to land comes into view.
  const slide = (x, y, d) => {
    S = { name: "slide", x, y, v: 0, y0: y, target: d ? targetFor(d) : null, letGo: null, scratch: scratchAt(x, y) };
    pc.classList.add("sliding");
  };
  const letGo = () => {
    endScratch();
    pc.classList.remove("sliding");
    const t = S.target;
    if (t.R) { busy = true; leap(() => spot(t.R), () => arrive(t)); return; }   // across to the cat that lives there
    pc.classList.add("is-jumping", "falling");
    setPose("walk");
    S = { name: "fall", x: S.x, y: S.y, vy: S.v, el: t.el, yT: docY(t.el) };
  };
  const land = () => {
    place(S.x, S.yT);
    pc.classList.remove("is-jumping", "falling"); flash("just-landed", 180);
    S = { name: "line", x: S.x, y: S.yT, el: S.el };
    after(() => setPose("sit"), 140);
    busy = true; after(() => { busy = false; check(); }, 520);
  };
  // down behind the line where the page's own cat lives, and that cat comes up
  const arrive = t => {
    pc.classList.add("ducked");
    after(() => {
      pc.classList.remove("on", "ducked"); setPose("sit", true);
      S = { name: "resident", R: t.R, el: t.el, fixed: isFixed(t.R) };
      S.R.classList.add("pc-arrived");
      busy = false; check();
    }, DUCK_MS + 40);
  };
  // a jump along an arc, in the side-on pose (to: a point, or a function for one that moves)
  const leap = (to, then) => {
    const from = { x: S.x, y: S.y }, aim = typeof to === "function" ? to : () => to, end = aim();
    pc.style.setProperty("--face", end.x < from.x ? -1 : 1);
    pc.classList.remove("sliding", "falling"); pc.classList.add("is-jumping"); setPose("walk");
    const dur = Math.min(0.62, 0.32 + Math.hypot(end.x - from.x, end.y - from.y) / 1600);
    S = { name: "leap", x: from.x, y: from.y, from, aim, t: 0, dur, h: 34 + Math.abs(end.x - from.x) * 0.08, then };
  };

  // in at the top edge of the window (or from under the header rule, if that is on screen),
  // already hanging on by its claws
  const enterLane = (y, d) => {
    const x = laneX();
    setPose("back", true); place(x, y); S = { name: "held", x, y };
    pc.classList.remove("ducked"); pc.classList.add("on", "emerge"); void pc.offsetWidth;
    requestAnimationFrame(() => pc.classList.remove("emerge"));
    after(() => { busy = false; slide(x, y, d); }, 220);
  };
  // it has been carried out of the window: straight in at the top edge
  const comeDown = () => {
    busy = true; descendAt = 0;
    if (S.name === "home") headerCat.classList.add("away");
    if (S.name === "resident") S.R.classList.remove("pc-arrived");
    enterLane(window.scrollY + CH * PAWS + 2, null);
  };
  // still on screen in the header: it sinks behind its book first, then comes out under the rule
  const leaveHome = d => {
    busy = true; descendAt = 0;
    headerCat.classList.add("ducked");
    after(() => {
      headerCat.classList.add("away"); headerCat.classList.remove("ducked");
      enterLane(Math.max(bar.getBoundingClientRect().bottom + window.scrollY, window.scrollY + 4) + CH * PAWS, d);
    }, DUCK_MS + GONE);
  };
  // from one divider down to the next: it turns round, gets its claws in, and goes
  const leaveLine = d => {
    busy = true; descendAt = 0;
    setPose("back");
    after(() => { busy = false; slide(S.x, S.y, d); }, 300);
  };
  // Going up the page it climbs: up the lane paw over paw, to a divider above (d), or all the
  // way to the header rule and across to its book (no d).
  const goUp = d => {
    busy = true; descendAt = 0;
    const from = S;
    const start = () => {
      pc.classList.add("climb-up");
      const r = d && residentOf(d);
      S = {
        name: "climb", x: S.x, y: S.y,
        to: () => d ? docY(d) : bar.getBoundingClientRect().bottom + window.scrollY + CH * 0.9,
        then: () => {
          if (r) { leap(() => spot(r), () => arrive({ el: d, R: r })); return; }      // the page's own cat is on that line
          if (d) {
            S = { name: "line", x: S.x, y: docY(d), el: d }; place(S.x, S.y); setPose("sit");
            after(() => { busy = false; check(); }, 400);
            return;
          }
          if (!headerShowing()) { busy = false; slide(S.x, S.y, null); return; }     // the header has gone again: hang on
          leap(() => { const q = headerCat.getBoundingClientRect(); return { x: q.left + q.width / 2 + window.scrollX, y: q.bottom + window.scrollY }; }, () => {
            pc.classList.remove("on"); setPose("sit", true);
            headerCat.classList.remove("away", "ducked");
            S = { name: "home" }; busy = false;
          });
        },
      };
    };
    if (from.name === "slide") { endScratch(); pc.classList.remove("sliding"); start(); }
    else if (from.name === "line") { setPose("back"); after(start, 280); }
    else if (from.name === "resident") {
      // the page's cat goes down behind its line, and this one comes up from behind it in the lane
      from.R.classList.remove("pc-arrived");
      const x = laneX(), y = spot(from.R).y;
      after(() => {
        setPose("back", true); S = { name: "held", x, y }; place(x, y);
        pc.classList.add("on", "ducked"); void pc.offsetWidth; pc.classList.remove("ducked");
        after(start, DUCK_MS + 40);
      }, 260);
    } else busy = false;
  };

  /* ----- the animation loop: only the moving states need it ----- */
  let last = performance.now(), still = 0, pointer = null;
  const setCls = (name, on) => { if (pc.classList.contains(name) !== on) pc.classList.toggle(name, on); };
  listen(window, "pointermove", e => { pointer = { x: e.clientX, y: e.clientY }; }, { passive: true });
  const loop = now => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (S.name === "slide") {
      const top = window.scrollY + CH * PAWS + 2, hang = window.scrollY + window.innerHeight * 0.45;
      // the page moving under it never carries it out of the window: it keeps hold at the top
      // edge, and going the other way it is drawn back up to where it hangs
      if (S.y < top) { S.y = S.y0 = top; S.scratch.style.top = top - CH * PAWS + "px"; S.letGo = null; }
      const was = S.y;
      if (!S.target && S.y > hang + 60) { S.y = Math.max(hang + 60, S.y - Math.max(CLIMB_V, (S.y - hang) * 3) * dt); if (S.y < S.y0) { S.y0 = S.y; S.scratch.style.top = S.y - CH * PAWS + "px"; } }
      setCls("climb-up", S.y < was);                   // drawn back up, it climbs
      // somewhere to land: looked for all the way down, and dropped if the page carries it off
      if (S.target && S.target.el && S.target.el.getBoundingClientRect().top < S.y - window.scrollY + CH * 0.4) { S.target = null; S.letGo = null; }
      if (!S.target) S.target = findTarget(S.y);
      if (S.target && S.letGo === null) {
        const gap = targetY(S.target) - S.y;
        S.letGo = S.target.R ? S.y + Math.min(90, Math.max(0, gap * 0.4)) : gap < CH * 2 ? S.y : S.y + gap * 0.5;
      }
      const limit = S.target ? Infinity : hang;                       // nowhere to land: no further than this
      S.v = S.y >= limit ? 0 : Math.min(SLIDE_V, S.v + SLIDE_ACC * dt);
      S.y = Math.min(S.y + S.v * dt, Math.max(limit, S.y));
      place(S.x, S.y); S.scratch.style.height = Math.max(0, S.y - S.y0) + "px";
      setCls("sliding", S.v > 0);
      if (S.target && S.y >= S.letGo) letGo();
    } else if (S.name === "fall") {
      S.yT = docY(S.el);                               // pictures still loading can move the divider
      S.vy += GRAVITY * dt; S.y += S.vy * dt;          // it keeps the speed it slid at, and falls faster
      if (S.y >= S.yT) land(); else place(S.x, S.y);
    } else if (S.name === "climb") {
      const foot = window.scrollY + window.innerHeight + CH * 0.3;
      if (S.y > foot) S.y = foot;                      // from below the window: in at its bottom edge
      const to = S.to();
      S.y = Math.max(to, S.y - CLIMB_V * dt);
      place(S.x, S.y);
      if (S.y <= to) { pc.classList.remove("climb-up"); const f = S.then; S = { name: "held", x: S.x, y: S.y }; f(); }
    } else if (S.name === "leap") {
      S.t = Math.min(1, S.t + dt / S.dur);
      const t = S.t, e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, to = S.aim();
      S.x = S.from.x + (to.x - S.from.x) * e;
      S.y = S.from.y + (to.y - S.from.y) * t - S.h * 4 * t * (1 - t);
      place(S.x, S.y);
      if (t >= 1) {
        pc.classList.remove("is-jumping"); flash("just-landed", 180);
        const f = S.then; S = { name: "held", x: S.x, y: S.y }; f();
      }
    }
    // at rest on a divider it behaves like the header cat: it breathes and blinks, follows the
    // pointer with its eyes, licks a paw now and then, and settles into a loaf after a while
    still = S.name === "line" && !busy && pose === "sit" ? still + dt : 0;
    setCls("is-licking", still > 1.6 && (still - 1.6) % 6.4 < 2.8 && still < 14);
    setCls("is-loaf", still > 14);
    if (still > 0 && pointer) {
      const r = pc.getBoundingClientRect(), dx = pointer.x - (r.left + r.width / 2), dy = pointer.y - (r.top + r.height * 0.4);
      const len = Math.hypot(dx, dy) || 1, k = Math.min(1, len / 140);
      pc.style.setProperty("--look-x", ((dx / len) * 2.6 * k).toFixed(2) + "px");
      pc.style.setProperty("--look-y", ((dy / len) * 2 * k).toFixed(2) + "px");
    }
    // the page's own cat is re-drawn by the page now and then: it is kept up while it stands in
    if (S.name === "resident" && !busy) { if (!S.R.isConnected) sendHome(); else if (!S.R.classList.contains("pc-arrived")) S.R.classList.add("pc-arrived"); }
    // a picture hovered while the cat was mid-turn gets its peek as soon as the cat is free
    if (wanted && !peekOn && !busy && (steady() || S.name === "slide" || S.name === "fall")) showPeek(wanted);
    if (descendAt && now > descendAt && steady() && !wanted) { descendAt = 0; descend(); }
    if (!disposed) frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  /* ----- scrolling: the cat only moves once it has gone out of the window ----- */
  // While it is on screen, scrolling leaves it alone. Once the page has carried it out of view
  // (the header up and away, or its divider off either edge) it comes straight back into the
  // window: in at the top of the lane; or, scrolling back up, onto a divider above or home.
  const outOfFrame = () => {
    if (S.name === "home") return headerShowing() ? null : "above";
    if (S.name === "resident") {
      if (S.fixed) return null;
      const q = S.R.getBoundingClientRect();
      return q.bottom <= 0 ? "above" : q.bottom - 36 >= window.innerHeight ? "below" : null;
    }
    if (S.name !== "line") return null;
    const t = S.el.getBoundingClientRect().top;
    return t <= 0 ? "above" : t - CH >= window.innerHeight ? "below" : null;
  };
  const check = () => {
    if (!steady() || reduced()) return;
    // with the page's cat fixed to the window it is never carried off: only the top calls it home
    if (S.name === "resident" && S.fixed) { if (headerShowing()) goUp(null); return; }
    const out = outOfFrame();
    if (!out) {
      // sitting on a bare line when the page's own cat comes into view further down: on to it
      if (S.name === "line") { const d = dividers.find(n => { const t = n.getBoundingClientRect().top; return residentOf(n) && n !== S.el && t > S.y - window.scrollY + CH && t < window.innerHeight * 0.95; }); if (d) leaveLine(d); }
      return;
    }
    if (out === "above") comeDown();
    else if (headerShowing()) goUp(null);
    else {
      const up = dividers.filter(n => { const t = n.getBoundingClientRect().top; return t > CH && t < window.innerHeight; }).pop();
      if (up) goUp(up); else comeDown();
    }
  };
  // after a peek: down to the nearest divider below it that is on screen, if there is one
  const descend = () => {
    if (S.name === "resident") return;
    if (outOfFrame()) { comeDown(); return; }
    const here = catY() - window.scrollY;
    const d = dividers.find(n => { const t = n.getBoundingClientRect().top; return t > here + CH && t < window.innerHeight * 0.92; });
    if (d) (S.name === "home" ? leaveHome : leaveLine)(d);
  };
  let queued = false, scrolledTo = window.scrollY;
  const onScroll = () => {
    queued = false;
    const up = window.scrollY < scrolledTo; scrolledTo = window.scrollY;
    underPointer();
    // hanging in the lane when the page comes back up to its header: home
    if (S.name === "slide" && up && !busy && headerShowing()) { goUp(null); return; }
    check();
  };
  listen(window, "scroll", () => { if (queued) return; queued = true; requestAnimationFrame(onScroll); }, { passive: true });
  listen(window, "resize", () => { if (S.name === "line") { S.x = laneX(); S.y = docY(S.el); place(S.x, S.y); } });

  /* ----- peeking out of a picture ----- */
  // the picture itself: for a card that is the image box inside it, not the whole card
  const box = node => (node.matches(FRAME) ? node : node.querySelector(FRAME)) || node;
  // it lands on the top edge of the picture, above where it will peek out, and sinks in there
  // (a picture taller than the window: the part of it that is on screen stands in for it, so
  // the cat is never sent to an edge you cannot see)
  const hole = node => { const r = box(node).getBoundingClientRect(); return { x: r.right + window.scrollX - PW / 2 - Math.min(22, r.width * 0.06), y: Math.max(r.top, CH + 6) + window.scrollY }; };
  const placePeek = node => {
    const r = box(node).getBoundingClientRect();
    peek.style.transform = `translate(${r.right + window.scrollX - PW - Math.min(22, r.width * 0.06)}px, ${Math.min(r.bottom, window.innerHeight) + window.scrollY - PH * 0.56}px)`;
  };
  const peekUp = node => {
    peekOn = node; placePeek(node);
    void peek.offsetWidth; peek.classList.add("up");
  };
  const showPeek = node => {
    const r = box(node).getBoundingClientRect();
    if (r.width < PW * 1.6 || r.height < PH) { wanted = null; return; }   // too small a picture to peek from
    descendAt = 0;
    if (S.name === "peeking" || S.name === "inside") {                    // from one picture to the next
      if (peekOn === node) return;
      peek.classList.remove("up"); peekOn = node;
      after(() => { if (wanted === node) peekUp(node); else if (peekOn === node) peekOn = null; }, DUCK_MS + GONE);
      return;
    }
    if (busy) return;                                                     // mid-turn: the loop asks again when it is free
    if (S.name === "slide" || S.name === "fall") {
      // on its way down: it jumps across onto the picture, and peeks out from inside it
      endScratch();
      const resume = S.name === "slide" ? (S.target && S.target.el) : S.el;
      peekOn = node;                                                      // spoken for, until it is up
      leap(hole(node), () => {
        pc.classList.add("ducked");
        S = { name: "inside", x: S.x, y: S.y, resume };
        after(() => { pc.classList.remove("on"); if (wanted) peekUp(wanted); else { peekOn = null; hidePeek(); } }, DUCK_MS + GONE);
      });
      return;
    }
    if (steady()) {
      hideNow();
      S = { name: "peeking", back: S };
      peekOn = node;
      after(() => { if (wanted === node && S.name === "peeking") peekUp(node); else if (!wanted) { peekOn = null; hidePeek(); } }, DUCK_MS + GONE);
    }
  };
  const hidePeek = () => {
    if (S.name !== "peeking" && S.name !== "inside") return;
    peek.classList.remove("up"); peekOn = null;
    busy = true;
    after(() => {
      if (wanted) { busy = false; showPeek(wanted); return; }
      if (S.name === "inside") {
        // up out of the picture, a jump back to the lane, claws in, and on down
        const { resume } = S;
        pc.classList.add("on"); void pc.offsetWidth; pc.classList.remove("ducked");
        after(() => {
          leap({ x: laneX(), y: Math.max(S.y, window.scrollY + CH * PAWS + 2) }, () => { setPose("back"); after(() => { busy = false; slide(S.x, S.y, resume && resume.isConnected ? resume : null); }, 260); });
        }, DUCK_MS + 60);
      } else {
        // back up where it was; if the page has moved on meanwhile it follows at once, and
        // otherwise it sets off down the page two seconds later
        S = S.back;
        showAgain();
        after(() => { busy = false; descendAt = performance.now() + AFTER_PEEK; check(); }, DUCK_MS);
      }
    }, DUCK_MS + GONE);
  };
  // Hovers are picked up at the document, since pictures and cards come and go with the page.
  // The first peek waits for a full second's hover; once its head is up, moving on to another
  // picture takes it along after a moment, and moving off them all sends it back.
  let hoverTimer = 0, leaveTimer = 0, hovered = null;
  const hoverOn = node => {
    if (node === hovered) return;
    hovered = node; clearTimeout(hoverTimer); clearTimeout(leaveTimer);
    if (node) {
      if (reduced()) return;
      const out = S.name === "peeking" || S.name === "inside";
      hoverTimer = after(() => {
        if (hovered !== node) return;
        wanted = node;
        if (S.name === "peeking" || S.name === "inside") showPeek(node);
      }, out ? 260 : HOVER_WAIT);
    } else if (wanted) leaveTimer = after(() => { if (hovered) return; wanted = null; hidePeek(); }, 220);
  };
  // scrolling moves pictures under a pointer that is not moving, and no event says so
  const underPointer = () => {
    if (pointer && (hovered || wanted)) hoverOn(document.elementFromPoint(pointer.x, pointer.y)?.closest(PEEKABLE) || null);
    if (peekOn && peek.classList.contains("up")) placePeek(peekOn);       // it stays at the visible foot of its picture
  };
  if (window.matchMedia("(hover: hover)").matches) {
    listen(document, "pointerover", e => hoverOn(e.target.closest?.(PEEKABLE) || null));
    listen(document.documentElement, "pointerleave", () => hoverOn(null));
  }

  /* ----- sent home: a new page, or a book in the header is about to be pushed ----- */
  // Whatever it was doing stops, and it is in the header at once, where the header's own
  // script has it walk to the book.
  const sendHome = () => {
    run++;
    for (const n of layer.querySelectorAll(".pc-scratch")) n.remove();
    for (const n of document.querySelectorAll(HOST)) n.classList.remove("pc-arrived");
    pc.classList.remove("on", "ducked", "emerge", "sliding", "falling", "is-jumping", "just-landed", "turn-in", "turn-out", "is-licking", "is-loaf", "climb-up");
    setPose("sit", true);
    peek.classList.remove("up"); peekOn = null; wanted = null; hovered = null; descendAt = 0; busy = false; still = 0;
    headerCat.classList.remove("away", "ducked");
    S = { name: "home" };
  };
  listen(bar, "pointerdown", e => { if (e.target.closest?.(BOOKS) && (S.name !== "home" || busy)) sendHome(); }, true);
  // the pointer coming up into the header calls it home, if the header is on screen
  listen(bar, "pointerenter", () => { if ((S.name === "line" || S.name === "resident") && !busy && headerShowing()) goUp(null); });

  // a new page: home to the header, and a fresh look at what is on the page
  const refresh = () => {
    sendHome();
    dividers = [...document.querySelectorAll(DIVIDERS)];
    after(check, 60);
  };
  return { refresh, layer };
  };
  const tryStart = () => { if (!scene && !disposed && headerCat && headerCat.offsetWidth) scene = start(); };
  tryStart();
  listen(window, "resize", tryStart);

  return {
    refresh() { scene?.refresh(); },
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      for (const fn of undo) fn();
      scene?.layer.remove();
      headerCat?.classList.remove("away", "ducked");
      document.body.classList.remove("pc-on");
      for (const n of document.querySelectorAll(HOST)) n.classList.remove("pc-arrived");
    },
  };
}
