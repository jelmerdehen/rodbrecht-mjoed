// ============================================
// Scroll Reveal -- IntersectionObserver-based element reveals
// ============================================

export function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Pre-load lazy images inside reveal elements so they're ready when revealed
  const preloadImages = (el) => {
    el.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
    });
  };

  // Two observers: one to preload images early, one to reveal
  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        preloadImages(entry.target);
        preloadObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: '200px' // preload 200px before entering viewport
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Use rAF to ensure the hidden state has been painted before transitioning
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            entry.target.classList.add('is-visible');
          });
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: '0px'
  });

  reveals.forEach(el => {
    if (el.querySelector('img[loading="lazy"]')) {
      preloadObserver.observe(el);
    }
    revealObserver.observe(el);
  });
}
