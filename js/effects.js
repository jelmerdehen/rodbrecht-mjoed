// ============================================
// Effects -- GSAP parallax, Canvas ember particles, entrance animations
// ============================================

export function initEffects() {
  // Respect prefers-reduced-motion: skip ALL effects
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initParallax();
  initEmberParticles();
  initEntranceAnimations();
}

// ---- GSAP Parallax ----
function initParallax() {
  // GSAP and ScrollTrigger are loaded via CDN
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Disable parallax on mobile for performance
  if (window.innerWidth < 768) return;

  // Parallax on hero noise texture
  const heroNoise = document.querySelector('.hero__noise');
  if (heroNoise) {
    gsap.to(heroNoise, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Parallax on hero logo (slower scroll)
  const heroLogo = document.querySelector('.hero__logo');
  if (heroLogo) {
    gsap.to(heroLogo, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Parallax on rune dividers
  document.querySelectorAll('.rune-divider').forEach(divider => {
    gsap.to(divider, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: divider,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ---- Canvas Ember Particles ----
function initEmberParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;';
  canvas.setAttribute('aria-hidden', 'true');
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId = null;
  const PARTICLE_COUNT = 30;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticle() {
    const isGold = Math.random() > 0.4;
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: 1 + Math.random() * 2,
      speedY: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: 0.2 + Math.random() * 0.3,
      color: isGold ? '212, 175, 55' : '204, 68, 0',
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height; // Spread initial positions
      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.3;

      // Respawn at bottom
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(animate);
  }

  // Pause when tab not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
      animId = null;
    } else if (!animId) {
      animate();
    }
  });

  window.addEventListener('resize', resize);

  init();
  animate();
}

// ---- GSAP Section Entrance Animations ----
function initEntranceAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Disable complex animations on mobile
  if (window.innerWidth < 768) return;

  // Brew cards, ritual chapters, and gallery items use CSS reveal system
  // (IntersectionObserver + .reveal/.is-visible classes in scroll-reveal.js)
  // No GSAP animation here — inline styles from gsap.from() conflict with CSS transitions
}
