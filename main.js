document.addEventListener('DOMContentLoaded', function() {

  /* ── Active nav link ── */
  var page = document.body.getAttribute('data-page') || '';
  document.querySelectorAll('[data-page]').forEach(function(el) {
    if (el.getAttribute('data-page') === page) {
      el.classList.add('active');
    }
  });

  /* ── Dropdown menus ── */
  var navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(function(item) {
    var btn = item.querySelector('.nav-item-btn');
    if (!btn) return;

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');

      // Close all
      navItems.forEach(function(i) { i.classList.remove('open'); });

      // Toggle this one
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', function() {
    navItems.forEach(function(i) { i.classList.remove('open'); });
  });

  /* ── Mobile hamburger ── */
  var hamburger = document.querySelector('.nav-hamburger');
  var drawer = document.querySelector('.mobile-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      var open = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
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
