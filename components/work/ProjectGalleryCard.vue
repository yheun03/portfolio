<template>
    <NuxtLink :id="galleryEntryId(work.id)" :to="to" class="gallery-card"
        :class="viewMode === 'editorial' ? 'gallery-editorial__entry' : 'gallery-card--grid'" data-motion="lift"
        :aria-label="cardAriaLabel">
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

                <div class="gallery-editorial__entry-media"
                    :class="{ 'gallery-editorial__entry-media--long': hasLongCaptureMedia }">
                    <span v-if="isPlaceholderCover" class="gallery-card__empty-capture" role="img"
                        :aria-label="emptyCaptureLabel">
                        <span class="gallery-card__empty-capture-kicker">{{ emptyCaptureKicker }}</span>
                        <span class="gallery-card__empty-capture-copy">{{ emptyCaptureCopy }}</span>
                    </span>
                    <span v-else class="gallery-editorial__entry-screen">
                        <img :src="coverSrc" :alt="coverAlt" :aria-hidden="isPlaceholderCover ? true : undefined"
                            :loading="imageLoading" decoding="async" :fetchpriority="imageFetchPriority" width="1200"
                            height="675" />
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="gallery-card__media" :class="{ 'gallery-card__media--long': hasLongCaptureMedia }">
                <span v-if="isPlaceholderCover" class="gallery-card__empty-capture" role="img"
                    :aria-label="emptyCaptureLabel">
                    <span class="gallery-card__empty-capture-kicker">{{ emptyCaptureKicker }}</span>
                    <span class="gallery-card__empty-capture-copy">{{ emptyCaptureCopy }}</span>
                </span>
                <span v-else class="gallery-card__screen">
                    <img :src="coverSrc" :alt="coverAlt" :aria-hidden="isPlaceholderCover ? true : undefined"
                        :loading="imageLoading" decoding="async" :fetchpriority="imageFetchPriority" width="1200"
                        height="675" />
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
import type { WorkItem } from '@data/works';
import type { GalleryViewMode } from '@composables/gallery/useGallery';
import { galleryEntryId } from '@composables/gallery/useNavigationRestore';
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

const cardAriaLabel = computed(() => {
    const title = pick(props.work.title);
    return locale.value === 'ko' ? `${title}, ${entryLabel.value}` : `${title}, ${entryLabel.value}`;
});

const entryYearSuffix = computed(() => {
    const year = getWorkStartYear(props.work);
    return year ? year.slice(-2) : '';
});

const coverSrc = computed(() => resolveAppPath(props.work.captures[0] ?? '/images/projects/placeholder.svg'));
const hasLongCaptureMedia = computed(() => /\/(thumbnail-(?:pc|mb)|modal-\d+)\.png$/i.test(props.work.captures[0] ?? ''));
const isPlaceholderCover = computed(() => {
    const src = props.work.captures[0] ?? '';
    return !src || /placeholder/i.test(src);
});

const coverAlt = computed(() => {
    if (isPlaceholderCover.value) return '';
    const title = pick(props.work.title);
    return locale.value === 'ko' ? `${title} 캡처` : `Screenshot: ${title}`;
});

const emptyCaptureKicker = computed(() => (locale.value === 'ko' ? '이미지 준비 중' : 'Image pending'));
const emptyCaptureCopy = computed(() => (
    locale.value === 'ko'
        ? '대신 설명은 먼저 열어뒀어요.'
        : 'The context is already open.'
));
const emptyCaptureLabel = computed(() => `${emptyCaptureKicker.value}. ${emptyCaptureCopy.value}`);

const imageLoading = computed(() => (props.priority ? 'eager' : 'lazy'));
const imageFetchPriority = computed(() => (props.priority ? 'high' : 'low'));
</script>
