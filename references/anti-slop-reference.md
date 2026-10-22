# BeejSetu (बीजसेतु): Anti-Slop Visual Reference & Architectural Blueprint

This document specifies the visual rules, typography scales, color tokens, and interactive preservation requirements installed to ensure BeejSetu delivers an authentic, human-grade, tactile conservation experience.

---

## 1. The 6 Principles That Eliminate AI Slop in BeejSetu

| AI Slop Trope | BeejSetu Bespoke Implementation |
|---|---|
| **Centered 3-line heading + glowing pill badge** | Asymmetric editorial layout with bilingual identity (`BeejSetu` + `बीजसेतु`) and a 2-line confident title. |
| **Saturated neon SaaS greens & purple glows** | Deep botanical forest (`#0E2A1D`), warm unbleached khadi paper (`#F8F5EE`), rich terracotta (`#A44A29`), and sun-dried seed ochre (`#D49938`). |
| **Raw emojis in UI primitives (`🌱`, `🍎`, `🪴`, `🧺`, `🛵`, `📦`)** | Crisp 1.75px stroke monochrome SVG icons from `assets/icons/`. |
| **Generic 3-card tech boxes** | Purpose-built asymmetric action portals (`I Want to Donate Seeds` vs `I Want to Order Seeds`) and sequential numbered steps. |
| **Floating glassmorphism cards with fake charts** | Grounded botanical photography (`assets/img/hero.jpg`) without distracting floating badges. |
| **Fabricated national vanity numbers** | Authentic regional grounding: Pune & Western Ghats pilot, genuine Maharashtra NGO partners (Sahyadri Devrai, BAIF, Lokpanchayat / Rahibai Popere, Vanarai, Naam Foundation, Paryavaran Dakshata Mandal). |

---

## 2. "The Live Things" (Taste Skill Axiom)

BeejSetu features two high-utility, tangible tools:

1. **The 4-Step Seed Donation Wizard:**
   - Step 1: Category & variety specification.
   - Step 2: Quality checklist (pulp removed, sun-dried 48h, breathable packaging).
   - Step 3: Contribution mode selection (Doorstep pickup, Partner NGO drop-off, SpeedPost).
   - Step 4: Donor details & instant digital Green Seed Champion Certificate issuance.

2. **The Interactive Germination Viability Test Calculator:**
   - Lets seed savers test 10 or 20 seeds between damp paper towels.
   - Live calculates germination rate and outputs tailored planting guidance.

3. **Slide-Over Drawers:**
   - **Seed Box (Cart) Drawer:** Instant packet allocation with zero-friction modal checkout.
   - **My Activity Drawer:** Real-time log of previous donations and dispatched orders persisted in `localStorage`.

---

## 3. Typographic Scale & Botanical Hierarchy

- **Hero Display:** `Outfit` / `Playfair Display`, `clamp(2.5rem, 5vw, 4.25rem)`, line-height `1.12`, letter-spacing `-0.025em`.
- **Section Headings:** `Outfit`, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height `1.2`, weight `700`.
- **Bilingual Badges:** Bilingual text pairing English `BeejSetu` with Devanagari `बीजसेतु` using clean tracking and balanced vertical alignment.
- **Body & Controls:** `Plus Jakarta Sans`, `0.95rem` to `1.05rem`, line-height `1.65`, color `--color-ink` (`#1C2620`).
- **Metadata & Tags:** `Plus Jakarta Sans`, `0.8rem` to `0.85rem`, weight `600`, color `--color-muted` (`#56675E`).

---

## 4. Workspace Agent Contracts

- [.agents/skills/anti-slop-design/SKILL.md](file:///.agents/skills/anti-slop-design/SKILL.md): Core UI/UX anti-slop rules, 12-flaw banned matrix, 1-to-3 UX rule, and 85% law.
- [.agents/skills/design-taste-frontend/SKILL.md](file:///.agents/skills/design-taste-frontend/SKILL.md): Taste Skill v2 art direction for public conservation & landing pages.
- [.agents/rules/anti-ai-slop.md](file:///.agents/rules/anti-ai-slop.md): Direct project design tokens, prohibited tropes, and hero standards.
- [AGENTS.md](file:///AGENTS.md): Workspace-level agent contract and functionality preservation guarantee.
