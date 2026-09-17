import { projects } from '../data/projects';
import { icon } from '../lib/icons';
import { esc, join } from '../lib/dom';
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
      <span class="project-card__monogram">${esc(initials(project.name))}</span>
    </div>`;
}

function links(project: Project): string {
  return join([
    project.repo &&
      `<a class="btn btn--primary btn--sm" href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">
        ${icon('github', 'btn__icon')} <span>GitHub</span>
        <span class="visually-hidden">— opens in a new tab</span>
      </a>`,
    project.demo &&
      `<a class="btn btn--ghost btn--sm" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">
        ${icon('external', 'btn__icon')} <span>Live Demo</span>
        <span class="visually-hidden">— opens in a new tab</span>
      </a>`,
  ]);
}

function details(project: Project): string {
  const hasDetails = project.problem || project.features.length > 0 || project.role;
  if (!hasDetails) return '';

  return `
    <details class="project-card__details">
      <summary class="project-card__summary">
        <span>Details</span>
        ${icon('chevron', 'project-card__chevron')}
      </summary>
      <div class="project-card__details-body">
        ${join([
          project.problem &&
            `<p class="project-card__label">Problem it solves</p>
             <p class="project-card__text">${esc(project.problem)}</p>`,
          project.features.length > 0 &&
            `<p class="project-card__label">Key features</p>
             <ul class="project-card__features">
               ${project.features.map((f) => `<li>${esc(f)}</li>`).join('')}
             </ul>`,
          project.role &&
            `<p class="project-card__label">My role</p>
             <p class="project-card__text">${esc(project.role)}</p>`,
        ])}
      </div>
    </details>`;
}

function card(project: Project, index: number): string {
  const id = `project-${index}-title`;

  return `
    <article class="project-card" data-reveal data-reveal-index="${index}" aria-labelledby="${id}">
      <div class="project-card__media">
        ${cover(project)}
        <span class="project-card__category">${esc(project.category)}</span>
      </div>

      <div class="project-card__body">
        <h3 class="project-card__name" id="${id}">${esc(project.name)}</h3>
        <p class="project-card__desc">${esc(project.tagline)}</p>

        <ul class="project-card__tech" aria-label="Technologies">
          ${project.tech.map((tech) => `<li class="chip chip--accent">${esc(tech)}</li>`).join('')}
        </ul>

        ${details(project)}

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
          <h2 class="section__title" id="projects-title">Things I have built</h2>
          <p class="section__lead">
            Work I have shipped end to end — open a card for the problem, features and my role.
          </p>
        </header>

        <div class="project-grid">${projects.map(card).join('')}</div>
      </div>
    </section>
  `;
}
