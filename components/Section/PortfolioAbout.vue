<template>
    <section id="about" class="section section--about">
        <span class="section__emoji section__emoji--about accent-emoji accent-emoji--soft" aria-hidden="true">🧭</span>

        <div class="about__stage">
            <header class="about__intro" data-animate>
                <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

                <h2 class="about__display">
                    <span v-for="(line, lineIndex) in displayLines" :key="`about-line-${lineIndex}`"
                        class="about__display-line" :class="{ 'about__display-line--accent': line.accent }">
                        <span v-for="(word, wordIndex) in line.words" :key="wordKey(`about-${lineIndex}`, wordIndex)"
                            class="typo-word"
                            :class="{ 'typo-word--active': isActive(wordKey(`about-${lineIndex}`, wordIndex)) }"
                            :style="{ '--word-index': wordIndex }" tabindex="0"
                            @mouseenter="setActive(wordKey(`about-${lineIndex}`, wordIndex))"
                            @mouseleave="setActive(null)" @focus="setActive(wordKey(`about-${lineIndex}`, wordIndex))"
                            @blur="setActive(null)">{{ word }}</span>
                    </span>
                </h2>

                <p class="about__lead">{{ t("about.tagline") }}</p>
            </header>

            <section class="about__spotlight promo-spotlight" data-animate
                :aria-label="locale === 'ko' ? '작업 원칙' : 'Work principles'">
                <h3 class="promo-spotlight__kicker">{{ t("about.kicker") }}</h3>
                <ul class="promo-feature-grid">
                    <li v-for="(principle, index) in aboutContent.principles" :key="pick(principle.title)">
                        <PromoFeatureCard :eyebrow="String(index + 1).padStart(2, '0')" :title="pick(principle.title)"
                            :description="pick(principle.description)" />
                    </li>
                </ul>
            </section>

            <div class="about__workflow promo-card promo-card--flow" data-animate>
                <h3 class="promo-card__title">{{ t("about.workflowTitle") }}</h3>
                <ol class="promo-flow" :aria-label="locale === 'ko' ? '단계' : 'Steps'">
                    <li v-for="(step, index) in workflowSteps" :key="step">
                        <span class="promo-flow__index">{{ String(index + 1).padStart(2, "0") }}</span>
                        <span class="promo-flow__label">{{ step }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from "@content/site";
import { splitTypoWords, useTypoInteraction } from "~/core/composables/useTypoInteraction";
import PromoFeatureCard from "~/components/Card/PromoFeatureCard.vue";

const { t, pick, locale } = useLocale();
const { wordKey, setActive, isActive } = useTypoInteraction();

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
