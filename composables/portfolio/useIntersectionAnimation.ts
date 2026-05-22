/**
 * 뷰포트 진입 시 `[data-animate]`에 `animate--visible` 부여.
 * 탭 전환·동적 마운트로 나중에 추가된 노드도 `#main-content` 변화를 관찰해 다시 observe 한다.
 */
export const useIntersectionAnimation = () => {
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

    onMounted(() => {
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
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        mutationObserver?.disconnect();
        observer = null;
        mutationObserver = null;
        mainEl = null;
    });
};
