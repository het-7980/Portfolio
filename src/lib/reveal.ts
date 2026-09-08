/** Reveals `[data-reveal]` elements as they scroll into view. */

const REVEALED = 'is-revealed';

export function initScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add(REVEALED));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // Stagger siblings so groups of cards cascade instead of popping in together.
        const index = Number(el.dataset.revealIndex ?? 0);
        el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 70}ms`);
        el.classList.add(REVEALED);
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
}

/** Re-registers elements added to the DOM after the initial render. */
export function revealAllIn(scope: ParentNode): void {
  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    el.dataset.revealIndex = String(i);
  });
}
