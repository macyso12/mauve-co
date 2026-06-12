export const ADDONS = [
  { id: 'welcome-bag',       name: 'Welcome Bag Assembly',          description: 'Curated welcome bags assembled and delivered to guests.' },
  { id: 'rehearsal-dinner',  name: 'Rehearsal Dinner Coordination', description: 'Full rehearsal dinner planning and on-site coordination.' },
  { id: 'timeline-creation', name: 'Wedding Day Timeline Creation', description: 'Detailed minute-by-minute timeline shared with all vendors.' },
  { id: 'emergency-kit',     name: 'Emergency Bridal Kit',          description: 'Fully stocked kit on-hand for any day-of surprises.' },
  { id: 'seating-chart',     name: 'Seating Chart Management',      description: 'Design and finalize your seating arrangement with ease.' },
];

/** Renders add-on items into #addons-list */
export function renderAddons() {
  const list = document.getElementById('addons-list');
  if (!list) return;
  list.innerHTML = ADDONS.map(a => `
    <li class="addon-item" role="listitem">
      <span class="addon-bullet" aria-hidden="true">•</span>
      <div>
        <p class="addon-name">${a.name}</p>
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
