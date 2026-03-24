# Technology Stack

**Project:** Rodbrecht Mjoed & Brews -- Viking Metal Homebrew Showcase
**Researched:** 2026-03-24

## Recommended Stack

### Core: Vanilla HTML/CSS/JS (No Build Tools)

This is a static single-page site with no framework, no bundler, no npm. All dependencies load via CDN. Files are hand-edited and deployed as-is. This matches the project constraint of "raw, deployable, no frameworks."

### Scroll Animations

| Technology | Version | CDN | Why |
|------------|---------|-----|-----|
| GSAP | 3.13.0 | `cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js` | Industry standard for scroll-driven animations. Now 100% free (all plugins) after Webflow acquisition in Oct 2024. Battle-tested, performant, works with vanilla JS out of the box. |
| GSAP ScrollTrigger | 3.13.0 | `cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js` | Pin sections, trigger fade-ins on scroll, parallax backgrounds, scrub animations tied to scroll position. Essential for the immersive album-booklet scroll experience. |

**Confidence: HIGH** -- verified via cdnjs, official GSAP docs, and Webflow announcement.

**Why not native CSS `scroll-timeline`?** CSS scroll-driven animations (`animation-timeline: scroll()`) are supported in Chrome/Edge 115+ and Safari TP, but Firefox support remains incomplete as of early 2026. For a site that must work everywhere without graceful degradation headaches, GSAP is the reliable choice. Use CSS `scroll-timeline` as progressive enhancement for simple opacity fades where appropriate, but rely on GSAP for the heavy lifting (parallax, pinning, scrubbing).

**Why not AOS (Animate On Scroll)?** AOS is simpler but far less capable. It only handles reveal-on-scroll with preset animations. GSAP ScrollTrigger enables scrubbed parallax, pinned sections, and timeline-based choreography -- all critical for the immersive Viking album-booklet feel.

### Lightbox / Gallery

| Technology | Version | CDN | Why |
|------------|---------|-----|-----|
| GLightbox | 3.3.1 | JS: `cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.1/js/glightbox.min.js` | Pure vanilla JS, zero dependencies, ~12KB gzipped. Handles images with smooth open/close animations (zoom, fade). Touch/swipe support for mobile. MIT license. |
| | | CSS: `cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.1/css/glightbox.min.css` | Easily skinnable CSS for dark theme customization. |

**Confidence: HIGH** -- verified via cdnjs, GitHub repo (biati-digital/glightbox).

**Why not fslightbox?** Free version is limited (no slide counter, no captions). Full version requires purchase. GLightbox is fully featured and free.

### Masonry Grid (Hall of Relics Gallery)

| Technology | Version | Why |
|------------|---------|-----|
| CSS Grid + JS positioning | N/A | Native CSS masonry (`grid-template-rows: masonry` / `display: grid-lanes`) is still experimental and behind flags in all browsers as of March 2026. Production ship date estimated Q2-Q3 2026. |

**Approach:** Use CSS Grid for the base layout (3-4 columns responsive) with a lightweight vanilla JS script (~30 lines) to reorder items by height for a masonry effect. Alternatively, use CSS columns (`column-count`) for a pure-CSS masonry approximation that works everywhere.

**Why not Masonry.js (by Desandro)?** At 25KB+ it is overkill for a gallery of 10-20 photos. CSS columns or a small custom script achieves the same visual with zero dependency weight.

**Confidence: MEDIUM** -- CSS-only masonry works well for simple grids but may need JS assist for perfect item ordering.

### Typography (Web Fonts via Google Fonts)

| Font | Role | Why |
|------|------|-----|
| **UnifrakturMaguntia** | Hero headings, section titles | Authentic blackletter/Fraktur style. Sharp angular letterforms evoke medieval manuscripts and metal album logos. Available on Google Fonts, free. |
| **MedievalSharp** | Subheadings, card titles, navigation | Medieval-styled but more readable than full blackletter. Sharp serifs with Norse character. Pairs well as a step down from UnifrakturMaguntia. |
| **Inter** or **Source Sans 3** | Body text, descriptions, captions | Clean modern sans-serif for readability. High contrast against ornate headings. Excellent legibility at small sizes on dark backgrounds. Inter has variable font support for fine weight control. |
| **Noto Sans Runic** | Decorative rune characters | Google's Noto collection includes actual Unicode runic glyphs. Use for decorative dividers, accents, and inline rune symbols. |

**Loading strategy:** Use `<link rel="preconnect" href="https://fonts.googleapis.com">` and `font-display: swap` to avoid FOIT (Flash of Invisible Text). Load only the weights needed (400, 700 for body; 400 for display fonts which are inherently bold).

**Confidence: HIGH** -- all fonts verified on Google Fonts.

**Why not self-hosted fonts?** Google Fonts CDN is cached across sites, has global edge delivery, and handles subsetting automatically. For a static site with no build tools, CDN is simpler. Self-host only if you add a custom runic display font not on Google Fonts.

### CSS Techniques (No Libraries Needed)

These are patterns, not dependencies. Implemented in hand-written CSS.

| Technique | Purpose | Implementation |
|-----------|---------|----------------|
| CSS Custom Properties | Color palette, spacing, theme tokens | `:root { --void-black: #0A0A0A; --blood-red: #8B0000; --viking-gold: #D4AF37; ... }` |
| Layered radial gradients | Atmospheric glows behind sections | `background: radial-gradient(ellipse at 50% 0%, rgba(139,0,0,0.15), transparent 70%), var(--void-black);` |
| SVG filter noise texture | Gritty, aged paper/metal texture overlay | SVG `<feTurbulence>` filter applied as pseudo-element background. Adds organic grain without image files. |
| `box-shadow` / `text-shadow` stacking | Glowing runes, ember effects, neon-like halos | Stack 3-4 shadows with increasing blur radius and decreasing opacity for realistic glow falloff. |
| `backdrop-filter: blur()` | Frosted glass effect on navigation overlay | Supported in all modern browsers. Creates depth when nav overlays hero imagery. |
| `mix-blend-mode` | Texture overlays that interact with content | `multiply` or `overlay` blend modes for scratched metal / aged parchment textures over sections. |
| CSS `@keyframes` | Subtle ambient animations | Flickering glow on runes, slow pulsing ember effects, gentle parallax drift. Pure CSS, no JS needed. |
| `clip-path` / SVG masks | Shield shapes, non-rectangular card edges | Shape navigation items, brew cards, or section dividers into shield/axe/irregular forms. |
| `scroll-behavior: smooth` | Smooth anchor scrolling | Native CSS, no JS needed for basic smooth scroll on nav clicks. |

**Confidence: HIGH** -- all standard CSS with excellent browser support.

### Image Optimization (Build-Time Tooling)

| Tool | Purpose | Why |
|------|---------|-----|
| **Squoosh web app** (squoosh.app) | Manual image optimization and format conversion | Browser-based, no install needed. Supports AVIF, WebP, JPEG. Visual quality comparison. Use for initial batch optimization of the brewer's photos. |
| **Sharp** (Node.js, optional) | Scripted batch optimization if photo count grows | `npx sharp-cli --input photos/*.jpg --output optimized/ --format webp --quality 80`. Only needed if manual Squoosh becomes tedious. |

**Format strategy:**
- Serve **WebP** as primary format (universal browser support, 25-35% smaller than JPEG)
- Provide **JPEG fallback** via `<picture>` element for any edge cases
- Skip AVIF for now -- encoding is slow for manual workflow, and WebP is sufficient for this photo count (10-20 images)
- Target **1200px max width** for full-bleed images, **600px** for gallery thumbnails
- Use `loading="lazy"` on all images below the fold (native browser lazy loading, no JS)
- Use `<picture>` with `<source type="image/webp">` and `<img>` fallback

```html
<picture>
  <source srcset="brew-card.webp" type="image/webp">
  <img src="brew-card.jpg" alt="Sacred Mead of Valhalla" loading="lazy" width="600" height="400">
</picture>
```

**Always set explicit `width` and `height`** on `<img>` tags to prevent Cumulative Layout Shift (CLS).

**Confidence: HIGH** -- standard best practices, verified via web.dev and MDN.

### Deployment

| Platform | Why | Free Tier |
|----------|-----|-----------|
| **Cloudflare Pages** (recommended) | Unlimited bandwidth on free tier. 300+ global edge locations. Fastest TTFB for static sites. Git-based deploy (push to GitHub, auto-deploys). Custom domain + free SSL. No build step needed for static HTML. | Unlimited sites, unlimited bandwidth, 500 builds/month |
| GitHub Pages (alternative) | Simpler setup if already on GitHub. Good for personal projects. | Unlimited for public repos, 100GB bandwidth/month |
| Netlify (alternative) | More features (forms, functions) but 100GB bandwidth cap on free tier. Overkill for a static site with no dynamic needs. | 100GB bandwidth/month |

**Recommendation: Cloudflare Pages** because unlimited bandwidth matters for a photo-heavy site, and the global edge network ensures fast image delivery without a separate CDN. Deploy workflow: push to GitHub main branch, Cloudflare auto-deploys.

**Confidence: HIGH** -- all platforms verified and widely documented.

### Decorative Assets

| Asset Type | Source | Notes |
|------------|--------|-------|
| SVG rune symbols | Hand-drawn or traced from public domain Elder Futhark references | SVGs are resolution-independent, styleable with CSS (fill, stroke, filter), and tiny in file size. |
| Vegvisir / Helm of Awe | Create as SVG paths | These are geometric patterns, ideal for SVG. Animate with GSAP for glowing/rotating effects. |
| Yggdrasil branches, ravens | SVG illustrations | Can be CSS-colored to match palette. Use as section dividers and decorative accents. |
| Noise/grain texture | Generated via CSS SVG filter | No image file needed. `<feTurbulence>` generates procedural noise. |
| Scratched metal texture | Single small tileable PNG/WebP (~50KB) | Use as repeating background with `mix-blend-mode: overlay` at low opacity. |

**Confidence: MEDIUM** -- SVG approach is proven, but the specific illustrations will need to be created or sourced.

## Complete CDN Include Block

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=MedievalSharp&family=Inter:wght@400;600;700&family=Noto+Sans+Runic&display=swap" rel="stylesheet">

<!-- GLightbox -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.1/css/glightbox.min.css">

<!-- GSAP + ScrollTrigger (load before closing </body>) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.1/js/glightbox.min.js" defer></script>

<!-- Site scripts -->
<script src="js/main.js" defer></script>
```

## File Structure

```
/
  index.html              # Single page, all sections
  css/
    style.css             # All styles (custom properties, layout, components, animations)
    glightbox-overrides.css  # Dark theme overrides for GLightbox (optional, can inline)
  js/
    main.js               # GSAP animations, ScrollTrigger setup, GLightbox init, masonry logic
  images/
    hero/                 # Hero background (1-2 large images)
    brews/                # Brew card images (2-4 WebP + JPEG fallbacks)
    gallery/              # Hall of Relics photos (WebP + JPEG fallbacks)
    textures/             # Scratched metal, parchment (tileable, small)
  svg/
    runes/                # Individual rune SVGs
    decorative/           # Vegvisir, Helm of Awe, Yggdrasil, ravens
    logo.svg              # Site logo/wordmark
  favicon.ico
  favicon.svg             # Modern SVG favicon
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Scroll animation | GSAP + ScrollTrigger | AOS.js | AOS only does reveal animations. No parallax, no pinning, no scrubbing. Too limited for immersive experience. |
| Scroll animation | GSAP + ScrollTrigger | CSS `scroll-timeline` | Incomplete Firefox support. Not reliable enough for production without polyfill complexity. |
| Lightbox | GLightbox | fslightbox | Free version is feature-limited. GLightbox is fully featured and free. |
| Lightbox | GLightbox | PhotoSwipe | More complex API, larger bundle, designed for complex gallery apps. Overkill here. |
| Masonry | CSS Grid + light JS | Masonry.js | 25KB+ library for a 10-20 photo grid. CSS columns or minimal JS is sufficient. |
| Masonry | CSS Grid + light JS | Native CSS masonry | Not shipping in stable browsers until ~Q3 2026. Cannot rely on it. |
| Body font | Inter | Roboto | Inter has better variable font support and is more distinctive. Roboto is overused. |
| Deployment | Cloudflare Pages | Netlify | 100GB bandwidth cap matters for photo-heavy site. Cloudflare has unlimited. |
| Image format | WebP | AVIF | AVIF encoding is slow for manual workflow. WebP is sufficient and universally supported. |
| Build tooling | None (manual) | Vite/Parcel | Project constraint is no build tools. CDN loading keeps it simple and deployable anywhere. |

## Performance Budget

For a photo-heavy atmospheric site, target these metrics:

| Metric | Target | Strategy |
|--------|--------|----------|
| Total page weight | < 2MB initial, < 5MB fully loaded | Lazy load gallery images, optimize hero aggressively |
| Largest Contentful Paint | < 2.5s | Preload hero image, inline critical CSS |
| Cumulative Layout Shift | < 0.1 | Explicit image dimensions, font-display: swap |
| First Input Delay | < 100ms | Defer all JS, no render-blocking scripts |
| JS bundle total | ~80KB (GSAP 70KB + GLightbox 12KB) | Both well-optimized, loaded via CDN with caching |

## Sources

- GSAP official docs and pricing: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | https://gsap.com/pricing/
- Webflow GSAP acquisition announcement: https://webflow.com/blog/gsap-becomes-free
- GSAP on cdnjs: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js
- GLightbox GitHub: https://github.com/biati-digital/glightbox
- GLightbox on cdnjs: https://cdnjs.com/libraries/glightbox
- CSS scroll-driven animations (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- CSS masonry/grid-lanes status: https://css-tricks.com/masonry-layout-is-now-grid-lanes/
- CSS masonry browser support (SitePoint): https://www.sitepoint.com/css-masonry-layout-native-grid/
- Google Fonts -- UnifrakturMaguntia: https://fonts.google.com/specimen/UnifrakturMaguntia
- Google Fonts -- MedievalSharp: https://fonts.google.com/specimen/MedievalSharp
- Google Fonts -- Noto Sans Runic: https://fonts.google.com/noto/specimen/Noto+Sans+Runic
- Grainy gradients technique (CSS-Tricks): https://css-tricks.com/grainy-gradients/
- Glow effects in dark themes (Design Systems Collective): https://www.designsystemscollective.com/building-glow-and-glass-ui-components-in-dark-themes-css-examples-ae402ade54d2
- Image optimization best practices: https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025
- Squoosh web app: https://squoosh.app/
- Cloudflare Pages: https://pages.cloudflare.com/
- Static hosting comparison: https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison
