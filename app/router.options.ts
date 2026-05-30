/**
 * 목표: Nuxt 라우터 스크롤 복원 정책을 앱 표준으로 정의한다.
 * 기능: 저장 위치, 해시 이동, 갤러리 상세 복귀 위치를 처리한다.
 */
import type { RouterConfig } from '@nuxt/schema';
import { isGalleryDetailPath, readNavigationRestoreSnapshot } from '@composables/gallery/useNavigationRestore';
import { scrollToSectionHashWhenReady } from '@utils/section-anchor-scroll';

export default {
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (!import.meta.client) {
            return to.hash ? false : { top: 0, left: 0 };
        }

        if (to.hash) {
            return scrollToSectionHashWhenReady(to.hash, 'smooth').then(() => false);
        }

        const snapshot = readNavigationRestoreSnapshot();
        if (snapshot && to.fullPath === snapshot.path && !isGalleryDetailPath(to.path)) {
            if (snapshot.focusWorkId) return false;
            return { top: snapshot.scrollY, left: 0, behavior: 'instant' };
        }

        return { top: 0, left: 0 };
    },
} satisfies RouterConfig;
