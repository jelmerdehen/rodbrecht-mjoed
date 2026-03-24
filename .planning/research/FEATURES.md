# Feature Landscape

**Domain:** Dark-themed immersive personal showcase website (Viking metal homebrew)
**Researched:** 2026-03-24

## Table Stakes

Features users expect from an atmospheric, single-page showcase site. Missing any of these and the site feels broken or unfinished.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-screen hero section | First impression defines whether visitors stay or bounce. Every immersive showcase site opens with a dramatic viewport-filling hero. Without it, the "album booklet" feel collapses immediately. | Medium | Background image/texture, layered logo, tagline, single CTA, animated scroll indicator. Use `min-height: 100vh` with fallback for mobile address bar quirks (`100dvh`). |
| Sticky navigation with scroll spy | Single-page sites need persistent wayfinding. Users expect to know where they are and jump between sections. A nav that disappears forces hunting. | Medium | `position: sticky` for the bar itself (pure CSS, no JS needed). Intersection Observer API for scroll spy active-state highlighting. Smooth scroll via `scroll-behavior: smooth` CSS. Must transform to mobile hamburger menu below ~768px. |
| Responsive design | Non-negotiable in 2026. Over 60% of web traffic is mobile. A site that breaks on phones is a site that doesn't exist. | Medium | Mobile-first CSS with breakpoints at ~768px (tablet) and ~1024px (desktop). The epic atmosphere must survive small screens -- stack columns, scale typography with `clamp()`, maintain color palette and mood. |
| Brew showcase cards | This is the core content. Without a clear, visually striking presentation of 2-4 brews, the site has no payload. Visitors came to see what you make. | Medium | Grid of cards styled as album covers. Each card: brew image, name, style/description, tasting notes. CSS Grid with `auto-fill` and `minmax()` for responsive columns. Hover state with glow or reveal effect. |
| About / "Brewer's Saga" section | Every personal showcase needs a human story. Without it, the brews float disconnected from their maker. | Low | Text-heavy section with a portrait/workshop photo. Saga-style narrative framing. Straightforward HTML/CSS -- complexity is in the writing, not the code. |
| Process / "Brewing Ritual" section | Showing process builds credibility and engagement. Homebrew enthusiasts expect to see how it's made. For casual visitors, the ritual framing makes it entertaining. | Medium | 4 chapters with real photos: "Awakening the Honey", "Descent into the Cauldron", "The Raven's Blessing", "Aging in the Roots of Yggdrasil". Each chapter: heading, photo, description. Alternating layout (image left/right) works well. |
| Dark color scheme with proper contrast | The entire aesthetic depends on the dark palette. But dark themes done badly cause eye strain and accessibility failures. WCAG AA requires 4.5:1 contrast for normal text, 3:1 for large text. | Low | Base: `#0A0A0A` background (not pure `#000000` -- good, avoids halation). Body text should be `#E0E0E0` or similar off-white (not pure `#FFFFFF`). Gold `#D4AF37` on `#0A0A0A` = ~6.5:1 ratio (passes AA). Blood red `#8B0000` on `#0A0A0A` = ~2.1:1 (FAILS -- use only for decorative elements, never for readable text). Steel `#A8B5B8` on `#0A0A0A` = ~7.8:1 (passes). |
| Footer with social links | Visitors who scroll to the bottom are engaged. Give them somewhere to go -- Instagram, Untappd, whatever platforms the brewer uses. Without social links, the journey dead-ends. | Low | Simple section with styled icon links. Static HTML/CSS. |
| Semantic HTML and basic accessibility | Screen readers, keyboard navigation, and SEO all depend on proper HTML structure. `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy, `alt` text on images, focus-visible styles. | Low | No extra libraries needed. Just discipline in markup. Decorative elements get `aria-hidden="true"`. Skip-to-content link for keyboard users. |
| Performance / fast load | A static vanilla HTML/CSS/JS site should load fast. If images are unoptimized and scripts block render, the atmospheric illusion breaks while users wait. | Low | Optimize images (WebP format, reasonable sizes), lazy-load below-fold images with `loading="lazy"`, defer non-critical JS. No framework overhead -- vanilla stack is already an advantage here. |

## Differentiators

Features that elevate the site from "dark portfolio template" to "immersive Viking metal experience." Not expected, but these create the atmosphere that makes it memorable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-triggered section reveals | Sections fade/slide in as the user scrolls, creating a cinematic unfolding like turning pages in an album booklet. Without this, the page is just a long static scroll. | Low | Intersection Observer API with CSS transitions. Add `.reveal` class when section enters viewport. Use `opacity`, `transform: translateY()` transitions. Under 50 lines of JS. Performance is excellent since IO is off-main-thread. |
| Parallax depth layers | Background textures and decorative elements move at different scroll speeds, creating dimensional depth. Reinforces the "looking into a mythic world" feeling. | Medium | Vanilla JS scroll listener with `requestAnimationFrame` and CSS `transform: translateY()`. Speed multipliers of 0.2-0.5 feel natural. Apply to background textures and decorative elements only -- not content. Use `will-change: transform` for GPU acceleration. |
| Ambient particle/ember effects | Floating embers, dust motes, or faint rune glyphs drifting across the hero section. Subtle motion that makes the page feel alive without being distracting. | Medium | HTML5 Canvas overlay on hero section only (not full-page -- performance). Vanilla JS with `requestAnimationFrame`. 20-40 particles max. Orange/gold colored, low opacity, slow drift. Canvas sized to hero viewport. Must `pauseAnimations` when not visible (Intersection Observer). |
| Glowing rune decorations | Section dividers and borders with subtle CSS glow effects evoking magical runes. Transforms generic section breaks into thematic transitions. | Low | CSS `text-shadow` and `box-shadow` with gold color and blur radius. `@keyframes` pulse animation for subtle breathing glow. SVG or Unicode rune characters. Pure CSS, no JS needed. |
| Norse typography hierarchy | Blackletter/uncial headings paired with clean body text. The typographic contrast immediately signals "this is not a normal website" while maintaining readability. | Low | Google Fonts or self-hosted: a blackletter face (e.g., MedievalSharp, UnifrakturMaguntia, or similar) for `h1`/`h2` headings only. Clean sans-serif (Inter, system-ui) for body. Never use blackletter for body text -- it's illegible at small sizes. `@font-display: swap` for performance. |
| Photo gallery with lightbox | "Hall of Relics" masonry-style gallery of workshop and brew photos. Clicking opens a full-screen lightbox. Transforms the site from text-with-images to a visual experience. | Medium | CSS Grid with `grid-row: span` trick for masonry-like layout (native CSS masonry is not production-ready across browsers yet). Lightbox: vanilla JS modal with keyboard navigation (Escape to close, arrow keys to navigate). Overlay with backdrop blur. |
| Textured backgrounds and overlays | Scratched metal, aged parchment, wood grain textures layered via CSS. Adds tactile depth that flat dark backgrounds lack. | Low | CSS `background-image` with semi-transparent texture PNGs/SVGs overlaid on solid colors using `background-blend-mode` or pseudo-elements with low opacity. Multiple textures per section for variety. File sizes must stay small (optimize aggressively). |
| Animated scroll indicator on hero | A bouncing arrow or rune symbol at the bottom of the hero section signaling "scroll down." Small touch, but it solves the problem of users not realizing there's more content below a full-viewport hero. | Low | CSS `@keyframes` bounce animation on an SVG arrow or chevron. `position: absolute; bottom: 2rem`. Fade out on scroll (Intersection Observer or scroll listener). |
| Brew card hover/interaction effects | Cards that respond to hover with glow intensification, slight scale, or reveal of additional details. Makes the showcase feel interactive rather than static. | Low | CSS `:hover` and `:focus-visible` with `transition` on `transform: scale(1.02)`, `box-shadow` glow, and optional overlay text reveal. Keep transitions under 300ms. Ensure keyboard-accessible via `:focus-visible`. |
| Themed loading state | A brief branded loading screen or fade-in on first visit. Prevents the flash of unstyled content and sets the mood before the hero lands. | Low | CSS animation that plays once on `DOMContentLoaded`. Overlay div that fades out after fonts and hero image load. Keep under 1.5 seconds or users will leave. Use `requestIdleCallback` or `window.onload` as trigger. |

## Anti-Features

Features to explicitly NOT build. Each would either undermine the aesthetic, add unjustified complexity, or solve problems that don't exist for a personal hobby showcase.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| E-commerce / shop / buy buttons | This is a hobby showcase, not a business. Adding commerce changes the entire tone from "passionate craftsman" to "trying to sell you something." Also introduces legal, payment, and fulfillment complexity. | If people ask to buy, link to social media DMs in the footer. |
| Dark/light mode toggle | The entire site identity IS the dark theme. A light mode would require designing a second complete visual system, and the Viking metal atmosphere is impossible in light mode. The toggle adds UI complexity for zero value. | Commit fully to dark. Ensure contrast ratios pass WCAG AA so the dark theme is accessible to everyone. |
| Background music / auto-playing audio | Nothing drives users away faster than unexpected audio. Even with a play button, ambient audio is a maintenance burden and bandwidth cost for minimal payoff. This is a visual medium. | Let the visual design evoke the music. Link to Spotify playlists or band recommendations in the about section if desired. |
| Animated cursor / custom cursor | Custom cursors break accessibility (screen readers, touch devices), confuse users, and look dated. The novelty wears off in 2 seconds; the annoyance lasts forever. | Use standard cursors. Put the creative energy into scroll animations and section transitions instead. |
| Parallax on ALL elements | Full-page parallax on every element causes motion sickness, kills performance on mobile, and makes content hard to read. The "wow" effect becomes nauseating. | Parallax on 2-3 background/decorative layers only. Content stays static. Respect `prefers-reduced-motion` media query. |
| Complex JavaScript animations library (GSAP, Three.js, etc.) | The constraint is vanilla HTML/CSS/JS. Adding a heavy animation library contradicts the "raw, no frameworks" philosophy, increases bundle size, and creates a dependency. The effects achievable with vanilla JS + CSS are sufficient for this site. | Intersection Observer + CSS transitions + Canvas for particles. These cover 95% of the needed effects with zero dependencies. |
| Newsletter / mailing list signup | No audience to mail to, no content cadence to maintain, no value proposition for subscribers. It's a personal showcase, not a media brand. Adds GDPR complexity for no benefit. | Social media links in the footer are sufficient for staying connected. |
| Blog / news section | Content maintenance burden with no clear audience. The site is a showcase, not a publication. A blog that hasn't been updated in 6 months looks worse than no blog at all. | The "Brewing Ritual" section tells the story. If the brewer wants to share updates, social media is the right channel. |
| CMS / admin panel | Static site edited by hand is simpler, faster, more secure, and perfectly adequate for 2-4 brews updated a few times a year at most. A CMS adds server requirements, security surface, and complexity. | Edit HTML directly. It's vanilla -- that's the point. |
| Excessive motion / animation on every element | When everything moves, nothing has impact. Animation fatigue sets in and the atmospheric effect is lost. Also triggers vestibular issues for motion-sensitive users. | Animate section reveals, hero particles, and rune glows. Leave body text, navigation, and cards mostly static. Always honor `prefers-reduced-motion`. |
| Contact form | Requires a backend or third-party service (Formspree, Netlify Forms, etc.). For a hobby showcase, email or social media links are simpler and more personal. | Social media links and/or a mailto link in the footer. |

## Feature Dependencies

```
Semantic HTML structure
  --> All visual features depend on proper HTML skeleton
  --> Navigation scroll spy depends on section IDs

Dark color scheme + typography
  --> Brew cards depend on color/type system
  --> Rune decorations depend on color system
  --> All sections depend on typography hierarchy

Hero section
  --> Particle effects layer on top of hero
  --> Scroll indicator sits within hero
  --> Parallax layers attach to hero background

Navigation bar
  --> Scroll spy requires section landmark IDs
  --> Mobile hamburger is a responsive variant of nav
  --> Sticky behavior is independent (CSS only)

Brew showcase cards
  --> Hover effects are enhancements of base cards
  --> Card layout depends on responsive grid system

Photo gallery
  --> Lightbox depends on gallery being built first
  --> Masonry layout is the gallery's layout system

Scroll-triggered reveals
  --> All section content benefits from reveals
  --> Depends on Intersection Observer (same API as scroll spy)

Parallax layers
  --> Independent of content sections
  --> Shares scroll listener infrastructure with other scroll features

Loading state
  --> Independent; wraps everything else
  --> Should be built last (needs to know what to wait for)
```

## MVP Recommendation

Prioritize in this order:

1. **HTML structure + dark color scheme + typography** -- The foundation everything else sits on. Get semantic markup, color palette, and font pairing locked first.

2. **Hero section with scroll indicator** -- First impression. Full-viewport, dramatic, with logo/tagline/CTA. The scroll indicator is trivial to add here.

3. **Navigation bar (sticky + mobile responsive)** -- Wayfinding for the single-page layout. `position: sticky`, hamburger menu on mobile, smooth scroll.

4. **Brew showcase cards ("Sacred Brews")** -- Core content payload. Grid of 2-4 album-cover-style cards with hover effects.

5. **About section ("Brewer's Saga")** -- Text + photo section. Low complexity, high value for personal connection.

6. **Process section ("Brewing Ritual")** -- 4 illustrated chapters. Medium complexity due to alternating layouts and multiple photos.

7. **Photo gallery ("Hall of Relics")** -- Masonry-like grid with lightbox. This is the highest-complexity table-stakes feature.

8. **Footer with social links** -- Simple, build last among structural elements.

9. **Scroll-triggered reveals** -- First differentiator to add. Low effort, high atmospheric impact across all sections.

10. **Rune decorations + textured backgrounds** -- CSS-only atmospheric polish. Section dividers, glows, texture overlays.

11. **Parallax depth layers** -- Background movement on hero and decorative elements.

12. **Ambient particle effects** -- Canvas-based embers on hero. Build last among differentiators since it's the most complex and least essential.

**Defer:**
- **Lightbox on gallery**: Can ship gallery as view-only first, add lightbox interaction in a polish pass.
- **Loading state**: Only needed if font/image loading causes visible flash. Assess after core build.

## Accessibility Checklist (Dark Theme Specific)

These are not features but constraints that must be satisfied across all features:

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Text contrast ratio >= 4.5:1 | WCAG 2.1 AA (1.4.3) | Off-white text `#E0E0E0` on `#0A0A0A` = ~14:1. Gold `#D4AF37` on `#0A0A0A` = ~6.5:1. Both pass. Blood red `#8B0000` on `#0A0A0A` FAILS (~2.1:1) -- decorative only. |
| Large text contrast >= 3:1 | WCAG 2.1 AA (1.4.3) | Blackletter headings at 18pt+ can use gold freely. |
| Non-text contrast >= 3:1 | WCAG 2.1 AA (1.4.11) | UI components (nav links, buttons, card borders) must meet 3:1 against background. |
| Reduced motion respect | WCAG 2.1 AA (2.3.3) | `@media (prefers-reduced-motion: reduce)` disables parallax, particles, scroll reveals, and glow pulses. Serve static fallback. |
| Focus visibility | WCAG 2.1 AA (2.4.7) | `:focus-visible` outlines on all interactive elements. Gold outline on dark background works well. |
| Skip navigation link | WCAG 2.1 A (2.4.1) | Hidden link before nav: "Skip to main content". Visible on focus. |
| Image alt text | WCAG 2.1 A (1.1.1) | All brew photos and gallery images get descriptive alt text. Decorative runes/textures get `alt=""` or `aria-hidden="true"`. |

## Sources

- [Colorlib - Portfolio Design Trends 2026](https://colorlib.com/wp/portfolio-design-trends/)
- [DesignRush - Best Dark Themed Website Designs](https://www.designrush.com/best-designs/websites/trends/best-dark-themed-website-designs)
- [Bandzoogle - How to Design a Great Metal Band Website](https://bandzoogle.com/blog/how-to-design-a-great-metal-band-website)
- [CSS-Tricks - Bringing Back Parallax With Scroll-Driven CSS Animations](https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations/)
- [Builder.io - The Best Way to Create a Parallax Effect in 2026](https://www.builder.io/blog/parallax-scrolling-effect)
- [MDN - Masonry Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout)
- [WebAIM - Contrast and Color Accessibility](https://webaim.org/articles/contrast/)
- [DubBot - Dark Mode Best Practices for Accessibility](https://dubbot.com/dubblog/2023/dark-mode-a11y.html)
- [W3C - Understanding Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [AccessibilityChecker - Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- [FreeCodeCamp - Scroll Animations with Intersection Observer API](https://www.freecodecamp.org/news/scroll-animations-with-javascript-intersection-observer-api/)
- [PerfectAfternoon - Hero Section Design 2025](https://www.perfectafternoon.com/2025/hero-section-design/)
- [GitHub - ab-particles: Vanilla JS Particle Animation](https://github.com/asifbacchus/ab-particles)
