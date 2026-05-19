<template>
    <NuxtLink :to="to" class="gallery-card"
        :class="viewMode === 'editorial' ? 'gallery-editorial__entry' : 'gallery-card--grid'"
        :aria-label="cardAriaLabel" data-motion="lift">
        <template v-if="viewMode === 'editorial'">
            <div class="gallery-editorial__entry-poster">
                <span v-if="entryYearSuffix" class="gallery-editorial__entry-index" aria-hidden="true">{{
                    entryYearSuffix }}</span>

                <p class="gallery-editorial__entry-kicker">
                    <span>{{ pick(work.duration) }}</span>
                    <span aria-hidden="true">•</span>
                    <span>{{ pick(work.type) }}</span>
                    <span v-if="work.period" aria-hidden="true">•</span>
                    <span v-if="work.period">{{ work.period }}</span>
                </p>

                <div class="gallery-editorial__entry-hero">
                    <h2 class="gallery-editorial__entry-title">{{ pick(work.title) }}</h2>
                    <span class="gallery-editorial__entry-rule" aria-hidden="true" />
                    <p class="gallery-editorial__entry-label" aria-hidden="true">{{ entryLabel }}</p>
                </div>

                <p class="gallery-editorial__entry-dek">{{ pick(work.introduction) }}</p>

                <ul v-if="work.languages.length" class="gallery-editorial__entry-tags"
                    :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>

                <div class="gallery-card__media" :class="{ 'gallery-card__media--long': isLongCapture }">
                    <span class="gallery-card__screen">
                        <img :src="coverSrc" :alt="coverAlt" :loading="imageLoading" decoding="async"
                            :fetchpriority="imageFetchPriority" width="1200" height="675" />
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="gallery-card__media" :class="{ 'gallery-card__media--long': isLongCapture }">
                <span class="gallery-card__screen">
                    <img :src="coverSrc" :alt="coverAlt" :loading="imageLoading" decoding="async"
                        :fetchpriority="imageFetchPriority" width="1200" height="675" />
                </span>
            </div>
            <div class="gallery-card__body">
                <p class="gallery-card__meta">
                    <span>{{ pick(work.duration) }}</span>
                    <span aria-hidden="true">·</span>
                    <span>{{ pick(work.type) }}</span>
                </p>
                <h2 class="gallery-card__title">{{ pick(work.title) }}</h2>
                <p class="gallery-card__excerpt">{{ pick(work.introduction) }}</p>
                <ul v-if="work.languages.length" class="gallery-card__langs" :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>
            </div>
        </template>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { WorkItem } from '@content/works';
import type { GalleryViewMode } from '@composables/useGalleryViewMode';
import { getWorkStartYear } from '@utils/workSort';

const props = withDefaults(
    defineProps<{
        work: WorkItem;
        to: string;
        viewMode?: GalleryViewMode;
        entryLabel?: string;
        priority?: boolean;
    }>(),
    {
        viewMode: 'editorial',
        priority: false,
    },
);

const { t, pick, locale } = useLocale();
const { resolveAppPath } = useAppPathResolver();

const entryLabel = computed(
    () => props.entryLabel ?? (locale.value === 'ko' ? '상세 보기' : 'View detail'),
);

const entryYearSuffix = computed(() => {
    const year = getWorkStartYear(props.work);
    return year ? year.slice(-2) : '';
});

const coverSrc = computed(() => resolveAppPath(props.work.captures[0] ?? '/images/projects/placeholder.svg'));
const isLongCapture = computed(() => /\/(thumbnail-(?:pc|mb)|modal-\d+)\.png$/i.test(props.work.captures[0] ?? ''));
const isPlaceholderCover = computed(() => {
    const src = props.work.captures[0] ?? '';
    return !src || /placeholder/i.test(src);
});

const coverAlt = computed(() => {
    if (isPlaceholderCover.value) return '';
    const title = pick(props.work.title);
    return locale.value === 'ko' ? `${title} 캡처` : `Screenshot: ${title}`;
});

const cardAriaLabel = computed(() => {
    const title = pick(props.work.title);
    const type = pick(props.work.type);
    const period = props.work.period ? `, ${props.work.period}` : '';
    const action = entryLabel.value;
    return locale.value === 'ko'
        ? `${title}, ${type}${period}. ${action}`
        : `${title}, ${type}${period}. ${action}`;
});
const imageLoading = computed(() => (props.priority ? 'eager' : 'lazy'));
const imageFetchPriority = computed(() => (props.priority ? 'high' : 'low'));
</script>
