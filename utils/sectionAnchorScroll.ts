/** 고정 헤더·scroll-margin을 반영한 섹션 앵커 스크롤 */
export function scrollToSectionById(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
    if (!import.meta.client) return false;

    const el = document.getElementById(id);
    if (!el) return false;

    const scrollMargin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - scrollMargin;

    window.scrollTo({ top, behavior });
    return true;
}

/** `#hello` 형태의 hash → 스크롤 (요소 없으면 false) */
export function scrollToSectionHash(hash: string, behavior: ScrollBehavior = 'smooth'): boolean {
    const id = hash.replace(/^#/, '');
    if (!id) return false;
    return scrollToSectionById(id, behavior);
}

/** 비동기 섹션 마운트 대기 후 스크롤 (최대 ~20프레임) */
export function scrollToSectionHashWhenReady(hash: string, behavior: ScrollBehavior = 'smooth'): Promise<boolean> {
    if (!import.meta.client) return Promise.resolve(false);

    return new Promise((resolve) => {
        let attempt = 0;
        const maxAttempts = 20;

        const tryScroll = () => {
            if (scrollToSectionHash(hash, behavior)) {
                resolve(true);
                return;
            }
            attempt += 1;
            if (attempt < maxAttempts) {
                requestAnimationFrame(tryScroll);
            } else {
                resolve(false);
            }
        };

        requestAnimationFrame(tryScroll);
    });
}
