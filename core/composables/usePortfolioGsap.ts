export const usePortfolioGsap = () => {
    let cleanup: (() => void) | null = null;

    onMounted(async () => {
        if (!import.meta.client) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.getElementById('main-content');
        if (!root || reduceMotion) {
            root?.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            gsap.set('[data-animate]', { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
            gsap.set('.section:not(.section--hero) .section-title, .base-card, .work-card, .timeline-item, .skill-card, .highlight-card', {
                opacity: 1,
                clearProps: 'transform',
            });

            const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
            heroTimeline
                .from('.hero__availability', { opacity: 0, y: -14, duration: 0.45 })
                .from('.hero__mega-title', { opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 0.85 }, '-=0.12')
                .from('.hero__subtitle, .hero__role', { opacity: 0, x: -22, stagger: 0.08, duration: 0.48 }, '-=0.42')
                .from('.hero__studio-card', { opacity: 0, clipPath: 'inset(0 100% 0 0 round 18px)', duration: 0.68 }, '-=0.52')
                .from('.hero__keyword-cloud li, .hero__floating-list li', { opacity: 0, scale: 0.92, stagger: 0.035, duration: 0.34 }, '-=0.26')
                .from('.hero__actions .base-button, .hero__metric-strip .stat-card', { opacity: 0, x: 18, stagger: 0.04, duration: 0.36 }, '-=0.16');

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

            ScrollTrigger.batch('.section:not(.section--hero) .section-title', {
                start: 'top 82%',
                once: true,
                onEnter: (batch) => {
                    gsap.from(batch, {
                        opacity: 0,
                        clipPath: 'inset(0 0 100% 0)',
                        duration: 0.68,
                        stagger: 0.08,
                        ease: 'power3.out',
                    });
                },
            });

            ScrollTrigger.batch('.base-card, .work-card, .timeline-item, .skill-card, .highlight-card', {
                start: 'top 86%',
                once: true,
                onEnter: (batch) => {
                    gsap.from(batch, {
                        opacity: 0,
                        filter: 'blur(8px)',
                        scale: 0.985,
                        duration: 0.52,
                        stagger: 0.05,
                        ease: 'power3.out',
                        clearProps: 'filter,transform,opacity',
                    });
                },
            });

            gsap.utils.toArray<HTMLElement>('.works__grid .work-card').forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    x: index % 2 === 0 ? -24 : 24,
                    duration: 0.54,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        once: true,
                    },
                });
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
        cleanup?.();
        cleanup = null;
    });
};
