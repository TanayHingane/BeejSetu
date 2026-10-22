# AGENTS.md — BeejSetu Workspace Rules & Anti-Slop Standards

This repository contains the design, documentation, and frontend implementation for **BeejSetu (बीजसेतु)** — *The Indigenous Seed Bridge & Community Agroforestry Network*, piloting across Pune and the Western Ghats region to connect urban seed savers, domestic fruit gardeners, and organic farmers with verified grassroots nurseries and ecological restoration missions.

---

## 1. Core Rules for All Coding & Design Agents

1. **Strictly Anti-AI-Slop & Editorial Aesthetic:**
   - Adhere strictly to [.agents/rules/anti-ai-slop.md](file:///.agents/rules/anti-ai-slop.md) and [.agents/skills/anti-slop-design/SKILL.md](file:///.agents/skills/anti-slop-design/SKILL.md).
   - **Zero Raw Emojis in UI Primitives:** Replace all emojis (`🌱`, `🍎`, `🪴`, `🧺`, `🛵`, `📦`, `🏆`) with crisp, monochrome, single-weight 1.75px SVG vectors from `assets/icons/`.
   - **Zero Generic Neon SaaS Glows:** Ban purple/violet radial blurs and saturated green tech gradients. Use the bespoke botanical palette: Deep Botanical Forest (`#0E2A1D`), Warm Khadi / Unbleached Parchment (`#F8F5EE`), Rich Terracotta (`#A44A29`), Sun-dried Seed Ochre (`#D49938`), and Crisp Stem Green (`#2D6A4F`).
   - **No Cookie-Cutter Grids:** Structure content with asymmetric editorial layouts, clear visual hierarchies, and distinct focal anchors.

2. **Absolute Preservation of Core Donation Architecture & Features ("Do No Harm"):**
   - **Never break or degrade existing features:**
     - The **4-Step Donation Wizard** (step transitions, form validation, radio card selection, prefill from species registry and NGO directory, and dynamic Green Seed Champion certificate generation).
     - The **Conservation Seed Species Registry** (real-time search, category filtering tabs, ecological recipient indicators, specification grids, and direct donation prefill routing).
     - The **Interactive Germination Viability Calculator** (real-time percentage calculation and ecological guidance).
     - The **Partner NGO Directory** (verified Maharashtra cards, specialty seed tags, contact links, and direct donation prefill routing).
     - The **Activity Tracker Drawer** (retrieval and display of past donations, certificates, and impact records from `localStorage`).
   - Preserve all DOM IDs, event handlers, and data structures (`SEED_DATABASE`, `NGO_PARTNERS`, `AppState`).
   - **Non-Commercial Donation Reality:** BeejSetu does not sell or retail seeds; it exclusively accepts citizen seed donations for verified Maharashtra NGOs to raise into saplings or donate directly to smallholder farmers.

3. **Truth & Reality Constraints:**
   - Do not fabricate national claims, fake corporate partnerships, or inflated metrics.
   - Ground all content in the real pilot context: Pune and the Western Ghats eco-belt, connecting conscious citizens to recognized Maharashtra seed conservation organizations (Sahyadri Devrai, BAIF Development Research, Lokpanchayat / Rahibai Popere Seed Bank, Vanarai, Naam Foundation, Paryavaran Dakshata Mandal).
   - Botanical accuracy: Maintain proper binomial names (*Syzygium cumini*, *Mangifera indica*, *Annona squamosa*, *Phyllanthus emblica*, *Moringa oleifera*, *Ocimum tenuiflorum*) alongside Hindi/Marathi names.

4. **Code & Architecture Standards:**
   - Standard HTML5 semantic landmarks (`header`, `main`, `section`, `article`, `aside`, `footer`).
   - Dependency-free Vanilla CSS with custom properties (`:root` tokens) and responsive fluid typography (`clamp()`).
   - Native Vanilla ES6 JavaScript without external build steps or bulky dependencies.
   - Full keyboard accessibility (`:focus-visible` rings), WCAG AA contrast compliance (4.5:1 minimum), and `prefers-reduced-motion` support.
