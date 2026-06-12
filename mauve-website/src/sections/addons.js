export const ADDONS = [
  { id: 'welcome-bag',       name: 'Welcome Bag Assembly',          price: '$65',  description: 'Curated welcome bags assembled and delivered to guests (up to 20 bags).' },
  { id: 'rehearsal-dinner',  name: 'Rehearsal Dinner Coordination', price: '$300', description: 'Full rehearsal dinner planning and on-site coordination.' },
  { id: 'emergency-kit',     name: 'Emergency Bridal Kit',          price: '$55',  description: 'Fully stocked kit on-hand for any day-of surprises.' },
  { id: 'seating-chart',     name: 'Seating Chart Management',      price: '$75',  description: 'Design and finalize your seating arrangement with ease.' },
  { id: 'vendor-research',   name: 'Vendor Research & Shortlist',   price: '$100', description: 'We research and curate 3-5 vetted vendor options per category (photographer, florist, caterer, etc.).' },
  { id: 'wedding-website',   name: 'Wedding Website Setup',         price: '$85',  description: 'We set up your Zola or The Knot wedding website with all event details, RSVP, and registry links.' },
];

/** Renders add-on items into #addons-list */
export function renderAddons() {
  const list = document.getElementById('addons-list');
  if (!list) return;
  list.innerHTML = ADDONS.map(a => `
    <li class="addon-item" role="listitem">
      <span class="addon-bullet" aria-hidden="true">•</span>
      <div>
        <p class="addon-name">${a.name} <span class="addon-price">${a.price}</span></p>
        <p class="addon-desc">${a.description}</p>
      </div>
    </li>
  `).join('');
}

/** Renders add-on checkboxes into #addons-checks inside the booking form */
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
