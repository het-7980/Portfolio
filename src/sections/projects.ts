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
    return `<img class="project__image" src="${esc(project.image)}" alt="${esc(
      project.imageAlt ?? `${project.name} screenshot`,
    )}" loading="lazy" width="960" height="720" />`;
  }

  return `
    <div class="project__cover" aria-hidden="true">
      <span class="project__monogram">${esc(initials(project.name))}</span>
      <span class="project__cover-name">${esc(project.name)}</span>
      <div class="project__cover-rings"></div>
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

function card(project: Project, index: number): string {
  const id = `project-${index}-title`;

  return `
    <article class="project" data-reveal data-reveal-index="${index}" aria-labelledby="${id}">
      <div class="project__media">${cover(project)}</div>

      <div class="project__body">
        <p class="project__category">${esc(project.category)}</p>
        <h3 class="project__name" id="${id}">${esc(project.name)}</h3>
        <p class="project__tagline">${esc(project.tagline)}</p>

        ${join([
          project.problem &&
            `<div class="project__block">
              <h4 class="project__block-title">Problem it solves</h4>
              <p>${esc(project.problem)}</p>
            </div>`,
        ])}

        ${join([
          project.features.length > 0 &&
            `<div class="project__block">
              <h4 class="project__block-title">Key features</h4>
              <ul class="project__features">
                ${project.features
                  .map((feature) => `<li>${icon('check', 'project__tick')}<span>${esc(feature)}</span></li>`)
                  .join('')}
              </ul>
            </div>`,
        ])}

        ${join([
          project.role &&
            `<p class="project__role"><span class="project__role-label">My role</span> ${esc(project.role)}</p>`,
        ])}

        <ul class="project__tech">
          ${project.tech.map((tech) => `<li class="chip chip--accent">${esc(tech)}</li>`).join('')}
        </ul>

        <div class="project__actions">${links(project)}</div>
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
            Work I have shipped end to end — the problem behind it, what it does and how it was built.
          </p>
        </header>

        <div class="project-list">${projects.map(card).join('')}</div>
      </div>
    </section>
  `;
}
