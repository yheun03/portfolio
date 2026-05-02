<template>
    <BaseCard class="intro-card">
        <p class="technical-label">Principle</p>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string }>();
</script>
