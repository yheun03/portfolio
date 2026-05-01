<template>
    <section id="about" class="section">
        <BaseSectionTitle :eyebrow="t('nav.about')" :title="t('about.title')" :description="t('about.intro')" />
        <BaseCard>
            <p>{{ pick(aboutContent.intro) }}</p>
            <p v-for="text in pick(aboutContent.paragraphs)" :key="text">{{ text }}</p>
            <ul class="about__keywords">
                <li v-for="keyword in aboutContent.keywords" :key="pick(keyword)">
                    <BaseBadge>{{ pick(keyword) }}</BaseBadge>
                </li>
            </ul>
        </BaseCard>
        <div class="about__cards about__cards--spaced">
            <IntroCard v-for="principle in aboutContent.principles" :key="pick(principle.title)"
                :title="pick(principle.title)" :description="pick(principle.description)" />
        </div>
        <BaseCard class="about__workflow">
            <h3 class="about__workflow-title">{{ locale === 'ko' ? '일하는 방식' : 'How I Work' }}</h3>
            <ul>
                <li v-for="item in aboutContent.workflow" :key="pick(item)">{{ pick(item) }}</li>
            </ul>
            <p class="about__workflow-direction">{{ pick(aboutContent.direction) }}</p>
        </BaseCard>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from "~/core/data/about";
const { t, pick, locale } = useLocale();
</script>
