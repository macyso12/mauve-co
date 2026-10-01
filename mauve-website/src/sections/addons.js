export const ADDONS = [
  { id: 'vendor-research',   name: 'Vendor Discovery & Shortlist',  price: '$50',  description: '3–5 vetted vendor options per category, curated for you.' },
  { id: 'wedding-website',   name: 'Wedding Website Setup',         price: '$50',  description: 'Zola or The Knot setup with details, RSVP & registry.' },
  { id: 'stationery-design', name: 'Stationery Design',             price: '$125', description: 'Custom invitations, save-the-dates, menus & programs.' },
  { id: 'timeline-building', name: 'Timeline Building',             price: '$50',  description: 'A detailed, customized day-of timeline built around your venue, vendors, and vision.' },
  { id: 'trilingual',        name: 'Trilingual Support',            price: 'Free', description: 'Coordination available in English, Cantonese, and Mandarin.' },
];

export function renderAddons() {
  const list = document.getElementById('addons-list');
  if (!list) return;
  list.innerHTML = ADDONS.map(a => `
    <li class="addon-item">
      <div class="addon-left">
        <span class="addon-name">${a.name}</span>
        <span class="addon-desc">${a.description}</span>
      </div>
      <span class="addon-dots" aria-hidden="true"></span>
      <span class="addon-price">${a.price}</span>
    </li>
  `).join('');
}

export function renderAddonCheckboxes() {
  const container = document.getElementById('addons-checks');
  if (!container) return;
  container.innerHTML = ADDONS.map(a => `
    <label class="addon-check-label">
      <input type="checkbox" name="addons" value="${a.id}" />
      ${a.name}
    </label>
  `).join('');
}
