# Roadmap: Rodbrecht Mjod & Brews

## Overview

Three phases take this from zero to a deployed Viking metal homebrew showcase. Phase 1 builds the structural foundation -- HTML skeleton, design system, hero section, and navigation -- so there is a styled, navigable page to work with. Phase 2 fills that page with all content sections: brew cards, brewer's saga, brewing ritual, photo gallery, and footer. Phase 3 layers on atmospheric effects (scroll reveals, parallax, particles), accessibility safeguards, and deployment. The site is shippable after Phase 2; Phase 3 makes it epic.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation and Hero** - HTML skeleton, design system, typography, hero section, and navigation
- [ ] **Phase 2: Content Sections** - Brew showcase, brewer's saga, brewing ritual, photo gallery, and footer
- [ ] **Phase 3: Atmosphere and Deployment** - Scroll animations, parallax, particles, reduced-motion support, performance, and deployment

## Phase Details

### Phase 1: Foundation and Hero
**Goal**: Visitor lands on a dramatic full-screen hero with working navigation, correct typography, and the full dark Viking aesthetic established across all breakpoints
**Depends on**: Nothing (first phase)
**Requirements**: STRC-01, STRC-02, STRC-03, STRC-04, STRC-05, STRC-07, STRC-08, VISL-01, VISL-02, VISL-03, VISL-04, VISL-06, VISL-07
**Success Criteria** (what must be TRUE):
  1. Visitor sees a full-screen hero with Norse-metal logo, tagline, and glowing CTA button that fills the viewport
  2. Sticky navigation bar with Viking shield aesthetic highlights the active section on scroll and collapses to hamburger on mobile
  3. Dark color palette, blackletter headings, and textured backgrounds are visually consistent across mobile, tablet, and desktop
  4. Page loads with branded fade-in under 1.5 seconds; scroll indicator animates at bottom of hero
  5. All decorative elements use aria-hidden; blood red and ancient wood never appear as readable text
**Plans**: TBD
**UI hint**: yes

### Phase 2: Content Sections
**Goal**: All four content sections and footer are populated, styled, and interactive -- the site has complete content
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, STRC-06, VISL-05
**Success Criteria** (what must be TRUE):
  1. "Sacred Brews" displays 2-4 brew cards styled as album covers with name, ABV, tasting notes, and hover glow effects
  2. "Brewer's Saga" tells the brewer's story as a Viking saga with rune-framed photos
  3. "Brewing Ritual" presents 4 chapters with real photos in alternating layout
  4. "Hall of Relics" gallery displays photos in masonry layout; clicking opens a lightbox with keyboard navigation (Escape, arrow keys)
  5. Footer shows social links styled as metal shield patches; all images are optimized WebP with lazy loading
**Plans**: TBD
**UI hint**: yes

### Phase 3: Atmosphere and Deployment
**Goal**: The site feels like stepping into a Viking metal album booklet -- immersive atmospheric effects, accessibility-safe animations, and live deployment
**Depends on**: Phase 2
**Requirements**: ATMO-01, ATMO-02, ATMO-03, ATMO-04, ATMO-05, DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. Sections fade/slide into view on scroll via Intersection Observer
  2. Parallax depth layers create visual depth on hero and decorative backgrounds
  3. Ambient ember particles drift across the hero section (gold/orange, low opacity)
  4. All animations are disabled when user has prefers-reduced-motion enabled; glow effects animate opacity on pseudo-elements only
  5. Site is deployed to static hosting with no build tools or framework dependencies
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Hero | 0/0 | Not started | - |
| 2. Content Sections | 0/0 | Not started | - |
| 3. Atmosphere and Deployment | 0/0 | Not started | - |
