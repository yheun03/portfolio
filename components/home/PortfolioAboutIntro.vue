<template>
    <HomeSection id="about" section-class="section--about-intro" title-id="section-about-title">
        <header class="about__intro" data-animate>
            <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

            <h2 id="section-about-title" class="about__display">
                <span class="about__display-line" style="--line-index: 0">{{ t("about.displayLine1") }}</span>
                <span class="about__display-line about__display-line--accent" style="--line-index: 1">{{
                    t("about.displayLine2") }}</span>
                <span class="about__display-line" style="--line-index: 2">{{ t("about.displayLine3") }}</span>
            </h2>

            <p class="about__lead">{{ t("about.tagline") }}</p>
        </header>
    </HomeSection>
</template>

<script setup lang="ts">
const { t } = useLocale();
</script>
