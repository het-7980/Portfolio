import { sections } from '../data/sections';
import { profile } from '../data/profile';
import { icon } from '../lib/icons';
import { logoMark } from '../lib/logo';
import { esc } from '../lib/dom';

/**
 * The fixed page header: brand, section links, theme toggle and — below the
 * mobile breakpoint — the slide-in menu.
 *
 * The `.nav*` classes and `data-nav*` hooks are what `styles/components.css`
 * and `lib/navigation.ts` bind to, so they stay as they are.
 */
export function renderMasthead(): string {
  const links = sections
    .map((link) => `<li><a class="nav__link" href="${link.href}" data-nav-link>${esc(link.label)}</a></li>`)
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="nav" data-nav>
      <div class="nav__inner container">
        <a class="nav__brand" href="#home" aria-label="${esc(profile.name)} — back to top">
          <span class="nav__mark">${logoMark}</span>
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
