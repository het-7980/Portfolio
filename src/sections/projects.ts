import { projects } from '../data/projects';
import { icon } from '../lib/icons';
import { esc, join, words } from '../lib/dom';
import type { Project } from '../data/types';

function initials(name: string): string {
  const parts = name.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

/** Screenshot when one exists, otherwise a generated cover built from the project name. */
function cover(project: Project): string {
  if (project.image) {
    return `<img class="project-card__image" src="${esc(project.image)}" alt="${esc(
      project.imageAlt ?? `${project.name} screenshot`,
    )}" loading="lazy" width="640" height="400" />`;
  }

  return `
    <div class="project-card__cover" aria-hidden="true">
      <span class="project-card__rings"></span>
      <span class="project-card__monogram">${esc(initials(project.name))}</span>
    </div>`;
}

function links(project: Project): string {
  return join([
    project.repo &&
      `<a class="btn btn--primary btn--sm" data-magnetic href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">
        ${icon('github', 'btn__icon')} <span>GitHub</span>
        <span class="visually-hidden">— opens in a new tab</span>
      </a>`,
    project.demo &&
      `<a class="btn btn--ghost btn--sm" data-magnetic href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">
        ${icon('external', 'btn__icon')} <span>Live Demo</span>
        <span class="visually-hidden">— opens in a new tab</span>
      </a>`,
  ]);
}

function card(project: Project, index: number): string {
  const id = `project-${index}-title`;
  // Featured work earns a wide, two-column card; the rest sit in the grid.
  const modifier = project.featured ? ' project-card--featured' : '';

  return `
    <article
      class="project-card${modifier}"
      data-reveal="blur"
      data-reveal-index="${index}"
      data-spotlight
      aria-labelledby="${id}"
    >
      <div class="project-card__media">
        ${cover(project)}
        <span class="project-card__category">${esc(project.category)}</span>
        ${project.featured ? '<span class="project-card__badge">Featured</span>' : ''}
      </div>

      <div class="project-card__body">
        <h3 class="project-card__name" id="${id}">${esc(project.name)}</h3>
        <p class="project-card__desc">${esc(project.tagline)}</p>

        <ul class="project-card__tech" aria-label="Technologies">
          ${project.tech
            .map((tech, i) => `<li class="chip chip--accent" style="--i:${i}">${esc(tech)}</li>`)
            .join('')}
        </ul>

        <div class="project-card__actions">${links(project)}</div>
      </div>
    </article>`;
}

export function renderProjects(): string {
  return `
    <section class="section" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="eyebrow">Projects</p>
          <h2 class="section__title" id="projects-title">${words('Things I have built')}</h2>
          <p class="section__lead">Work I have shipped end to end.</p>
        </header>

        <div class="project-grid">${projects.map(card).join('')}</div>
      </div>
    </section>
  `;
}
