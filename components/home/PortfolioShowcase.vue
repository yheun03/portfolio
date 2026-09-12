<template>
    <HomeSection id="works" section-class="section--works" title-id="section-works-title" :eyebrow="t('nav.works')"
        :title="t('story.showcaseTitle')" :description="t('story.showcaseDescription')">
        <ul class="showcase__list">
            <li v-for="(work, index) in homeShowcaseWorks" :key="work.id"
                :class="['showcase__item', { 'showcase__item--featured': index === 0 }]"
                :style="{ '--animate-delay': `${index * 90}ms` }" data-animate>
                <StoryCaseCard :to="`/projects/${work.id}`" :link-label="`${work.title}, ${t('story.caseCta')}`"
                    :index-label="String(index + 1).padStart(2, '0')" :tag="work.type" :period="work.period"
                    :title="work.title" :summary="work.introduction" :tech="work.tech.slice(0, 4)"
                    :cta-label="t('story.caseCta')" :tech-aria-label="t('story.techStackAriaLabel')"
                    :featured="index === 0" :featured-badge="t('story.featuredBadge')" />
            </li>
        </ul>

        <nav class="showcase__more" :aria-label="t('story.galleriesAriaLabel')">
            <BaseButton to="/projects" :label="careerArchiveLabel" />
            <BaseButton to="/personal" :label="t('personal.fullArchiveLink')" variant="ghost" />
        </nav>
    </HomeSection>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';

const { t, content } = useLocale();
const showcaseIds = ['samhwa-eco-dashboard', 'orchem-mes', 'hanjinkal'];
const homeShowcaseWorks = computed(() => {
    const works = content.value.works.career as unknown as WorkItem[];
    return showcaseIds.map((id) => works.find((work) => work.id === id)).filter((work): work is WorkItem => Boolean(work));
});
const careerArchiveLabel = computed(() => t('works.fullArchiveLink')
    .replace('{total}', String(content.value.works.career.length)));
</script>
