import { skillGroups } from '../data/skills';
import { icon } from '../lib/icons';
import { esc, words } from '../lib/dom';

export function renderSkills(): string {
  const cards = skillGroups
    .map(
      (group, index) => `
        <article class="skill-card" data-reveal="blur" data-reveal-index="${index}" data-spotlight>
          <span class="skill-card__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <div class="skill-card__head">
            <span class="skill-card__icon">${icon(group.icon)}</span>
            <h3 class="skill-card__title">${esc(group.name)}</h3>
          </div>
          <ul class="skill-card__list">
            ${group.skills.map((skill, i) => `<li class="chip" style="--i:${i}">${esc(skill)}</li>`).join('')}
          </ul>
        </article>`,
    )
    .join('');

  return `
    <section class="section section--alt" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="eyebrow">Skills</p>
          <h2 class="section__title" id="skills-title">${words('Technologies I work with')}</h2>
          <p class="section__lead">
            The tools I reach for across mobile, web and coursework projects.
          </p>
        </header>

        <div class="skill-grid">${cards}</div>
      </div>
    </section>
  `;
}
