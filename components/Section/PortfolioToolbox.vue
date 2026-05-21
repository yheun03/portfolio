<template>
    <section id="toolbox" class="section section--toolbox">
        <span class="section__emoji section__emoji--toolbox accent-emoji accent-emoji--soft"
            aria-hidden="true">🛠️</span>

        <header class="toolbox__head">
            <BaseSectionTitle :eyebrow="t('nav.toolbox')" :title="t('toolbox.title')" />
            <p class="section-title__description">{{ t("toolbox.copy") }}</p>
        </header>

        <div class="toolbox__spotlight promo-spotlight" data-animate>
            <h2 class="promo-spotlight__kicker">{{ t("toolbox.kicker") }}</h2>
            <ul class="toolbox__grid feature-grid feature-grid--toolbox">
                <li v-for="(skill, index) in skills" :key="skill.key">
                    <FeatureCard variant="skill" :eyebrow="String(index + 1).padStart(2, '0')" :title="skill.title"
                        :items="pick(skill.items)" :description="pick(skill.description)" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { skills } from '@data/site';

const { t, pick } = useLocale();
</script>
