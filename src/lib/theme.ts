/** Light/dark theme toggle backed by localStorage with a system-preference default. */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/** The site is dark by default; the OS preference does not override it. */
const DEFAULT_THEME: Theme = 'dark';

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')
    .forEach((btn) => btn.setAttribute('aria-pressed', String(theme === 'light')));
}

export function initTheme(): void {
  let current = stored() ?? DEFAULT_THEME;
  apply(current);

  document.addEventListener('click', (event) => {
    const toggle = (event.target as HTMLElement | null)?.closest('[data-theme-toggle]');
    if (!toggle) return;

    current = current === 'dark' ? 'light' : 'dark';
    apply(current);
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch {
      /* storage unavailable — theme still applies for this page view */
    }
  });
}
