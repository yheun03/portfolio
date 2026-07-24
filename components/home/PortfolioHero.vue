<template>
    <section id="hello" class="section section--hero hero" aria-labelledby="hero-display-title">
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

                <h1 id="hero-display-title" class="hero__display">
                    <span class="hero__display-line" style="--line-index: 0">{{ t("hero.displayLine1") }}</span>
                    <span class="hero__display-line hero__display-line--accent" style="--line-index: 1">{{ t("hero.displayLine2") }}</span>
                    <span class="hero__display-line" style="--line-index: 2">{{ t("hero.displayLine3") }}</span>
                </h1>

                <p class="hero__lead">{{ t("hero.lead") }}</p>
            </div>

            <nav class="hero__actions" :aria-label="t('hero.actionsAriaLabel')">
                <BaseButton href="#works" :label="t('hero.ctaWorks')" />
                <BaseButton href="#toolbox" :label="t('hero.ctaToolbox')" variant="ghost" />
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

const { t, pick } = useLocale();
</script>
