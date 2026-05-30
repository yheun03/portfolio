<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="basePath"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article ref="galleryPageRef" class="gallery-page section gallery-page--editorial" :class="galleryVariantClass"
            :aria-label="t(titleKey)">
            <GalleryPageHeader :view-mode="viewMode" :title="t(titleKey)" :dek="lead" :kicker="editorialKicker"
                :hero-number="heroNumber" :hero-aria-label="heroAriaLabel" :status-label="t('gallery.indexLabel')"
                :stats="editorialStats" :sort-legend="sortLegend" :sort-aria-label="sortAriaLabel"
                :view-legend="viewLegend" :view-aria-label="viewAriaLabel" :sort-options="sortOptions"
                :view-options="viewOptions" :sort-mode="sortMode" @update:sort-mode="sortMode = $event"
                @update:view-mode="viewMode = $event" />

            <GalleryArchiveListRenderer :view-mode="viewMode" :editorial-year-groups="editorialYearGroups"
                :gallery-entries="galleryEntries" :base-path="basePath" :list-aria-label="t('gallery.projectList')"
                :flat-aria-label="t('gallery.otherProjects')" :entry-label="t('gallery.viewEntry')" />
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import GalleryArchiveListRenderer from '~/components/gallery/GalleryArchiveListRenderer.vue';
import GalleryPageHeader from '~/components/gallery/GalleryPageHeader.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    works: readonly WorkItem[];
}>();

const layoutLinks = useSubpageNavLinks();
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);

const {
    t,
    sortMode,
    viewMode,
    sortOptions,
    viewOptions,
    galleryEntries,
    editorialYearGroups,
    lead,
    editorialKicker,
    editorialStats,
    heroNumber,
    heroAriaLabel,
    sortLegend,
    sortAriaLabel,
    viewLegend,
    viewAriaLabel,
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, props.works);

const galleryPageRef = ref<HTMLElement | null>(null);
useGalleryEntryFocusScope(galleryPageRef);
</script>
