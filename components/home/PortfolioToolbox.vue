<template>
    <HomeSection id="toolbox" section-class="section--toolbox" title-id="section-toolbox-title"
        head-class="section-head--center">
        <template #head>
            <BaseSectionTitle title-id="section-toolbox-title" :eyebrow="t('nav.toolbox')"
                :title="t('toolbox.title')" />
            <p class="section-title__description">{{ t("toolbox.copy") }}</p>
        </template>

        <div class="spotlight-block" data-animate>
            <h3 class="spotlight__kicker">{{ t("toolbox.kicker") }}</h3>
            <ul class="toolbox__grid feature-grid feature-grid--toolbox">
                <li v-for="(skill, index) in skills" :key="skill.key" data-stagger :style="{ '--stagger-i': index }">
                    <FeatureCard variant="skill" :eyebrow="String(index + 1).padStart(2, '0')" :icon="skill.icon"
                        :title="skill.title" :items="skill.items" :description="skill.description" />
                </li>
            </ul>
        </div>
    </HomeSection>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const skills = computed(() => content.value.skills);
</script>
