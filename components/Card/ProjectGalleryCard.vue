<template>
    <NuxtLink :to="to" class="gallery-card" data-motion="lift">
        <div class="gallery-card__media">
            <img :src="coverSrc" :alt="coverAlt" loading="lazy" width="1200" height="675" />
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
    </NuxtLink>
</template>

<script setup lang="ts">
import type { WorkItem } from "~/core/data/works";

const props = defineProps<{
    work: WorkItem;
    to: string;
}>();

const { t, pick, locale } = useLocale();

const coverSrc = computed(() => props.work.captures[0] ?? "/images/projects/placeholder.svg");
const coverAlt = computed(() =>
    locale.value === "ko" ? `${pick(props.work.title)} 캡처` : `Screenshot: ${pick(props.work.title)}`,
);
</script>
