<template>
    <section id="toolbox" class="section">
        <BaseSectionTitle :eyebrow="t('nav.toolbox')" :title="t('toolbox.title')" :description="t('toolbox.copy')" />
        <div class="toolbox__grid">
            <SkillCard v-for="skill in skills" :key="skill.key" :title="skill.title" :items="pick(skill.items)"
                :description="pick(skill.description)" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { skills } from "~/core/data/skills";
const { t, pick } = useLocale();
</script>
