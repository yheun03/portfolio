<template>
    <header class="section-title" data-animate>
        <p class="section-title__eyebrow">{{ eyebrow }}</p>
        <h2 class="section-title__title">{{ title }}</h2>
        <p v-if="description" class="section-title__description">{{ description }}</p>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    eyebrow: string;
    title: string;
    description?: string;
}>();
</script>
