<template>
    <section id="about" class="section section--about" aria-labelledby="section-about-title">
        <span class="section__emoji section__emoji--about emoji emoji--soft" aria-hidden="true">🧭</span>

        <div class="about__stage">
            <header class="about__intro" data-animate>
                <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

                <TypoDisplayHeading id="section-about-title" tag="h2" group-id="about" :lines="displayLines"
                    heading-class="about__display"
                    line-class="about__display-line" line-accent-class="about__display-line--accent" />

                <p class="about__lead">{{ t("about.tagline") }}</p>
            </header>

            <section class="about__spotlight spotlight" data-animate
                :aria-label="locale === 'ko' ? '작업 원칙' : 'Work principles'">
                <h3 class="spotlight__kicker">{{ t("about.kicker") }}</h3>
                <ul class="feature-grid">
                    <li v-for="(principle, index) in aboutContent.principles" :key="pick(principle.title)">
                        <FeatureCard :eyebrow="String(index + 1).padStart(2, '0')" :title="pick(principle.title)"
                            :description="pick(principle.description)" />
                    </li>
                </ul>
            </section>

            <section class="about__workflow surface-card surface-card--flow" data-animate
                :aria-label="locale === 'ko' ? '작업 흐름' : 'Workflow'">
                <h3 class="surface-card__title">{{ t("about.workflowTitle") }}</h3>
                <ol class="flow-steps" :aria-label="locale === 'ko' ? '단계' : 'Steps'">
                    <li v-for="(step, index) in workflowSteps" :key="step">
                        <span class="flow-steps__index">{{ String(index + 1).padStart(2, "0") }}</span>
                        <span class="flow-steps__label">{{ step }}</span>
                    </li>
                </ol>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from '@data/site';
import { splitTypoWords } from '@composables/ui/useTypoInteraction';

const { t, pick, locale } = useLocale();

const displayLines = computed(() => {
    if (locale.value === "ko") {
        return [
            { words: splitTypoWords("쉽게 읽히고"), accent: false },
            { words: splitTypoWords("빠르게 쓰이는"), accent: true },
            { words: splitTypoWords("화면을 만듭니다"), accent: false },
        ];
    }

    return [
        { words: splitTypoWords("Easy to read"), accent: false },
        { words: splitTypoWords("Fast to use"), accent: true },
        { words: splitTypoWords("Built to last"), accent: false },
    ];
});

const workflowSteps = computed(() =>
    locale.value === "ko" ? ["파악", "정리", "구현", "검증"] : ["Read", "Shape", "Build", "Check"]
);
</script>
