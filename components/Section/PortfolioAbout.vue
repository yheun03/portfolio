<template>
    <section id="about" class="section section--about">
        <span class="section__emoji section__emoji--about accent-emoji accent-emoji--soft" aria-hidden="true">🧭</span>
        <div class="about__headline">
            <BaseSectionTitle :eyebrow="t('nav.about')" :title="t('about.title')" :description="t('about.intro')" />
            <p class="about__side-note">{{ locale === 'ko' ? '좋은 화면은 감각과 구조가 같이 움직일 때 오래 갑니다.' : 'A good interface'
                + 'lasts when taste and structure move together.' }}</p>
        </div>
        <BaseCard class="about__summary about__float about__float--summary">
            <BaseLabel tone="profile" label="Profile Summary" />
            <p class="about__summary-intro">{{ pick(aboutContent.intro) }}</p>
            <p v-for="text in pick(aboutContent.paragraphs)" :key="text" class="about__summary-paragraph">{{ text }}</p>
            <ul class="about__keywords">
                <li v-for="keyword in aboutContent.keywords" :key="pick(keyword)">
                    <BaseBadge>{{ pick(keyword) }}</BaseBadge>
                </li>
            </ul>
        </BaseCard>
        <div class="about__cards about__float about__float--principles">
            <IntroCard v-for="principle in aboutContent.principles" :key="pick(principle.title)"
                :title="pick(principle.title)" :description="pick(principle.description)" />
        </div>
        <BaseCard class="about__workflow about__float about__float--workflow">
            <BaseLabel tone="profile" label="Workflow" />
            <h3 class="about__workflow-title">{{ locale === 'ko' ? '일하는 방식' : 'How I Work' }}</h3>
            <ul class="about__workflow-list">
                <li v-for="item in aboutContent.workflow" :key="pick(item)">{{ pick(item) }}</li>
            </ul>
            <p class="about__workflow-direction">{{ pick(aboutContent.direction) }}</p>
        </BaseCard>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from "@content/site";
const { t, pick, locale } = useLocale();
</script>
