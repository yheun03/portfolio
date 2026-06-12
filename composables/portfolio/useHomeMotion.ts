import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

/**
 * Apple-style scroll motion: hero parallax, section stagger, depth layers.
 * GSAP + ScrollTrigger are lazy-loaded after first paint.
 */
export const useHomeMotion = () => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    onMounted(async () => {
        if (!import.meta.client) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.getElementById('main-content');
        if (!root || reduceMotion) {
            root?.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => el.classList.add('animate--visible'));
            return;
        }

        await new Promise<void>((resolve) => scheduleAfterFirstPaint(resolve, 2800));
        if (cancelled) return;

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {

            /* ── Hero canvas parallax ── */
            const heroCanvas = root.querySelector<HTMLElement>('.hero__canvas');
            if (heroCanvas) {
                gsap.to(heroCanvas, {
                    xPercent: -10,
                    yPercent: -6,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.section--hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1.2,
                    },
                });
            }

            /* ── Hero stage: subtle upward drift on scroll ── */
            const heroStage = root.querySelector<HTMLElement>('.hero__stage');
            if (heroStage) {
                gsap.to(heroStage, {
                    yPercent: -12,
                    opacity: 0.4,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.section--hero',
                        start: 'top top',
                        end: '60% top',
                        scrub: 1.6,
                    },
                });
            }

            /* ── Hero metrics bar: depth pop ── */
            const metricsBar = root.querySelector<HTMLElement>('.hero__metrics-bar');
            if (metricsBar) {
                gsap.to(metricsBar, {
                    yPercent: -18,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.section--hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.8,
                    },
                });
            }

            /* ── About: feature grid stagger on scroll ── */
            const featureCards = root.querySelectorAll<HTMLElement>('.about__spotlight .feature-card');
            if (featureCards.length) {
                gsap.fromTo(
                    featureCards,
                    { opacity: 0, y: 48, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.82,
                        ease: 'power3.out',
                        stagger: { amount: 0.36, from: 'start' },
                        scrollTrigger: {
                            trigger: '.about__spotlight',
                            start: 'top 78%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            /* ── About workflow steps stagger ── */
            const flowSteps = root.querySelectorAll<HTMLElement>('.flow-steps li');
            if (flowSteps.length) {
                gsap.fromTo(
                    flowSteps,
                    { opacity: 0, y: 32, scaleY: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: '.about__workflow',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            /* ── Section titles: slide-in line accent ── */
            root.querySelectorAll<HTMLElement>('.section-title__eyebrow').forEach((eyebrow) => {
                gsap.fromTo(
                    eyebrow,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.65,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: eyebrow,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            /* ── Journey chapters: stagger chapter cards ── */
            root.querySelectorAll<HTMLElement>('.journey__chapter').forEach((chapter, i) => {
                gsap.fromTo(
                    chapter,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: chapter,
                            start: 'top 82%',
                            toggleActions: 'play none none none',
                        },
                        delay: i * 0.05,
                    }
                );
            });

            /* ── Toolbox feature grid stagger ── */
            const toolboxCards = root.querySelectorAll<HTMLElement>('.toolbox__grid .feature-card');
            if (toolboxCards.length) {
                gsap.fromTo(
                    toolboxCards,
                    { opacity: 0, y: 40, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.78,
                        ease: 'power3.out',
                        stagger: { amount: 0.4, from: 'start' },
                        scrollTrigger: {
                            trigger: '.section--toolbox',
                            start: 'top 72%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            /* ── Contact: display title scale-up ── */
            const mailDisplay = root.querySelector<HTMLElement>('.contact__mail-display');
            if (mailDisplay) {
                gsap.fromTo(
                    mailDisplay,
                    { opacity: 0, scale: 0.88, y: 32 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.section--contact',
                            start: 'top 75%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
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
