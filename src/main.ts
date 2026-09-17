import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import { renderNav } from './components/nav';
import { renderHero } from './sections/hero';
import { renderAbout } from './sections/about';
import { renderSkills } from './sections/skills';
import { renderProjects } from './sections/projects';
import { renderEducation } from './sections/education';
import { renderContact } from './sections/contact';
import { renderFooter } from './sections/footer';

import { initTheme } from './lib/theme';
import { initNavigation } from './lib/navigation';
import { initScrollReveal } from './lib/reveal';
import { esc, mount } from './lib/dom';
import { profile } from './data/profile';

function render(): void {
  mount('#nav-root', renderNav());
  mount(
    '#main',
    [renderHero(), renderAbout(), renderSkills(), renderProjects(), renderEducation(), renderContact()].join(
      '',
    ),
  );
  mount('#footer-root', renderFooter());
}

/**
 * Sections are injected after the document parses, so the browser has already
 * given up on resolving any `#section` in the URL by the time they exist.
 */
function restoreHashTarget(): void {
  const id = location.hash.slice(1);
  if (!id) return;

  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

/** Collapsed <details> stay hidden on paper unless opened, so expand them for the print run only. */
function initPrintExpansion(): void {
  let opened: HTMLDetailsElement[] = [];

  window.addEventListener('beforeprint', () => {
    opened = Array.from(document.querySelectorAll<HTMLDetailsElement>('details:not([open])'));
    opened.forEach((el) => (el.open = true));
  });

  window.addEventListener('afterprint', () => {
    opened.forEach((el) => (el.open = false));
    opened = [];
  });
}

/** Content is static, so a failure here is a bug — surface contact details rather than a blank page. */
function renderFallback(error: unknown): void {
  console.error('Portfolio failed to render', error);
  const main = document.getElementById('main');
  if (!main) return;
  main.innerHTML = `
    <div class="container" style="padding-block: 6rem; max-width: 640px">
      <h1>${esc(profile.name)}</h1>
      <p style="margin-top: 0.5rem; color: var(--text-muted)">${esc(profile.title)}</p>
      <p style="margin-top: 1.5rem">
        Something went wrong loading this page. You can still reach me at
        <a href="mailto:${esc(profile.email)}" style="color: var(--accent)">${esc(profile.email)}</a>.
      </p>
    </div>`;
}

try {
  initTheme();
  render();
  initNavigation();
  initScrollReveal();
  initPrintExpansion();
  restoreHashTarget();
} catch (error) {
  renderFallback(error);
}
