document.addEventListener('DOMContentLoaded', function() {

  /* ── Dropdown menus (desktop hover handled by CSS) ── */
  var navItems = document.querySelectorAll('.nav-item');

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item')) {
      navItems.forEach(function(i) { i.classList.remove('open'); });
    }
  });

  /* ── Mobile hamburger ── */
  var hamburger = document.querySelector('.nav-hamburger');
  var drawer = document.querySelector('.mobile-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close drawer when a link inside it is tapped
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Smart anchor scroll ── */
  function getNavHeight() {
    var bar = document.querySelector('.header-bar');
    var nav = document.querySelector('.nav-bar');
    return (bar ? bar.offsetHeight : 0) + (nav ? nav.offsetHeight : 0);
  }

  function scrollToHash(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.scrollY - getNavHeight() - 32;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href*="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      var hi = href.indexOf('#');
      if (hi === -1) return;
      var hash = '#' + href.slice(hi + 1);
      var pagePart = href.slice(0, hi);
      if (!pagePart || pagePart === window.location.pathname.split('/').pop()) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          navItems.forEach(function(i) { i.classList.remove('open'); });
          if (drawer) drawer.classList.remove('open');
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          scrollToHash(hash);
        }
      }
    });
  });

  if (window.location.hash) {
    setTimeout(function() { scrollToHash(window.location.hash); }, 100);
  }

  /* ── Form feedback ── */
  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      var orig = btn.textContent;
      btn.textContent = 'Submitted — we will be in touch soon.';
      btn.style.background = '#2A7A58';
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 5000);
    });
  });

});