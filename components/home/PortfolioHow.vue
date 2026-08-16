<template>
    <HomeSection id="how" section-class="section--how" title-id="section-how-title" :eyebrow="t('nav.how')"
        :title="t('about.tagline')" :description="t('story.howDescription')">
        <SurfaceCard class="how__steps-card" flow data-animate :aria-label="t('about.workflowAriaLabel')"
            :title="t('about.workflowTitle')">
            <ol class="flow-steps" :aria-label="t('about.stepsAriaLabel')">
                <li v-for="(step, index) in aboutContent.workflow" :key="index" :style="{ '--stagger-i': index }"
                    data-stagger>
                    <span class="flow-steps__index">{{ String(index + 1).padStart(2, "0") }}</span>
                    <span class="flow-steps__label">{{ step.label }}</span>
                    <p class="flow-steps__desc">{{ step.description }}</p>
                </li>
            </ol>
        </SurfaceCard>
    </HomeSection>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const aboutContent = computed(() => content.value.about);
</script>
