// 갤러리 목록↔상세 이동 시 스크롤·포커스 복원 — sessionStorage 스냅샷 저장, Escape 뒤로가기, 카드 활성화
import type { MaybeRef } from 'vue';

const GALLERY_ENTRY_ACTIVE_CLASS = 'is-gallery-entry-active';
const GALLERY_ENTRY_SELECTOR = 'a.gallery-card[id^="gallery-entry-"]';
const VIEWPORT_CENTER_RATIO = 0.5;
const SCROLL_LISTENER_OPTIONS = { passive: true } as const;
const ROW_TOP_TOLERANCE = 24;

const RESTORE_SNAPSHOT_KEY = 'portfolio-nav-restore';

export type NavigationRestoreSnapshot = {
    path: string;
    scrollY: number;
    /** 상세로 들어간 갤러리 카드(work.id) — 복귀 시 포커스 복원 */
    focusWorkId?: string;
    savedAt: number;
};

export function galleryEntryId(workId: string) {
    return `gallery-entry-${workId}`;
}

export function findGalleryEntryElement(node: EventTarget | null | undefined): HTMLElement | null {
    if (!(node instanceof Element)) return null;
    return node.closest<HTMLElement>(GALLERY_ENTRY_SELECTOR);
}

function getGalleryEntries(scope: HTMLElement | Document = document) {
    return Array.from(scope.querySelectorAll<HTMLElement>(GALLERY_ENTRY_SELECTOR));
}

function findEntryAtViewportTarget(scope: HTMLElement, ratio = VIEWPORT_CENTER_RATIO): HTMLElement | null {
    const targetY = window.innerHeight * ratio;
    const candidates = getGalleryEntries(scope)
        .map((entry) => ({ entry, rect: entry.getBoundingClientRect() }))
        .filter(({ rect }) => rect.top <= targetY && rect.bottom >= targetY);

    if (!candidates.length) return null;

    const closest = candidates.reduce((current, next) => {
        const currentDistance = Math.abs(current.rect.top + current.rect.height / 2 - targetY);
        const nextDistance = Math.abs(next.rect.top + next.rect.height / 2 - targetY);
        return nextDistance < currentDistance ? next : current;
    });

    return (
        candidates.filter(({ rect }) => Math.abs(rect.top - closest.rect.top) <= ROW_TOP_TOLERANCE).sort((a, b) => a.rect.left - b.rect.left)[0]
            ?.entry ?? closest.entry
    );
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

function resolveScopeElement(scope: MaybeRef<HTMLElement | null | undefined> | string): HTMLElement | null {
    if (typeof scope === 'string') {
        return document.querySelector<HTMLElement>(scope);
    }
    return unref(scope) ?? null;
}

function getEntryRow(entry: HTMLElement, scope: HTMLElement) {
    const entryRect = entry.getBoundingClientRect();
    return getGalleryEntries(scope)
        .map((rowEntry) => ({ entry: rowEntry, rect: rowEntry.getBoundingClientRect() }))
        .filter(({ rect }) => Math.abs(rect.top - entryRect.top) <= ROW_TOP_TOLERANCE)
        .sort((a, b) => a.rect.left - b.rect.left)
        .map(({ entry: rowEntry }) => rowEntry);
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

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        if (!scopeEl) return;

        const entry = findGalleryEntryElement(event.target);
        if (!entry) return;

        const row = getEntryRow(entry, scopeEl);
        if (row.length <= 1) return;

        const currentIndex = row.indexOf(entry);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextEntry = row[currentIndex + direction];
        if (!nextEntry) return;

        event.preventDefault();
        handleGalleryEntryFocus(nextEntry, scopeEl);
    };

    onMounted(() => {
        if (!import.meta.client) return;

        scopeEl = resolveScopeElement(scope);
        if (!scopeEl) return;

        scopeEl.addEventListener('focusin', onFocusIn, true);
        scopeEl.addEventListener('focusout', onFocusOut, true);
        scopeEl.addEventListener('keydown', onKeydown, true);
        window.addEventListener('scroll', scheduleEntryActivation, SCROLL_LISTENER_OPTIONS);
        window.addEventListener('resize', scheduleEntryActivation, SCROLL_LISTENER_OPTIONS);
    });

    onBeforeUnmount(() => {
        if (!import.meta.client || !scopeEl) return;

        cancelScheduledActivation();
        scopeEl.removeEventListener('focusin', onFocusIn, true);
        scopeEl.removeEventListener('focusout', onFocusOut, true);
        scopeEl.removeEventListener('keydown', onKeydown, true);
        window.removeEventListener('scroll', scheduleEntryActivation);
        window.removeEventListener('resize', scheduleEntryActivation);
        clearActiveGalleryEntry(scopeEl);
    });
}

export function getGalleryDetailWorkId(path: string): string | null {
    const match = path.match(/^\/(?:projects|personal)\/([^/]+)$/);
    return match?.[1] ?? null;
}

function isGalleryDetailPath(path: string): boolean {
    return getGalleryDetailWorkId(path) !== null;
}

function isRestorableOrigin(path: string): boolean {
    if (!path || path === '/') return true;
    if (isGalleryDetailPath(path)) return false;
    if (path === '/projects' || path.startsWith('/projects?')) return true;
    if (path === '/personal' || path.startsWith('/personal?')) return true;
    if (path.startsWith('/personal/')) return true;
    return false;
}

export function readNavigationRestoreSnapshot(): NavigationRestoreSnapshot | null {
    if (!import.meta.client) return null;

    try {
        const raw = sessionStorage.getItem(RESTORE_SNAPSHOT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as NavigationRestoreSnapshot;
        if (typeof parsed.path !== 'string' || typeof parsed.scrollY !== 'number') return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveNavigationRestoreSnapshot(path: string, scrollY: number, focusWorkId?: string) {
    if (!import.meta.client) return;

    const snapshot: NavigationRestoreSnapshot = {
        path,
        scrollY,
        ...(focusWorkId ? { focusWorkId } : {}),
        savedAt: Date.now(),
    };
    sessionStorage.setItem(RESTORE_SNAPSHOT_KEY, JSON.stringify(snapshot));
}

export function clearNavigationRestoreSnapshot() {
    if (!import.meta.client) return;
    sessionStorage.removeItem(RESTORE_SNAPSHOT_KEY);
}

export function restoreScrollForSnapshot(snapshot: NavigationRestoreSnapshot) {
    if (!import.meta.client) return;

    const targetY = snapshot.scrollY;
    let attempt = 0;
    const maxAttempts = 5;

    const apply = () => {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        attempt += 1;
        if (attempt < maxAttempts) {
            requestAnimationFrame(apply);
        }
    };

    nextTick(() => {
        requestAnimationFrame(apply);
    });
}

export function restoreFocusForSnapshot(snapshot: NavigationRestoreSnapshot) {
    if (!import.meta.client || !snapshot.focusWorkId) return;

    const workId = snapshot.focusWorkId;
    let attempt = 0;
    const maxAttempts = 10;

    const apply = () => {
        if (activateGalleryEntry(workId)) return;

        attempt += 1;
        if (attempt < maxAttempts) {
            requestAnimationFrame(apply);
        }
    };

    nextTick(() => {
        requestAnimationFrame(apply);
    });
}

export function useNavigationRestore(fallbackPath: string) {
    const router = useRouter();
    const route = useRoute();

    const snapshot = computed(() => readNavigationRestoreSnapshot());

    async function goBack() {
        const data = snapshot.value;
        if (data?.path && data.path !== route.fullPath) {
            await router.push(data.path);
            return;
        }

        await router.push(fallbackPath);
    }

    function onDocumentKeydown(event: KeyboardEvent) {
        if (event.key !== 'Escape' || event.defaultPrevented) return;
        if (event.target instanceof HTMLElement) {
            const tag = event.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) {
                return;
            }
        }

        event.preventDefault();
        void goBack();
    }

    onMounted(() => {
        if (!import.meta.client) return;
        document.addEventListener('keydown', onDocumentKeydown);
    });

    onBeforeUnmount(() => {
        if (!import.meta.client) return;
        document.removeEventListener('keydown', onDocumentKeydown);
    });

    return { goBack };
}

export { isGalleryDetailPath, isRestorableOrigin };
