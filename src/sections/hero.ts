import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { site } from '../data/site';
import { icon } from '../lib/icons';
import { chars, esc, join } from '../lib/dom';

/** Two or three short proof points beside the intro, derived from real data. */
function stats(): string {
  const techCount = new Set(skillGroups.flatMap((group) => group.skills)).size;
  const items = [
    { value: String(projects.length), label: projects.length === 1 ? 'Featured project' : 'Projects' },
    { value: String(techCount), label: 'Technologies' },
    { value: 'Diploma', label: 'Computer Engineering' },
  ];

  return items
    .map((item, index) => {
      // Numeric values count up on first view; word values just appear.
      const numeric = /^\d+$/.test(item.value);
      const value = numeric
        ? `<span class="hero__stat-value" data-count="${item.value}">${esc(item.value)}</span>`
        : `<span class="hero__stat-value">${esc(item.value)}</span>`;

      return `
        <div class="hero__stat" style="--i:${index}">
          ${value}
          <span class="hero__stat-label">${esc(item.label)}</span>
        </div>`;
    })
    .join('');
}

function portrait(): string {
  if (profile.photo) {
    return `
      <div class="hero__portrait" data-tilt="5">
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
    <div class="hero__panel" aria-hidden="true" data-tilt="7">
      <div class="hero__panel-bar">
        <span></span><span></span><span></span>
        <span class="hero__panel-name">developer.dart</span>
      </div>
      <ul class="hero__code">${stack}</ul>
      <p class="hero__prompt"><span>&gt;</span><span class="hero__caret"></span></p>
      <div class="hero__panel-glow"></div>
      <div class="hero__panel-sheen"></div>
    </div>`;
}

/** Slow-drifting colour fields behind the hero, tinted from the theme accents. */
function aurora(): string {
  return `
    <div class="hero__aurora" aria-hidden="true" data-parallax="0.12">
      <span class="hero__blob hero__blob--1"></span>
      <span class="hero__blob hero__blob--2"></span>
      <span class="hero__blob hero__blob--3"></span>
    </div>`;
}

export function renderHero(): string {
  return `
    <section class="section hero" id="home">
      ${aurora()}

      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__badge">
            <span class="hero__badge-dot" aria-hidden="true"></span>
            ${esc(site.tagline)}
          </p>

          <h1 class="hero__name">
            <span class="visually-hidden">${esc(profile.name)}</span>
            <span aria-hidden="true">${chars(profile.name)}</span>
          </h1>

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
            <a class="btn btn--primary" href="#projects" data-magnetic>
              View Projects ${icon('arrow', 'btn__icon')}
            </a>
            <a class="btn btn--ghost" href="#contact" data-magnetic>Contact Me</a>
          </div>

          <div class="hero__stats" data-reveal data-reveal-index="5">${stats()}</div>
        </div>

        <div class="hero__visual" data-reveal="scale" data-reveal-index="3">${portrait()}</div>
      </div>

      <a class="hero__cue" href="#about">
        <span class="hero__cue-label">Scroll</span>
        <span class="hero__cue-rail" aria-hidden="true"><span class="hero__cue-dot"></span></span>
        <span class="visually-hidden">Scroll to the about section</span>
      </a>
    </section>
  `;
}
