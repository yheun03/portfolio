// 고정 헤더·scroll-margin을 반영한 섹션 앵커 스크롤 유틸
// scrollToSectionHash: 즉시 이동 / scrollToSectionHashWhenReady: 비동기 마운트 대기 후 이동

function scrollToSectionById(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
    if (!import.meta.client) return false;

    const el = document.getElementById(id);
    if (!el) return false;

    const scrollMargin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - scrollMargin;

    window.scrollTo({ top, behavior });
    return true;
}

export function scrollToSectionHash(hash: string, behavior: ScrollBehavior = 'smooth'): boolean {
    const id = hash.replace(/^#/, '');
    if (!id) return false;
    return scrollToSectionById(id, behavior);
}

// 섹션이 아직 마운트되지 않은 경우 최대 20프레임 재시도
export function scrollToSectionHashWhenReady(hash: string, behavior: ScrollBehavior = 'smooth'): Promise<boolean> {
    if (!import.meta.client) return Promise.resolve(false);

    return new Promise((resolve) => {
        let attempt = 0;
        const MAX_ATTEMPTS = 20;

        function tryScroll() {
            if (scrollToSectionHash(hash, behavior)) {
                resolve(true);
                return;
            }
            attempt += 1;
            if (attempt < MAX_ATTEMPTS) {
                requestAnimationFrame(tryScroll);
            } else {
                resolve(false);
            }
        }

        requestAnimationFrame(tryScroll);
    });
}
