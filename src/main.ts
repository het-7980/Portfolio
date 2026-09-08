import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import { renderNav } from './components/nav';
import { renderHero } from './sections/hero';
import { renderAbout } from './sections/about';
import { renderSkills } from './sections/skills';
import { renderProjects } from './sections/projects';
import { renderEducation } from './sections/education';
import { renderContact } from './sections/contact';
import { renderFooter } from './sections/footer';

import { initTheme } from './lib/theme';
import { initNavigation } from './lib/navigation';
import { initScrollReveal } from './lib/reveal';
import { mount } from './lib/dom';

function render(): void {
  mount('#nav-root', renderNav());
  mount(
    '#main',
    [renderHero(), renderAbout(), renderSkills(), renderProjects(), renderEducation(), renderContact()].join(''),
  );
  mount('#footer-root', renderFooter());
}

/**
 * Sections are injected after the document parses, so the browser has already
 * given up on resolving any `#section` in the URL by the time they exist.
 */
function restoreHashTarget(): void {
  const id = location.hash.slice(1);
  if (!id) return;

  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

initTheme();
render();
initNavigation();
initScrollReveal();
restoreHashTarget();
