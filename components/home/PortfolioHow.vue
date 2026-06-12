<template>
    <section id="how" class="section section--how" aria-labelledby="section-how-title">
        <BaseSectionTitle title-id="section-how-title" :eyebrow="t('nav.how')" :title="t('about.tagline')"
            :description="t('story.howDescription')" />

        <div class="how__steps-card surface-card surface-card--flow" data-animate
            :aria-label="locale === 'ko' ? '작업 흐름' : 'Workflow'">
            <h3 class="surface-card__title">{{ t("about.workflowTitle") }}</h3>
            <ol class="flow-steps" :aria-label="locale === 'ko' ? '단계' : 'Steps'">
                <li v-for="(step, index) in workflowSteps" :key="step.label" :style="{ '--stagger-i': index }"
                    data-stagger>
                    <span class="flow-steps__index">{{ String(index + 1).padStart(2, "0") }}</span>
                    <span class="flow-steps__label">{{ step.label }}</span>
                    <p class="flow-steps__desc">{{ step.description }}</p>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from '@data/site';

const { t, pick, locale } = useLocale();

const stepLabels = computed(() =>
    locale.value === "ko" ? ["파악", "정리", "구현", "검증"] : ["Read", "Shape", "Build", "Check"]
);

const workflowSteps = computed(() =>
    stepLabels.value.map((label, index) => ({
        label,
        description: aboutContent.workflow[index] ? pick(aboutContent.workflow[index]) : '',
    }))
);
</script>
