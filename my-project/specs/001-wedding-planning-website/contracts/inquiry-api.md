# Contract: Inquiry Submission API

## POST /api/inquiries

Accepts a booking inquiry form submission and persists it to SQLite.

### Request

**Content-Type**: `application/json`

```json
{
  "name":       "Jane Smith",
  "email":      "jane@example.com",
  "event_date": "2026-10-15",
  "package":    "full-coordination",
  "addons":     ["welcome-bag", "timeline-creation"],
  "message":    "We are planning an outdoor ceremony in Brooklyn."
}
```

| Field | Required | Type | Validation |
|-------|----------|------|------------|
| `name` | Yes | string | 1–100 chars |
| `email` | Yes | string | valid email, ≤ 254 chars |
| `event_date` | Yes | string | ISO date, must be future date |
| `package` | Yes | string | `hourly-helper` \| `partial-planning` \| `full-coordination` |
| `addons` | No | string[] | subset of allowed add-on slugs |
| `message` | No | string | ≤ 2000 chars |

### Success Response — 201 Created

```json
{
  "ok": true,
  "message": "Thank you! We'll be in touch within 24 hours."
}
```

### Validation Error Response — 400 Bad Request

```json
{
  "ok": false,
  "errors": {
    "email": "Please enter a valid email address.",
    "event_date": "Please select a future date."
  }
}
```

### Server Error Response — 500 Internal Server Error

```json
{
  "ok": false,
  "message": "Something went wrong. Please try again."
}
```

### CORS

The API allows requests from the Vite dev origin (`http://localhost:5173`) in
development and from the production domain in production. Configured via the
`cors` option in `server/index.js`.
