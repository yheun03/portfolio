import type { RouterConfig } from '@nuxt/schema';
import { isGalleryDetailPath, readNavigationRestoreSnapshot } from '@composables/gallery/useNavigationRestore';
import { scrollToSectionHashWhenReady } from '@utils/sectionAnchorScroll';

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
