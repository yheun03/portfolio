<template>
    <li class="timeline-item" data-animate>
        <p class="timeline-item__period">{{ period }}</p>
        <h4 class="timeline-item__title">{{ title }}</h4>
        <p class="timeline-item__description">{{ description }}</p>
    </li>
</template>

<script setup lang="ts">
defineProps<{ period: string; title: string; description: string }>();
</script>
