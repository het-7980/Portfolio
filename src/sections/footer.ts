import { profile } from '../data/profile';
import { site } from '../data/site';
import { icon } from '../lib/icons';
import { esc } from '../lib/dom';

export function renderFooter(): string {
  const socials = profile.socials
    .map(
      (social) => `
        <li>
          <a class="footer__social" href="${esc(social.href)}" target="_blank" rel="noopener noreferrer"
             aria-label="${esc(social.label)} — opens in a new tab">
            ${icon(social.icon)}
          </a>
        </li>`,
    )
    .join('');

  return `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <p class="footer__name">${esc(profile.name)}</p>
          <p class="footer__tagline">${esc(site.tagline)}</p>
        </div>

        <ul class="footer__socials">
          ${socials}
          <li>
            <a class="footer__social" href="mailto:${esc(profile.email)}" aria-label="Email ${esc(profile.name)}">
              ${icon('mail')}
            </a>
          </li>
        </ul>
      </div>

      <div class="container footer__bottom">
        <p>&copy; ${new Date().getFullYear()} ${esc(profile.name)}. All rights reserved.</p>
        <a class="footer__top" href="#home">Back to top ${icon('arrow', 'footer__top-icon')}</a>
      </div>
    </footer>
  `;
}
