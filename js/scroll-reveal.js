// ============================================
// Scroll Reveal -- IntersectionObserver-based element reveals
// ============================================

export function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show everything immediately
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // IntersectionObserver for scroll-triggered reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // One-time reveal: unobserve after revealing
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
  });

  reveals.forEach(el => observer.observe(el));
}
