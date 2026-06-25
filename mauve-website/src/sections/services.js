export const PACKAGES = [
  {
    id: 'hourly-helper',
    num: '1',
    name: 'Hourly Helper',
    price: '$55',
    unit: '/hr',
    note: '2-hour minimum',
    popular: false,
    bestFor: [
      'You just need a few extra hands for a couple of hours',
      'You want flexible help without a full planning commitment',
      'You have a tight budget but need day-of support',
    ],
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
    num: '2',
    name: 'Day-Of Coordinator',
    price: 'From $800',
    unit: '',
    note: 'Full event day',
    popular: false,
    bestFor: [
      "You've planned everything yourself and just need someone to run the day",
      'You want full coverage without paying for months of planning',
      'You want to be fully present on your wedding day',
    ],
    features: [
      'Full day-of coordination (ceremony + reception)',
      'Timeline management & creation',
      'Rehearsal coordination',
      'Vendor receiving & directing',
      'Up to 1 venue walkthrough',
      'Lead coordinator + assistant on wedding day',
      '1 initial booking call',
    ],
  },
  {
    id: 'partial-planning',
    num: '3',
    name: 'Partial Planning',
    price: 'From $1,500',
    unit: '',
    note: 'Most Popular',
    popular: true,
    bestFor: [
      "You've started planning but need help pulling it all together",
      'You want a coordinator for the final stretch and wedding day',
      'You need vendor guidance without full planning fees',
    ],
    features: [
      'Initial consultation (1–2 sessions)',
      'Vendor recommendations',
      'Timeline creation & management',
      'Rehearsal coordination',
      'Full day-of coordination',
      'Unlimited email contact (final 4–6 weeks)',
      'Up to 2 venue walkthroughs',
      'Lead coordinator + assistant on wedding day',
    ],
  },
  {
    id: 'full-coordination',
    num: '4',
    name: 'Full Coordination',
    price: 'From $3,500',
    unit: '',
    note: 'All-inclusive',
    popular: false,
    bestFor: [
      "You're just getting started and want a partner from day one",
      'You want someone to handle vendors, budget, and logistics',
      'You want the most stress-free planning experience possible',
    ],
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

const CHECK_BEST = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.18"/><path d="M4.5 8.5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHECK_INC  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function renderServices() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  grid.innerHTML = PACKAGES.map(pkg => `
    <article class="package-card ${pkg.popular ? 'package-card--popular' : ''}" role="listitem">
      ${pkg.popular ? '<span class="package-badge">Most Popular</span>' : ''}
      <div class="package-top">
        <h3 class="package-name">${pkg.name}</h3>
        <div class="package-price-row">
          <span class="package-price">${pkg.price}</span>${pkg.unit ? `<span class="package-unit">${pkg.unit}</span>` : ''}
        </div>
        <span class="package-note">${pkg.note}</span>
      </div>
      <div class="package-best">
        <p class="package-section-label">Best choice if:</p>
        <ul class="package-best-list">
          ${pkg.bestFor.map(b => `<li class="package-best-item">${CHECK_BEST}<span>${b}</span></li>`).join('')}
        </ul>
      </div>
      <hr class="package-divider">
      <div class="package-includes">
        <p class="package-section-label">Includes:</p>
        <ul class="package-features">
          ${pkg.features.map(f => `<li class="package-feature">${CHECK_INC}<span>${f}</span></li>`).join('')}
        </ul>
      </div>
      <a href="#book" class="btn ${pkg.popular ? 'btn-primary-inv' : 'btn-primary'} package-cta">Get Started</a>
    </article>
  `).join('');
}
