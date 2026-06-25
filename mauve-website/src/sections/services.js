export const PACKAGES = [
  {
    id: 'hourly-helper',
    name: 'Hourly Helper',
    price: '$55',
    unit: '/hr',
    description: 'An extra set of hands exactly when you need it.',
    note: '2-hour minimum',
    popular: false,
    features: [
      'Setup & breakdown help',
      'Vendor receiving & directing',
      'Guest assistance & light coordination',
      'Errands & last-minute runs',
      '1 initial booking call',
    ],
  },
  {
    id: 'day-of-coordinator',
    name: 'Day-Of Coordinator',
    price: 'From $800',
    unit: '',
    description: 'Full coverage on your wedding day so you can be fully present.',
    note: 'Full event day',
    popular: false,
    features: [
      'Full day-of coordination',
      'Timeline management & creation',
      'Rehearsal coordination',
      'Vendor receiving & directing',
      'Up to 1 venue walkthrough',
      '1 initial booking call',
    ],
  },
  {
    id: 'partial-planning',
    name: 'Partial Planning',
    price: 'From $1,500',
    unit: '',
    description: 'We step in for the final stretch and run the whole show.',
    note: 'Most Popular',
    popular: true,
    features: [
      'Initial consultation (1–2 sessions)',
      'Vendor recommendations',
      'Timeline creation & management',
      'Rehearsal coordination',
      'Full day-of coordination',
      'Unlimited email contact (final 4–6 weeks)',
      'Up to 2 venue walkthroughs',
    ],
  },
  {
    id: 'full-coordination',
    name: 'Full Coordination',
    price: 'From $3,500',
    unit: '',
    description: 'Your complete planning partner from engagement to last dance.',
    note: 'All-inclusive',
    popular: false,
    features: [
      'Everything in Partial Planning',
      'Venue scouting & booking assistance',
      'Full vendor sourcing & contract review',
      'Budget tracking & RSVP management',
      'Engagement party / shower coordination',
      'Unlimited contact throughout planning',
      'Lead coordinator + assistant on wedding day',
    ],
  },
];

const CHECK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.15"/><path d="M4.5 8.5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function renderServices() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  grid.innerHTML = PACKAGES.map(pkg => `
    <article class="package-card ${pkg.popular ? 'package-card--popular' : ''}" role="listitem">
      ${pkg.popular ? '<span class="package-badge">Most Popular</span>' : ''}
      <div class="package-card-top">
        <h3 class="package-name">${pkg.name}</h3>
        <p class="package-desc">${pkg.description}</p>
        <div class="package-price-row">
          <span class="package-price">${pkg.price}</span>${pkg.unit ? `<span class="package-unit">${pkg.unit}</span>` : ''}
        </div>
        ${pkg.note && !pkg.popular ? `<span class="package-note">${pkg.note}</span>` : ''}
      </div>
      <ul class="package-features">
        ${pkg.features.map(f => `<li class="package-feature">${CHECK}<span>${f}</span></li>`).join('')}
      </ul>
      <a href="#book" class="btn ${pkg.popular ? 'btn-primary-inv' : 'btn-primary'} package-cta">Get Started</a>
    </article>
  `).join('');
}
