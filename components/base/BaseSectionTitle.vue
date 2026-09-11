<template>
    <div class="section-title" :data-animate="animate ? '' : null">
        <p class="section-title__eyebrow">{{ eyebrow }}</p>
        <component :is="headingTag" :id="titleId" class="section-title__title">
            {{ title }}
            <span v-if="spark" class="section-title__spark emoji emoji--soft" aria-hidden="true">✦</span>
        </component>
        <p v-if="description" :id="descriptionId" class="section-title__description">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        eyebrow: string;
        title: string;
        description?: string;
        titleId: string;
        descriptionId?: string;
        headingTag?: 'h1' | 'h2';
        spark?: boolean;
        animate?: boolean;
    }>(),
    { headingTag: 'h2', spark: true, animate: true },
);
</script>
