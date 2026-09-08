import { profile } from '../data/profile';
import { icon } from '../lib/icons';
import { esc, join } from '../lib/dom';

function contactMethods(): string {
  const methods = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, iconName: 'mail' },
    ...profile.socials.map((social) => ({
      label: social.label,
      value: social.href.replace(/^https?:\/\/(www\.)?/, ''),
      href: social.href,
      iconName: social.icon,
    })),
  ];

  return methods
    .map((method, index) => {
      const external = !method.href.startsWith('mailto:');
      return `
        <li data-reveal data-reveal-index="${index}">
          <a
            class="contact-card"
            href="${esc(method.href)}"
            ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}
          >
            <span class="contact-card__icon">${icon(method.iconName)}</span>
            <span class="contact-card__text">
              <span class="contact-card__label">${esc(method.label)}</span>
              <span class="contact-card__value">${esc(method.value)}</span>
            </span>
            ${icon('arrow', 'contact-card__arrow')}
          </a>
        </li>`;
    })
    .join('');
}

export function renderContact(): string {
  return `
    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="eyebrow">Contact</p>
          <h2 class="section__title" id="contact-title">Let’s work together</h2>
          <p class="section__lead">
            Have a project in mind, a question, or just want to talk about Flutter?
            Email is the fastest way to reach me.
          </p>
        </header>

        <div class="contact">
          <ul class="contact__list">${contactMethods()}</ul>

          ${join([
            profile.location &&
              `<p class="contact__location" data-reveal>${icon('location')}<span>Based in ${esc(
                profile.location,
              )}</span></p>`,
          ])}
        </div>
      </div>
    </section>
  `;
}
