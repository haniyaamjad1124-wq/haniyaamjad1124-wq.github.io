/* Hash router for the single page portfolio. */
(function () {
  'use strict';

  var views = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));

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
})();