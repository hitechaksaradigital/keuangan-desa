---
name: Sistem Tata Kelola & Transparansi APBDes
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#494452'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7a7484'
  outline-variant: '#cbc3d4'
  surface-tint: '#6b47bb'
  primary: '#260061'
  on-primary: '#ffffff'
  primary-container: '#3e0f8d'
  on-primary-container: '#aa86fe'
  inverse-primary: '#d0bcff'
  secondary: '#7443ba'
  on-secondary: '#ffffff'
  secondary-container: '#b482fd'
  on-secondary-container: '#46038c'
  tertiary: '#676000'
  on-tertiary: '#ffffff'
  tertiary-container: '#b7ae4b'
  on-tertiary-container: '#454100'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#522ca1'
  secondary-fixed: '#eddcff'
  secondary-fixed-dim: '#d7baff'
  on-secondary-fixed: '#280056'
  on-secondary-fixed-variant: '#5b27a1'
  tertiary-fixed: '#f0e67c'
  tertiary-fixed-dim: '#d3c963'
  on-tertiary-fixed: '#1f1c00'
  on-tertiary-fixed-variant: '#4d4800'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  currency-display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  currency-table:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  sidebar-width: 260px
  header-height: 64px
  table-row-h-dense: 44px
  table-row-h-relaxed: 56px
---

## Brand & Style

The design system establishes an institutional, authoritative, and deeply transparent visual atmosphere engineered for Indonesian village governance (APBDes). It bridges robust internal administrative data processing (Siskeudes modern) with civic accessibility and audit-grade public transparency.

The aesthetic fuses **Corporate / Modern** civic precision with **High-Contrast Data Architecture**. It departs from clunky legacy bureaucratic portals by employing crisp spatial rhythm, deliberate chromatic coding, and high-legibility typographic scale. The visual tone commands respect, conveys state integrity, and instills public confidence through uncompromised clarity and accessible tabular metrics.

## Colors

The palette establishes a dignified hierarchy dominated by royal purple tones, offset by authoritative utility tones:

- **Primary (`#3E0F8D` - Deep Royal Violet):** Carries the institutional weight. Applied to top-level app banners, primary state actions, active navigational indicators, and primary ledger balances.
- **Secondary (`#9564DD` - Medium Lavender Violet):** Serves as an interactive conduit. Used for secondary navigation, focused input accents, interactive graph bars, and interactive state indicators.
- **Tertiary / Highlight (`#E4DA72` - Soft Warm Gold):** The emblem of municipal prosperity and fiscal auditing. Applied for status alerts, in-progress budget line indicators (*Berjalan*), and key statistical callouts.
- **Neutral & Surface System:** 
  - Canvas Root: `#EEEEEE` (Soft Mist Light Gray) providing clean contrast against nested containers.
  - Cards & Tables: `#FFFFFF` (Pure White) with fine `#E2E8F0` structural delineations.
  - Typography: `#1E1B2E` (Dark Slate) ensuring WCAG AAA compliant text contrast; `#64748B` for administrative meta tags and secondary timestamps.
- **Semantic Accents:** 
  - *Selesai / Terealisasi*: `#059669` (Emerald 600) with `#ECFDF5` background.
  - *Revisi / Perubahan*: `#D97706` (Amber 600) with `#FFFBEB` background.
  - *Defisit / Peringatan*: `#DC2626` (Red 600) with `#FEF2F2` background.

## Typography

Typography relies on two harmonious sans-serif engines:

1. **Plus Jakarta Sans:** Drives all navigational labels, modal titles, body copy, and editorial transparency narratives. It imparts a contemporary Indonesian public-sector identity that feels approachable yet formally structured.
2. **Inter (Tabular Numbers):** Explicitly reserved for ledger rows, currency readouts (Rupiah / Rp), fiscal budget comparisons, and quantitative charts. All financial figures must use tabular figures (`font-variant-numeric: tabular-nums` or `fontFeatureSettings: "'tnum' on"`) to maintain strict vertical decimal and digit alignment across large balance sheets.

## Layout & Spacing

The layout is built for high data density on wide desktop displays, scalable to mobile citizen inspection:

- **Desktop Structure:** Dual-pane layout combining a fixed 64px header and a 260px persistent sidebar navigation. Main viewport sits inside a fluid workspace constrained to a maximum content width of `1600px` with `32px` gutter margins.
- **Financial Table Density:** Tables favor horizontal efficiency. Cells use a standard `12px` vertical and `16px` horizontal padding (`table-row-h-dense: 44px`), keeping pagination minimal and scrolling smooth.
- **Responsive Adaptations:**
  - **Desktop (>= 1280px):** Full sidebar expanded, simultaneous overview cards (4-column grid), dual-column ledger split (Belanja vs Pendapatan).
  - **Tablet (768px - 1279px):** Sidebar collapses to an icon bar (72px), 2-column overview metric grid, horizontal scrolling enabled on detailed accounting ledgers.
  - **Mobile (< 768px):** Off-canvas drawer navigation, cards stack into a single column, complex tabular rows collapse into expandable summary accordions.

## Elevation & Depth

This system eliminates aggressive, distracting drop shadows in favor of **low-contrast structural borders paired with ambient, diffused violet-tinted depth**.

- **Level 0 (Flat Surface / Background):** `#EEEEEE` without shadow. Used for the application framework canvas.
- **Level 1 (Cards, Ledger Tables, KPI Blocks):** Surface `#FFFFFF` enclosed by a 1px solid border (`#E2E8F0`), supported by subtle ambient drop: `box-shadow: 0 1px 3px 0 rgba(30, 27, 46, 0.04), 0 1px 2px -1px rgba(30, 27, 46, 0.02)`.
- **Level 2 (Hovered Rows, Dropdowns, Action Popovers):** Elevated surface with `box-shadow: 0 4px 12px -2px rgba(62, 15, 141, 0.08), 0 2px 6px -1px rgba(30, 27, 46, 0.04)`.
- **Level 3 (Modals, Fiscal Detail Drawers, Verification Dialogs):** Centered surfaces over a translucent backdrop (`rgba(30, 27, 46, 0.45)` with `backdrop-filter: blur(4px)`), carrying `box-shadow: 0 20px 25px -5px rgba(62, 15, 141, 0.12), 0 8px 10px -6px rgba(30, 27, 46, 0.06)`.

## Shapes

The design system adopts a **Soft (`1`)** shape language, utilizing precise `0.25rem` (4px) to `0.5rem` (8px) corner radii. This maintains an institutional, structured feel suited to government accounting, avoiding informal bubble aesthetics while preserving modern softness.

- **Inputs, Micro Badges, & Table Rows:** `rounded` (4px / 0.25rem).
- **Cards, Panels, & Data Modals:** `rounded-lg` (8px / 0.5rem).
- **Floating Badges & Quick Action Tags:** `rounded-full` strictly for semantic audit tags to visually isolate them from functional rectangular buttons.

## Components

### Buttons
- **Primary:** Background `#3E0F8D`, text `#FFFFFF`, border none. Hover: `#320B73`. Active state: inset depth. Radius `6px`.
- **Secondary / Outline:** Background `#FFFFFF`, text `#3E0F8D`, 1px solid `#3E0F8D`. Hover: `#F5F2FC`.
- **Subtle / Ghost:** Text `#64748B`, background transparent. Hover: `#FFFFFF`, text `#1E1B2E`.

### Data-Dense Financial Tables
- Header cells: Background `#F8FAFC`, uppercase `label-sm`, color `#64748B`, bottom 2px solid `#E2E8F0`.
- Cells: Text `#1E1B2E`, 1px bottom border `#E2E8F0`. Currency figures aligned strictly right using tabular Inter font (`currency-table`).
- Row states: Default `#FFFFFF`, alternating striping optional (`#FAFAFA`), hover state `#F5F2FC`.

### Badges & Status Chips
- **Berjalan (In Progress):** Background `#FEFCE8`, border 1px solid `#E4DA72`, text `#713F12`. Accompanied by a 6px pulsing dot.
- **Selesai / Terealisasi (Completed):** Background `#ECFDF5`, border 1px solid `#A7F3D0`, text `#065F46`.
- **Revisi / Perubahan (Revision Required):** Background `#FFFBEB`, border 1px solid `#FDE68A`, text `#92400E`.
- **Ditolak / Over-Budget:** Background `#FEF2F2`, border 1px solid `#FECACA`, text `#991B1B`.

### Input Fields & Selects
- Height 38px, background `#FFFFFF`, border 1px solid `#CBD5E1`, text `#1E1B2E`, radius `6px`.
- Focus ring: 2px solid `#9564DD` with offset `1px`.
- Currency prefix: Static `#F1F5F9` gray box pinned left with uppercase "Rp", integrated with the input field.

### Metric / KPI Summary Cards
- White background (`#FFFFFF`), border 1px solid `#E2E8F0`, padding `20px`.
- Structure: Subdued title (`label-sm`), main value (`currency-display`), footer indicator featuring percentage delta and APBDes progress progress-bar filled with `#3E0F8D` and `#E4DA72`.