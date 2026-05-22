import type { MaybeRef } from 'vue';
import { galleryEntryId } from '@composables/gallery/useNavigationRestore';

export const GALLERY_ENTRY_ACTIVE_CLASS = 'is-gallery-entry-active';
const GALLERY_ENTRY_SELECTOR = 'a.gallery-card[id^="gallery-entry-"]';
const VIEWPORT_CENTER_RATIO = 0.5;
const SCROLL_LISTENER_OPTIONS = { passive: true } as const;

export function findGalleryEntryElement(node: EventTarget | null | undefined): HTMLElement | null {
    if (!(node instanceof Element)) return null;
    return node.closest<HTMLElement>(GALLERY_ENTRY_SELECTOR);
}

export function isGalleryEntryElement(el: Element | null): el is HTMLElement {
    return findGalleryEntryElement(el) === el;
}

function getGalleryEntries(scope: HTMLElement | Document = document) {
    return Array.from(scope.querySelectorAll<HTMLElement>(GALLERY_ENTRY_SELECTOR));
}

function findEntryAtViewportTarget(scope: HTMLElement, ratio = VIEWPORT_CENTER_RATIO): HTMLElement | null {
    const targetY = window.innerHeight * ratio;
    const entries = getGalleryEntries(scope);

    return entries.reduce<{ entry: HTMLElement | null; distance: number }>(
        (closest, entry) => {
            const rect = entry.getBoundingClientRect();
            const crossesTarget = rect.top <= targetY && rect.bottom >= targetY;
            if (!crossesTarget) return closest;

            const entryCenter = rect.top + rect.height / 2;
            const distance = Math.abs(entryCenter - targetY);
            return distance < closest.distance ? { entry, distance } : closest;
        },
        { entry: null, distance: Number.POSITIVE_INFINITY },
    ).entry;
}

/** 카드 세로 중앙이 뷰포트 높이의 50%에 오도록 스크롤 */
export function scrollGalleryEntryToViewportCenter(el: HTMLElement, ratio = VIEWPORT_CENTER_RATIO) {
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight * ratio;
    const nextTop = Math.max(0, window.scrollY + cardCenter - viewportCenter);

    window.scrollTo({ top: nextTop, behavior: 'instant' });
}

export function clearActiveGalleryEntry(scope: HTMLElement | Document = document) {
    if (!import.meta.client) return;
    scope.querySelectorAll(`.gallery-card.${GALLERY_ENTRY_ACTIVE_CLASS}`).forEach((node) => node.classList.remove(GALLERY_ENTRY_ACTIVE_CLASS));
}

export function setActiveGalleryEntry(el: HTMLElement | null, scope: HTMLElement | Document = document) {
    if (!import.meta.client) return;
    clearActiveGalleryEntry(scope);
    el?.classList.add(GALLERY_ENTRY_ACTIVE_CLASS);
}

function focusGalleryEntry(entry: HTMLElement) {
    if (document.activeElement !== entry) {
        entry.focus({ preventScroll: true });
    }
}

/** 스크롤(50% 뷰포트) + 포커스 + 활성(그림자) 스타일 */
export function handleGalleryEntryFocus(entry: HTMLElement, scope?: HTMLElement | Document) {
    if (!import.meta.client) return;

    scrollGalleryEntryToViewportCenter(entry);
    setActiveGalleryEntry(entry, scope);
    focusGalleryEntry(entry);
}

export function activateGalleryEntry(workId: string) {
    if (!import.meta.client) return false;

    const el = document.getElementById(galleryEntryId(workId));
    if (!(el instanceof HTMLElement)) return false;

    handleGalleryEntryFocus(el);
    return true;
}

export function activateGalleryEntryElement(el: HTMLElement) {
    handleGalleryEntryFocus(el);
}

function resolveScopeElement(scope: MaybeRef<HTMLElement | null | undefined> | string): HTMLElement | null {
    if (typeof scope === 'string') {
        return document.querySelector<HTMLElement>(scope);
    }
    return unref(scope) ?? null;
}

/**
 * 갤러리 목록에서 스크롤 또는 Tab 이동으로 카드가 뷰포트 50% 기준선에 닿으면
 * 포커스와 활성(그림자) 스타일을 같은 기준으로 맞춘다.
 * (SSR에서 hooks가 등록되도록 client 가드는 onMounted 안에만 둠)
 */
export function useGalleryEntryFocusScope(scope: MaybeRef<HTMLElement | null | undefined> | string = '.gallery-page') {
    let scopeEl: HTMLElement | null = null;
    let rafId = 0;
    let ignoreNextFocusIn = false;

    const cancelScheduledActivation = () => {
        if (!rafId) return;
        window.cancelAnimationFrame(rafId);
        rafId = 0;
    };

    const activateEntryAtTarget = () => {
        rafId = 0;
        if (!scopeEl) return;

        const entry = findEntryAtViewportTarget(scopeEl);
        if (!entry) {
            clearActiveGalleryEntry(scopeEl);
            return;
        }

        setActiveGalleryEntry(entry, scopeEl);
        ignoreNextFocusIn = true;
        focusGalleryEntry(entry);
    };

    const scheduleEntryActivation = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(activateEntryAtTarget);
    };

    const onFocusIn = (event: FocusEvent) => {
        if (ignoreNextFocusIn) {
            ignoreNextFocusIn = false;
            return;
        }

        const entry = findGalleryEntryElement(event.target);
        if (!entry) return;
        handleGalleryEntryFocus(entry, scopeEl ?? undefined);
    };

    const onFocusOut = (event: FocusEvent) => {
        const currentEntry = findGalleryEntryElement(event.target);
        if (!currentEntry) return;

        const nextEntry = findGalleryEntryElement(event.relatedTarget);
        if (nextEntry) return;

        clearActiveGalleryEntry();
    };

    onMounted(() => {
        if (!import.meta.client) return;

        scopeEl = resolveScopeElement(scope);
        if (!scopeEl) return;

        scopeEl.addEventListener('focusin', onFocusIn, true);
        scopeEl.addEventListener('focusout', onFocusOut, true);
        window.addEventListener('scroll', scheduleEntryActivation, SCROLL_LISTENER_OPTIONS);
        window.addEventListener('resize', scheduleEntryActivation, SCROLL_LISTENER_OPTIONS);
    });

    onBeforeUnmount(() => {
        if (!import.meta.client || !scopeEl) return;

        cancelScheduledActivation();
        scopeEl.removeEventListener('focusin', onFocusIn, true);
        scopeEl.removeEventListener('focusout', onFocusOut, true);
        window.removeEventListener('scroll', scheduleEntryActivation);
        window.removeEventListener('resize', scheduleEntryActivation);
        clearActiveGalleryEntry(scopeEl);
    });
}
