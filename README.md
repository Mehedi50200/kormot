# kormot — landing page

> **kormot** (Bengali: *hard work*) — a premium landing page for a software studio that builds SaaS products and custom software.

A single-page, Awwwards-style marketing site built with vanilla HTML/CSS/JS, **GSAP** (scroll-triggered storytelling) and **Three.js** (an interactive shader-driven particle hero). No build step required.

## Highlights

- **Interactive 3D hero** — a 22k-point sphere morphed by a custom simplex-noise vertex shader, reacting to the pointer. Pauses off-screen, caps pixel ratio, and downgrades on mobile.
- **GSAP storytelling** — preloader, masked headline reveals, per-character title splits, scrubbed word-brightening intro, pinned horizontal "process" scroll, animated counters, parallax footer wordmark.
- **Distinctive identity** — Syne display type + Manrope body + JetBrains Mono details, on a dark canvas with an electric-lime accent and film grain.
- **Premium micro-interactions** — custom cursor, magnetic buttons, card tilt + cursor-follow glow.
- **Accessible & resilient** — semantic landmarks, `aria` labels, full `prefers-reduced-motion` support, graceful fallback if CDNs fail, keyboard-friendly nav, mobile menu.
- **Responsive** — fluid `clamp()` type and layouts from large desktop down to small phones.

## Sections

Hero · Marquee · Intro/value · SaaS products · Custom software services · Selected work (case studies) · Process · Tech stack · Testimonials & clients · CTA / contact · Footer.

## Run locally

No dependencies to install — just serve the folder (ES modules require http, not `file://`):

```bash
cd kormot
python3 -m http.server 5173
# open http://localhost:5173
```

Or use any static server (`npx serve`, etc.).

## Structure

```
kormot/
├── index.html        # markup + CDN imports (GSAP UMD, three via importmap)
├── css/styles.css    # design system + all section styles
├── js/
│   ├── main.js       # preloader, cursor, GSAP animations, interactions
│   └── three-hero.js # Three.js particle hero (custom GLSL shaders)
└── README.md
```

## Notes

- GSAP and Three.js load from CDNs; an internet connection is needed for the full experience. If they fail to load, content is revealed via a fallback so the page stays usable.
- All copy, products, and case studies are illustrative placeholders for the fictional **kormot** studio.
