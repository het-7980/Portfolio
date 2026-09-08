import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { icon } from '../lib/icons';
import { esc, join } from '../lib/dom';

/** Two or three short proof points beside the intro, derived from real data. */
function stats(): string {
  const techCount = new Set(skillGroups.flatMap((group) => group.skills)).size;
  const items = [
    { value: String(projects.length), label: projects.length === 1 ? 'Featured project' : 'Projects' },
    { value: String(techCount), label: 'Technologies' },
    { value: 'Diploma', label: 'Computer Engineering' },
  ];

  return items
    .map(
      (item) => `
        <div class="hero__stat">
          <span class="hero__stat-value">${esc(item.value)}</span>
          <span class="hero__stat-label">${esc(item.label)}</span>
        </div>`,
    )
    .join('');
}

function portrait(): string {
  if (profile.photo) {
    return `
      <div class="hero__portrait">
        <img src="${esc(profile.photo)}" alt="${esc(profile.photoAlt ?? profile.name)}" width="420" height="520" />
      </div>`;
  }

  // No photo supplied — a terminal-style card keeps the layout balanced
  // without resorting to a stock image or an empty avatar placeholder.
  const stack = skillGroups
    .slice(0, 4)
    .map(
      (group, i) =>
        `<li style="--i:${i}"><span class="hero__code-key">${esc(group.name.toLowerCase().replace(/ & /g, '_').replace(/\s+/g, '_'))}</span><span class="hero__code-val">${esc(
          group.skills.join(', '),
        )}</span></li>`,
    )
    .join('');

  return `
    <div class="hero__panel" aria-hidden="true">
      <div class="hero__panel-bar">
        <span></span><span></span><span></span>
        <span class="hero__panel-name">developer.dart</span>
      </div>
      <ul class="hero__code">${stack}</ul>
      <div class="hero__panel-glow"></div>
    </div>`;
}

export function renderHero(): string {
  return `
    <section class="section hero" id="home">
      <div class="container hero__inner">
        <div class="hero__content">
          <h1 class="hero__name" data-reveal>${esc(profile.name)}</h1>

          <p class="hero__title" data-reveal data-reveal-index="1">
            <span class="hero__title-text">${esc(profile.title)}</span>
          </p>

          <p class="hero__intro" data-reveal data-reveal-index="2">${esc(profile.intro)}</p>

          ${join([
            profile.location &&
              `<p class="hero__location" data-reveal data-reveal-index="3">${icon('location')}<span>${esc(
                profile.location,
              )}</span></p>`,
          ])}

          <div class="hero__actions" data-reveal data-reveal-index="4">
            <a class="btn btn--primary" href="#projects">
              View Projects ${icon('arrow', 'btn__icon')}
            </a>
            <a class="btn btn--ghost" href="#contact">Contact Me</a>
          </div>

          <div class="hero__stats" data-reveal data-reveal-index="5">${stats()}</div>
        </div>

        <div class="hero__visual" data-reveal data-reveal-index="3">${portrait()}</div>
      </div>
    </section>
  `;
}
