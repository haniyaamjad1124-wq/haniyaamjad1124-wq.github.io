/* Haniya Amjad, portfolio interactions. No dependencies. */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---- TOC scrollspy ---- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    var targets = [];
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (t) { map[id] = a; targets.push(t); }
    });
    var visible = new Set();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target.id); else visible.delete(en.target.id);
      });
      var first = targets.filter(function (t) { return visible.has(t.id); })[0];
      if (first) {
        tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
        if (map[first.id]) map[first.id].classList.add('is-active');
      }
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }
})();

/* ---- Sticky note board ---- */
(function () {
  'use strict';
  var notes = Array.prototype.slice.call(document.querySelectorAll('.sticky'));
  if (!notes.length) return;
  notes.forEach(function (n) {
    n.addEventListener('click', function () {
      var wasOpen = n.classList.contains('open');
      notes.forEach(function (o) { o.classList.remove('open'); o.setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { n.classList.add('open'); n.setAttribute('aria-expanded', 'true'); }
    });
  });
})();

/* ---- Prefetch links on hover so the next page is already loading on click ---- */
(function () {
  'use strict';
  var seen = {};
  function prefetch(url) {
    if (seen[url]) return;
    seen[url] = true;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = url;
    document.head.appendChild(l);
  }
  function maybePrefetch(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0) return;
    if (a.hostname && a.hostname !== location.hostname && a.hostname !== 'haniyamjad.com') return;
    prefetch(a.href);
  }
  document.addEventListener('mouseover', maybePrefetch, { passive: true });
  document.addEventListener('touchstart', maybePrefetch, { passive: true });
})();
