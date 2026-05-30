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
            <div v-if="viewOptions.length" class="gallery-page__control">
                <span :id="viewLabelId" class="gallery-page__control-label">{{ viewLegend }}</span>
                <div class="gallery-page__segments" role="radiogroup" :aria-labelledby="viewLabelId">
                    <button v-for="option in viewOptions" :key="option.value" type="button"
                        class="gallery-page__segment"
                        :class="{ 'gallery-page__segment--active': viewMode === option.value }"
                        :aria-checked="viewMode === option.value" role="radio"
                        :tabindex="viewMode === option.value ? 0 : -1" @click="emit('update:viewMode', option.value)"
                        @keydown="handleSegmentKeydown($event, viewOptions, viewMode, 'update:viewMode')">
                        {{ option.label }}
                    </button>
                </div>
            </div>
            <div v-if="sortOptions.length" class="gallery-page__control">
                <span :id="sortLabelId" class="gallery-page__control-label">{{ sortLegend }}</span>
                <div class="gallery-page__segments" role="radiogroup" :aria-labelledby="sortLabelId">
                    <button v-for="option in sortOptions" :key="option.value" type="button"
                        class="gallery-page__segment"
                        :class="{ 'gallery-page__segment--active': sortMode === option.value }"
                        :aria-checked="sortMode === option.value" role="radio"
                        :tabindex="sortMode === option.value ? 0 : -1" @click="emit('update:sortMode', option.value)"
                        @keydown="handleSegmentKeydown($event, sortOptions, sortMode, 'update:sortMode')">
                        {{ option.label }}
                    </button>
                </div>
            </div>
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

function handleSegmentKeydown<T extends string>(
    event: KeyboardEvent,
    options: { value: T; label: string }[],
    currentValue: T,
    eventName: 'update:sortMode' | 'update:viewMode',
) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const currentIndex = options.findIndex((option) => option.value === currentValue);
    const lastIndex = options.length - 1;
    const nextIndex =
        event.key === 'Home'
            ? 0
            : event.key === 'End'
                ? lastIndex
                : event.key === 'ArrowLeft'
                    ? (currentIndex - 1 + options.length) % options.length
                    : (currentIndex + 1) % options.length;
    const nextValue = options[nextIndex]?.value;

    if (nextValue && eventName === 'update:sortMode') {
        emit(eventName, nextValue as WorkSortMode);
    }
    if (nextValue && eventName === 'update:viewMode') {
        emit(eventName, nextValue as GalleryViewMode);
    }

    nextTick(() => {
        const target = event.currentTarget instanceof HTMLElement
            ? event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[nextIndex]
            : undefined;
        target?.focus();
    });
}
</script>
