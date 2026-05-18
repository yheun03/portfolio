<template>
    <NuxtLink :to="to" class="gallery-card" :class="viewMode === 'editorial' ? 'gallery-editorial__entry' : 'gallery-card--grid'"
        data-motion="lift">
        <template v-if="viewMode === 'editorial'">
            <div class="gallery-card__body">
                <p class="gallery-editorial__entry-kicker">
                    <span>{{ pick(work.duration) }}</span>
                    <span aria-hidden="true">•</span>
                    <span>{{ pick(work.type) }}</span>
                </p>
                <h2 class="gallery-editorial__entry-title">{{ pick(work.title) }}</h2>
                <span class="gallery-editorial__entry-rule" aria-hidden="true" />
                <p class="gallery-editorial__entry-label">{{ entryLabel }}</p>
                <p class="gallery-editorial__entry-dek">{{ pick(work.introduction) }}</p>
                <ul v-if="work.languages.length" class="gallery-editorial__entry-tags"
                    :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>
            </div>
            <div class="gallery-card__media">
                <img :src="coverSrc" :alt="coverAlt" loading="lazy" decoding="async" fetchpriority="low" width="1200"
                    height="675" />
            </div>
        </template>
        <template v-else>
            <div class="gallery-card__media">
                <img :src="coverSrc" :alt="coverAlt" loading="lazy" decoding="async" fetchpriority="low" width="1200"
                    height="675" />
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
import type { WorkItem } from '~/core/data/works';
import type { GalleryViewMode } from '~/core/composables/useGalleryViewMode';

const props = withDefaults(
    defineProps<{
        work: WorkItem;
        to: string;
        viewMode?: GalleryViewMode;
        entryLabel?: string;
    }>(),
    {
        viewMode: 'editorial',
    },
);

const { t, pick, locale } = useLocale();
const { resolveAppPath } = useAppPathResolver();

const entryLabel = computed(
    () => props.entryLabel ?? (locale.value === 'ko' ? '상세 보기' : 'View detail'),
);

const coverSrc = computed(() => resolveAppPath(props.work.captures[0] ?? '/images/projects/placeholder.svg'));
const coverAlt = computed(() =>
    locale.value === 'ko' ? `${pick(props.work.title)} 캡처` : `Screenshot: ${pick(props.work.title)}`,
);
</script>
