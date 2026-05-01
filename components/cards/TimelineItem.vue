<template>
    <li class="timeline-item" data-animate>
        <p class="timeline-item__period">{{ period }}</p>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
    </li>
</template>

<script setup lang="ts">
defineProps<{ period: string; title: string; description: string }>();
</script>
