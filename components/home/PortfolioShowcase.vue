<template>
    <section id="works" ref="showcaseRef" class="section section--works" aria-labelledby="section-works-title">
        <BaseSectionTitle title-id="section-works-title" :eyebrow="t('nav.works')" :title="t('story.showcaseTitle')"
            :description="t('story.showcaseDescription')" />

        <ul class="showcase__list">
            <li v-for="(work, index) in showcaseWorks" :key="work.id"
                :class="['showcase__item', { 'showcase__item--featured': index === 0 }]"
                :style="{ '--animate-delay': `${index * 90}ms` }" data-animate>
                <NuxtLink :to="`/projects/${work.id}`" class="story-case"
                    :aria-label="`${pick(work.title)}, ${t('story.caseCta')}`">
                    <span class="story-case__watermark" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>

                    <p class="story-case__head">
                        <span class="story-case__tag">
                            {{ pick(work.type) }}
                            <span v-if="index === 0" class="story-case__badge">{{ t("story.featuredBadge") }}</span>
                        </span>
                        <span class="story-case__period">{{ work.period }}</span>
                    </p>

                    <h3>{{ pick(work.title) }}</h3>
                    <p class="story-case__summary">{{ pick(work.introduction) }}</p>

                    <ul class="story-case__stack" :aria-label="locale === 'ko' ? '사용 기술' : 'Tech stack'">
                        <li v-for="tech in work.tech.slice(0, 4)" :key="tech">{{ tech }}</li>
                    </ul>

                    <span class="story-case__cta" aria-hidden="true">
                        {{ t("story.caseCta") }}
                        <span class="story-case__cta-arrow">→</span>
                    </span>
                </NuxtLink>
            </li>
        </ul>

        <nav class="showcase__more" :aria-label="locale === 'ko' ? '프로젝트 갤러리 바로가기' : 'Project galleries'">
            <NuxtLink class="base-button base-button--ghost" to="/projects">{{ t("works.fullArchiveLink") }}</NuxtLink>
            <NuxtLink class="base-button base-button--ghost" to="/personal">{{ t("personal.fullArchiveLink") }}</NuxtLink>
        </nav>
    </section>
</template>

<script setup lang="ts">
import { getCareerWorkById, type WorkItem } from '@data/works';
import { usePointerGlow } from '@composables/ui/usePointerGlow';

const { t, pick, locale } = useLocale();

// 홈 대표 케이스 3건 — 수상작 · 자사 솔루션 · SI 대표
const SHOWCASE_IDS = ['toms', 'framework', 'samhwa-eco-dashboard'] as const;

const showcaseWorks = computed(() =>
    SHOWCASE_IDS.map((id) => getCareerWorkById(id)).filter((w): w is WorkItem => w !== null),
);

const showcaseRef = ref<HTMLElement | null>(null);
usePointerGlow(showcaseRef, '.story-case');
</script>
