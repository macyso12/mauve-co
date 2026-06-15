import './style.css';
import { renderServices } from './sections/services.js';
import { renderAddons, renderAddonCheckboxes } from './sections/addons.js';
import { initBookingForm } from './sections/booking.js';
import { renderCompare } from './sections/compare.js';
import { initEstimator } from './sections/estimator.js';

// Render dynamic sections
renderServices();
renderCompare();
renderAddons();
renderAddonCheckboxes();
initEstimator();
initBookingForm();

// Sticky header shadow on scroll
const header = document.getElementById('site-header');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
toggle?.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
// Close nav on link click (mobile)
navList?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});
