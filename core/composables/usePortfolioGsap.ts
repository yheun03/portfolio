export const usePortfolioGsap = () => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const afterInitialPaint = (callback: () => void) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (typeof window.requestIdleCallback === 'function') {
                    window.requestIdleCallback(callback, { timeout: 2800 });
                } else {
                    window.setTimeout(callback, 800);
                }
            });
        });
    };

    onMounted(async () => {
        if (!import.meta.client) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.getElementById('main-content');
        if (!root || reduceMotion) {
            root?.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => el.classList.add('is-visible'));
            return;
        }

        await new Promise<void>((resolve) => afterInitialPaint(resolve));
        if (cancelled) return;

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            const heroCanvas = root.querySelector<HTMLElement>('.hero__canvas');
            if (heroCanvas) {
                gsap.to(heroCanvas, {
                    xPercent: -8,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.section--hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }

        }, root);

        requestAnimationFrame(() => {
            if (!cancelled) ScrollTrigger.refresh();
        });

        cleanup = () => {
            context.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    });

    onBeforeUnmount(() => {
        cancelled = true;
        cleanup?.();
        cleanup = null;
    });
};
