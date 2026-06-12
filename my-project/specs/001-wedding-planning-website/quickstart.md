# Quickstart Validation Guide: The Mauve & Co. Website

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

## Setup

```bash
cd mauve-website
npm install
```

## Run (Development)

Open two terminals:

```bash
# Terminal 1 — API server (port 3000)
npm run server

# Terminal 2 — Vite dev server (port 5173)
npm run dev
```

Open `http://localhost:5173` in your browser.

## Validation Scenarios

### S-001: Packages visible within 30 seconds (SC-001)

1. Open the homepage.
2. Scroll down without clicking anything.
3. **Expected**: All three packages (Hourly Helper $45/hr, Partial Planning from $1,500,
   Full Coordination from $3,500) are visible with names and prices.

---

### S-002: Successful booking inquiry (US1 — AC3)

1. Click the "Book Today" CTA or scroll to the booking section.
2. Fill in: Name, Email, a future Event Date, select a package.
3. Click **Submit**.
4. **Expected**: A green confirmation message appears: "Thank you! We'll be in touch
   within 24 hours."
5. **Verify DB**: Run `sqlite3 server/data/mauve.db "SELECT * FROM inquiries;"` — one
   row should appear with the submitted data.

---

### S-003: Form validation on missing fields (US1 — AC4)

1. Go to the booking form.
2. Leave Name blank. Click **Submit**.
3. **Expected**: The Name field is highlighted in red with a friendly error message.
   The form does not submit.

---

### S-004: Add-ons visible (US2)

1. Scroll to the add-ons section.
2. **Expected**: All five add-ons are listed: Welcome Bag Assembly, Rehearsal Dinner
   Coordination, Wedding Day Timeline Creation, Emergency Bridal Kit, Seating Chart
   Management.

---

### S-005: Mobile responsiveness (SC-003)

1. Open DevTools → Toggle device toolbar → select 375 px width (iPhone SE).
2. Scroll the full page.
3. **Expected**: No horizontal scroll; all text readable; CTA buttons tappable.

---

### S-006: 404 page (edge case)

1. Navigate to `http://localhost:5173/nonexistent`.
2. **Expected**: Branded 404 page with a link back to the homepage.

---

## Production Build

```bash
npm run build        # outputs to mauve-website/dist/
npm run preview      # preview the production build locally
```

Start the API server alongside `npm run preview` for full end-to-end validation.
