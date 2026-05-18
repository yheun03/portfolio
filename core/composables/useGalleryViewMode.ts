export type GalleryViewMode = 'editorial' | 'grid';

export const GALLERY_VIEW_STORAGE_KEY = 'portfolio-gallery-view';

export function useGalleryViewMode() {
    const viewMode = ref<GalleryViewMode>('editorial');

    onMounted(() => {
        if (!import.meta.client) return;
        const stored = localStorage.getItem(GALLERY_VIEW_STORAGE_KEY);
        if (stored === 'editorial' || stored === 'grid') {
            viewMode.value = stored;
        }
    });

    watch(viewMode, (mode) => {
        if (!import.meta.client) return;
        localStorage.setItem(GALLERY_VIEW_STORAGE_KEY, mode);
    });

    return { viewMode };
}
