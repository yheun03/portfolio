<template>
    <BaseCard class="highlight-card">
        <p class="technical-label">Highlights</p>
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[] }>();
</script>
