<template>
    <section id="about" class="section section--about" aria-labelledby="section-about-title">
        <div class="about__stage">
            <header class="about__intro" data-animate>
                <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

                <TypoDisplayHeading id="section-about-title" tag="h2" group-id="about" :lines="displayLines"
                    heading-class="about__display"
                    line-class="about__display-line" line-accent-class="about__display-line--accent" />

                <p class="about__lead">{{ t("about.tagline") }}</p>
            </header>

            <ol class="why__list" :aria-label="locale === 'ko' ? '작업 원칙' : 'Work principles'">
                <li v-for="(principle, index) in aboutContent.principles" :key="pick(principle.title)" data-animate>
                    <span class="why__index" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
                    <h3>{{ pick(principle.title) }}</h3>
                    <p>{{ pick(principle.description) }}</p>
                </li>
            </ol>
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
</script>
