/* Hash router and category filter for the single page portfolio. */
(function () {
  'use strict';

  var views = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var grid = document.getElementById('grid');
  var noResults = document.getElementById('noResults');
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));

  function show(name) {
    var found = false;
    views.forEach(function (v) {
      var on = v.getAttribute('data-view') === name;
      v.classList.toggle('is-on', on);
      if (on) { v.removeAttribute('hidden'); found = true; }
      else { v.setAttribute('hidden', ''); }
    });
    if (!found) {
      views.forEach(function (v) {
        var on = v.getAttribute('data-view') === 'index';
        v.classList.toggle('is-on', on);
        if (on) v.removeAttribute('hidden'); else v.setAttribute('hidden', '');
      });
    }
  }

  function route() {
    var raw = (location.hash || '').replace(/^#/, '');
    // "slug--section" deep links open the case study, then jump to the section
    var slug = raw.split('--')[0];
    var target = raw.indexOf('--') > -1 ? raw : null;

    show(slug || 'index');

    if (target) {
      var el = document.getElementById(target);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();

  /* ---- Category filter: shows and hides whole category blocks ---- */
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.cat-block'));
  if (blocks.length && filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-filter');
        if (btn.classList.contains('is-on')) { want = 'all'; }
        filters.forEach(function (b) { b.classList.toggle('is-on', b === btn && want !== 'all'); });

        var shown = 0;
        blocks.forEach(function (block) {
          var on = (want === 'all' || block.getAttribute('data-cat') === want);
          block.hidden = !on;
          if (on) shown++;
        });
        if (noResults) {
          if (shown === 0) noResults.removeAttribute('hidden');
          else noResults.setAttribute('hidden', '');
        }
      });
    });
  }
})();