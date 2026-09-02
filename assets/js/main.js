/* =========================================================
   PRESENTACIÓN — main.js
   Menú móvil · animaciones de entrada al hacer scroll
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollAnimations();
});

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.tema-card, .browser-mock, .brand-slide, .persona-card, .phone-mock, .sitemap-page'
  );
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => {
    const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
    el.style.transitionDelay = Math.min(siblingIndex * 80, 320) + 'ms';
    observer.observe(el);
  });
}
