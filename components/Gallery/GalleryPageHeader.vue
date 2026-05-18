<template>
    <header :class="viewMode === 'editorial' ? 'gallery-editorial__masthead' : 'gallery-page__head'">
        <div v-if="viewMode === 'editorial'" class="gallery-editorial__poster" aria-labelledby="gallery-poster-title">
            <div class="gallery-editorial__poster-top">
                <p class="gallery-editorial__kicker">{{ kicker }}</p>
                <p class="gallery-editorial__stats">{{ stats }}</p>
            </div>

            <div class="gallery-editorial__poster-hero">
                <h1 id="gallery-poster-title" class="gallery-editorial__headline">{{ title }}</h1>
                <span class="gallery-editorial__rule" aria-hidden="true" />
                <p class="gallery-editorial__hero-num" :aria-label="heroAriaLabel">{{ heroNumber }}</p>
                <p class="gallery-editorial__status">{{ statusLabel }}</p>
            </div>

            <p class="gallery-editorial__dek">{{ dek }}</p>
        </div>
        <template v-else>
            <p class="technical-label">{{ gridEyebrow }}</p>
            <h1 class="gallery-page__title">{{ title }}</h1>
            <p class="gallery-page__lead">{{ dek }}</p>
        </template>

        <nav class="gallery-page__toolbar"
            :aria-label="locale === 'ko' ? '목록 표시 및 정렬' : 'List display and sort'">
            <div v-if="viewOptions.length" class="gallery-page__control">
                <span :id="viewLabelId" class="gallery-page__control-label">{{ viewLegend }}</span>
                <div class="gallery-page__segments" role="radiogroup" :aria-labelledby="viewLabelId">
                    <button v-for="option in viewOptions" :key="option.value" type="button"
                        class="gallery-page__segment" :class="{ 'is-active': viewMode === option.value }"
                        :aria-checked="viewMode === option.value" role="radio"
                        @click="$emit('update:viewMode', option.value)">
                        {{ option.label }}
                    </button>
                </div>
            </div>
            <div v-if="sortOptions.length" class="gallery-page__control">
                <span :id="sortLabelId" class="gallery-page__control-label">{{ sortLegend }}</span>
                <div class="gallery-page__segments" role="radiogroup" :aria-labelledby="sortLabelId">
                    <button v-for="option in sortOptions" :key="option.value" type="button"
                        class="gallery-page__segment" :class="{ 'is-active': sortMode === option.value }"
                        :aria-checked="sortMode === option.value" role="radio"
                        @click="$emit('update:sortMode', option.value)">
                        {{ option.label }}
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import type { GalleryViewMode } from '~/core/composables/useGalleryViewMode';
import type { WorkSortMode } from '~/core/utils/workSort';

defineProps<{
    viewMode: GalleryViewMode;
    title: string;
    dek: string;
    kicker?: string;
    heroNumber?: string;
    heroAriaLabel?: string;
    statusLabel?: string;
    stats?: string;
    gridEyebrow?: string;
    sortLegend: string;
    sortAriaLabel: string;
    viewLegend: string;
    viewAriaLabel: string;
    sortOptions: { value: WorkSortMode; label: string }[];
    viewOptions: { value: GalleryViewMode; label: string }[];
    sortMode: WorkSortMode;
}>();

defineEmits<{
    'update:sortMode': [value: WorkSortMode];
    'update:viewMode': [value: GalleryViewMode];
}>();

const { locale } = useLocale();
const viewLabelId = 'gallery-toolbar-view-label';
const sortLabelId = 'gallery-toolbar-sort-label';
</script>
