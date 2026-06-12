// [data-animate] 요소 뷰포트 진입 감지 → animate--visible 클래스 부여 — reduce-motion·동적 마운트 대응
import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

type UseRevealOnScrollOptions = {
    // true면 첫 페인트 이후 idle 시점까지 관찰자 등록을 지연
    deferred?: boolean;
};

export function useRevealOnScroll(options: UseRevealOnScrollOptions = {}) {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let mainEl: HTMLElement | null = null;
    let rafScheduled = false;

    function revealAllAnimated() {
        mainEl?.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => el.classList.add('animate--visible'));
    }

    function observePendingTargets() {
        if (!observer) return;
        mainEl?.querySelectorAll<HTMLElement>('[data-animate]:not(.animate--visible)').forEach((el) => observer!.observe(el));
    }

    function scheduleObserve() {
        if (rafScheduled) return;
        rafScheduled = true;
        requestAnimationFrame(() => {
            rafScheduled = false;
            observePendingTargets();
        });
    }

    function start() {
        if (!import.meta.client) return;

        mainEl = document.getElementById('main-content');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealAllAnimated();
            mutationObserver = new MutationObserver(revealAllAnimated);
            if (mainEl) mutationObserver.observe(mainEl, { childList: true, subtree: true });
            return;
        }

        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate--visible');
                        observer!.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
        );

        observePendingTargets();

        mutationObserver = new MutationObserver(scheduleObserve);
        if (mainEl) mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    onMounted(() => {
        if (!import.meta.client) return;
        if (options.deferred) {
            scheduleAfterFirstPaint(start, 2200);
        } else {
            start();
        }
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        mutationObserver?.disconnect();
        observer = null;
        mutationObserver = null;
        mainEl = null;
    });
}
