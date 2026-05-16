export const usePortfolioGsap = () => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const afterInitialPaint = (callback: () => void) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (typeof window.requestIdleCallback === 'function') {
                    window.requestIdleCallback(callback, { timeout: 1200 });
                } else {
                    window.setTimeout(callback, 450);
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
            gsap.to('.hero__canvas', {
                xPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.section--hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.utils.toArray<HTMLElement>('.page-layer').forEach((layer) => {
                gsap.fromTo(
                    layer,
                    { '--layer-progress': 0 },
                    {
                        '--layer-progress': 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: layer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    },
                );
            });
        }, root);

        ScrollTrigger.refresh();

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
