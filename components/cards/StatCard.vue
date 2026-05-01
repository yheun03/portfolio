<template>
    <BaseCard class="stat-card">
        <p class="stat-card__value">{{ value }}{{ suffix }}</p>
        <p class="stat-card__label">{{ label }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ value: number; suffix: string; label: string }>();
</script>
