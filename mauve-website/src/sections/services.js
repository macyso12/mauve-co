export const PACKAGES = [
  {
    id: 'hourly-helper',
    name: 'Hourly Helper',
    price: '$45/hr',
    description: 'An extra set of hands exactly when you need it - vendor calls, logistics, day-of support.',
  },
  {
    id: 'partial-planning',
    name: 'Partial Planning',
    price: 'From $1,500',
    description: 'We step in during the final weeks to tie up loose ends, confirm vendors, and run rehearsal.',
  },
  {
    id: 'full-coordination',
    name: 'Full Coordination',
    price: 'From $3,500',
    description: 'Your full planning partner from day one - venue, vendors, timeline, and everything in between.',
  },
];

/** Renders package cards into #packages-grid */
export function renderServices() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  grid.innerHTML = PACKAGES.map(pkg => `
    <article class="package-card" role="listitem">
      <span class="package-icon" aria-hidden="true">🤍</span>
      <h3 class="package-name">${pkg.name}</h3>
      <p class="package-price">${pkg.price}</p>
      <p class="package-desc">${pkg.description}</p>
    </article>
  `).join('');
}
