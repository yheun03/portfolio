// 스크롤 위치 기반 활성 섹션 추적 — DOM 변화 재감지·scroll/resize/hashchange 이벤트 대응
// 화면 위에서 45% 지점을 기준으로 가장 가까운 섹션을 active로 판정
const ACTIVE_VIEWPORT_RATIO = 0.45;

export function useScrollSpy(sectionIds: string[]) {
    const activeId = ref(sectionIds[0] ?? '');

    let mutationObserver: MutationObserver | null = null;
    let rafId: number | null = null;
    let sections: HTMLElement[] = [];

    function getSections() {
        return sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    }

    function refreshSections() {
        sections = getSections();
        if (!activeId.value && sections[0]?.id) {
            activeId.value = sections[0].id;
        }
    }

    function computeActive() {
        if (!sections.length) return;

        const markerY = window.innerHeight * ACTIVE_VIEWPORT_RATIO;

        if (window.scrollY <= 2) {
            activeId.value = sections[0]!.id;
            return;
        }

        const currentSection = sections.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= markerY && rect.bottom > markerY;
        });

        if (currentSection) {
            activeId.value = currentSection.id;
            return;
        }

        // markerY에 정확히 걸리는 섹션이 없으면 가장 가까운 섹션으로 fallback
        let nearestSection = sections[0]!;
        let nearestDistance = Number.POSITIVE_INFINITY;

        for (const section of sections) {
            const distance = Math.abs(section.getBoundingClientRect().top - markerY);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestSection = section;
            }
        }

        if (nearestSection.id) activeId.value = nearestSection.id;
    }

    function scheduleCompute() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            refreshSections();
            computeActive();
            rafId = null;
        });
    }

    onMounted(() => {
        function startObservers() {
            scheduleCompute();

            mutationObserver = new MutationObserver(scheduleCompute);
            const main = document.getElementById('main-content');
            if (main) mutationObserver.observe(main, { childList: true, subtree: true });

            window.addEventListener('scroll', scheduleCompute, { passive: true });
            window.addEventListener('resize', scheduleCompute, { passive: true });
            window.addEventListener('hashchange', scheduleCompute);
        }

        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(startObservers, { timeout: 1500 });
        } else {
            window.setTimeout(startObservers, 400);
        }
    });

    onBeforeUnmount(() => {
        mutationObserver?.disconnect();
        mutationObserver = null;
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        window.removeEventListener('scroll', scheduleCompute);
        window.removeEventListener('resize', scheduleCompute);
        window.removeEventListener('hashchange', scheduleCompute);
    });

    return { activeId };
}
