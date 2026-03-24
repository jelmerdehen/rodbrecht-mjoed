# Architecture Patterns

**Domain:** Immersive single-page static showcase website (dark Viking metal homebrew theme)
**Researched:** 2026-03-24

## Recommended Architecture

A section-based single-page application with no build tools, using native ES modules, CSS custom properties for theming, and IntersectionObserver for scroll-driven reveals. The site is a flat collection of static assets served from any web server or CDN.

### High-Level Structure

```
index.html                  (single entry point, all sections)
  |
  +-- css/
  |   +-- variables.css     (design tokens: colors, fonts, spacing)
  |   +-- reset.css         (modern CSS reset)
  |   +-- base.css          (typography, body, global styles)
  |   +-- layout.css        (section grid, containers, responsive)
  |   +-- components.css    (cards, nav, buttons, gallery items)
  |   +-- animations.css    (keyframes, scroll-reveal classes, glows)
  |   +-- utilities.css     (visibility, spacing helpers)
  |
  +-- js/
  |   +-- main.js           (entry point, imports modules)
  |   +-- scroll-reveal.js  (IntersectionObserver setup)
  |   +-- navigation.js     (smooth scroll, active section tracking)
  |   +-- gallery.js        (lightbox, masonry positioning)
  |   +-- effects.js        (parallax, glow particles, ambient FX)
  |
  +-- assets/
  |   +-- images/
  |   |   +-- hero/         (full-width hero backgrounds)
  |   |   +-- brews/        (brew card photos)
  |   |   +-- process/      (brewing ritual chapter photos)
  |   |   +-- gallery/      (workshop/relic photos)
  |   |   +-- textures/     (scratched metal, wood grain, noise)
  |   +-- fonts/            (WOFF2 files: blackletter + sans-serif)
  |   +-- svg/              (runes, Vegvisir, ravens, Yggdrasil, thorns)
  |
  +-- favicon.ico / site.webmanifest
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `index.html` | Document structure, section semantics, asset loading | All CSS/JS via `<link>` and `<script type="module">` |
| `variables.css` | Single source of truth for design tokens | Consumed by all other CSS files |
| `animations.css` | All `@keyframes`, transition definitions, `.reveal` states | Triggered by `scroll-reveal.js` adding/removing classes |
| `scroll-reveal.js` | IntersectionObserver: watches sections, toggles `.is-visible` | Reads DOM elements, writes CSS classes |
| `navigation.js` | Smooth scroll to anchors, mobile menu toggle, active section highlight | Reads scroll position, writes `.active` class on nav links |
| `gallery.js` | Masonry column positioning, lightbox open/close | Reads image dimensions, writes inline transforms; listens for click events |
| `effects.js` | Ambient visual effects (parallax layers, subtle glow pulses) | Reads scroll position via `requestAnimationFrame`, writes CSS transforms |
| SVG assets | Decorative elements (runes, borders, icons) | Inlined in HTML or loaded via `<img>` / CSS `background-image` |
| Image assets | Photography content | Loaded by HTML `<picture>` elements with lazy loading |

### Data Flow

```
User scrolls
  |
  v
IntersectionObserver (scroll-reveal.js)
  |-- Element enters viewport --> adds .is-visible class
  |-- Element exits viewport --> (optional) removes class
  |
  v
CSS transitions/animations (animations.css)
  |-- .is-visible triggers: opacity 0->1, translateY, scale
  |-- Keyframe animations: glow pulse, rune shimmer
  |
  v
requestAnimationFrame loop (effects.js)
  |-- Reads window.scrollY
  |-- Applies parallax translateY to background layers
  |-- Adjusts ambient glow intensity based on section

User clicks nav link
  |
  v
navigation.js
  |-- Prevents default anchor behavior
  |-- Calls element.scrollIntoView({ behavior: 'smooth' })
  |-- Updates .active class on nav items

User clicks gallery image
  |
  v
gallery.js
  |-- Opens lightbox overlay (toggles .lightbox-open on body)
  |-- Loads full-resolution image
  |-- Handles ESC/click-outside to close
```

## Section Architecture (DOM Structure)

The page is a vertical stack of full-viewport (or near-full-viewport) sections. Each section is a semantic `<section>` with an `id` for anchor navigation.

```html
<body class="dark-theme">
  <header id="hero" class="section section--hero">
    <!-- Full-screen background layers (image + gradient + noise texture) -->
    <!-- Logo, tagline, CTA button -->
  </header>

  <nav class="nav" aria-label="Main navigation">
    <!-- Sticky/fixed after scroll past hero -->
    <!-- Anchor links to each section -->
  </nav>

  <main>
    <section id="saga" class="section section--saga">
      <!-- Brewer's biography as Viking saga -->
    </section>

    <section id="brews" class="section section--brews">
      <!-- Grid of brew cards (album-cover style) -->
    </section>

    <section id="ritual" class="section section--ritual">
      <!-- Brewing process chapters with photos -->
    </section>

    <section id="relics" class="section section--gallery">
      <!-- Masonry photo gallery -->
    </section>
  </main>

  <footer class="footer">
    <!-- Social links, copyright -->
  </footer>
</body>
```

**Key architectural decisions:**
- No `<div>` soup. Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) for accessibility and SEO.
- Each `<section>` gets a BEM-style modifier class for section-specific styling.
- The `<nav>` is placed outside `<main>` because it persists across all sections (sticky positioning).

## CSS Architecture

### Design Token System (variables.css)

Use CSS custom properties as the single source of truth. This is the foundation every other CSS file depends on.

```css
:root {
  /* ---- Color Tokens ---- */
  --color-void:        #0A0A0A;
  --color-wood:        #4A2C0B;
  --color-blood:       #8B0000;
  --color-gold:        #D4AF37;
  --color-steel:       #A8B5B8;
  --color-yggdrasil:   #2D5016;
  --color-fire:        #CC4400;

  /* ---- Semantic Tokens ---- */
  --bg-primary:        var(--color-void);
  --bg-section-alt:    #0D0D0D;
  --text-primary:      var(--color-steel);
  --text-heading:      var(--color-gold);
  --accent-primary:    var(--color-blood);
  --accent-glow:       var(--color-gold);

  /* ---- Typography ---- */
  --font-heading:      'UnifrakturMaguntia', 'MedievalSharp', serif;
  --font-body:         'Inter', 'Segoe UI', system-ui, sans-serif;
  --font-rune:         'Norse', 'Noto Sans Runic', monospace;

  --text-base:         1rem;
  --text-lg:           1.25rem;
  --text-xl:           1.5rem;
  --text-2xl:          2rem;
  --text-hero:         clamp(3rem, 8vw, 7rem);

  /* ---- Spacing ---- */
  --space-xs:          0.25rem;
  --space-sm:          0.5rem;
  --space-md:          1rem;
  --space-lg:          2rem;
  --space-xl:          4rem;
  --space-section:     clamp(4rem, 10vh, 8rem);

  /* ---- Layout ---- */
  --content-width:     min(90rem, 90vw);
  --card-width:        min(20rem, 85vw);

  /* ---- Effects ---- */
  --glow-gold:         0 0 20px rgba(212, 175, 55, 0.4);
  --glow-blood:        0 0 15px rgba(139, 0, 0, 0.5);
  --transition-reveal:  opacity 0.8s ease, transform 0.8s ease;
}
```

**Why this structure:** Semantic tokens (like `--bg-primary`) reference raw tokens (like `--color-void`). Components use semantic tokens. This means if the palette shifts, you change one place. The `clamp()` functions handle responsive sizing without media queries.

### CSS File Loading Order

```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/utilities.css">
```

**Why separate files instead of one large file:** For a no-build-tools project, separate files provide maintainability. The HTTP/2 multiplexing available on any modern host eliminates the "too many requests" concern. Files load in parallel.

### Layered Background Pattern

The atmospheric depth comes from stacking multiple background layers per section. Use pseudo-elements to avoid polluting semantic HTML.

```css
.section--hero {
  position: relative;
  overflow: hidden;
}

.section--hero::before {
  /* Texture layer: scratched metal or noise */
  content: '';
  position: absolute;
  inset: 0;
  background: url('../assets/images/textures/noise.webp') repeat;
  opacity: 0.08;
  pointer-events: none;
  z-index: 1;
}

.section--hero::after {
  /* Gradient vignette layer */
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, var(--color-void) 80%);
  pointer-events: none;
  z-index: 2;
}
```

**For more than two pseudo-layers,** use additional empty `<div class="bg-layer bg-layer--parallax">` elements at the top of the section. These are presentational, so keep them empty and aria-hidden.

### Animation System

Two categories of animation, kept separate:

1. **Scroll-reveal transitions** -- triggered by IntersectionObserver adding `.is-visible`:
   ```css
   .reveal {
     opacity: 0;
     transform: translateY(2rem);
     transition: var(--transition-reveal);
   }
   .reveal.is-visible {
     opacity: 1;
     transform: translateY(0);
   }
   ```

2. **Ambient keyframe animations** -- always running, for atmospheric effects:
   ```css
   @keyframes glow-pulse {
     0%, 100% { opacity: 0.4; }
     50% { opacity: 0.8; }
   }
   @keyframes rune-shimmer {
     0% { text-shadow: var(--glow-gold); }
     50% { text-shadow: 0 0 30px rgba(212, 175, 55, 0.8); }
     100% { text-shadow: var(--glow-gold); }
   }
   ```

**Use `prefers-reduced-motion` to disable all animations for accessibility:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## JavaScript Module Pattern

Use native ES modules (`<script type="module">`) which are supported in all modern browsers and require no build step.

```html
<script type="module" src="js/main.js"></script>
```

```javascript
// js/main.js
import { initScrollReveal } from './scroll-reveal.js';
import { initNavigation } from './navigation.js';
import { initGallery } from './gallery.js';
import { initEffects } from './effects.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavigation();
  initGallery();
  initEffects();
});
```

Each module exports a single `init` function and keeps its state private. Modules do not import from each other -- they communicate solely through the DOM (CSS classes, data attributes, events). This keeps coupling at zero and allows any module to be removed without breaking others.

**Why no import maps:** The project has no external dependencies. All imports are relative paths. Import maps add complexity for zero benefit here.

## Image Asset Pipeline

### Format Strategy

Serve images in modern formats with fallbacks using `<picture>`:

```html
<picture>
  <source srcset="assets/images/brews/mead-dark-640.avif 640w,
                   assets/images/brews/mead-dark-960.avif 960w,
                   assets/images/brews/mead-dark-1280.avif 1280w"
          type="image/avif" sizes="(max-width: 768px) 85vw, 20rem">
  <source srcset="assets/images/brews/mead-dark-640.webp 640w,
                   assets/images/brews/mead-dark-960.webp 960w,
                   assets/images/brews/mead-dark-1280.webp 1280w"
          type="image/webp" sizes="(max-width: 768px) 85vw, 20rem">
  <img src="assets/images/brews/mead-dark-960.jpg"
       alt="Dark forest mead in a glass with honey dripping"
       loading="lazy" decoding="async"
       width="960" height="640">
</picture>
```

### Image Size Breakpoints

| Image Type | Sizes to Generate | Rationale |
|------------|-------------------|-----------|
| Hero backgrounds | 1920px, 1280px, 768px | Full-width, largest images |
| Brew cards | 1280px, 960px, 640px | Card grid, medium display size |
| Process photos | 1280px, 960px, 640px | Inline chapter illustrations |
| Gallery thumbs | 640px, 400px | Masonry grid thumbnails |
| Gallery full | 1920px, 1280px | Lightbox full-size view |
| Textures | 512px (tile) | Repeating, small footprint |

### Conversion Pipeline (manual, no build tool)

Use a simple shell script in the project root:

```bash
#!/bin/bash
# scripts/convert-images.sh
# Requires: cwebp (from libwebp), avifenc (from libavif)
for img in assets/images/source/*.jpg; do
  base=$(basename "$img" .jpg)
  for size in 640 960 1280 1920; do
    convert "$img" -resize "${size}x>" -quality 85 "assets/images/output/${base}-${size}.jpg"
    cwebp -q 80 "assets/images/output/${base}-${size}.jpg" -o "assets/images/output/${base}-${size}.webp"
    avifenc --min 20 --max 35 "assets/images/output/${base}-${size}.jpg" "assets/images/output/${base}-${size}.avif"
  done
done
```

This is run manually when photos change. No build step during development or deployment.

### Lazy Loading Strategy

- **Hero image:** `loading="eager"`, preloaded in `<head>` with `<link rel="preload" as="image" href="..." fetchpriority="high">`
- **All other images:** `loading="lazy"` + `decoding="async"`
- **Explicit `width` and `height` on all `<img>`** to prevent layout shift (CLS)

## Font Loading Strategy

### Font Selection

| Font | Purpose | Format | Source |
|------|---------|--------|--------|
| UnifrakturMaguntia (or MedievalSharp) | Headings -- blackletter/gothic feel | WOFF2 | Google Fonts (self-hosted) |
| Inter | Body text -- clean, readable | WOFF2 | Google Fonts (self-hosted) |
| Norse (or custom runic subset) | Decorative rune accents | WOFF2 | Open-source, self-hosted |

### Loading Pattern

```html
<!-- Preload critical fonts (heading + body only, not decorative) -->
<link rel="preload" href="assets/fonts/unifraktur-maguntia-v20-latin.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-v18-latin-regular.woff2"
      as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'UnifrakturMaguntia';
  src: url('../assets/fonts/unifraktur-maguntia-v20-latin.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}

@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/inter-v18-latin-regular.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}

@font-face {
  font-family: 'Norse';
  src: url('../assets/fonts/norse.woff2') format('woff2');
  font-display: optional; /* decorative, not critical */
  font-weight: 400;
}
```

**Why self-hosted over Google Fonts CDN:** Eliminates third-party DNS lookup, avoids GDPR/privacy concerns, gives full cache control. Download fonts once, serve from same origin.

**Why `font-display: swap` for critical, `optional` for decorative:** Headings and body text must appear immediately (swap shows fallback then swaps). Runic accents are decorative -- if they miss the load window, system fallback is acceptable and avoids layout shift.

## Masonry Gallery Architecture

CSS-native masonry (`grid-template-rows: masonry`) is still experimental and not shipped unflagged in any major browser as of March 2026. Use CSS columns as the primary approach with a lightweight JS enhancement.

### CSS Columns Approach (no JS required for basic layout)

```css
.gallery-grid {
  columns: 3;
  column-gap: var(--space-md);
}

.gallery-grid > .gallery-item {
  break-inside: avoid;
  margin-bottom: var(--space-md);
}

@media (max-width: 768px) {
  .gallery-grid { columns: 2; }
}

@media (max-width: 480px) {
  .gallery-grid { columns: 1; }
}
```

**Why CSS columns over JS-based masonry:** Zero JavaScript required for the layout itself. Items flow naturally into columns. The only downside is column-order (top-to-bottom per column rather than left-to-right row order), but for a photo gallery this is acceptable. If precise ordering matters, `gallery.js` can reorder items after load.

### Lightbox (gallery.js)

The lightbox is a fullscreen overlay toggled via JS. It does not require a library.

```
User clicks .gallery-item
  --> gallery.js reads data-full-src attribute
  --> Creates/shows .lightbox overlay element
  --> Loads full-resolution image into overlay
  --> Traps focus for accessibility (tab stays in lightbox)
  --> ESC key or click-outside closes
  --> Restores focus to original gallery item
```

## Responsive Breakpoint Strategy

Use a mobile-first approach with three breakpoints. Keep it simple -- more breakpoints create more maintenance for zero benefit on a single-page showcase.

| Breakpoint | Name | Target | Key Changes |
|------------|------|--------|-------------|
| Default (0px+) | Mobile | Phones | Single column, stacked sections, hamburger nav |
| 768px | Tablet | Tablets, small laptops | 2-column grids, side-by-side layouts, expanded nav |
| 1200px | Desktop | Desktops | Full grid layouts, max-width container, parallax enabled |

### Responsive Principles

1. **Use `clamp()` for fluid typography and spacing** -- eliminates most breakpoint needs for sizing.
2. **Use CSS Grid `auto-fit` / `auto-fill` with `minmax()`** for card grids -- responsive without media queries.
3. **Reserve `@media` queries for layout structure changes** (column count, nav style, section padding).
4. **Disable parallax/heavy effects on mobile** via `@media (max-width: 767px)` -- performance and usability.

```css
/* Brew cards grid: responsive without media queries */
.brew-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
  gap: var(--space-lg);
}
```

## Patterns to Follow

### Pattern 1: Progressive Enhancement for Effects

**What:** Base experience works without JS. JavaScript adds atmospheric enhancements.
**When:** Always. This is the core philosophy.
**Why:** If JS fails to load, the site is still fully readable and navigable. Scroll-reveal elements start visible in CSS, then JS adds the `.reveal` class to enable the effect.

```css
/* Default: visible */
.section-content { opacity: 1; transform: none; }

/* JS-enhanced: hidden until revealed */
.js-enabled .reveal { opacity: 0; transform: translateY(2rem); }
.js-enabled .reveal.is-visible { opacity: 1; transform: none; }
```

```javascript
// main.js adds the flag
document.documentElement.classList.add('js-enabled');
```

### Pattern 2: SVG for Decorative Elements

**What:** Use inline SVG for runes, borders, icons. Use CSS SVG backgrounds for repeating patterns.
**When:** All decorative Norse elements.
**Why:** SVGs scale infinitely, support CSS color theming via `currentColor` or custom properties, and are resolution-independent. Critical for the runic/ornamental aesthetic.

### Pattern 3: CSS-First, JS-Second

**What:** If CSS can do it, do not use JavaScript.
**When:** Hover effects, transitions, scroll-snap, sticky positioning, gradient overlays.
**Why:** CSS executes on the compositor thread. JS on the main thread. CSS is faster, more reliable, and simpler for visual effects.

## Anti-Patterns to Avoid

### Anti-Pattern 1: JavaScript Scroll Listeners for Reveal

**What:** Using `window.addEventListener('scroll', ...)` to check element positions.
**Why bad:** Fires hundreds of times per second, causes jank, requires manual throttling/debouncing.
**Instead:** Use IntersectionObserver. It is asynchronous, batched, and purpose-built for this task.

### Anti-Pattern 2: One Monolithic CSS File

**What:** Putting all styles in a single `style.css`.
**Why bad:** Becomes unmaintainable past 500 lines. Hard to find what controls what. Merge conflicts in team settings.
**Instead:** Split by concern (variables, base, layout, components, animations, utilities). HTTP/2 makes multiple small files as fast as one large file.

### Anti-Pattern 3: Background Images for Content Photography

**What:** Using `background-image` in CSS for brew photos and gallery images.
**Why bad:** No alt text, no `<picture>` fallbacks, no `srcset`, no lazy loading, invisible to screen readers and search engines.
**Instead:** Use `<picture>` with `<img>` for all content images. Reserve `background-image` for decorative textures and gradients only.

### Anti-Pattern 4: Framework Creep

**What:** Adding a lightbox library, a masonry library, an animation library, a scroll library.
**Why bad:** Each library adds weight, version management, and potential breakage. For a single-page showcase, native browser APIs cover every need.
**Instead:** Vanilla IntersectionObserver, CSS columns, CSS transitions, and a simple hand-written lightbox. Total JS should be under 5KB.

## Suggested Build Order (Dependencies)

Build order follows component dependencies. Each phase produces a deployable (if incomplete) site.

```
Phase 1: Foundation
  |-- index.html (semantic structure, all sections as empty shells)
  |-- variables.css (full design token system)
  |-- reset.css + base.css (typography, body styles)
  |-- Font files + @font-face declarations
  |-- Deployable: styled skeleton with correct typography

Phase 2: Layout + Navigation
  |-- layout.css (section containers, grid systems, responsive)
  |-- navigation.js (smooth scroll, mobile menu)
  |-- nav component in HTML
  |-- Depends on: Phase 1 (tokens, base styles)
  |-- Deployable: navigable page structure

Phase 3: Hero + Atmosphere
  |-- Hero section: layered backgrounds, logo, CTA
  |-- animations.css (glow effects, ambient keyframes)
  |-- effects.js (parallax, ambient FX)
  |-- SVG decorative elements integrated
  |-- Depends on: Phase 1 + 2 (layout, tokens, base)
  |-- Deployable: impressive landing experience

Phase 4: Content Sections
  |-- Brewer's Saga section (text content, layout)
  |-- Sacred Brews grid (card components, brew data)
  |-- Brewing Ritual chapters (photo + text layout)
  |-- components.css (cards, chapter blocks)
  |-- Image pipeline: convert and size photos
  |-- Depends on: Phase 1 + 2 (layout, grid, tokens)
  |-- Deployable: full content site

Phase 5: Gallery + Interactivity
  |-- Masonry photo gallery (CSS columns)
  |-- gallery.js (lightbox)
  |-- scroll-reveal.js (IntersectionObserver)
  |-- Depends on: Phase 1-4 (all sections exist to be revealed)
  |-- Deployable: complete interactive site

Phase 6: Polish + Performance
  |-- Footer
  |-- Responsive testing + fixes
  |-- Image optimization pass (AVIF/WebP generation)
  |-- prefers-reduced-motion support
  |-- Performance audit (Lighthouse)
  |-- Depends on: Phase 1-5 (everything built)
  |-- Deployable: production-ready site
```

## Scalability Considerations

| Concern | Current (2-4 brews) | Future (10+ brews) | Future (50+ photos) |
|---------|----------------------|---------------------|----------------------|
| Page weight | ~2-4 MB (mostly images) | Split brew cards across tabs/filters | Paginate gallery or infinite scroll |
| Load time | Lazy loading handles it | No change needed | Consider thumbnail placeholders |
| Maintainability | Edit HTML directly | Consider JSON data + JS templating | Consider JSON data + JS templating |
| Gallery performance | CSS columns, fine | CSS columns, fine | Virtual scrolling if needed |

For the initial 2-4 brews and a dozen gallery photos, the architecture handles everything natively. The JSON-templating upgrade path exists if the site grows, but building it now would be premature engineering.

## Sources

- [MDN: CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) -- HIGH confidence
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) -- HIGH confidence
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) -- HIGH confidence
- [MDN: CSS Masonry Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout) -- HIGH confidence (experimental status confirmed)
- [web.dev: Font Best Practices](https://web.dev/articles/font-best-practices) -- HIGH confidence
- [web.dev: Optimize WebFont Loading](https://web.dev/articles/optimize-webfont-loading) -- HIGH confidence
- [Request Metrics: Image Optimization Guide 2026](https://requestmetrics.com/web-performance/high-performance-images/) -- MEDIUM confidence
- [FrontendTools: CSS Variables Guide](https://www.frontendtools.tech/blog/css-variables-guide-design-tokens-theming-2025) -- MEDIUM confidence
- [CSS-Tricks: Masonry Layout is Now grid-lanes](https://css-tricks.com/masonry-layout-is-now-grid-lanes/) -- MEDIUM confidence (specification still in flux)
- [Max Bock: Going Buildless](https://mxb.dev/blog/buildless/) -- MEDIUM confidence
- [Chrome Developers: Scroll-Triggered Animations](https://developer.chrome.com/blog/scroll-triggered-animations) -- HIGH confidence
