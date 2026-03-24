// ============================================
// Gallery -- GLightbox initialization with dark theme
// ============================================

export function initGallery() {
  // GLightbox is loaded via CDN (not an ES module), so access it from window
  if (typeof GLightbox === 'undefined') {
    // Retry after a short delay in case the CDN script hasn't loaded yet
    setTimeout(() => {
      if (typeof GLightbox !== 'undefined') {
        createLightbox();
      }
    }, 500);
    return;
  }

  createLightbox();
}

function createLightbox() {
  const lightbox = GLightbox({
    selector: '.glightbox',
    skin: 'clean',
    closeButton: true,
    touchNavigation: true,
    loop: true,
    cssEfects: {
      fade: { in: 'fadeIn', out: 'fadeOut' }
    },
    openEffect: 'fade',
    closeEffect: 'fade',
    preload: true
  });

  return lightbox;
}
