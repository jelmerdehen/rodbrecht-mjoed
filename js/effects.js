// ============================================
// Effects -- GSAP parallax, Canvas ember particles
// ============================================

export function initEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initParallax();
  initEmberParticles();
}

function initParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.innerWidth < 768) return;

  const heroNoise = document.querySelector('.hero__noise');
  if (heroNoise) {
    gsap.to(heroNoise, {
      y: '20%',
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  document.querySelectorAll('.rune-divider').forEach(divider => {
    gsap.to(divider, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: { trigger: divider, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

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
  let resizeTimer = null;
  const PARTICLE_COUNT = 30;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function debouncedResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
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

  function start() {
    if (animId) return;
    animate();
  }

  function stop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.3;

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

  // Pause when hero is off-screen or tab is hidden
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !document.hidden) {
      start();
    } else {
      stop();
    }
  }, { threshold: 0 });

  heroObserver.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (hero.getBoundingClientRect().bottom > 0) start();
  });

  window.addEventListener('resize', debouncedResize);

  // Init particles
  resize();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }
}
