# Research Summary

**Project:** Rodbrecht Mjoed & Brews -- Viking Metal Homebrew Showcase
**Synthesized:** 2026-03-24

---

## Executive Summary

This project is an immersive single-page static website showcasing a Viking metal-themed homebrewing hobby. The expert consensus for this type of site is clear: vanilla HTML/CSS/JS with no build tools, using GSAP for scroll-driven animations, self-hosted blackletter and sans-serif fonts, and deployment to Cloudflare Pages. The atmospheric "album booklet" experience comes from layered CSS backgrounds, scroll-triggered section reveals via IntersectionObserver, and carefully constrained glow/parallax effects -- not from heavy frameworks or scroll-jacking.

The recommended approach is a section-based architecture with CSS custom properties as design tokens, native ES modules for JavaScript, and a progressive enhancement philosophy where the site works without JS. The stack is lightweight: GSAP + ScrollTrigger (~70KB) for the heavy animation lifting, GLightbox (~12KB) for the photo gallery lightbox, and everything else is hand-written vanilla code. Images are pre-optimized to WebP format manually using Squoosh, with no build pipeline required.

The primary risks are (1) dark color contrast failures -- Blood Red and Ancient Wood both fail WCAG AA against the void black background and must be restricted to decorative use only, (2) blackletter font loading causing layout shift and broken fallbacks, and (3) unoptimized hero/gallery images destroying load times on a site with no build-step safety net. All three are preventable with discipline established in the foundation phase.

---

## Key Findings

### From STACK.md

| Technology | Rationale |
|------------|-----------|
| GSAP 3.13 + ScrollTrigger | Industry-standard scroll animation. Now 100% free after Webflow acquisition. Enables parallax, pinning, scrubbing that CSS-only cannot reliably do cross-browser. |
| GLightbox 3.3.1 | Zero-dependency vanilla JS lightbox, ~12KB. Fully featured and free, unlike fslightbox. |
| CSS Grid + light JS | For masonry gallery. Native CSS masonry still experimental (est. Q3 2026). CSS columns work for basic layout; ~30 lines of JS for proper ordering. |
| UnifrakturMaguntia + Inter | Blackletter headings for medieval atmosphere, clean sans-serif for body readability. Both on Google Fonts (recommend self-hosting). |
| Cloudflare Pages | Unlimited bandwidth on free tier -- critical for photo-heavy site. 300+ edge locations, git-based deploy. |
| WebP images via Squoosh | Manual optimization workflow. No AVIF needed for this photo count. Target <2MB initial page weight. |

**Critical version note:** GSAP 3.13.0 is the target. All plugins are now free (no more "Club GreenSock" restrictions).

### From FEATURES.md

**Table Stakes (must ship):**
- Full-screen hero section with scroll indicator
- Sticky navigation with scroll spy and mobile hamburger
- Responsive design (mobile-first, 3 breakpoints)
- Brew showcase cards (2-4 brews, album-cover style)
- About / "Brewer's Saga" section
- Process / "Brewing Ritual" section (4 chapters with photos)
- Dark color scheme with WCAG AA contrast
- Footer with social links
- Semantic HTML and accessibility basics
- Optimized image loading

**Differentiators (should ship):**
- Scroll-triggered section reveals (low effort, high impact)
- Glowing rune decorations and textured backgrounds (CSS-only)
- Norse typography hierarchy
- Brew card hover/interaction effects
- Parallax depth layers (background elements only)
- Photo gallery with lightbox ("Hall of Relics")
- Animated scroll indicator on hero

**Defer to v2+:**
- Ambient particle/ember effects (Canvas-based, highest complexity differentiator)
- Themed loading state (only needed if FOUT is noticeable after core build)

**Anti-features (explicitly do NOT build):**
- E-commerce / shop functionality
- Dark/light mode toggle (dark IS the identity)
- Background music / auto-playing audio
- Custom cursor
- Blog / CMS / newsletter
- Contact form (use social links instead)
- Full-page parallax on all elements

### From ARCHITECTURE.md

**Major components:**
- `index.html` -- single entry point, semantic HTML5 sections with BEM-style modifiers
- `variables.css` -- design token system (raw tokens + semantic tokens via CSS custom properties)
- 7 CSS files split by concern (variables, reset, base, layout, components, animations, utilities)
- 4 JS modules via native ES modules (main, scroll-reveal, navigation, gallery/effects)
- Assets organized into images/, fonts/, svg/ directories

**Key patterns:**
1. **Progressive enhancement** -- site works without JS; `js-enabled` class unlocks reveal animations
2. **CSS-first, JS-second** -- if CSS can do it, do not use JavaScript
3. **Pseudo-element background layers** -- atmospheric depth via `::before`/`::after` on sections, not extra DOM elements
4. **Zero-coupling JS modules** -- modules communicate only through the DOM (CSS classes, data attributes), never import from each other
5. **Layered background pattern** -- texture + gradient + vignette via pseudo-elements with pointer-events: none

**Anti-patterns to avoid:**
- Scroll event listeners for reveal (use IntersectionObserver)
- One monolithic CSS file
- Background images for content photography (use `<picture>`)
- Framework creep (no lightbox/masonry/animation libraries beyond GSAP and GLightbox)

### From PITFALLS.md

**Top 5 pitfalls with prevention:**

| # | Pitfall | Severity | Prevention |
|---|---------|----------|------------|
| 1 | Blood Red (#8B0000) and Ancient Wood (#4A2C0B) fail WCAG contrast on dark background | CRITICAL | Restrict to decorative use only. Use Gold (#D4AF37, 9.42:1) and Steel (#A8B5B8, 9.40:1) for all text. |
| 2 | Blackletter font loading failure causes broken fallback and CLS | CRITICAL | Self-host fonts, preload heading font, use font-display: swap, set size-adjust on fallback. |
| 3 | Unoptimized hero/gallery images kill load time (LCP 4s+) | CRITICAL | Pre-optimize all images to WebP. Hero <200KB, gallery thumbs <50KB each. Lazy-load below fold. |
| 4 | Animated glow effects (box-shadow, text-shadow) cause scroll jank | CRITICAL | Animate opacity on pseudo-elements, never animate shadow properties directly. Limit to 3-4 simultaneous glows. |
| 5 | Scroll-jacking destroys user experience | MODERATE | Never override native scroll. Use IntersectionObserver for reveals. Album-booklet feel comes from full-viewport sections, not scroll control. |

**Additional moderate pitfalls:** stacking context hell from layered backgrounds (plan z-index scale upfront), masonry gallery breaking on mobile (needs vanilla JS + single-column mobile fallback), decorative elements polluting screen reader experience (aria-hidden on all decorative SVGs).

**Minor pitfalls:** 100vh broken on mobile (use 100dvh), system scrollbar aesthetic clash (style in CSS reset), CSS custom property browser support (non-issue for modern browsers, just document the baseline).

---

## Implications for Roadmap

### Suggested Phase Structure

**Phase 1: Foundation and Design System**
- Rationale: Everything depends on the HTML skeleton, design tokens, font loading, and CSS architecture. Color contrast rules, z-index scale, and the image optimization workflow must be established here before any section is built.
- Delivers: Deployable styled skeleton with correct typography, color system, and responsive grid. Not visually impressive yet, but architecturally sound.
- Features: Semantic HTML structure, CSS custom properties/design tokens, font loading with preload, dark color scheme with verified contrast, responsive breakpoints, scrollbar styling, 100dvh hero shell.
- Pitfalls to avoid: Color contrast failures (Pitfall 1), font loading CLS (Pitfall 2), viewport unit issues (Pitfall 11), stacking context chaos (Pitfall 6), scrollbar clash (Pitfall 10).
- Research needed: NO -- standard patterns, well-documented.

**Phase 2: Hero and Navigation**
- Rationale: The hero section is the first impression and the most visually complex single component. Navigation must be built alongside it since the sticky nav interacts with the hero's scroll behavior. GSAP and ScrollTrigger get integrated here.
- Delivers: Dramatic landing experience with layered hero backgrounds, animated scroll indicator, and functional sticky navigation with mobile hamburger menu.
- Features: Full-screen hero with layered backgrounds (texture + gradient + vignette), logo/tagline/CTA, animated scroll indicator, sticky nav with scroll spy, mobile hamburger menu, smooth scroll anchor navigation, GSAP/ScrollTrigger initialization.
- Pitfalls to avoid: Scroll-jacking temptation (Pitfall 5), glow effect performance (Pitfall 4), unoptimized hero image (Pitfall 3).
- Research needed: NO -- GSAP ScrollTrigger is extensively documented and the hero pattern is standard.

**Phase 3: Content Sections**
- Rationale: With the design system and hero complete, content sections follow naturally. These are the core payload -- brew cards, brewer's story, brewing process. All use the same grid system, typography, and reveal patterns.
- Delivers: Complete content site with all four main sections populated.
- Features: Brew showcase cards with hover effects, "Brewer's Saga" about section, "Brewing Ritual" 4-chapter process section with alternating layouts, scroll-triggered section reveals (IntersectionObserver), rune decorations and textured backgrounds.
- Pitfalls to avoid: Decorative elements in accessibility tree (Pitfall 8), image optimization for brew/process photos (Pitfall 3), glow performance (Pitfall 4).
- Research needed: NO -- card grids, alternating layouts, and IntersectionObserver reveals are standard patterns.

**Phase 4: Gallery and Lightbox**
- Rationale: The "Hall of Relics" gallery is the highest-complexity table-stakes feature and has the most pitfall exposure (masonry layout, image optimization, lightbox accessibility). It is isolated enough to be its own phase.
- Delivers: Masonry photo gallery with lightbox viewing, keyboard navigation, and responsive fallback.
- Features: CSS columns masonry layout with JS ordering assist, GLightbox integration for full-size viewing, gallery image lazy loading, responsive column count (3 desktop, 2 tablet, 1 mobile).
- Pitfalls to avoid: Masonry breaks on mobile (Pitfall 7), unoptimized gallery images (Pitfall 3), lightbox accessibility (focus trapping, ESC to close).
- Research needed: MAYBE -- GLightbox integration is straightforward, but masonry with proper ordering may need a quick spike if CSS columns ordering is unacceptable.

**Phase 5: Atmospheric Polish and Effects**
- Rationale: Parallax, additional glow effects, and any ambient enhancements are polish that should come after all content is in place. These are differentiators, not table stakes. Building them last means the site is shippable even if this phase is cut short.
- Delivers: The "wow factor" -- parallax depth layers, enhanced glow effects, and the full immersive atmosphere.
- Features: Parallax depth layers on hero and decorative backgrounds, enhanced ambient glow animations, prefers-reduced-motion support for all animations, themed loading state (if needed based on font/image loading behavior).
- Pitfalls to avoid: Glow jank (Pitfall 4), excessive motion (anti-feature), parallax on content elements (anti-feature).
- Research needed: NO -- GSAP parallax patterns are well-documented.

**Phase 6: Performance, Accessibility, and Deployment**
- Rationale: Final audit pass. All content and effects are in place; now verify performance budgets, accessibility compliance, and deploy.
- Delivers: Production-ready site on Cloudflare Pages with passing Lighthouse scores.
- Features: Lighthouse performance audit and fixes, WCAG AA accessibility audit, image optimization final pass, Cloudflare Pages deployment setup, favicon and meta tags, social preview (Open Graph) tags, footer completion.
- Pitfalls to avoid: All pitfalls should have been prevented by this point. This phase is for catching anything that slipped through.
- Research needed: NO -- deployment and auditing are standard processes.

### Research Flags

| Phase | Needs `/gsd:research-phase`? | Rationale |
|-------|------------------------------|-----------|
| Phase 1: Foundation | NO | CSS custom properties, font loading, and semantic HTML are standard. Research already covers the token system and font strategy in detail. |
| Phase 2: Hero + Nav | NO | GSAP ScrollTrigger has extensive documentation. Hero patterns are standard. |
| Phase 3: Content Sections | NO | Card grids, alternating layouts, and IntersectionObserver are well-documented standard patterns. |
| Phase 4: Gallery + Lightbox | MAYBE | GLightbox integration is documented, but masonry ordering with vanilla JS may warrant a quick spike. The ARCHITECTURE.md and PITFALLS.md provide enough guidance to likely skip research. |
| Phase 5: Polish + Effects | NO | GSAP parallax is well-documented. Glow effect patterns are covered in PITFALLS.md. |
| Phase 6: Deploy + Audit | NO | Cloudflare Pages deployment is push-to-deploy. Lighthouse auditing is standard. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified via CDN, official docs, and current browser support data. GSAP free licensing confirmed. Cloudflare Pages free tier verified. |
| Features | HIGH | Table stakes and differentiators are well-defined with clear priority ordering. Anti-features list is decisive. Feature dependencies are mapped. |
| Architecture | HIGH | Section-based SPA with CSS custom properties and ES modules is a proven pattern. Build order follows clear dependency chain. Progressive enhancement strategy is sound. |
| Pitfalls | HIGH | Critical pitfalls are mathematically verified (contrast ratios) or based on well-documented browser behavior. Phase-specific warnings are actionable. |

### Gaps to Address During Planning

1. **Decorative SVG asset sourcing** -- The stack research notes that rune SVGs, Vegvisir, ravens, and Yggdrasil illustrations need to be "created or sourced." The implementation plan should account for either hand-drawing these or finding public domain references. This is a content dependency, not a technical one.

2. **GSAP vs. vanilla JS tension** -- FEATURES.md anti-features list says "no complex JS animation libraries (GSAP, Three.js)" while STACK.md recommends GSAP as the primary animation tool. The STACK.md recommendation is correct -- GSAP is the right choice for scroll-driven animations at this complexity level. The anti-feature warning was about unnecessary library accumulation, not about GSAP specifically. The roadmap should use GSAP for scroll animations and keep everything else vanilla.

3. **Font hosting strategy** -- STACK.md recommends Google Fonts CDN, while ARCHITECTURE.md and PITFALLS.md recommend self-hosting for reliability and GDPR compliance. Self-hosting is the stronger recommendation. Download the WOFF2 files from Google Fonts and serve them from the same origin.

4. **Image source material** -- The site requires real workshop photos from the brewer. The technical optimization pipeline is defined, but the actual photo content is an external dependency that could block Phases 2-4.

---

## Sources

Aggregated from research files. High-confidence sources marked.

**Stack and tooling:**
- GSAP official docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ (HIGH)
- GSAP free licensing: https://gsap.com/pricing/ (HIGH)
- GLightbox: https://github.com/biati-digital/glightbox (HIGH)
- Cloudflare Pages: https://pages.cloudflare.com/ (HIGH)
- Squoosh: https://squoosh.app/ (HIGH)

**Architecture and patterns:**
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (HIGH)
- MDN JS Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules (HIGH)
- MDN CSS Masonry: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout (HIGH -- experimental status confirmed)
- web.dev Font Best Practices: https://web.dev/articles/font-best-practices (HIGH)

**Pitfalls and accessibility:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/ (HIGH)
- W3C WCAG 2.1 SC 1.4.3: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html (HIGH)
- NN/g Scrolljacking: https://www.nngroup.com/articles/scrolljacking-101/ (HIGH)
- Josh W. Comeau Stacking Contexts: https://www.joshwcomeau.com/css/stacking-contexts/ (HIGH)

**Features and design:**
- CSS-Tricks Parallax: https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations/ (MEDIUM)
- DesignRush Dark Themes: https://www.designrush.com/best-designs/websites/trends/best-dark-themed-website-designs (MEDIUM)
- DubBot Dark Mode A11y: https://dubbot.com/dubblog/2023/dark-mode-a11y.html (MEDIUM)
