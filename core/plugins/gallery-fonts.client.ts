/** 갤러리(에디토리얼) 전용 폰트 — 홈 등에서는 로드하지 않음 */
export default defineNuxtPlugin(() => {
    const route = useRoute();
    const needsGalleryFont = () =>
        /(?:^|\/)(?:projects|personal)(?:\/|$)/.test(route.path);

    const loadFonts = () => {
        void import('@fontsource/roboto-slab/400.css');
        void import('@fontsource/roboto-slab/700.css');
        void import('@fontsource/roboto-slab/900.css');
    };

    if (needsGalleryFont()) {
        loadFonts();
        return;
    }

    const stop = watch(
        () => route.path,
        (path) => {
            if (/(?:^|\/)(?:projects|personal)(?:\/|$)/.test(path)) {
                loadFonts();
                stop();
            }
        },
    );
});
