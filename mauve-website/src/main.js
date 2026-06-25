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

// About section animations
function initAboutAnimations() {
  const aboutText = document.querySelector('.about-text');
  const aboutCard = document.querySelector('.about-card');
  const bioParagraphs = document.querySelectorAll('.about-bio');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (!aboutText) return;

  // Set initial states
  aboutText.style.cssText = 'opacity:0; transform:translateX(-40px); transition:opacity 0.8s ease, transform 0.8s ease;';
  aboutCard.style.cssText = 'opacity:0; transform:translateX(40px); transition:opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;';
  bioParagraphs.forEach((p, i) => {
    p.style.cssText = `opacity:0; transform:translateY(16px); transition:opacity 0.6s ease ${0.1 + i * 0.15}s, transform 0.6s ease ${0.1 + i * 0.15}s;`;
  });

  // Counter animation for stat numbers
  function animateCounter(el) {
    const text = el.textContent;
    const num = parseInt(text);
    if (isNaN(num)) return;
    const suffix = text.replace(String(num), '');
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * num) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      aboutText.style.opacity = '1';
      aboutText.style.transform = 'translateX(0)';
      aboutCard.style.opacity = '1';
      aboutCard.style.transform = 'translateX(0)';
      bioParagraphs.forEach(p => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
      });
      setTimeout(() => statNumbers.forEach(animateCounter), 400);
      observer.disconnect();
    });
  }, { threshold: 0.15 });

  observer.observe(document.getElementById('about'));
}
initAboutAnimations();

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
