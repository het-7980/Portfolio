/**
 * Pointer- and scroll-driven motion.
 *
 * Every effect here is decorative: each initialiser bails out on
 * `prefers-reduced-motion`, and the pointer effects additionally bail out on
 * touch, where hover states never resolve and the maths is wasted work.
 */

import { qs, qsa } from './dom';

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Runs `fn` at most once per frame, with the latest arguments. */
function throttleFrame(fn: () => void): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}

/**
 * Tracks the cursor across `[data-spotlight]` surfaces, exposing its position
 * as percentages so the CSS gradient can follow it.
 */
function initSpotlight(): void {
  qsa('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      el.style.setProperty('--spot', '1');
    });

    el.addEventListener('pointerleave', () => el.style.setProperty('--spot', '0'));
  });
}

/** Nudges `[data-magnetic]` controls toward the cursor while it is near them. */
function initMagnetic(): void {
  qsa('[data-magnetic]').forEach((el) => {
    const reset = (): void => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.24}px)`;
    });

    el.addEventListener('pointerleave', reset);
    el.addEventListener('blur', reset);
  });
}

/** Gives `[data-tilt]` panels a shallow perspective tilt that follows the cursor. */
function initTilt(): void {
  qsa('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-lift', '1');
    });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--tilt-lift', '0');
    });
  });
}

/** Counts `[data-count]` values up from zero the first time they scroll in. */
function initCounters(): void {
  const targets = qsa('[data-count]');
  if (!targets.length) return;

  const run = (el: HTMLElement): void => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    const duration = 1100;
    let start: number | null = null;

    const step = (now: number): void => {
      start ??= now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast off the line, settles gently on the final number.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  if (reducedMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );

  targets.forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}

/**
 * Draws the education timeline's spine as the list passes through the
 * viewport, so the line appears to grow alongside the entries.
 */
function initTimelineProgress(): void {
  const timeline = qs('[data-timeline]');
  if (!timeline) return;

  const update = throttleFrame(() => {
    const rect = timeline.getBoundingClientRect();
    const start = window.innerHeight * 0.85;
    const span = rect.height + start - window.innerHeight * 0.25;
    const progress = span > 0 ? (start - rect.top) / span : 1;
    timeline.style.setProperty('--timeline-progress', String(Math.min(Math.max(progress, 0), 1)));
  });

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/** Shifts `[data-parallax]` layers against the scroll at their own rate. */
function initParallax(): void {
  const layers = qsa('[data-parallax]');
  if (!layers.length) return;

  const update = throttleFrame(() => {
    const y = window.scrollY;
    layers.forEach((layer) => {
      const rate = Number(layer.dataset.parallax || 0.15);
      layer.style.setProperty('--parallax-y', `${(y * rate).toFixed(1)}px`);
    });
  });

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Reveals the floating back-to-top control once the visitor is past the hero. */
function initScrollTop(): void {
  const button = qs<HTMLButtonElement>('[data-scroll-top]');
  if (!button) return;

  const update = throttleFrame(() => {
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
  });

  update();
  window.addEventListener('scroll', update, { passive: true });

  button.addEventListener('click', () => {
    const behavior = reducedMotion() ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  });
}

export function initMotion(): void {
  initCounters();
  initScrollTop();

  if (reducedMotion()) return;

  initTimelineProgress();
  initParallax();

  if (!finePointer()) return;

  initSpotlight();
  initMagnetic();
  initTilt();
}
