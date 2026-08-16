<template>
    <HomeSection id="about" section-class="section--about" title-id="section-about-title">
        <div class="about__stage">
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

            <ol class="why__list" :aria-label="t('about.principlesAriaLabel')">
                <li v-for="(principle, index) in aboutContent.principles" :key="principle.title" data-animate>
                    <BaseIndexLabel :value="String(index + 1).padStart(2, '0')" aria-hidden="true" />
                    <h3>{{ principle.title }}</h3>
                    <p>{{ principle.description }}</p>
                </li>
            </ol>
        </div>
    </HomeSection>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const aboutContent = computed(() => content.value.about);
</script>
