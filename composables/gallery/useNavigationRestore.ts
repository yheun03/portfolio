import { activateGalleryEntry } from '@composables/gallery/useGalleryEntryFocus';

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
    const canRestore = computed(() => {
        const data = snapshot.value;
        return Boolean(data && data.path && data.path !== route.fullPath);
    });

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

    return {
        canRestore,
        goBack,
    };
}

export { isGalleryDetailPath, isRestorableOrigin, RESTORE_SNAPSHOT_KEY };
