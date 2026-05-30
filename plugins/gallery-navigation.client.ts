/**
 * 목표: 갤러리 상세 진입/복귀 시 브라우저 기본 스크롤 복원과 앱 복원 로직 충돌을 막는다.
 * 기능: 상세 진입 전 목록 스냅샷 저장, 목록 복귀 후 스크롤/포커스 복원을 수행한다.
 */
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
