// ============================================
// Gallery -- GLightbox initialization with dark theme
// ============================================

export function initGallery() {
  // GLightbox CDN script uses `defer`, module scripts also defer —
  // GLightbox should always be available by DOMContentLoaded
  if (typeof GLightbox === 'undefined') return;

  GLightbox({
    selector: '.glightbox',
    skin: 'clean',
    closeButton: true,
    touchNavigation: true,
    loop: true,
    cssEffects: {
      fade: { in: 'fadeIn', out: 'fadeOut' }
    },
    openEffect: 'fade',
    closeEffect: 'fade',
    preload: true
  });
}
