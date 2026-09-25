import { qs, qsa } from './dom';

/** Mobile menu, sticky-nav state, active-section highlighting and scroll progress. */
export function initNavigation(): void {
  const nav = qs('[data-nav]');
  const toggle = qs<HTMLButtonElement>('[data-nav-toggle]');
  const scrim = qs('[data-nav-scrim]');
  const progress = qs('[data-scroll-progress]');
  const links = qsa<HTMLAnchorElement>('[data-nav-link]');
  if (!nav) return;

  const setMenu = (open: boolean): void => {
    nav.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    if (scrim) scrim.hidden = !open;
    document.body.classList.toggle('is-menu-open', open);
  };

  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setMenu(false));
  links.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle?.focus();
    }
  });

  // Close the mobile menu if the viewport grows into the desktop layout.
  const desktop = window.matchMedia('(min-width: 860px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  const onScroll = (): void => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = Math.min(max > 0 ? window.scrollY / max : 0, 1);

    if (progress) progress.style.transform = `scaleX(${ratio})`;
    // Shared with the floating back-to-top dial, which draws the same value.
    document.documentElement.style.setProperty('--scroll-progress', String(ratio));
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  initScrollSpy(links);
}

/** Marks the nav link whose section currently occupies the viewport. */
function initScrollSpy(links: HTMLAnchorElement[]): void {
  const sections = links
    .map((link) => qs(link.getAttribute('href') ?? ''))
    .filter((el): el is HTMLElement => el instanceof HTMLElement);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const setActive = (id: string): void => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
