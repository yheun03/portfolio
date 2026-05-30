<template>
    <div class="section-title" data-animate>
        <p class="section-title__eyebrow">
            {{ eyebrow }}
        </p>
        <h2 class="section-title__title">
            {{ title }}
            <span class="section-title__spark emoji emoji--soft" aria-hidden="true">✦</span>
        </h2>
        <p v-if="description" class="section-title__description">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    eyebrow: string;
    title: string;
    description?: string;
}>();
</script>
