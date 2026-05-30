import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

/**
 * 목표: 홈 화면의 고비용 GSAP 스크롤 애니메이션을 초기 렌더 이후 지연 로드한다.
 * 기능: hero canvas parallax, ScrollTrigger 정리, reduce-motion fallback을 수행한다.
 */
export const usePortfolioGsap = () => {
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
