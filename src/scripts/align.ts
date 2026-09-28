const SELECTOR = '[data-reveal], [data-rule], [data-fill], [data-draw], [data-seg]';

export function initAlignment() {
    const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-aligned'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('is-aligned');
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    targets.forEach((el) => observer.observe(el));
}