import { navLinks } from '../data/site';
import { profile } from '../data/profile';
import { icon } from '../lib/icons';
import { esc } from '../lib/dom';

/** Derives the monogram shown as the brand mark, e.g. "Het Chikhaliya" -> "HC". */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

export function renderNav(): string {
  const links = navLinks
    .map((link) => `<li><a class="nav__link" href="${link.href}" data-nav-link>${esc(link.label)}</a></li>`)
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="nav" data-nav>
      <div class="nav__inner container">
        <a class="nav__brand" href="#home" aria-label="${esc(profile.name)} — back to top">
          <span class="nav__mark" aria-hidden="true">${esc(monogram(profile.name))}</span>
          <span class="nav__brand-text">${esc(profile.name)}</span>
        </a>

        <nav class="nav__menu" id="primary-nav" aria-label="Primary">
          <ul class="nav__list">${links}</ul>
        </nav>

        <div class="nav__actions">
          <button class="icon-btn" type="button" data-theme-toggle aria-pressed="false">
            <span class="icon-btn__icon icon-btn__icon--sun">${icon('sun')}</span>
            <span class="icon-btn__icon icon-btn__icon--moon">${icon('moon')}</span>
            <span class="visually-hidden">Toggle light and dark theme</span>
          </button>
          <button
            class="icon-btn nav__toggle"
            type="button"
            data-nav-toggle
            aria-expanded="false"
            aria-controls="primary-nav"
          >
            <span class="icon-btn__icon icon-btn__icon--open">${icon('menu')}</span>
            <span class="icon-btn__icon icon-btn__icon--close">${icon('close')}</span>
            <span class="visually-hidden">Toggle navigation menu</span>
          </button>
        </div>
      </div>
      <div class="nav__progress" data-scroll-progress aria-hidden="true"></div>
    </header>
    <div class="nav__scrim" data-nav-scrim hidden></div>
  `;
}
