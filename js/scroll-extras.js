// ============================================
// Scroll Extras -- Progress bar, scroll-to-top
// ============================================

export function initScrollExtras() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initScrollProgress();
  initScrollToTop();
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? scrolled / total : 0;
    bar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // Show button after scrolling past the hero
  const observer = new IntersectionObserver(([entry]) => {
    btn.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });

  observer.observe(hero);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
