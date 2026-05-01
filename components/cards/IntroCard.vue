<template>
    <BaseCard class="intro-card">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string }>();
</script>
