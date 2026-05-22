/** 갤러리(에디토리얼) 전용 폰트 — 홈 등에서는 로드하지 않음 */
export default defineNuxtPlugin(() => {
    const route = useRoute();
    const isGalleryRoute = (path: string) => /(?:^|\/)(?:projects|personal)(?:\/|$)/.test(path);

    const loadFonts = () => {
        void import('@fontsource/roboto-slab/latin-400.css');
        void import('@fontsource/roboto-slab/latin-700.css');
        void import('@fontsource/roboto-slab/latin-900.css');
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
