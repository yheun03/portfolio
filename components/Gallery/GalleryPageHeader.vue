<template>
    <header :class="viewMode === 'editorial' ? 'gallery-editorial__masthead' : 'gallery-page__head'">
        <template v-if="viewMode === 'editorial'">
            <p class="gallery-editorial__kicker">{{ kicker }}</p>
            <h1 class="gallery-editorial__headline">{{ title }}</h1>
            <span class="gallery-editorial__rule" aria-hidden="true" />
            <p class="gallery-editorial__hero-num" :aria-label="heroAriaLabel">{{ heroNumber }}</p>
            <p class="gallery-editorial__status">{{ statusLabel }}</p>
            <p class="gallery-editorial__stats">{{ stats }}</p>
            <p class="gallery-editorial__dek">{{ dek }}</p>
        </template>
        <template v-else>
            <p class="technical-label">{{ gridEyebrow }}</p>
            <h1 class="gallery-page__title">{{ title }}</h1>
            <p class="gallery-page__lead">{{ dek }}</p>
        </template>

        <div class="gallery-page__toolbar">
            <div v-if="viewOptions.length" class="gallery-page__tool-group" role="radiogroup" :aria-label="viewAriaLabel">
                <p>{{ viewLegend }}</p>
                <button v-for="option in viewOptions" :key="option.value" type="button"
                    :class="{ 'is-active': viewMode === option.value }" :aria-checked="viewMode === option.value"
                    role="radio" @click="$emit('update:viewMode', option.value)">
                    {{ option.label }}
                </button>
            </div>
            <div v-if="sortOptions.length" class="gallery-page__tool-group" role="radiogroup" :aria-label="sortAriaLabel">
                <p>{{ sortLegend }}</p>
                <button v-for="option in sortOptions" :key="option.value" type="button"
                    :class="{ 'is-active': sortMode === option.value }" :aria-checked="sortMode === option.value"
                    role="radio" @click="$emit('update:sortMode', option.value)">
                    {{ option.label }}
                </button>
            </div>
        </div>
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
</script>
