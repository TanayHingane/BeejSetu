# BeejSetu (बीजसेतु) Anti-AI-Slop Visual & Code Guidelines

This rulebook applies to all code, UI components, layouts, typography, assets, and copy generated for the **BeejSetu (बीजसेतु)** project.

---

## 1. Strictly Prohibited AI Tropes (The Banned List)

1. **NO Neon SaaS Green Glows or Purple Blobs:** Never use `radial-gradient` blurred neon blobs or saturated tech greens (`#22C55E` or `#00FF66`). Instead, use deep, organic chlorophyll forest tones (`#0E2A1D`), terracotta earth (`#A44A29`), and warm unbleached khadi paper (`#F8F5EE`).
2. **NO Raw Emojis as Interface Icons:** Never use `🌱`, `🍎`, `🪴`, `🔍`, `🛵`, `🏛️`, `📬`, `🧪`, `🧺`, `📜`, `📦`, `🏆`, `🫐`, `🚚`, `🍈`, `🥭`, `💚` inside buttons, cards, badges, or headers. Use crisp, monochrome SVG vectors with uniform 1.75px stroke widths.
3. **NO Generic 3-Card Feature Rows:** Do not divide content into 3 identical rounded cards with centered icons on top. Use asymmetric editorial layouts, sequential numbered workflows, or structured comparison cards.
4. **NO Fabricated Numbers or Fake Endorsements:** Zero invented national claims, zero fake quotes, and zero fabricated partner logos. Ground all metrics in the Pune and Western Ghats pilot program.
5. **NO Floating Glassmorphism Cards:** No tilted glassmorphism cards hovering over hero pictures with fake graphs or stats. Keep visual cards anchored, grounded, and clean.
6. **NO Screaming Eyebrow Badges:** Eliminate redundant uppercase pill tags like `[ ✨ THE FUTURE OF SEED SAVING ]` above every heading. Use quiet, sentence-case botanical metadata or omit if redundant.
7. **NO Breaking of Interactive Logic:** Never discard form validation, step navigation, local storage state, modal triggers, or cart drawer handlers during visual redesigns. Visual elevation must preserve 100% of functional capabilities.

---

## 2. Mandatory Brand Tokens & Style System

```css
:root {
  /* Canvas & Ground Surfaces */
  --color-canvas: #F8F5EE;          /* Warm Khadi / Unbleached Botanical Paper */
  --color-canvas-alt: #F1ECE0;      /* Slightly deeper earth wash for alternate sections */
  --color-surface: #FFFFFF;         /* Crisp white elevated cards */
  --color-surface-tint: #FAF7F2;    /* Subtle off-white card tint */

  /* Botanical Core (Chlorophyll & Forest) */
  --color-forest-deep: #0E2A1D;     /* Deep primordial forest green for hero & dominant headers */
  --color-forest: #163827;          /* Classic botanical green for primary elements */
  --color-forest-hover: #10291D;    /* Forest hover state */
  --color-forest-subtle: #EBF3EE;   /* Soft forest wash for badges */

  /* Soil & Sun Accents */
  --color-terracotta: #A44A29;      /* Rich fired clay / terracotta earth */
  --color-terracotta-hover: #8D3C1F;/* Terracotta hover */
  --color-terracotta-light: #FBEFEA;/* Terracotta wash */
  --color-ochre: #D49938;           /* Sun-dried seed / grain gold accent */
  --color-ochre-light: #FDF6E9;     /* Soft ochre wash */
  --color-leaf: #2D6A4F;            /* Crisp living leaf accent */

  /* Typography & Structure */
  --color-ink: #1C2620;             /* High-contrast organic text */
  --color-muted: #56675E;           /* Supporting text (passes WCAG AA 4.5:1) */
  --color-border: #DCD3C5;          /* Crisp 1px hairline parchment border */
  --color-border-subtle: #EBE4D8;   /* Muted divider border */

  /* Fonts */
  --font-display: 'Outfit', -apple-system, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

---

## 3. Hero Section Rules

- The hero must feel like a prestigious botanical journal or high-end conservation foundation report, not a generic SaaS tech template.
- Restrained, confident typography: Pair bilingual identity `BeejSetu` with Devanagari `बीजसेतु`.
- Tagline: *"The Living Bridge Between Seed Savers and the Soil."*
- Subheading: Grounded in the Pune & Western Ghats pilot — connecting domestic fruit seed collectors, heritage vegetable growers, and agroforestry nurseries.
- Dual focal pathways: Exactly one primary donation wizard CTA (`Donate Seeds`) paired with a calm secondary anchor (`Order Native Seeds` / `How It Works`).
- Zero decorative floating badges overlapping imagery.

---

## 4. Interaction & Accessibility Standards

- All interactive buttons and controls must have distinct `:hover`, `:focus-visible` (visible keyboard focus ring), `:active`, and `:disabled` states.
- Support `prefers-reduced-motion: reduce`.
- Full semantic HTML landmarks (`header`, `main`, `section`, `article`, `nav`, `aside`, `footer`).
- Forms must have active validation, client-side safety checks, and honest success/error messaging.
- Screen-reader labels (`aria-label`) on all icon-only buttons (drawer close buttons, cart toggle, search).
