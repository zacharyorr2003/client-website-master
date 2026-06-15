/* ============================================================
   site.js — SHARED BEHAVIOR
   Loaded with <script src="site.js" defer> on every standard page.
   Every block is guarded, so it safely no-ops on pages that
   don't have the element. Page-specific JS (form handlers,
   gallery filters, sidebar observers) stays inline per page.
   ============================================================ */

/* Mobile nav accordion (Services / Service Areas). Global: called from inline onclick. */
function toggleMobAcc(id, icoId) {
  var panel = document.getElementById(id);
  if (!panel) return;
  var open = panel.style.display !== 'none' && panel.style.display !== '';
  panel.style.display = open ? 'none' : 'flex';
  var ico = document.getElementById(icoId);
  if (ico) ico.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
}

/* Footer year */
(function () {
  var y = document.getElementById('footer-year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Active page highlighting — the navbar is stamped identically on every page
   by build-partials.mjs; this marks the current page's links at runtime. */
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  if (/^blog-\d/.test(page)) page = 'blog.html'; // posts highlight the Blog tab
  document.querySelectorAll('#navbar a[href]').forEach(function (a) {
    if (a.getAttribute('href') !== page) return;
    if (a.querySelector('img')) return; // logo link
    if (a.classList.contains('btn')) return; // CTA button
    if (a.closest('.nav-dropdown')) {
      a.style.color = 'var(--paper)';
    } else if (a.closest('#mobile-menu')) {
      a.style.color = a.classList.contains('font-mono') ? 'var(--signal)' : 'var(--paper)';
    } else {
      a.style.color = 'var(--signal)';
      a.removeAttribute('onmouseover');
      a.removeAttribute('onmouseout');
      a.onmouseover = a.onmouseout = null;
    }
    a.setAttribute('aria-current', 'page');
  });
})();

/* Nav dropdowns — grace period prevents flicker when crossing the gap */
document.querySelectorAll('.nav-item').forEach(function (item) {
  var drop = item.querySelector('.nav-dropdown');
  if (!drop) return;
  var timer;
  var show = function () { clearTimeout(timer); drop.style.display = 'block'; };
  var hide = function () { timer = setTimeout(function () { drop.style.display = ''; }, 150); };
  item.addEventListener('mouseenter', show);
  item.addEventListener('mouseleave', hide);
  drop.addEventListener('mouseenter', show);
  drop.addEventListener('mouseleave', hide);
});

/* FAQ accordion (aria-aware; works with or without aria attributes) */
document.querySelectorAll('.faq-trigger').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) {
      el.classList.remove('open');
      var t = el.querySelector('.faq-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* Responsive intro grid — stack on mobile (area/service pages) */
(function () {
  function checkIntroGrid() {
    var g = document.getElementById('intro-grid');
    if (!g) return;
    g.style.gridTemplateColumns = window.innerWidth < 768 ? '1fr' : '1fr 1fr';
    g.style.gap = window.innerWidth < 768 ? '3rem' : '5rem';
  }
  checkIntroGrid();
  window.addEventListener('resize', checkIntroGrid);
})();

/* Cookie / SMS consent banner */
(function () {
  var banner = document.getElementById('consent-banner');
  if (banner && !localStorage.getItem('site_consent')) {
    banner.style.display = 'block';
  }
  window.handleConsent = function (choice) {
    localStorage.setItem('site_consent', choice);
    if (banner) banner.style.display = 'none';
  };
})();

/* Elfsight reviews widget — lazy-init when the section nears the viewport.
   Saves ~400KB of third-party JS on initial load. */
(function () {
  var el = document.querySelector('[class*="elfsight-app-"]');
  if (!el) return;
  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = 'https://static.elfsight.com/platform/platform.js';
    s.async = true;
    document.head.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.disconnect(); load(); }
      });
    }, { rootMargin: '600px' });
    io.observe(el);
  } else {
    load();
  }
})();
