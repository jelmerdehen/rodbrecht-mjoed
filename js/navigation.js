// ============================================
// Navigation -- Smooth scroll, scroll spy, mobile hamburger
// ============================================

export function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (!nav || !toggle) return;

  // ---- Smooth scroll ----
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      closeMenu();
    });
  });

  // ---- Scroll spy ----
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ---- Mobile hamburger ----
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      toggle.focus();
    }
  });

  function closeMenu() {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
