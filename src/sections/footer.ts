import { profile } from '../data/profile';
import { site } from '../data/site';
import { icon } from '../lib/icons';
import { logoMark } from '../lib/logo';
import { esc } from '../lib/dom';

export function renderFooter(): string {
  return `
    <footer class="footer">
      <div class="container footer__inner">
        <a class="footer__brand" href="#home" aria-label="${esc(profile.name)} — back to top">
          <span class="footer__mark" aria-hidden="true">${logoMark}</span>
          <span>
            <span class="footer__name">${esc(profile.name)}</span>
            <span class="footer__tagline">${esc(site.tagline)}</span>
          </span>
        </a>

        <a class="btn btn--ghost btn--sm footer__top" href="#home">
          Back to top ${icon('arrow', 'footer__top-icon')}
        </a>
      </div>

      <div class="container footer__bottom">
        <p>&copy; ${new Date().getFullYear()} ${esc(profile.name)}. All rights reserved.</p>
        <a class="footer__source" href="${esc(site.repo)}" target="_blank" rel="noopener noreferrer">
          ${icon('github')} <span>View source</span>
          <span class="visually-hidden">— opens in a new tab</span>
        </a>
      </div>
    </footer>
  `;
}
