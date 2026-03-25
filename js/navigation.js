// ============================================
// Navigation -- Smooth scroll, scroll spy, mobile hamburger, smart hide
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // ---- Smart hide on scroll ----
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const currentScroll = window.scrollY;
      // Always show near top
      if (currentScroll < 100) {
        nav.classList.remove('nav--hidden');
      } else if (currentScroll > lastScroll + 5) {
        // Scrolling down — hide
        nav.classList.add('nav--hidden');
        closeMenu();
      } else if (currentScroll < lastScroll - 5) {
        // Scrolling up — show
        nav.classList.remove('nav--hidden');
      }
      lastScroll = currentScroll;
      ticking = false;
    });
  }, { passive: true });

  // ---- Hero scroll indicator fade ----
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const opacity = Math.max(0, 1 - window.scrollY / 300);
      scrollIndicator.style.opacity = opacity * 0.6;
    }, { passive: true });
  }

  // ---- Mobile hamburger ----
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
      closeMenu();
    }
  });

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
