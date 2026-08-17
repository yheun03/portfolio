<template>
    <HomeSection id="about" section-class="section--about-intro" title-id="section-about-title">
        <header class="about__intro" data-animate>
            <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

            <h2 id="section-about-title" class="about__display">
                <span class="about__display-line">{{ t("about.displayLine1") }}</span>
                <span class="about__display-line about__display-line--accent">{{
                    t("about.displayLine2") }}</span>
                <span class="about__display-line">{{ t("about.displayLine3") }}</span>
            </h2>

            <p class="about__lead">{{ t("about.tagline") }}</p>
        </header>
    </HomeSection>
</template>

<script setup lang="ts">
const { t } = useLocale();
</script>
