# Domain Pitfalls

**Domain:** Dark-themed immersive Viking metal homebrew showcase (vanilla HTML/CSS/JS)
**Researched:** 2026-03-24

## Critical Pitfalls

Mistakes that cause rewrites, broken user experience, or fundamentally undermine the site.

### Pitfall 1: Blood Red and Ancient Wood Fail WCAG Contrast on Dark Background

**What goes wrong:** The project palette includes Blood Red (#8B0000) and Ancient Wood (#4A2C0B) as prominent colors, but both catastrophically fail WCAG AA contrast requirements against the void black background (#0A0A0A). Blood Red achieves only 1.98:1 (needs 4.5:1 for normal text, 3:1 for large text). Ancient Wood achieves only 1.56:1. Both fail even the large-text threshold. Using these colors for any readable text renders the site inaccessible.

| Color on #0A0A0A | Ratio | AA Normal (4.5:1) | AA Large (3:1) |
|---|---|---|---|
| Blood Red #8B0000 | 1.98:1 | FAIL | FAIL |
| Viking Gold #D4AF37 | 9.42:1 | PASS | PASS |
| Cold Steel #A8B5B8 | 9.40:1 | PASS | PASS |
| Ancient Wood #4A2C0B | 1.56:1 | FAIL | FAIL |
| White #FFFFFF | 19.80:1 | PASS | PASS |
| Emerald #2E8B57 | 4.66:1 | PASS | PASS |
| Fiery Orange #FF4500 | 5.75:1 | PASS | PASS |

**Why it happens:** Dark-on-dark color palettes feel atmospheric in design mockups but fail when actual text legibility is tested. Designers often assume "it looks fine on my monitor" without measuring ratios. Red on black is a notorious offender because dark reds have very low luminance.

**Consequences:** Visually impaired users cannot read text. Even users with normal vision strain to read body text in Blood Red or Ancient Wood. The "epic atmosphere" becomes "I can't read anything."

**Prevention:**
- Reserve Blood Red and Ancient Wood for decorative, non-text purposes only: borders, dividers, background accents, subtle gradients, hover glows. Never use them for readable text.
- Use Viking Gold (#D4AF37, 9.42:1) or Cold Steel (#A8B5B8, 9.40:1) for all heading and body text.
- If Blood Red must appear in text (e.g., a CTA button), lighten it to at least #CC2200 or place it on a lighter background that achieves 4.5:1.
- Test every color combination with WebAIM Contrast Checker before committing to the stylesheet.

**Detection:** Run any automated accessibility checker (Lighthouse, axe DevTools). Contrast failures will surface immediately.

**Confidence:** HIGH -- computed mathematically from the hex values in PROJECT.md.

**Phase relevance:** Must be addressed in Phase 1 (foundation/styling). Baking in inaccessible color usage early means reworking every section later.

---

### Pitfall 2: Blackletter Font Loading Failure Leaves Unreadable Fallback

**What goes wrong:** Blackletter/runic display fonts (e.g., MedievalSharp, UnifrakturMaguntia, or self-hosted blackletter .woff2 files) have no reasonable system font fallback. When the font fails to load -- slow connection, CDN outage, corporate firewall blocking Google Fonts -- the fallback to Arial or Times New Roman destroys the entire Viking metal aesthetic. Worse, blackletter fonts have wildly different metrics (x-height, letter-spacing, width) from any system font, causing massive Cumulative Layout Shift (CLS) when they finally load.

**Why it happens:** Blackletter is an exotic font category with zero system font equivalents. Unlike switching between, say, Inter and system-ui (similar metrics), a blackletter-to-sans-serif swap is visually jarring and metrically incompatible.

**Consequences:** Flash of Unstyled Text (FOUT) that looks broken, not just different. Layout shift as text reflows when the blackletter font loads (potentially 20-40% width change). If using `font-display: block`, invisible text for up to 3 seconds on slow connections.

**Prevention:**
- Self-host all fonts (do not rely on Google Fonts CDN). Ship .woff2 files in the repository alongside HTML/CSS. This eliminates third-party CDN dependency entirely, which aligns with the vanilla/static constraint.
- Use `<link rel="preload" as="font" href="fonts/blackletter.woff2" type="font/woff2" crossorigin="anonymous">` in the `<head>` for the display font. Preload only 1-2 fonts (the blackletter heading font and possibly a rune decorative font). Do not preload body text fonts.
- Use `font-display: swap` in `@font-face` for the blackletter font so content is always readable, even if briefly in a fallback.
- Set a fallback stack that at least has similar weight: `font-family: 'Blackletter', 'Georgia', 'Times New Roman', serif;` -- serif fallbacks are closer to blackletter than sans-serif.
- Adjust fallback font metrics using `size-adjust`, `ascent-override`, `descent-override` in `@font-face` to minimize CLS when the swap occurs.
- Keep blackletter usage to headings only (h1, h2, section titles). Body text must use a widely-available sans-serif.

**Detection:** Throttle network to "Slow 3G" in DevTools and reload. If the page looks broken for multiple seconds, or text is invisible, the font strategy needs work.

**Confidence:** HIGH -- well-documented web typography issue, amplified for exotic font categories.

**Phase relevance:** Phase 1 (foundation). Font strategy must be established before any content is styled.

---

### Pitfall 3: Unoptimized Hero and Gallery Images Kill Load Time

**What goes wrong:** A full-screen hero image at 3000x2000px JPEG straight from a camera is 2-5MB. A masonry gallery with 10-15 workshop photos at original resolution can exceed 20MB total. On mobile, this means 10+ second load times, failed Core Web Vitals, and users bouncing before seeing any content. The atmospheric effect the images are supposed to create is destroyed by a loading spinner.

**Why it happens:** Real workshop photos (as specified in PROJECT.md -- "real photos from the brewer's workshop") come from cameras or phones at high resolution. Without a build pipeline (the project is vanilla HTML/CSS/JS with no build tools), there is no automatic optimization step. Developers often "just drop in" the original files.

**Consequences:** Largest Contentful Paint (LCP) exceeds 4+ seconds. Mobile users on cellular connections may never see the full page. The hero section -- the most important first impression -- is the worst offender because it is above the fold and typically the largest image.

**Prevention:**
- Pre-optimize all images before adding to the repository. Use a one-time manual step with tools like `squoosh.app` (browser-based, no install needed) or `cwebp`/`avifenc` CLI tools.
- Target sizes: hero image max 200KB (WebP at 1920px wide), gallery thumbnails max 50KB each, full-size gallery images max 150KB.
- Use the `<picture>` element with AVIF and WebP sources and JPEG fallback:
  ```html
  <picture>
    <source srcset="img/hero.avif" type="image/avif">
    <source srcset="img/hero.webp" type="image/webp">
    <img src="img/hero.jpg" alt="..." loading="eager" width="1920" height="1080">
  </picture>
  ```
- Use `loading="lazy"` on all images below the fold (gallery, brewing process photos). Use `loading="eager"` only on the hero image.
- Provide `width` and `height` attributes on all `<img>` tags to prevent layout shift.
- Use `srcset` with multiple resolutions for responsive delivery (e.g., 640w, 1024w, 1920w).

**Detection:** Run Lighthouse performance audit. Check that LCP is under 2.5 seconds. Check total page weight in DevTools Network tab.

**Confidence:** HIGH -- universal web performance principle, especially critical for image-heavy showcase sites without build tooling.

**Phase relevance:** Phase 1 (asset preparation) and every subsequent phase that adds images. Establish the optimization workflow and image template once, then follow it consistently.

---

### Pitfall 4: Animated Glow Effects and Layered Shadows Cause Scroll Jank

**What goes wrong:** The design calls for glowing runes, fiery orange glows, and scratched metal textures. Implementing these with animated `box-shadow` or `text-shadow` with large blur radii (30px+) triggers constant GPU repainting on every frame. Stack multiple glowing elements on screen simultaneously -- a glowing CTA, pulsing runes in the nav, glowing card borders in the brew showcase -- and the page becomes a slideshow on mid-range phones.

**Why it happens:** `box-shadow` and `text-shadow` are not GPU-composited by default. Animating their blur radius forces the browser to recalculate Gaussian blur on the CPU every frame. Combined with dark backgrounds (which make glow effects more visually prominent, encouraging designers to add more), the rendering cost compounds.

**Consequences:** Dropped frames during scrolling (scroll jank). Mobile devices heat up, batteries drain, fans spin on laptops. The "immersive atmospheric" effect becomes "my phone is lagging."

**Prevention:**
- Never animate `box-shadow` or `text-shadow` properties directly. Instead, create the glow on a pseudo-element (`::before`/`::after`) and animate only `opacity` or `transform` on that element -- these are GPU-composited.
  ```css
  .rune-glow::after {
    content: '';
    position: absolute;
    inset: -10px;
    box-shadow: 0 0 30px 10px rgba(212, 175, 55, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
    /* Force GPU layer */
    will-change: opacity;
  }
  .rune-glow:hover::after { opacity: 1; }
  ```
- Limit simultaneous animated glow elements to 3-4 max visible at once. Glow effects on gallery cards should activate only on hover, not pulse continuously.
- Use `will-change: transform` or `will-change: opacity` on elements that will animate, but sparingly (not on dozens of elements).
- For background atmospheric effects (e.g., subtle pulsing rune behind a section), use a CSS animation on a single element's `opacity` rather than shadow properties.
- Prefer CSS `filter: drop-shadow()` over `box-shadow` for irregular shapes -- it can be hardware-accelerated.
- Test on a real mid-range Android phone (or Chrome DevTools with CPU throttling at 4x slowdown).

**Detection:** Open Chrome DevTools Performance tab, record a scroll through the page. Look for long "Paint" tasks (green bars) exceeding 16ms. If frames consistently exceed 16ms, there is scroll jank.

**Confidence:** HIGH -- well-documented browser rendering behavior.

**Phase relevance:** Phase 2 (decorative elements, animations). Must establish the glow/animation pattern before applying it across sections.

---

## Moderate Pitfalls

### Pitfall 5: Scroll-Jacking Destroys the "Album Booklet" Experience

**What goes wrong:** The project envisions a single-page vertical scroll experience "like an album booklet." This tempts developers into scroll hijacking -- snapping to sections, controlling scroll speed, or triggering animations that pause scrolling. Users universally hate having scroll control taken away. Nielsen Norman Group specifically calls scrolljacking a "usability nightmare."

**Why it happens:** The album booklet metaphor suggests page-by-page progression. Developers try to enforce this with JavaScript scroll event listeners that override native behavior.

**Prevention:**
- Never override native scroll behavior. No `scroll-snap-type: y mandatory` on the full page (optional `proximity` is acceptable for subtle guidance). No JavaScript that calls `preventDefault()` on wheel/touch events.
- Use CSS `scroll-behavior: smooth` for anchor link navigation only (clicking nav links).
- Trigger section reveal animations with `IntersectionObserver`, not scroll event listeners. Animations should fire when sections enter the viewport, not control scrolling pace.
- The "album booklet" feel comes from full-viewport sections, dramatic typography, and atmospheric transitions between sections -- not from controlling scroll mechanics.

**Detection:** Scroll rapidly through the page on desktop, tablet, and phone. If scrolling feels sluggish, snappy, or "different" from normal websites, there is scroll-jacking. Ask someone unfamiliar with the site to scroll through it.

**Confidence:** HIGH -- overwhelming UX consensus against scroll-jacking.

**Phase relevance:** Phase 2-3 (navigation and section transitions). The temptation arises when implementing section-to-section flow.

---

### Pitfall 6: Stacking Context Hell with Layered Dark Backgrounds

**What goes wrong:** The atmospheric design requires layered elements: a dark gradient background, a semi-transparent texture overlay, runic decorations positioned absolutely, and content on top. Each CSS property that seems harmless -- `opacity`, `transform`, `filter`, `mix-blend-mode` -- creates a new stacking context. Suddenly, a modal or navigation dropdown renders behind a section's decorative layer, or a fixed-position nav disappears behind a section with `transform: translateZ(0)`.

**Why it happens:** Dark immersive sites use more visual layering than typical sites. Each section might have: base background color, gradient overlay, texture image overlay (with `mix-blend-mode: multiply`), decorative SVG elements, and foreground content. That is 4-5 layers per section, each potentially creating stacking contexts that trap z-index values.

**Prevention:**
- Plan a z-index scale from the start. Use CSS custom properties:
  ```css
  :root {
    --z-background: 0;
    --z-texture: 1;
    --z-decorative: 2;
    --z-content: 3;
    --z-nav: 100;
    --z-modal: 200;
  }
  ```
- Keep the navigation and any overlays outside section containers in the DOM hierarchy. Render nav as a direct child of `<body>` with `position: fixed` and a high z-index.
- Avoid `transform`, `filter`, or `opacity` on section wrapper elements. Apply these only to inner decorative elements that do not need to contain z-indexed children.
- If a section needs a textured overlay, use a `::before` pseudo-element for the texture rather than an additional DOM element. The pseudo-element stays within the section's stacking context without creating a new one (unless it has its own transform/filter).
- Test by temporarily giving every stacking context a colored outline to visualize the layer structure.

**Detection:** If z-index values start escalating above 100 for content elements, or if adding `z-index: 9999` does not fix a layering issue, stacking contexts are the problem. Chrome DevTools "Layers" panel visualizes composite layers.

**Confidence:** HIGH -- classic CSS architectural issue, amplified by the heavy layering this design demands.

**Phase relevance:** Phase 1 (CSS architecture). The z-index scale and layering strategy must be established before building sections.

---

### Pitfall 7: Masonry Gallery Breaks on Mobile Without JavaScript

**What goes wrong:** The "Hall of Relics" masonry photo gallery cannot be achieved with pure CSS in a way that maintains item order and responsiveness. The CSS `columns` approach flows items top-to-bottom per column (breaking visual order). CSS Grid `masonry` value is still experimental and unsupported in most browsers as of early 2026 (Firefox behind a flag only). Without JavaScript, the gallery either has gaps, wrong ordering, or breaks entirely on resize.

**Why it happens:** Masonry layout is a famously unsolved problem in pure CSS. The project's constraint of "vanilla HTML/CSS/JS -- no frameworks" is fine, but developers may attempt a CSS-only solution that fails on mobile or creates confusing item ordering.

**Prevention:**
- Accept that masonry requires a small amount of vanilla JavaScript. Use a lightweight approach (~30 lines) with `ResizeObserver` to reposition items using `transform: translateY()` -- this avoids layout thrashing and is GPU-friendly.
- Alternatively, use a minimal library like the 1.4KB masonry-grid package (zero dependencies, vanilla JS).
- On mobile (< 768px), collapse to a single-column layout. Masonry only matters on wider screens. This simplification also avoids mobile performance issues.
- Always set explicit `width` and `height` (or `aspect-ratio`) on gallery images to prevent layout shift during load.
- Fallback: if JavaScript is disabled, the CSS grid layout should still show all images in a reasonable grid -- just without masonry vertical packing.

**Detection:** Resize the browser from 1920px to 320px width. If images overlap, leave large gaps, or appear in a confusing order, the masonry implementation is broken.

**Confidence:** MEDIUM -- CSS masonry spec is evolving and browser support may improve, but as of research date it is not production-ready.

**Phase relevance:** Phase 3 (gallery section). This is a contained problem that only affects one section.

---

### Pitfall 8: Decorative Elements Break Screen Reader Experience

**What goes wrong:** Decorative SVG runes, Vegvisir symbols, Yggdrasil branches, thorny vine borders, and ravens are atmospheric but meaningless to screen readers. Without proper ARIA attributes, screen readers announce every decorative SVG element, creating a confusing wall of "image image image" or reading out SVG `<title>` elements that say unhelpful things like "rune-decoration-left."

**Why it happens:** Developers add decorative elements visually and forget they exist in the accessibility tree. Inline SVGs are especially problematic because their internal elements are all exposed to screen readers by default.

**Prevention:**
- All decorative images and SVGs must have `aria-hidden="true"` and `role="presentation"`:
  ```html
  <svg aria-hidden="true" role="presentation" class="decorative-rune">...</svg>
  <img src="vine-border.svg" alt="" role="presentation">
  ```
- For decorative `<img>` elements, use an empty `alt=""` (not missing alt, which is a different accessibility error).
- Use CSS `background-image` for purely decorative textures and overlays rather than `<img>` tags -- background images are invisible to screen readers.
- Ensure the page makes complete sense when read linearly by a screen reader with all decorative elements hidden. Test with browser reader mode as a quick check.

**Detection:** Use a screen reader (VoiceOver on Mac, NVDA on Windows) or the Chrome Accessibility tree inspector. If decorative elements are announced, they need hiding.

**Confidence:** HIGH -- standard accessibility practice.

**Phase relevance:** Every phase that adds decorative elements. Establish the pattern in Phase 1, enforce in all subsequent phases.

---

## Minor Pitfalls

### Pitfall 9: CSS Custom Properties Fallback for Older Browsers

**What goes wrong:** Heavy use of CSS custom properties (`--color-blood-red`, `--z-nav`, etc.) fails silently in browsers that do not support them (IE11, very old mobile browsers). The site renders with no colors, no spacing values, nothing.

**Prevention:** CSS custom properties have 97%+ global support as of 2026. For this hobby project, explicitly declare that IE11 is not supported. No fallback needed. However, always declare custom properties on `:root` (not on `body`) for maximum specificity coverage.

**Detection:** Check caniuse.com for custom property support against your target audience.

**Confidence:** HIGH -- this is a non-issue for modern browsers but worth noting.

**Phase relevance:** Phase 1 (CSS architecture). Declare browser support baseline early.

---

### Pitfall 10: Dark Background + System Scrollbar Aesthetic Clash

**What goes wrong:** The immersive dark void aesthetic is broken by a bright gray/white system scrollbar on the right edge of the viewport. On Windows especially, the default scrollbar is a jarring light color that breaks immersion.

**Prevention:**
- Style the scrollbar with CSS for webkit/blink browsers:
  ```css
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #4A2C0B; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
  ```
- Use `scrollbar-color` and `scrollbar-width` for Firefox:
  ```css
  html { scrollbar-color: #4A2C0B #0A0A0A; scrollbar-width: thin; }
  ```
- This is progressive enhancement -- unsupported browsers simply show the default scrollbar.

**Detection:** View the site on Windows Chrome and Firefox. If the scrollbar is bright white, it needs styling.

**Confidence:** HIGH -- simple CSS solution, purely aesthetic concern.

**Phase relevance:** Phase 1 (CSS foundation). Quick win that dramatically improves immersion.

---

### Pitfall 11: Viewport Units and Mobile Browser Chrome

**What goes wrong:** Using `100vh` for full-screen hero sections does not account for mobile browser UI (address bar, toolbar). On iOS Safari and Android Chrome, `100vh` is taller than the visible viewport, causing content to be cut off below the fold and scroll bouncing at the top of the page.

**Prevention:**
- Use `100dvh` (dynamic viewport height) instead of `100vh`. It accounts for browser chrome visibility changes.
  ```css
  .hero { min-height: 100dvh; }
  ```
- Provide a fallback for older browsers: `min-height: 100vh; min-height: 100dvh;`
- Never use `height: 100vh` (fixed) -- use `min-height` so content can overflow naturally if it exceeds viewport height.

**Detection:** Open the hero section on iOS Safari and Android Chrome. If content is cut off at the bottom or there is a visual bounce, the viewport unit is wrong.

**Confidence:** HIGH -- well-known mobile CSS issue, `dvh` support is 95%+ in 2026.

**Phase relevance:** Phase 1 (hero section). Must be correct from the start.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Phase 1: CSS Foundation & Hero | Color contrast failures (#8B0000, #4A2C0B on #0A0A0A) | Restrict red/brown to decorative use only; test all text combos |
| Phase 1: CSS Foundation & Hero | Font loading FOUT/CLS with blackletter | Self-host fonts, preload heading font, use font-display: swap |
| Phase 1: CSS Foundation & Hero | 100vh broken on mobile | Use 100dvh with vh fallback |
| Phase 1: CSS Foundation & Hero | Z-index chaos from layered backgrounds | Establish z-index scale as CSS custom properties |
| Phase 1: CSS Foundation & Hero | Scrollbar aesthetic clash | Style scrollbar in phase 1 CSS reset |
| Phase 2: Sections & Animations | Scroll-jacking temptation | Use IntersectionObserver for reveals, never override scroll |
| Phase 2: Sections & Animations | Animated glow performance | Animate opacity on pseudo-elements, not shadow properties |
| Phase 2: Sections & Animations | Decorative elements in accessibility tree | aria-hidden="true" on all decorative SVGs/images |
| Phase 3: Gallery | Masonry layout breaks on mobile | Vanilla JS with ResizeObserver; single-column mobile fallback |
| Phase 3: Gallery | Gallery images unoptimized | Pre-optimize to WebP/AVIF; lazy-load all gallery images |
| All Phases | Adding new images without optimization | Establish and document the image optimization workflow once |

## Sources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) -- WCAG contrast requirements
- [W3C WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) -- Contrast minimum understanding
- [web.dev: Preload optional fonts](https://web.dev/articles/preload-optional-fonts) -- Font loading strategies
- [web.dev: Optimize WebFont loading](https://web.dev/articles/optimize-webfont-loading) -- font-display and preload
- [Chrome Developers: Improved font fallbacks](https://developer.chrome.com/blog/font-fallbacks) -- size-adjust, ascent-override
- [How to avoid layout shifts caused by web fonts](https://simonhearne.com/2021/layout-shifts-webfonts/) -- CLS from font loading
- [Josh W. Comeau: Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) -- Shadow performance
- [Coder's Block: Creating Glow Effects with CSS](https://codersblock.com/blog/creating-glow-effects-with-css/) -- Glow implementation patterns
- [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) -- Scroll-jacking usability research
- [Josh W. Comeau: What The Heck, z-index??](https://www.joshwcomeau.com/css/stacking-contexts/) -- Stacking context explanation
- [MDN: Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context) -- Stacking context reference
- [MDN: Masonry layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout) -- CSS masonry spec status
- [DubBot: Dark Mode Accessibility](https://dubbot.com/dubblog/2023/dark-mode-a11y.html) -- Dark mode accessibility pitfalls
- [Request Metrics: Image Optimization Guide](https://requestmetrics.com/web-performance/high-performance-images/) -- Image optimization for static sites
- Contrast ratios computed mathematically from project hex values using WCAG relative luminance formula
