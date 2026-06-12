<template>
    <section id="hello" ref="heroSectionRef" class="section section--hero hero" aria-labelledby="hero-display-title">
        <div class="hero__canvas" aria-hidden="true">
            <span class="hero__orb hero__orb--a"></span>
            <span class="hero__orb hero__orb--b"></span>
            <span class="hero__orb hero__orb--c"></span>
        </div>
        <div class="hero__spotlight" aria-hidden="true"></div>
        <div class="hero__poster">
            <p class="hero__meta">
                <span>{{ profile.name }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ pick(profile.role) }}</span>
            </p>

            <div class="hero__stage">
                <p class="section-title__eyebrow hero__eyebrow">{{ t("nav.hello") }}</p>

                <TypoDisplayHeading id="hero-display-title" tag="h1" group-id="hero" :lines="heroLines"
                    heading-class="hero__display" line-class="hero__display-line"
                    line-accent-class="hero__display-line--accent" />

                <p class="hero__lead">{{ heroLead }}</p>
            </div>

            <nav class="hero__actions" :aria-label="locale === 'ko' ? '주요 포트폴리오 섹션 바로가기' : 'Primary portfolio sections'">
                <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
                <a class="base-button base-button--ghost" href="#toolbox">{{ t("hero.ctaToolbox") }}</a>
            </nav>
        </div>

        <a class="hero__cue" href="#about" :aria-label="t('hero.scrollCueLabel')">
            <span class="hero__cue-label" aria-hidden="true">{{ t("hero.scrollCue") }}</span>
            <span class="hero__cue-line" aria-hidden="true"></span>
        </a>
    </section>
</template>

<script setup lang="ts">
import { profile } from "@data/site";
import { splitTypoWords } from '@composables/ui/useTypoInteraction';
import { useMagnetic } from '@composables/ui/useMagnetic';
import { usePointerGlow } from '@composables/ui/usePointerGlow';

const { t, pick, locale } = useLocale();

const heroSectionRef = ref<HTMLElement | null>(null);
useMagnetic(heroSectionRef, '.hero__actions .base-button');
usePointerGlow(heroSectionRef);

const heroLines = computed(() => {
    if (locale.value === "ko") {
        return [
            { words: splitTypoWords("기분 좋은"), accent: false },
            { words: splitTypoWords("화면 구조"), accent: true },
            { words: splitTypoWords("만듭니다"), accent: false },
        ];
    }

    return [
        { words: splitTypoWords("Interfaces"), accent: false },
        { words: splitTypoWords("with rhythm"), accent: true },
        { words: splitTypoWords("and structure"), accent: false },
    ];
});

const heroLead = computed(() =>
    locale.value === "ko"
        ? "복잡한 요구를 단순한 흐름으로."
        : "Complex asks, clear flows."
);
</script>
