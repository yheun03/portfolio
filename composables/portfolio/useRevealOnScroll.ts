import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

type UseRevealOnScrollOptions = {
    /** true면 첫 페인트 이후에 관찰자를 붙인다 */
    deferred?: boolean;
};

/**
 * 목표: 홈 화면의 지연 등장 애니메이션을 브라우저 관찰자로 가볍게 처리한다.
 * 기능: data-animate 노드 관찰, 동적 마운트 재관찰, reduce-motion 대응을 수행한다.
 */
export const useRevealOnScroll = (options: UseRevealOnScrollOptions = {}) => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let mainEl: HTMLElement | null = null;

    const observePendingTargets = () => {
        if (!observer) return;
        mainEl?.querySelectorAll<HTMLElement>('[data-animate]:not(.animate--visible)').forEach((el) => observer!.observe(el));
    };

    let rafScheduled = false;
    const scheduleObserve = () => {
        if (rafScheduled) return;
        rafScheduled = true;
        requestAnimationFrame(() => {
            rafScheduled = false;
            observePendingTargets();
        });
    };

    const revealAllAnimated = () => {
        mainEl?.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => el.classList.add('animate--visible'));
    };

    const start = () => {
        if (!import.meta.client) return;

        mainEl = document.getElementById('main-content');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealAllAnimated();
            mutationObserver = new MutationObserver(() => revealAllAnimated());
            if (mainEl) {
                mutationObserver.observe(mainEl, { childList: true, subtree: true });
            }
            return;
        }

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate--visible');
                        observer!.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px 0px -8% 0px',
                threshold: 0.01,
            },
        );

        observePendingTargets();

        mutationObserver = new MutationObserver(scheduleObserve);
        if (mainEl) {
            mutationObserver.observe(mainEl, { childList: true, subtree: true });
        }
    };

    onMounted(() => {
        if (!import.meta.client) return;
        if (options.deferred) {
            scheduleAfterFirstPaint(start, 2200);
            return;
        }
        start();
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        mutationObserver?.disconnect();
        observer = null;
        mutationObserver = null;
        mainEl = null;
    });
};
