<template>
    <li class="journey-milestone" data-animate>
        <p class="journey-milestone__period">{{ period }}</p>
        <h4 class="journey-milestone__title">{{ title }}</h4>
        <p class="journey-milestone__description">{{ description }}</p>
    </li>
</template>

<script setup lang="ts">
defineProps<{ period: string; title: string; description: string }>();
</script>
