# Requirements: Rodbrecht Mjod & Brews

**Defined:** 2026-03-25
**Core Value:** The site must feel like stepping into a Viking metal album booklet — immersive, atmospheric, and epic — while clearly showcasing the brewer's craft and creations.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Structure

- [ ] **STRC-01**: Site uses semantic HTML5 skeleton with proper heading hierarchy, section IDs, and ARIA attributes on decorative elements
- [ ] **STRC-02**: Full-screen hero section fills viewport with layered dark background, central logo in Norse-metal font, tagline, and glowing "Enter the Forge" CTA button
- [ ] **STRC-03**: Sticky navigation bar styled as Viking shield/rune stone with scroll spy highlighting active section
- [ ] **STRC-04**: Navigation transforms to hamburger menu on mobile (below 768px)
- [ ] **STRC-05**: Site is fully responsive across mobile, tablet, and desktop with atmosphere preserved
- [ ] **STRC-06**: Footer section with social links styled as metal shield patches or raven claws
- [ ] **STRC-07**: Animated scroll indicator (bouncing rune/arrow) at bottom of hero section, fading on scroll
- [ ] **STRC-08**: Branded loading state with fade-in on first visit (under 1.5 seconds)

### Visual Design

- [ ] **VISL-01**: Dark color system using design tokens: void black (#0A0A0A), blood red (#8B0000 — decorative only), Viking gold (#D4AF37), cold steel (#A8B5B8), ancient wood (#4A2C0B), with emerald and fiery orange accents
- [ ] **VISL-02**: Norse typography hierarchy: blackletter font for h1/h2 headings, clean sans-serif for body text, with proper font loading (preload + swap)
- [ ] **VISL-03**: Glowing rune CSS effects on section dividers and borders (text-shadow/box-shadow with gold glow, subtle pulse animation)
- [ ] **VISL-04**: Textured background overlays (scratched metal, wood grain) via semi-transparent layers and blend modes
- [ ] **VISL-05**: All images optimized as WebP with lazy loading for below-fold content
- [ ] **VISL-06**: Blood red and ancient wood colors never used for readable text (WCAG AA compliance)
- [ ] **VISL-07**: Z-index scale managed via CSS custom properties to prevent stacking context issues

### Content Sections

- [ ] **CONT-01**: "Sacred Brews" showcase grid of 2-4 brew cards styled as Viking metal album covers with distressed/runic borders
- [ ] **CONT-02**: Each brew card displays: brew photo, name in Norse font, ABV as "Strength: X%", tasting notes as battle descriptions, and limited edition badge
- [ ] **CONT-03**: Brew cards respond to hover with glow intensification, slight scale, and optional detail reveal
- [ ] **CONT-04**: "Brewer's Saga" about section presenting the brewer's story as Viking saga narrative with rune-framed photos
- [ ] **CONT-05**: "Brewing Ritual" process section with 4 chapters: Awakening the Honey, Descent into the Cauldron, The Raven's Blessing, Aging in the Roots of Yggdrasil
- [ ] **CONT-06**: Each ritual chapter has real photo, heading, and description in alternating layout
- [ ] **CONT-07**: "Hall of Relics" masonry photo gallery of workshop, equipment, and finished brew photos with rune-framed glowing borders
- [ ] **CONT-08**: Gallery lightbox opens full-screen photo viewer on click with keyboard navigation (Escape, arrow keys)

### Atmosphere

- [ ] **ATMO-01**: Scroll-triggered section reveals using Intersection Observer — sections fade/slide in as user scrolls
- [ ] **ATMO-02**: Parallax depth layers on 2-3 background/decorative elements (speed multipliers 0.2-0.5)
- [ ] **ATMO-03**: Ambient particle/ember effects on hero section via HTML5 Canvas (20-40 particles, gold/orange, low opacity)
- [ ] **ATMO-04**: All animations respect `prefers-reduced-motion` media query — disable parallax, particles, and reveals for motion-sensitive users
- [ ] **ATMO-05**: Glow animations use opacity on pseudo-elements, never animate box-shadow directly (performance)

### Deployment

- [ ] **DEPL-01**: Site is pure vanilla HTML/CSS/JS with no build tools or framework dependencies
- [ ] **DEPL-02**: Site deployable to any static hosting (Cloudflare Pages, Netlify, or similar)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **ENHC-01**: Brew log timeline / Chronicles section showing batch updates styled as rune-carved tour dates
- **ENHC-02**: Contact form / "Join the Einherjar" mailing list signup

### Enhanced Atmosphere

- **ENHA-01**: SVG-animated Yggdrasil tree with growing branches on scroll
- **ENHA-02**: Ambient fog/mist effects layered across sections
- **ENHA-03**: Rune glyph hover tooltips with Norse mythology translations

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / shop | Hobby showcase, not a business — changes tone entirely |
| Dark/light mode toggle | The dark IS the identity — light mode destroys the aesthetic |
| Background music / auto-play audio | Drives users away, bandwidth cost, maintenance burden |
| Custom cursor | Breaks accessibility, looks dated, novelty wears off instantly |
| CMS / admin panel | Static site edited by hand — that's the point of vanilla |
| Backend / server-side logic | Purely static, no server needed |
| Newsletter / GDPR | No audience, no content cadence, adds legal complexity |
| Blog / news section | Content maintenance burden with no audience |
| GSAP or heavy animation libraries | Contradicts vanilla constraint; vanilla JS + CSS is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRC-01 | Phase 1 | Pending |
| STRC-02 | Phase 1 | Pending |
| STRC-03 | Phase 1 | Pending |
| STRC-04 | Phase 1 | Pending |
| STRC-05 | Phase 1 | Pending |
| STRC-06 | Phase 1 | Pending |
| STRC-07 | Phase 1 | Pending |
| STRC-08 | Phase 1 | Pending |
| VISL-01 | Phase 1 | Pending |
| VISL-02 | Phase 1 | Pending |
| VISL-03 | Phase 1 | Pending |
| VISL-04 | Phase 1 | Pending |
| VISL-05 | Phase 1 | Pending |
| VISL-06 | Phase 1 | Pending |
| VISL-07 | Phase 1 | Pending |
| CONT-01 | Phase 1 | Pending |
| CONT-02 | Phase 1 | Pending |
| CONT-03 | Phase 1 | Pending |
| CONT-04 | Phase 1 | Pending |
| CONT-05 | Phase 1 | Pending |
| CONT-06 | Phase 1 | Pending |
| CONT-07 | Phase 1 | Pending |
| CONT-08 | Phase 1 | Pending |
| ATMO-01 | Phase 1 | Pending |
| ATMO-02 | Phase 1 | Pending |
| ATMO-03 | Phase 1 | Pending |
| ATMO-04 | Phase 1 | Pending |
| ATMO-05 | Phase 1 | Pending |
| DEPL-01 | Phase 1 | Pending |
| DEPL-02 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0 (traceability updated during roadmap creation)

---
*Requirements defined: 2026-03-25*
*Last updated: 2026-03-25 after initial definition*
