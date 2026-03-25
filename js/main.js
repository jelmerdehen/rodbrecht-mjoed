// ============================================
// Main Entry Point -- Rodbrecht Mjod & Brews
// ============================================

import { initNavigation } from './navigation.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initGallery } from './gallery.js';
import { initEffects } from './effects.js';

document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initGallery();
  initEffects();

  const loader = document.querySelector('.loading-overlay');
  if (!loader) return;

  function dismissLoader() {
    if (!loader.parentNode) return;
    loader.classList.add('loaded');
    setTimeout(() => { if (loader.parentNode) loader.remove(); }, 600);
  }

  // Dismiss on full load, or after 3s fallback
  if (document.readyState === 'complete') {
    dismissLoader();
  } else {
    window.addEventListener('load', dismissLoader);
    setTimeout(dismissLoader, 3000);
  }
});
