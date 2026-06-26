// 갤러리(projects/personal) 라우트 진입 시 Roboto Slab 폰트를 idle 후 지연 로드
import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

export default defineNuxtPlugin(() => {
    const route = useRoute();
    function isGalleryRoute(path: string) { return /(?:^|\/)(?:projects|personal)(?:\/|$)/.test(path); }
    let loaded = false;

    function loadFonts() {
        if (loaded) return;
        loaded = true;
        scheduleAfterFirstPaint(() => {
            void import('@fontsource/roboto-slab/latin-400.css');
            void import('@fontsource/roboto-slab/latin-700.css');
            void import('@fontsource/roboto-slab/latin-900.css');
        }, 1200);
    }

    if (isGalleryRoute(route.path)) {
        loadFonts();
        return;
    }

    const stop = watch(
        () => route.path,
        (path) => {
            if (isGalleryRoute(path)) {
                loadFonts();
                stop();
            }
        },
    );
});
