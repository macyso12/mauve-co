import express from 'express';
import cors from 'cors';
import { insertInquiry } from './db.js';

const app = express();
const PORT = 3000;

const VALID_PACKAGES = new Set(['hourly-helper', 'partial-planning', 'full-coordination']);
const VALID_ADDONS = new Set([
  'welcome-bag', 'rehearsal-dinner', 'timeline-creation', 'emergency-kit', 'seating-chart',
]);

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

app.post('/api/inquiries', (req, res) => {
  const { name, email, event_date, package: pkg, addons = [], message = '' } = req.body;
  const errors = {};

  if (!name || String(name).trim().length < 1 || String(name).trim().length > 100) {
    errors.name = 'Please enter your name (1–100 characters).';
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(String(email)) || String(email).length > 254) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!event_date || isNaN(Date.parse(event_date)) || new Date(event_date) <= new Date()) {
    errors.event_date = 'Please select a future date for your event.';
  }
  if (!pkg || !VALID_PACKAGES.has(pkg)) {
    errors.package = 'Please select a service package.';
  }
  const addonList = Array.isArray(addons) ? addons : [];
  if (addonList.some(a => !VALID_ADDONS.has(a))) {
    errors.addons = 'One or more add-ons are invalid.';
  }
  if (message && String(message).length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    insertInquiry.run({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      event_date,
      package: pkg,
      addons: addonList.join(',') || null,
      message: message ? String(message).trim() : null,
      created_at: new Date().toISOString(),
    });
    res.status(201).json({ ok: true, message: "Thank you! We'll be in touch within 24 hours." });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
  }
});

app.listen(PORT, () => console.log(`Mauve API listening on http://localhost:${PORT}`));
