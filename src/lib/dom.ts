/** Small typed DOM helpers shared by every section renderer. */

export function qs<T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T | null {
  return scope.querySelector<T>(selector);
}

export function qsa<T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

/** Mounts rendered markup into a placeholder element, if that element exists. */
export function mount(selector: string, html: string): void {
  const host = qs(selector);
  if (host) host.innerHTML = html;
}

/** Escapes user-supplied content before it is interpolated into HTML. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Joins template chunks, dropping empty ones — keeps conditional markup readable. */
export function join(parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join('');
}

/** Turns a label into a stable slug usable as an id or filter key. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
