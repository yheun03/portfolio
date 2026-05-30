/**
 * 목표: 홈 섹션 스크롤 위치에 따라 현재 활성 섹션을 추적한다.
 * 기능: DOM 변화 재감지, scroll/resize/hashchange 기반 active id 갱신을 제공한다.
 */
export const useScrollSpy = (sectionIds: string[]) => {
    const activeId = ref(sectionIds[0] ?? '');

    let mutationObserver: MutationObserver | null = null;
    let rafId: number | null = null;
    let sections: HTMLElement[] = [];

    /**
     * viewport top 기준 active 판정 위치
     * 0.45 = 화면 위에서 45% 내려온 지점
     */
    const ACTIVE_VIEWPORT_RATIO = 0.45;

    const getSections = () => sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    const refreshSections = () => {
        sections = getSections();

        if (!activeId.value && sections[0]?.id) {
            activeId.value = sections[0].id;
        }
    };

    const computeActive = () => {
        if (!sections.length) return;

        const markerY = window.innerHeight * ACTIVE_VIEWPORT_RATIO;

        /**
         * 페이지 최상단에서는 무조건 첫 섹션 active
         */
        if (window.scrollY <= 2) {
            activeId.value = sections[0].id;
            return;
        }

        /**
         * markerY 지점이 실제로 포함된 섹션 찾기
         */
        const currentSection = sections.find((section) => {
            const rect = section.getBoundingClientRect();

            return rect.top <= markerY && rect.bottom > markerY;
        });

        if (currentSection) {
            activeId.value = currentSection.id;
            return;
        }

        /**
         * markerY에 정확히 걸리는 섹션이 없을 경우,
         * markerY와 가장 가까운 섹션을 active 처리
         */
        let nearestSection = sections[0];
        let nearestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - markerY);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestSection = section;
            }
        });

        if (nearestSection?.id) {
            activeId.value = nearestSection.id;
        }
    };

    const scheduleCompute = () => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            refreshSections();
            computeActive();
            rafId = null;
        });
    };

    onMounted(() => {
        const startObservers = () => {
            scheduleCompute();

            mutationObserver = new MutationObserver(() => {
                scheduleCompute();
            });

            const main = document.getElementById('main-content');
            if (main) {
                mutationObserver.observe(main, { childList: true, subtree: true });
            }

            window.addEventListener('scroll', scheduleCompute, { passive: true });
            window.addEventListener('resize', scheduleCompute, { passive: true });
            window.addEventListener('hashchange', scheduleCompute);
        };

        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(startObservers, { timeout: 1500 });
        } else {
            window.setTimeout(startObservers, 400);
        }
    });

    onBeforeUnmount(() => {
        mutationObserver?.disconnect();
        mutationObserver = null;

        if (rafId !== null) {
            cancelAnimationFrame(rafId);
        }

        rafId = null;

        window.removeEventListener('scroll', scheduleCompute);
        window.removeEventListener('resize', scheduleCompute);
        window.removeEventListener('hashchange', scheduleCompute);
    });

    return { activeId };
};
