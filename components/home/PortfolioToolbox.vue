<template>
    <section id="toolbox" class="section section--toolbox" aria-labelledby="section-toolbox-title">
        <span class="section__emoji section__emoji--toolbox emoji emoji--soft" aria-hidden="true">🛠️</span>

        <header class="toolbox__head">
            <BaseSectionTitle title-id="section-toolbox-title" :eyebrow="t('nav.toolbox')" :title="t('toolbox.title')" />
            <p class="section-title__description">{{ t("toolbox.copy") }}</p>
        </header>

        <div class="toolbox__spotlight spotlight" data-animate>
            <h3 class="spotlight__kicker">{{ t("toolbox.kicker") }}</h3>
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
