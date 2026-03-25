# Rodbrecht Mjod & Brews

## What This Is

A dark, epic Viking metal / Norse mythology-inspired website showcasing a passionate homebrewer's mead and beer craft. Built as vanilla HTML/CSS/JS — raw, deployable, no frameworks. Live at **mjod.beer**.

## Current State

**v1.0 shipped** — Full showcase site with 5 sections, 69 images, atmospheric effects.
Deployed to GitHub Pages with custom domain `mjod.beer`.

## Core Value

The site must feel like stepping into a Viking metal album booklet — immersive, atmospheric, and epic — while clearly showcasing the brewer's craft and creations.

## Requirements

### Validated

- Full-screen hero with Yggdrasil logo, tagline, glowing CTA — v1.0
- Sticky nav with scroll spy and mobile hamburger — v1.0
- Brewer's Saga with real Apeldoorn bio — v1.0
- Sacred Brews: 4 cards (Traditional Mead, Berry Melomel, Chestnut Honey Mead, Dark Brew) — v1.0
- Brewing Ritual: 4 chapters with real Instagram photos — v1.0
- Hall of Relics: 18-photo masonry gallery with GLightbox — v1.0
- Dark design system with 5 color tokens, Norse typography, rune dividers — v1.0
- Canvas ember particles, GSAP parallax, scroll reveals — v1.0
- prefers-reduced-motion support — v1.0
- Vanilla HTML/CSS/JS, deployed to static hosting — v1.0

### Active

(None — run `/gsd:new-milestone` for v2.0)

### Out of Scope

- E-commerce / shop — hobby showcase
- Mailing list / newsletter — not needed
- CMS / admin — static content, edited by hand
- Backend / server-side — purely static

## Context

- Brewer based in an attic in Apeldoorn, the Netherlands
- Ethos: organic and sustainable brewing where possible
- Instagram: https://www.instagram.com/rodbrecht_mjoed/
- Domain: mjod.beer (GitHub Pages via jelmerdehen/rodbrecht-mjoed)
- 63 Instagram photos extracted and archived in assets/images/photos/

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vanilla HTML/CSS/JS | Simple to host, easy to maintain, fits the raw aesthetic | ✓ Good |
| Quick task over phased execution | Small scope, all requirements clear | ✓ Good |
| CSS reveals over GSAP entrance animations | GSAP inline styles conflicted with CSS transitions | ✓ Good |
| Instagram image extraction via DevTools | No API access, login wall blocks scraping | ✓ Good |
| GitHub Pages + custom domain | Free hosting, mjod.beer domain | ✓ Good |

---
*Last updated: 2026-03-25 after v1.0 milestone completion*
