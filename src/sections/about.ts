import { about } from '../data/about';
import { profile } from '../data/profile';
import { icon } from '../lib/icons';
import { esc } from '../lib/dom';

export function renderAbout(): string {
  const paragraphs = about.paragraphs
    .map((text, index) => `<p data-reveal data-reveal-index="${index + 1}">${esc(text)}</p>`)
    .join('');

  const highlights = about.highlights
    .map(
      (item, index) => `
        <li class="about__highlight" data-reveal data-reveal-index="${index}">
          <span class="about__highlight-label">${esc(item.label)}</span>
          <span class="about__highlight-value">${esc(item.value)}</span>
        </li>`,
    )
    .join('');

  return `
    <section class="section" id="about" aria-labelledby="about-title">
      <div class="container about">
        <header class="section__head about__head" data-reveal>
          <p class="eyebrow">About</p>
          <h2 class="section__title" id="about-title">A bit about me</h2>
        </header>

        <div class="about__body">
          <div class="about__prose">${paragraphs}</div>

          <aside class="about__aside" aria-label="At a glance">
            <ul class="about__highlights">${highlights}</ul>
            <a class="about__cta" href="mailto:${esc(profile.email)}">
              ${icon('mail')}
              <span>Get in touch</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  `;
}
