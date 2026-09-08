import { skillGroups } from '../data/skills';
import { icon } from '../lib/icons';
import { esc } from '../lib/dom';

export function renderSkills(): string {
  const cards = skillGroups
    .map(
      (group, index) => `
        <article class="skill-card" data-reveal data-reveal-index="${index}">
          <div class="skill-card__head">
            <span class="skill-card__icon">${icon(group.icon)}</span>
            <h3 class="skill-card__title">${esc(group.name)}</h3>
          </div>
          <ul class="skill-card__list">
            ${group.skills.map((skill) => `<li class="chip">${esc(skill)}</li>`).join('')}
          </ul>
        </article>`,
    )
    .join('');

  return `
    <section class="section section--alt" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="eyebrow">Skills</p>
          <h2 class="section__title" id="skills-title">Technologies I work with</h2>
          <p class="section__lead">
            The tools I reach for across mobile, web and coursework projects.
          </p>
        </header>

        <div class="skill-grid">${cards}</div>
      </div>
    </section>
  `;
}
