<template>
    <section :id="id" class="section" :class="sectionClass" :aria-labelledby="titleId">
        <header v-if="$slots.head" class="section-head" :class="headClass">
            <slot name="head" />
        </header>
        <BaseSectionTitle v-else-if="eyebrow && title" :title-id="titleId" :eyebrow="eyebrow" :title="title"
            :description="description" :animate="animateTitle" />
        <slot />
    </section>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        id: string;
        titleId: string;
        sectionClass?: string;
        headClass?: string;
        eyebrow?: string;
        title?: string;
        description?: string;
        animateTitle?: boolean;
    }>(),
    { animateTitle: true },
);
</script>
