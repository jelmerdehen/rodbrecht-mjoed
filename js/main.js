// ============================================
// Main Entry Point -- Rodbrecht Mjod & Brews
// ============================================

import { initNavigation } from './navigation.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initGallery } from './gallery.js';
import { initEffects } from './effects.js';

// Progressive enhancement flag
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initGallery();
  initEffects();

  // Loading state dismissal
  const loader = document.querySelector('.loading-overlay');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => loader.remove(), 600);
      }, 200);
    });

    // Fallback: remove loader after 3 seconds regardless
    setTimeout(() => {
      if (loader.parentNode) {
        loader.classList.add('loaded');
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 600);
      }
    }, 3000);
  }
});
