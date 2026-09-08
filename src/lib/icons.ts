/**
 * Inline SVG icon set. Icons are stroke-based and inherit `currentColor`,
 * so they adapt to both themes without duplicate assets.
 */

const wrap = (paths: string, filled = false): string =>
  `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="${
    filled ? 'none' : 'currentColor'
  }" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons: Record<string, string> = {
  github: wrap(
    '<path d="M12 2A10 10 0 0 0 8.84 21.5c.5.09.68-.22.68-.48v-1.7C6.73 19.91 6.14 18 6.14 18a2.7 2.7 0 0 0-1.13-1.49c-.92-.63.07-.62.07-.62a2.14 2.14 0 0 1 1.56 1.05 2.17 2.17 0 0 0 2.96.85 2.17 2.17 0 0 1 .65-1.37c-2.27-.26-4.65-1.13-4.65-5.03a3.94 3.94 0 0 1 1.05-2.73 3.66 3.66 0 0 1 .1-2.69s.85-.27 2.8 1.04a9.6 9.6 0 0 1 5.1 0c1.94-1.31 2.79-1.04 2.79-1.04a3.66 3.66 0 0 1 .1 2.69 3.94 3.94 0 0 1 1.05 2.73c0 3.91-2.38 4.77-4.66 5.02a2.43 2.43 0 0 1 .7 1.89v2.8c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
  ),
  linkedin: wrap(
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5v6.5M7.5 7.2v.1M11.5 17v-3.6a2 2 0 0 1 4 0V17"/>',
  ),
  mail: wrap('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  location: wrap('<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
  arrow: wrap('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  external: wrap('<path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>'),
  phone: wrap('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
  browser: wrap('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M2.5 9h19M6 6.8h.01M8.6 6.8h.01"/>'),
  database: wrap('<ellipse cx="12" cy="6" rx="7.5" ry="3.2"/><path d="M4.5 6v12c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2V6M4.5 12c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2"/>'),
  code: wrap('<path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5l-3 14"/>'),
  branch: wrap('<circle cx="7" cy="5.5" r="2.2"/><circle cx="7" cy="18.5" r="2.2"/><circle cx="17" cy="9" r="2.2"/><path d="M7 7.7v8.6M17 11.2c0 3.2-3.4 3-6.5 3.6"/>'),
  sun: wrap('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>'),
  moon: wrap('<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"/>'),
  check: wrap('<path d="m4.5 12.5 5 5 10-11"/>'),
  cap: wrap('<path d="m12 4 9.5 4.6L12 13.2 2.5 8.6 12 4Z"/><path d="M6.5 10.8v4.6c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.6M20.4 9.2v5.4"/>'),
  menu: wrap('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: wrap('<path d="M6 6l12 12M18 6 6 18"/>'),
};

export function icon(name: string, className = 'icon'): string {
  const svg = icons[name];
  if (!svg) return '';
  return `<span class="${className}">${svg}</span>`;
}
