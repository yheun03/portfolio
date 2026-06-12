<template>
    <header class="gallery-editorial__masthead">
        <div class="gallery-editorial__poster">
            <div class="gallery-editorial__poster-top">
                <p class="gallery-editorial__kicker">{{ kicker }}</p>
                <p class="gallery-editorial__stats">{{ stats }}</p>
            </div>

            <div class="gallery-editorial__poster-hero">
                <h1 id="gallery-poster-title" class="gallery-editorial__headline">{{ title }}</h1>
                <span class="gallery-editorial__rule" aria-hidden="true" />
                <p class="gallery-editorial__hero-num" aria-hidden="true">{{ heroNumber }}</p>
                <p v-if="heroAriaLabel" class="visually-hidden">{{ heroAriaLabel }}</p>
                <p class="gallery-editorial__status">{{ statusLabel }}</p>
            </div>

            <p class="gallery-editorial__dek">{{ dek }}</p>
        </div>

        <nav class="gallery-page__toolbar" :aria-label="toolbarAriaLabel">
            <BaseSegmentControl v-if="viewOptions.length" :model-value="viewMode" :options="viewOptions"
                :label-text="viewLegend" :label-id="viewLabelId"
                @update:model-value="emit('update:viewMode', $event as GalleryViewMode)" />
            <BaseSegmentControl v-if="sortOptions.length" :model-value="sortMode" :options="sortOptions"
                :label-text="sortLegend" :label-id="sortLabelId"
                @update:model-value="emit('update:sortMode', $event as WorkSortMode)" />
        </nav>
    </header>
</template>

<script setup lang="ts">
import type { GalleryViewMode } from '@composables/gallery/useGallery';
import type { WorkSortMode } from '@utils/work-timeline';

defineProps<{
    viewMode: GalleryViewMode;
    title: string;
    dek: string;
    kicker?: string;
    heroNumber?: string;
    heroAriaLabel?: string;
    statusLabel?: string;
    stats?: string;
    sortLegend: string;
    sortAriaLabel: string;
    viewLegend: string;
    viewAriaLabel: string;
    toolbarAriaLabel: string;
    sortOptions: { value: WorkSortMode; label: string }[];
    viewOptions: { value: GalleryViewMode; label: string }[];
    sortMode: WorkSortMode;
}>();

const emit = defineEmits<{
    'update:sortMode': [value: WorkSortMode];
    'update:viewMode': [value: GalleryViewMode];
}>();

const viewLabelId = 'gallery-toolbar-view-label';
const sortLabelId = 'gallery-toolbar-sort-label';
</script>
