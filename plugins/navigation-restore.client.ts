import {
    clearNavigationRestoreSnapshot,
    getGalleryDetailWorkId,
    isGalleryDetailPath,
    isRestorableOrigin,
    readNavigationRestoreSnapshot,
    restoreFocusForSnapshot,
    restoreScrollForSnapshot,
    saveNavigationRestoreSnapshot,
} from '@composables/gallery/useNavigationRestore';

export default defineNuxtPlugin(() => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const router = useRouter();

    router.beforeEach((to, from) => {
        if (!isGalleryDetailPath(to.path)) return;
        if (!from.path || from.path === to.path) return;
        if (!isRestorableOrigin(from.path)) return;

        const focusWorkId = getGalleryDetailWorkId(to.path) ?? undefined;
        saveNavigationRestoreSnapshot(from.fullPath, window.scrollY, focusWorkId);
    });

    router.afterEach((to) => {
        const snapshot = readNavigationRestoreSnapshot();
        if (!snapshot) return;
        if (to.fullPath !== snapshot.path) return;
        if (isGalleryDetailPath(to.path)) return;

        if (snapshot.focusWorkId) {
            restoreFocusForSnapshot(snapshot);
        } else {
            restoreScrollForSnapshot(snapshot);
        }
        clearNavigationRestoreSnapshot();
    });
});
