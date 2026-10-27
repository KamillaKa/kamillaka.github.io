import '@fontsource-variable/fraunces/wght.css';
import '@fontsource-variable/fraunces/wght-italic.css';
import './style.css';

import { initContactForm } from './contact-form';
import { initLanguage, onLanguageChange } from './i18n';
import { renderProjects } from './projects';

// Lets CSS know JavaScript is running (e.g. to collapse the mobile menu).
document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Mobile navigation ---------- */

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const menu = document.querySelector<HTMLElement>('#nav-menu');
  if (!toggle || !menu) return;

  const desktopQuery = window.matchMedia('(min-width: 50rem)');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  function setOpen(open: boolean): void {
    toggle!.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Close after choosing a link, so the visitor sees the section.
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close when clicking or tapping outside the header.
  document.addEventListener('click', (event) => {
    if (isOpen() && !(event.target as Element).closest('.site-header')) setOpen(false);
  });

  desktopQuery.addEventListener('change', () => setOpen(false));
}

/* ---------- Header: border on scroll + current section ---------- */

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;

  const updateScrolled = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });

  // Highlight the nav link of the section currently in view.
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-list a'));
  const sections = navLinks
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((section): section is HTMLElement => section !== null);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
      });
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---------- Hero card: Design / Code switch ---------- */

function initHeroCard(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-view]');
  const panels = document.querySelectorAll<HTMLElement>('[data-view-panel]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.viewPanel === view));
    });
  });
}

/* ---------- Gentle fade-in when sections scroll into view ---------- */

function initRevealOnScroll(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

  // Added here (not in HTML) so content never stays hidden if this script fails.
  document.documentElement.classList.add('reveal-enabled');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  elements.forEach((element) => observer.observe(element));
}

/* ---------- Start ---------- */

initLanguage();

const projectGrid = document.querySelector<HTMLElement>('#project-grid');
if (projectGrid) {
  renderProjects(projectGrid);
  onLanguageChange(() => renderProjects(projectGrid));
}

initMobileNav();
initHeader();
initHeroCard();
initRevealOnScroll();
initContactForm();

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
