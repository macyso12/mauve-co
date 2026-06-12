const FEATURES = [
  { label: 'Setup & breakdown help', hourly: true,  dayof: true,  partial: true,  full: true  },
  { label: 'Vendor receiving & directing', hourly: true,  dayof: true,  partial: true,  full: true  },
  { label: 'Guest assistance & light coordination', hourly: true,  dayof: true,  partial: true,  full: true  },
  { label: 'Errands & last-minute runs', hourly: true,  dayof: true,  partial: true,  full: true  },
  { label: 'Full day-of coordination (ceremony + reception)', hourly: false, dayof: true,  partial: true,  full: true  },
  { label: 'Timeline management & creation', hourly: false, dayof: true,  partial: true,  full: true  },
  { label: 'Rehearsal coordination', hourly: false, dayof: true,  partial: true,  full: true  },
  { label: 'Initial consultation (1–2 sessions)', hourly: true,  dayof: true,  partial: true,  full: true  },
  { label: 'Vendor recommendations', hourly: false, dayof: false, partial: true,  full: true  },
  { label: 'Unlimited email contact (final 4–6 weeks)', hourly: false, dayof: false, partial: true,  full: true  },
  { label: 'Up to 2 venue walkthroughs', hourly: false, dayof: false, partial: true,  full: true  },
  { label: 'Venue scouting & booking assistance', hourly: false, dayof: false, partial: false, full: true  },
  { label: 'Full vendor sourcing & contract review', hourly: false, dayof: false, partial: false, full: true  },
  { label: 'Budget tracking & RSVP management', hourly: false, dayof: false, partial: false, full: true  },
  { label: 'Engagement party / shower coordination', hourly: false, dayof: false, partial: false, full: true  },
  { label: 'Unlimited contact throughout planning', hourly: false, dayof: false, partial: false, full: true  },
  { label: 'Lead coordinator + assistant on wedding day', hourly: false, dayof: false, partial: false, full: true  },
];

const PACKAGES = [
  { key: 'hourly', name: 'Hourly Helper',       price: '$45/hr',       note: '3-hr minimum' },
  { key: 'dayof',  name: 'Day-Of Coordinator',  price: 'From $800',    note: null },
  { key: 'partial',name: 'Partial Planning',    price: 'From $1,500',  note: null },
  { key: 'full',   name: 'Full Coordination',   price: 'From $3,500',  note: null },
];

const CHECK = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#7B1A1A" fill-opacity="0.12"/><path d="M5.5 10.5l3 3 6-6" stroke="#7B1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const DASH  = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 10h8" stroke="#C4BFBA" stroke-width="2" stroke-linecap="round"/></svg>`;

export function renderCompare() {
  const wrap = document.getElementById('compare-table-wrap');
  if (!wrap) return;

  const headerCells = PACKAGES.map(p => `
    <th scope="col" class="compare-pkg-header">
      <span class="compare-pkg-name">${p.name}</span>
      <span class="compare-pkg-price">${p.price}</span>
      ${p.note ? `<span class="compare-pkg-note">${p.note}</span>` : ''}
    </th>
  `).join('');

  const bodyRows = FEATURES.map(f => {
    const cells = PACKAGES.map(p =>
      `<td class="compare-cell" aria-label="${f.label}: ${f[p.key] ? 'included' : 'not included'}">${f[p.key] ? CHECK : DASH}</td>`
    ).join('');
    return `<tr><th scope="row" class="compare-feature">${f.label}</th>${cells}</tr>`;
  }).join('');

  wrap.innerHTML = `
    <div class="compare-scroll">
      <table class="compare-table" role="table" aria-label="Package comparison">
        <thead>
          <tr>
            <th scope="col" class="compare-feature-header">Feature</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}
