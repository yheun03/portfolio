<template>
    <BaseCard class="skill-card">
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
        <p>{{ description }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[]; description: string }>();
</script>
