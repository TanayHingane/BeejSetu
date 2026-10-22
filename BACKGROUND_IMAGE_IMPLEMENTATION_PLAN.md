# Implementation Plan: Full-Site Ambient Background Integration
**BeejSetu (बीजसेतु) — Editorial Botanical Background Architecture**

---

## 1. Executive Summary & Design Vision

The user has provided two visual assets:
1. **Target Image:** `Golden Seeds at Sunrise.png` — A warm photographic scene showing a burlap sack spilling indigenous golden seeds and a wooden bowl of seeds on a stone ledge in the foreground, morning sunbeams streaming through leaves, an expansive terrace, and sand-toned modern architecture under a golden dawn sky.
2. **Reference Image:** `Reference image.png` — An editorial layout demonstrating a subtle, environmental landscape background with a warm Khadi/cream atmospheric wash, crisp white foreground cards with subtle borders, razor-sharp typography, and calm visual hierarchy.

### The Objective
Apply `Golden Seeds at Sunrise.png` across the entire website background using an anti-slop, editorial approach inspired by the reference design:
- **Atmospheric Depth:** The image gently frames the site—the spilled seed sack anchors the bottom/side periphery, dawn light bathes the upper canvas, and distant trees and terrace bring organic depth.
- **Zero Loss of Readability (WCAG AAA Compliance):** Text and UI controls remain 100% legible via calibrated Khadi overlays (`#F8F5EE`) and semi-translucent/solid white card surfaces.
- **Do No Harm:** All donation wizard logic, seed registry search, germination calculator, and NGO directory remain completely functional and untouched.
- **Safe Rollback / Revert Guarantee:** Full automated backups created before any code modifications.

---

## 2. Backup & Revert Verification

### Backup Location
All critical modified files have been backed up to:
`backups/pre-background-implementation/`
- `backups/pre-background-implementation/styles.css`
- `backups/pre-background-implementation/index.html`
- `backups/pre-background-implementation/app.js`

### One-Line Revert Command (PowerShell)
If you ever wish to instantly revert to the exact pre-background state:
```powershell
Copy-Item "backups\pre-background-implementation\styles.css" "css\styles.css" -Force; Copy-Item "backups\pre-background-implementation\index.html" "index.html" -Force
```

---

## 3. Technical Architecture & Layering Strategy

To avoid mobile scroll stutter, repaint jank, and blurry scaling caused by `background-attachment: fixed` on body, we implement a GPU-accelerated dual-layer fixed canvas:

```
┌────────────────────────────────────────────────────────┐
│ Level 3 (z-index: 1+): Interactive UI & Text Elements  │
│  - White & frosted cards (rgba(255,255,255,0.95))       │
│  - Sticky Navigation, Headers, Buttons, Inputs, Modals │
├────────────────────────────────────────────────────────┤
│ Level 2 (z-index: -1): Botanical Khadi Atmospheric Wash│
│  - Multi-stop linear & radial gradient overlay         │
│  - Warm Khadi (#F8F5EE) 75%–88% opacity veil           │
├────────────────────────────────────────────────────────┤
│ Level 1 (z-index: -2): 'Golden Seeds at Sunrise' Canvas│
│  - High-res image in assets/img/golden-seeds-sunrise   │
│  - Opacity: 0.38 - 0.42 (tuned to Reference Image)     │
│  - Object-fit: cover, object-position: center bottom   │
├────────────────────────────────────────────────────────┤
│ Level 0 (z-index: -3): Base Ground Color (#F8F5EE)     │
└────────────────────────────────────────────────────────┘
```

---

## 4. Implementation Steps

1. **Backup Verification:** Complete (stored in `backups/pre-background-implementation/`).
2. **Asset Normalization:** `assets/img/golden-seeds-sunrise.png` created.
3. **HTML Canvas Injection:** Fixed background container `.site-bg-canvas` added to `index.html`.
4. **CSS Calibration:**
   - Background canvas styles with GPU transform acceleration.
   - Editorial Khadi gradient veil matching `Reference image.png`.
   - Section transparency and frosted glass adjustments (`.section`, `.section-alt`, `.hero-section`, `.ngo-marquee-section`).
   - Card elevation styling (`.portal-card`, `.seed-card`, `.wizard-card`, `.ngo-card`, etc.) with clean white backgrounds, hairline borders, and tactile shadows.
5. **Quality & Accessibility Audit:** Verify WCAG AAA contrast and test responsiveness across desktop, tablet, and mobile.
