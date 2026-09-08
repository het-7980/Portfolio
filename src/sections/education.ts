import { education } from '../data/education';
import { icon } from '../lib/icons';
import { esc, join } from '../lib/dom';

export function renderEducation(): string {
  const items = education
    .map(
      (entry, index) => `
        <li class="timeline__item" data-reveal data-reveal-index="${index}">
          <span class="timeline__dot" aria-hidden="true">${icon('cap')}</span>
          <div class="timeline__card">
            <p class="timeline__period">
              <span>${esc(entry.startYear)}</span>
              <span class="timeline__dash" aria-hidden="true"></span>
              <span>${esc(entry.endYear)}</span>
            </p>
            <h3 class="timeline__title">${esc(entry.qualification)}</h3>
            <p class="timeline__institution">${esc(entry.institution)}</p>
            ${join([
              entry.details.length > 0 &&
                `<ul class="timeline__details">
                  ${entry.details.map((detail) => `<li>${esc(detail)}</li>`).join('')}
                </ul>`,
            ])}
          </div>
        </li>`,
    )
    .join('');

  return `
    <section class="section section--alt" id="education" aria-labelledby="education-title">
      <div class="container container--narrow">
        <header class="section__head" data-reveal>
          <p class="eyebrow">Education</p>
          <h2 class="section__title" id="education-title">Academic background</h2>
        </header>

        <ol class="timeline">${items}</ol>
      </div>
    </section>
  `;
}
