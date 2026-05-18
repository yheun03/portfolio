<template>
    <section id="toolbox" class="section section--toolbox">
        <span class="section__emoji section__emoji--toolbox accent-emoji accent-emoji--soft"
            aria-hidden="true">🛠️</span>
        <BaseSectionTitle :eyebrow="t('nav.toolbox')" :title="t('toolbox.title')" :description="t('toolbox.copy')" />
        <div class="toolbox__orbit">
            <SkillCard v-for="skill in skills" :key="skill.key" :title="skill.title" :items="pick(skill.items)"
                :description="pick(skill.description)" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { skills } from "@content/site";
const { t, pick } = useLocale();
</script>
