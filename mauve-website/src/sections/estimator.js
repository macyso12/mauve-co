const QUESTIONS = [
  {
    text: 'Where are you in your planning journey?',
    options: [
      { label: 'Just getting started - I need help from the beginning', scores: { full: 3 } },
      { label: "I've planned some things but need help pulling it together", scores: { partial: 3 } },
      { label: 'Almost ready - just need support on the wedding day', scores: { dayof: 3 } },
      { label: 'I just need a few extra hands for a couple of hours', scores: { hourly: 3 } },
    ],
  },
  {
    text: 'How hands-on do you want your coordinator to be?',
    options: [
      { label: 'Fully involved from engagement to last dance', scores: { full: 3 } },
      { label: 'Stepping in for the final weeks to tie everything together', scores: { partial: 3 } },
      { label: 'Running the show on the wedding day itself', scores: { dayof: 3, partial: 1 } },
      { label: 'On call when I need them, not a full-time role', scores: { hourly: 3 } },
    ],
  },
  {
    text: "What's your approximate budget for coordination?",
    options: [
      { label: 'Under $200', scores: { hourly: 3 } },
      { label: '$200 – $1,500', scores: { dayof: 3, partial: 1 } },
      { label: '$1,500 – $3,500', scores: { partial: 3, dayof: 1 } },
      { label: '$3,500+', scores: { full: 3, partial: 1 } },
    ],
  },
];

const RESULTS = {
  hourly:  { value: 'hourly-helper',     label: 'Hourly Helper',      desc: 'Flexible, on-demand help at $55/hr. Perfect for a few extra hands without full planning commitment.' },
  dayof:   { value: 'day-of-coordinator',label: 'Day-Of Coordinator', desc: 'Someone to run the show from start to finish on your wedding day, so you can be fully present.' },
  partial: { value: 'partial-planning',  label: 'Partial Planning',   desc: 'We step in for the final stretch - confirming vendors, running rehearsal, and coordinating the day.' },
  full:    { value: 'full-coordination', label: 'Full Coordination',  desc: 'Your complete planning partner from day one - venue, vendors, timeline, and everything in between.' },
};

export function initEstimator() {
  const toggle = document.getElementById('estimator-toggle');
  const panel  = document.getElementById('estimator-panel');
  const pkg    = document.getElementById('f-package');
  if (!toggle || !panel || !pkg) return;

  let current = 0;
  const answers = [];

  function render() {
    if (current < QUESTIONS.length) {
      const q = QUESTIONS[current];
      panel.innerHTML = `
        <div class="est-progress">
          <span class="est-step">Question ${current + 1} of ${QUESTIONS.length}</span>
          <div class="est-bar"><div class="est-fill" style="width:${((current) / QUESTIONS.length) * 100}%"></div></div>
        </div>
        <p class="est-question">${q.text}</p>
        <div class="est-options">
          ${q.options.map((o, i) => `
            <button class="est-option" data-idx="${i}">${o.label}</button>
          `).join('')}
        </div>
        ${current > 0 ? '<button class="est-back">← Back</button>' : ''}
      `;

      panel.querySelectorAll('.est-option').forEach(btn => {
        btn.addEventListener('click', () => {
          answers[current] = parseInt(btn.dataset.idx);
          current++;
          render();
        });
      });

      panel.querySelector('.est-back')?.addEventListener('click', () => {
        current--;
        answers.pop();
        render();
      });
    } else {
      // Tally scores
      const totals = { hourly: 0, dayof: 0, partial: 0, full: 0 };
      QUESTIONS.forEach((q, qi) => {
        const scores = q.options[answers[qi]].scores;
        Object.entries(scores).forEach(([k, v]) => { totals[k] += v; });
      });
      const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
      const result = RESULTS[winner];

      panel.innerHTML = `
        <div class="est-result">
          <p class="est-result-label">We recommend</p>
          <h3 class="est-result-name">${result.label}</h3>
          <p class="est-result-desc">${result.desc}</p>
          <div class="est-result-actions">
            <button class="btn btn-primary est-select" data-value="${result.value}">Select this package</button>
            <button class="est-restart">Start over</button>
          </div>
        </div>
      `;

      panel.querySelector('.est-select').addEventListener('click', () => {
        pkg.value = result.value;
        pkg.dispatchEvent(new Event('change'));
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '✓ Package selected - or retake the quiz';
        pkg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      panel.querySelector('.est-restart').addEventListener('click', () => {
        current = 0;
        answers.length = 0;
        render();
      });
    }
  }

  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open && current === 0 && answers.length === 0) render();
  });
}
