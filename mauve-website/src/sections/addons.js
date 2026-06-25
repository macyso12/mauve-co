export const ADDONS = [
  { id: 'welcome-bag',       name: 'Welcome Bag Assembly',          price: '$40',  description: 'Curated bags assembled & delivered to guests (up to 20).' },
  { id: 'rehearsal-dinner',  name: 'Rehearsal Dinner Coordination', price: '$175', description: 'Full on-site coordination for your rehearsal dinner.' },
  { id: 'emergency-kit',     name: 'Emergency Bridal Kit',          price: '$55',  description: 'Fully stocked kit on-hand for any day-of surprises.' },
  { id: 'seating-chart',     name: 'Seating Chart Management',      price: '$35',  description: 'Design and finalize your seating arrangement.' },
  { id: 'vendor-research',   name: 'Vendor Research & Shortlist',   price: '$45',  description: '3–5 vetted vendor options per category, curated for you.' },
  { id: 'wedding-website',   name: 'Wedding Website Setup',         price: '$50',  description: 'Zola or The Knot setup with details, RSVP & registry.' },
  { id: 'stationery-design', name: 'Stationery Design',             price: '$125', description: 'Custom invitations, save-the-dates, menus & programs.' },
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
