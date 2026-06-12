# Implementation Plan: The Mauve & Co. Wedding Planning Website

**Branch**: `001-wedding-planning-website` | **Date**: 2026-06-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-wedding-planning-website/spec.md`

## Summary

A single-page marketing website for The Mauve & Co. wedding planning & event helper service
in NYC. The site showcases three service packages and five add-ons, captures booking
inquiries via a form, and persists submissions to a local SQLite database. Built with
Vite + vanilla HTML/CSS/JS; no frontend framework.

## Technical Context

**Language/Version**: JavaScript (ES2022), HTML5, CSS3

**Primary Dependencies**:
- `vite` — dev server, asset pipeline, production build
- `better-sqlite3` — SQLite driver (Node.js, synchronous, no ORM)
- `express` — minimal API server for form submission endpoint (single route)
- `nodemon` — dev-only auto-restart for the API server

**Storage**: SQLite via `better-sqlite3`; database file at `server/data/mauve.db`

**Testing**: None required (no test tasks per spec); manual validation via quickstart.md

**Target Platform**: Modern evergreen browsers; deployable as static frontend + Node API

**Project Type**: Marketing website (static frontend) + minimal Node.js API backend

**Performance Goals**:
- Above-the-fold visible < 3 s on broadband (SC-004)
- All images lazy-loaded; hero assets < 200 KB each

**Constraints**:
- Vanilla HTML/CSS/JS — no React, Vue, Svelte, or other component frameworks
- Minimal libraries — only what is listed above; no UI kits, CSS frameworks, or ORMs
- Images stored on disk under `public/assets/`; paths persisted in SQLite if needed
- SQLite database file is local only; not committed to git

**Scale/Scope**: Single-operator business; < 100 form submissions per month expected

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Code Quality | Single responsibility per module; JSDoc on public functions | ✅ |
| II. Testing Standards | No test tasks requested in spec; manual validation via quickstart.md | ✅ N/A |
| III. UX Consistency | Design tokens in CSS custom properties; WCAG 2.1 AA targets | ✅ |
| IV. Performance | Hero images < 200 KB; lazy-load off-screen; < 3 s FCP | ✅ |

## Project Structure

### Documentation (this feature)

```text
specs/001-wedding-planning-website/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── inquiry-api.md
└── tasks.md
```

### Source Code (repository root — Vite project at `mauve-website/`)

```text
mauve-website/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
│
├── src/
│   ├── main.js             ← JS entry: nav scroll, form wiring
│   ├── style.css           ← design tokens + global layout
│   └── sections/
│       ├── services.js     ← package card data + render
│       ├── addons.js       ← add-ons list data + render
│       └── booking.js      ← form validation + fetch submit
│
├── public/
│   └── assets/             ← brand images (logo, mascots, favicon)
│
└── server/
    ├── index.js            ← Express app (POST /api/inquiries)
    ├── db.js               ← SQLite init + prepared statements
    └── data/
        └── mauve.db        ← gitignored
```

## Complexity Tracking

No constitution violations requiring justification.
