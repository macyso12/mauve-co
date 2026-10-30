export const ALL_FEATURES = [
  { id: 'setup',            label: 'Setup & breakdown' },
  { id: 'vendor-receiving', label: 'Vendor directing' },
  { id: 'guest-assist',     label: 'Guest assistance & coordination' },
  { id: 'consultation',     label: 'Initial consultation (1–2 sessions)' },
  { id: 'assistant',        label: 'Assistant coordinator' },
  { id: 'vendor-comm',      label: 'Vendor communication' },
  { id: 'timeline-mgmt',    label: 'Timeline creation & management' },
  { id: 'venue-walkthrough',label: 'Venue walkthrough' },
  { id: 'full-day',         label: 'Full day-of coordination' },
  { id: 'locations',        label: 'Supports up to 2 locations' },
  { id: 'vendor-recs',      label: 'Vendor recommendations' },
  { id: 'rehearsal',        label: 'Rehearsal coordination' },
  { id: 'unlimited-email',  label: 'Unlimited email support' },
  { id: 'venue-scouting',   label: 'Venue scouting assistance' },
  { id: 'vendor-sourcing',  label: 'Vendor sourcing & contract review' },
  { id: 'budget',           label: 'Budget tracking & RSVP management' },
  { id: 'engagement',       label: 'Engagement & shower coordination' },
];

export const PACKAGES = [
  {
    id: 'hourly-helper',
    name: 'Hourly Helper',
    price: '$80',
    unit: '/hr',
    note: 'Up to 4-hours onsite support',
    popular: false,
    inheritsFrom: null,
    bestFor: [
      'You need day-of support on a budget',
      'You just need extra hands for a few hours',
      "You're a creative DIYer. Let us help to do it together 🤍",
    ],
    ownFeatures: ['setup', 'vendor-receiving', 'guest-assist', 'consultation'],
  },
  {
    id: 'day-of-coordinator',
    name: 'Day-Of Coordinator',
    price: 'From $800',
    unit: '',
    note: 'Most Popular',
    popular: true,
    inheritsFrom: 'Hourly Helper',
    bestFor: [
      "You've planned everything yourself but want to be fully present on your wedding",
      'You want full coverage without paying for months of planning',
      'You need to satisfy venue requirements of an onsite Day-Of Coordinator (DOC)',
    ],
    ownFeatures: ['assistant', 'vendor-comm', 'timeline-mgmt', 'venue-walkthrough', 'full-day', 'locations'],
  },
  {
    id: 'partial-planning',
    name: 'Partial Planning',
    price: 'From $1,500',
    unit: '',
    note: 'Partial planning',
    popular: false,
    inheritsFrom: 'Day-Of Coordinator',
    bestFor: [
      "You've started planning but need help pulling it all together",
      'You want a coordinator for the final stretch and wedding day',
      'You need vendor guidance without full planning fees',
    ],
    ownFeatures: ['vendor-recs', 'rehearsal', 'unlimited-email'],
  },
  {
    id: 'full-coordination',
    name: 'Full Coordination',
    price: 'From $3,500',
    unit: '',
    note: 'All-inclusive',
    popular: false,
    inheritsFrom: 'Partial Planning',
    bestFor: [
      "You're just getting started and want a partner from day one",
      'You want someone to handle vendors, budget, and logistics',
      'You want the most stress-free planning experience possible',
    ],
    ownFeatures: ['venue-scouting', 'vendor-sourcing', 'budget', 'engagement'],
  },
];

// Build the cumulative included set for each package
function buildIncluded(packages) {
  const allIncluded = [new Set(packages[0].ownFeatures)];
  for (let i = 1; i < packages.length; i++) {
    allIncluded.push(new Set([...allIncluded[i - 1], ...packages[i].ownFeatures]));
  }
  return allIncluded;
}

const includedSets = buildIncluded(PACKAGES);

const CHECK_BEST = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.18"/><path d="M4.5 8.5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHECK_INC  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const X_ICON     = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

export function renderServices() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;

  grid.innerHTML = PACKAGES.map((pkg, i) => {
    const included = includedSets[i];
    const nextPkg = PACKAGES[i + 1];
    const notIncluded = nextPkg
      ? nextPkg.ownFeatures.map(id => ALL_FEATURES.find(f => f.id === id)).filter(Boolean)
      : [];
    const ownFeatureLabels = pkg.ownFeatures.map(id => ALL_FEATURES.find(f => f.id === id)?.label).filter(Boolean);

    const includesRows = [
      pkg.inheritsFrom
        ? `<li class="package-feature package-feature--inherit">${CHECK_INC}<span>Everything in ${pkg.inheritsFrom}</span></li>`
        : '',
      ...ownFeatureLabels.map(label => `<li class="package-feature">${CHECK_INC}<span>${label}</span></li>`),
      ...notIncluded.map(f => `<li class="package-feature package-feature--no">${X_ICON}<span>${f.label}</span></li>`),
    ].join('');

    return `
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
        <p class="package-section-label">What's included:</p>
        <ul class="package-features">
          ${includesRows}
        </ul>
      </div>
      <a href="#book" class="btn ${pkg.popular ? 'btn-primary-inv' : 'btn-primary'} package-cta">Get Started</a>
    </article>`;
  }).join('');
}
