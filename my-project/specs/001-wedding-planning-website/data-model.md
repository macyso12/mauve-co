# Data Model: The Mauve & Co. Wedding Planning Website

## Entities

### InquirySubmission

Persisted to SQLite. One row per form submission.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `name` | TEXT | NOT NULL | Visitor full name |
| `email` | TEXT | NOT NULL, valid email format | |
| `event_date` | TEXT | NOT NULL, ISO date `YYYY-MM-DD` | |
| `package` | TEXT | NOT NULL, one of enum below | Selected service tier |
| `addons` | TEXT | NULLABLE, comma-separated list | Selected add-ons |
| `message` | TEXT | NULLABLE | Optional free-text |
| `created_at` | TEXT | NOT NULL, ISO datetime | Server-set on insert |

**Package enum values**: `hourly-helper`, `partial-planning`, `full-coordination`

**Add-ons enum values** (any subset, comma-separated):
`welcome-bag`, `rehearsal-dinner`, `timeline-creation`, `emergency-kit`, `seating-chart`

### ServicePackage (static data — not in DB)

Defined as a JS constant in `src/sections/services.js`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | e.g. `"hourly-helper"` |
| `name` | string | Display name |
| `price` | string | e.g. `"$45/hr"`, `"From $1,500"` |
| `description` | string | One-sentence pitch |

### Addon (static data — not in DB)

Defined as a JS constant in `src/sections/addons.js`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | slug |
| `name` | string | Display name |
| `description` | string | Optional short description |

## SQLite Schema

```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  event_date TEXT    NOT NULL,
  package    TEXT    NOT NULL,
  addons     TEXT,
  message    TEXT,
  created_at TEXT    NOT NULL
);
```

## Validation Rules

- `name`: 1–100 characters, trimmed
- `email`: must match RFC 5322 simplified pattern; max 254 characters
- `event_date`: must be a valid future date
- `package`: must be one of the three allowed values
- `addons`: optional; each value must be from allowed list if present
- `message`: optional; max 2000 characters
