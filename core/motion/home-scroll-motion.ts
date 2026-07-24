import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

type ScrollTriggerPlugin = {
    getAll: () => Array<{ kill: () => void; refresh: () => void; update: () => void }>;
};

type GsapContext = { revert: () => void };
type GsapLike = {
    registerPlugin: (plugin: unknown) => void;
    context: (fn: () => void, root: HTMLElement) => GsapContext;
    set: (target: Element | null, vars: Record<string, unknown>) => void;
    to: (target: Element, vars: Record<string, unknown>) => void;
    fromTo: (target: Element, from: Record<string, unknown>, to: Record<string, unknown>) => void;
};

export async function createHomeScrollMotion(root: HTMLElement): Promise<() => void> {
    await new Promise<void>((resolve) => scheduleAfterFirstPaint(resolve, 2800));

    const [{ gsap }, scrollTriggerModule] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger as ScrollTriggerPlugin;
    const motion = gsap as unknown as GsapLike;
    motion.registerPlugin(ScrollTrigger);

    const refreshMotion = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
        ScrollTrigger.getAll().forEach((trigger) => trigger.update());

        if (window.scrollY > 2) return;

        motion.set(root.querySelector('.hero__stage'), { clearProps: 'opacity,transform,translate,rotate,scale' });
        motion.set(root.querySelector('.hero__canvas'), { clearProps: 'transform,translate,rotate,scale' });
        motion.set(root.querySelector('.hero__cue'), { clearProps: 'opacity,visibility,transform,translate,rotate,scale' });
    };

    const scheduleRefresh = () => {
        requestAnimationFrame(() => {
            refreshMotion();
            requestAnimationFrame(refreshMotion);
        });
    };

    const context = motion.context(() => {
        const heroCanvas = root.querySelector<HTMLElement>('.hero__canvas');
        if (heroCanvas) {
            motion.to(heroCanvas, {
                xPercent: -10,
                yPercent: -6,
                ease: 'none',
                force3D: true,
                scrollTrigger: { trigger: '.section--hero', start: 'top top', end: 'bottom top', scrub: true },
            });
        }

        const heroStage = root.querySelector<HTMLElement>('.hero__stage');
        if (heroStage) {
            motion.to(heroStage, {
                yPercent: -12,
                opacity: 0.4,
                ease: 'none',
                force3D: true,
                scrollTrigger: { trigger: '.section--hero', start: 'top top', end: '60% top', scrub: true },
            });
        }

        const heroCue = root.querySelector<HTMLElement>('.hero__cue');
        if (heroCue) {
            motion.to(heroCue, {
                autoAlpha: 0,
                yPercent: 30,
                ease: 'none',
                scrollTrigger: { trigger: '.section--hero', start: 'top top', end: '18% top', scrub: true },
            });
        }

        root.querySelectorAll<HTMLElement>('.why__list > li h3').forEach((heading, index) => {
            if (index === 1) return;
            const inward = index === 0 ? 4 : -4;
            motion.fromTo(
                heading,
                { xPercent: inward },
                {
                    xPercent: 0,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: { trigger: heading, start: 'top 95%', end: 'bottom 30%', scrub: 1.2 },
                },
            );
        });

        root.querySelectorAll<HTMLElement>('.section-title__eyebrow:not(.hero__eyebrow)').forEach((eyebrow) => {
            motion.fromTo(
                eyebrow,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.65,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: eyebrow, start: 'top 88%', toggleActions: 'play none none none' },
                },
            );
        });

        root.querySelectorAll<HTMLElement>('.journey__chapter').forEach((chapter, index) => {
            motion.fromTo(
                chapter,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: chapter, start: 'top 82%', toggleActions: 'play none none none' },
                    delay: index * 0.05,
                },
            );
        });

        const toolboxCards = root.querySelectorAll<HTMLElement>('.toolbox__grid .feature-card');
        if (toolboxCards.length) {
            motion.fromTo(
                toolboxCards,
                { opacity: 0, y: 40, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.78,
                    ease: 'power3.out',
                    stagger: { amount: 0.4, from: 'start' },
                    scrollTrigger: { trigger: '.section--toolbox', start: 'top 72%', toggleActions: 'play none none none' },
                },
            );
        }

        const mailDisplay = root.querySelector<HTMLElement>('.contact__mail-display');
        if (mailDisplay) {
            motion.fromTo(
                mailDisplay,
                { opacity: 0, scale: 0.88, y: 32 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.section--contact', start: 'top 75%', toggleActions: 'play none none none' },
                },
            );
        }
    }, root);

    scheduleRefresh();
    window.addEventListener('pageshow', scheduleRefresh);

    return () => {
        window.removeEventListener('pageshow', scheduleRefresh);
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
}

export function revealStaticMotion(root: HTMLElement): void {
    root.querySelectorAll<HTMLElement>('[data-animate]').forEach((element) => element.classList.add('animate--visible'));
}
