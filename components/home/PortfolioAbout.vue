<template>
    <HomeSection id="about" section-class="section--about" title-id="section-about-title">
        <div class="about__stage">
            <header class="about__intro" data-animate>
                <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

                <h2 id="section-about-title" class="about__display">
                    <span class="about__display-line" style="--line-index: 0">{{ t("about.displayLine1") }}</span>
                    <span class="about__display-line about__display-line--accent" style="--line-index: 1">{{ t("about.displayLine2") }}</span>
                    <span class="about__display-line" style="--line-index: 2">{{ t("about.displayLine3") }}</span>
                </h2>

                <p class="about__lead">{{ t("about.tagline") }}</p>
            </header>

            <section class="about__spotlight spotlight" data-animate :aria-label="t('about.principlesAriaLabel')">
                <h3 class="spotlight__kicker">{{ t("about.kicker") }}</h3>
                <ul class="feature-grid">
                    <li v-for="(principle, index) in aboutContent.principles" :key="pick(principle.title)"
                        :style="{ '--stagger-i': index }" data-stagger>
                        <FeatureCard :eyebrow="String(index + 1).padStart(2, '0')" :title="pick(principle.title)"
                            :description="pick(principle.description)" :animate="false" />
                    </li>
                </ul>
            </section>

            <SurfaceCard class="about__workflow" flow data-animate :aria-label="t('about.workflowAriaLabel')"
                :title="t('about.workflowTitle')">
                <ol class="flow-steps" :aria-label="t('about.stepsAriaLabel')">
                    <li v-for="(step, index) in aboutContent.workflow" :key="index"
                        :style="{ '--stagger-i': index }" data-stagger>
                        <span class="flow-steps__index">{{ String(index + 1).padStart(2, "0") }}</span>
                        <span class="flow-steps__label">{{ t(`about.workflowSteps.${index}`) }}</span>
                    </li>
                </ol>
            </SurfaceCard>
        </div>
    </HomeSection>
</template>

<script setup lang="ts">
import { aboutContent } from '@data/site';

const { t, pick } = useLocale();
</script>
