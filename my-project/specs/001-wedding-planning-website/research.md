# Research: The Mauve & Co. Wedding Planning Website

## Decision Log

### D-001: No Frontend Framework

**Decision**: Vanilla HTML/CSS/JS only; Vite for bundling/dev server.

**Rationale**: User explicitly required minimal libraries and vanilla stack. Vite adds
hot-module replacement and optimised production builds without imposing a component model.

**Alternatives considered**: React (rejected — framework overhead not needed for a static
marketing page), Astro (rejected — adds abstraction beyond the constraint).

---

### D-002: SQLite via better-sqlite3

**Decision**: `better-sqlite3` with a local `.db` file at `server/data/mauve.db`.

**Rationale**: Zero-config, file-based, synchronous API fits a low-volume single-operator
site. No separate database process or credentials to manage.

**Alternatives considered**: Turso/libSQL (rejected — remote dependency), lowdb/JSON file
(rejected — no query capability, poor for structured data).

---

### D-003: Express for the API Layer

**Decision**: Single Express app with one route (`POST /api/inquiries`).

**Rationale**: Vite serves the static frontend; browser `fetch` calls the Express server
for form submission. Express is the lightest Node.js HTTP option that handles
CORS, body parsing, and error middleware out of the box.

**Alternatives considered**: Hono (unfamiliar to most; no advantage for one route),
serverless function (adds deployment complexity).

---

### D-004: Social Platforms — Instagram + TikTok (Assumed Default)

**Decision**: Instagram and TikTok links in footer; owner to confirm before go-live.

**Rationale**: Both platforms dominate the bridal discovery market. This is the
assumed default from spec FR-008; placeholder links will be used until the owner
provides actual profile URLs.

---

### D-005: CSS Custom Properties for Design Tokens

**Decision**: All brand colors, fonts, spacing, and radii defined as CSS custom
properties on `:root`.

**Rationale**: Satisfies Constitution Principle III (UX Consistency) with no build-time
dependency. One source of truth; easy to update.

**Color palette (from brand assets)**:
- `--color-cream: #F5F0E8` — page background
- `--color-dark-red: #7B1A1A` — primary brand / headings / CTAs
- `--color-off-white: #FAFAF7` — card backgrounds
- `--color-text: #2A2A2A` — body text
- `--color-accent: #D4A0A0` — subtle accents / hover states

**Typography**:
- Display/logo: serif (e.g., `'Playfair Display', Georgia, serif`)
- Body: sans-serif (e.g., `'Inter', system-ui, sans-serif`)
- Italic accent: `'Dancing Script'` or similar for tagline

---

### D-006: Form Submission Flow

**Decision**: Vanilla `fetch` POST to `/api/inquiries`; no page reload; success/error
message rendered inline by JS.

**Rationale**: Single-page feel without a framework. Satisfies SC-005 (no silent
failures) via explicit try/catch and user-facing error UI.
