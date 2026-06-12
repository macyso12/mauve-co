---
description: "Task list for The Mauve & Co. Wedding Planning Website"
---

# Tasks: The Mauve & Co. Wedding Planning Website

**Input**: Design documents from `specs/001-wedding-planning-website/`

**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

---

## Phase 1: Setup

**Purpose**: Project scaffold, dependencies, configuration

- [x] T001 Initialise Vite project at `mauve-website/` with `npm create vite@latest mauve-website -- --template vanilla`
- [x] T002 Install runtime dependencies: `better-sqlite3 express cors` in `mauve-website/`
- [x] T003 [P] Install dev dependencies: `nodemon` in `mauve-website/`
- [x] T004 Configure `mauve-website/vite.config.js` with server proxy (`/api` → port 3000)
- [x] T005 Add npm scripts to `mauve-website/package.json`: `dev`, `server` (nodemon), `build`, `preview`
- [x] T006 Create `mauve-website/.gitignore` (node_modules, dist, server/data/mauve.db, .env*)
- [x] T007 [P] Create directory structure: `mauve-website/src/sections/`, `mauve-website/public/assets/`, `mauve-website/server/data/`
- [x] T008 [P] Copy brand assets (logos, mascots) into `mauve-website/public/assets/`

---

## Phase 2: Foundational

**Purpose**: Shared infrastructure required by all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create `mauve-website/server/db.js`: initialise SQLite connection with `better-sqlite3`, create `inquiries` table per data-model.md schema, export prepared statements (`insertInquiry`)
- [x] T010 Create `mauve-website/server/index.js`: Express app, `cors` middleware, `express.json()`, mount `POST /api/inquiries` route that validates input, calls `insertInquiry`, returns 201/400/500 per contracts/inquiry-api.md
- [x] T011 Create `mauve-website/src/style.css`: CSS custom properties for design tokens (--color-cream, --color-dark-red, --color-off-white, --color-text, --color-accent), typography imports (Playfair Display, Inter from Google Fonts), global reset, base layout utilities
- [x] T012 Replace `mauve-website/index.html` boilerplate with full single-page HTML skeleton: `<header>` with nav + logo, `<section id="hero">`, `<section id="services">`, `<section id="addons">`, `<section id="book">`, `<footer>` with social links; link `src/style.css` and `src/main.js`

**Checkpoint**: Foundation ready — API server starts, DB initialises, HTML skeleton renders

---

## Phase 3: User Story 1 — Discover Services & Submit Booking Inquiry (Priority: P1) 🎯 MVP

**Goal**: Visitor can view all packages and submit a booking inquiry that is saved to SQLite

**Independent Test**: Run both servers, open homepage, verify packages visible, submit form, check DB row exists

### Implementation for User Story 1

- [x] T013 [P] [US1] Create `mauve-website/src/sections/services.js`: export `PACKAGES` array (id, name, price, description for all three tiers), export `renderServices()` that injects package cards into `#services` section with dark-red heart icons matching brand
- [x] T014 [P] [US1] Create `mauve-website/src/sections/booking.js`: export `initBookingForm()` — wire `<form id="booking-form">` submit event; validate name (1-100), email (RFC pattern), event_date (future), package (required); show inline field errors; on success POST JSON to `/api/inquiries` via `fetch`; render success or error message without page reload
- [x] T015 [US1] Build out `<section id="hero">` in `index.html`: full-width cream background, logo centred, headline "Planning a wedding or event in NYC?", subheadline "We're here to help.", body copy, "Book Today" CTA button scrolling to `#book`; add duck mascot image
- [x] T016 [US1] Build out `<section id="services">` in `index.html`: section heading, placeholder div `#packages-grid` for JS-rendered cards; add inline `<section id="book">` with `<form id="booking-form">`: fields for name, email, event-date (date input), package (select), optional message (textarea), submit button
- [x] T017 [US1] Create `mauve-website/src/main.js`: import and call `renderServices()` and `initBookingForm()`; add smooth-scroll for nav anchors; add sticky header on scroll
- [x] T018 [US1] Style service package cards in `style.css`: dark-red heart bullet, package name in Playfair Display, price in bold, responsive grid (1 col mobile → 3 col desktop)
- [x] T019 [US1] Style booking form in `style.css`: cream card background, dark-red labels, field focus ring in brand color, error state (red border + message), success state (green confirmation banner), submit button in dark-red with hover state

**Checkpoint**: US1 independently testable — packages visible, form submits, SQLite row created

---

## Phase 4: User Story 2 — Explore Add-On Options (Priority: P2)

**Goal**: Visitor can browse all five add-ons and navigate to the booking form from that section

**Independent Test**: Scroll to add-ons, verify all five listed, click CTA, arrive at booking form with add-on pre-noted

### Implementation for User Story 2

- [x] T020 [P] [US2] Create `mauve-website/src/sections/addons.js`: export `ADDONS` array (id, name, description for all five), export `renderAddons()` that injects add-on list items into `#addons-list`
- [x] T021 [US2] Build out `<section id="addons">` in `index.html`: heading "Add-On Options", unordered list `<ul id="addons-list">` for JS rendering, CTA link to `#book`
- [x] T022 [US2] Add add-on checkboxes to booking form `<form id="booking-form">` in `index.html`: optional fieldset listing all five add-ons as checkboxes; update `booking.js` to include selected add-ons in POST body
- [x] T023 [US2] Import and call `renderAddons()` in `src/main.js`; style add-on list in `style.css` (bullet points matching brand, hover highlight in accent color)

**Checkpoint**: US1 + US2 both independently functional

---

## Phase 5: User Story 3 — Social Links & Contact (Priority: P3)

**Goal**: Visitor can find social media links and a direct contact method from any page within two clicks

**Independent Test**: Check footer from homepage — Instagram and TikTok links open correct profiles in new tab; contact email visible

### Implementation for User Story 3

- [x] T024 [US3] Build `<footer>` in `index.html`: The Mauve & Co. logo (small), tagline, Instagram and TikTok icon links (target="_blank" rel="noopener"), contact email address; copyright line
- [x] T025 [US3] Add footer styles to `style.css`: dark-red background, cream text, icon sizing, link hover state (accent color underline), responsive layout

**Checkpoint**: All three user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality, accessibility, performance, and edge cases across all stories

- [x] T026 [P] Add `<meta>` tags to `index.html`: viewport, description, Open Graph (title, description, image for social sharing), favicon link
- [x] T027 [P] Add `loading="lazy"` to all images except the hero logo; ensure hero image is < 200 KB (compress if needed)
- [x] T028 [P] Audit color contrast in `style.css` against WCAG 2.1 AA: verify --color-dark-red on --color-cream meets 4.5:1 ratio; add `aria-label` to icon-only links; ensure form inputs have visible labels
- [x] T029 Create branded 404 page: add `mauve-website/404.html` with logo, "Oops, we can't find that page" message, and link back to homepage; configure in `vite.config.js`
- [x] T030 [P] Add CSS transitions: smooth hover on package cards (box-shadow lift), smooth button press states, nav link underline animation
- [x] T031 Validate full quickstart.md scenarios S-001 through S-006 manually and mark any failing items

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — blocks all user stories
- **US1 (Phase 3)**: Depends on Foundational — MVP deliverable
- **US2 (Phase 4)**: Depends on Foundational; integrates with booking form from US1
- **US3 (Phase 5)**: Depends on Foundational; independent of US1/US2
- **Polish (Phase 6)**: Depends on all user stories complete

### Parallel Opportunities Within Each Phase

- T002, T003 npm installs can overlap
- T013 (services.js) and T014 (booking.js) can be written in parallel
- T020 (addons.js) and T022 (form update) can be written in parallel
- T026, T027, T028, T030 polish tasks are all independent

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Phase 1: Setup
2. Phase 2: Foundational
3. Phase 3: US1
4. **STOP and validate**: packages visible, form submits, DB row created
5. Demo / share

### Incremental

- Add Phase 4 (add-ons) → demo
- Add Phase 5 (social/contact) → demo
- Phase 6 (polish) → production-ready

---

## Notes

- [P] = different files, no blocking dependencies
- [USx] maps task to user story from spec.md
- Commit after each phase checkpoint
- `server/data/mauve.db` must never be committed (in .gitignore)
- Confirm Instagram/TikTok profile URLs with owner before T024
