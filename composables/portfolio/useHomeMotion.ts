// 홈 페이지 Apple-style 스크롤 모션 — GSAP·ScrollTrigger 첫 페인트 이후 지연 로드
// hero 시차, 섹션 stagger, depth layer 를 처리합니다
import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

export function useHomeMotion() {
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

            /* ── Hero scroll cue: 스크롤 시작과 함께 사라짐 ── */
            const heroCue = root.querySelector<HTMLElement>('.hero__cue');
            if (heroCue) {
                gsap.to(heroCue, {
                    autoAlpha: 0,
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.section--hero',
                        start: 'top top',
                        end: '18% top',
                        scrub: true,
                    },
                });
            }

            /* ── Why: 대형 헤드라인이 안쪽에서 제자리로 정착하는 드리프트 (가운데 정렬 항목 제외)
               바깥 방향 시작은 페이지 패딩을 넘어 잘려 보여 안쪽 시작으로 고정 ── */
            root.querySelectorAll<HTMLElement>('.why__list > li h3').forEach((heading, i) => {
                if (i === 1) return;
                const inward = i === 0 ? 4 : -4;
                gsap.fromTo(
                    heading,
                    { xPercent: inward },
                    {
                        xPercent: 0,
                        ease: 'none',
                        force3D: true,
                        scrollTrigger: {
                            trigger: heading,
                            start: 'top 95%',
                            end: 'bottom 30%',
                            scrub: 1.2,
                        },
                    }
                );
            });

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

            /* flow-steps 는 data-stagger CSS 애니메이션이 전담 — GSAP 중복 트윈 없음 */

            /* ── Section titles: slide-in line accent ──
               히어로 eyebrow(.hero__eyebrow)는 CSS hero-rise-in(translateY 26→0, fill:backwards)
               전용 진입을 가지므로 제외. 포함하면 GSAP 이 진입 중 transform 의 y(26px)를 inline 에
               구워버리고, CSS 애니메이션 종료 시 그 base 로 되돌아가 eyebrow 가 26px 뚝 떨어진다. */
            root.querySelectorAll<HTMLElement>('.section-title__eyebrow:not(.hero__eyebrow)').forEach((eyebrow) => {
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
}
