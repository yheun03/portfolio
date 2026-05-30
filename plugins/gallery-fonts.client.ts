import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

/**
 * 목표: 갤러리 화면에서만 에디토리얼 전용 폰트를 지연 로드한다.
 * 기능: projects/personal 라우트일 때 idle 이후 Roboto Slab CSS를 불러온다.
 */
export default defineNuxtPlugin(() => {
    const route = useRoute();
    const isGalleryRoute = (path: string) => /(?:^|\/)(?:projects|personal)(?:\/|$)/.test(path);
    let loaded = false;

    const loadFonts = () => {
        if (loaded) return;
        loaded = true;
        scheduleAfterFirstPaint(() => {
            void import('@fontsource/roboto-slab/latin-400.css');
            void import('@fontsource/roboto-slab/latin-700.css');
            void import('@fontsource/roboto-slab/latin-900.css');
        }, 1200);
    };

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
