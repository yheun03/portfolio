<template>
    <BaseCard class="highlight-card">
        <BaseLabel tone="highlight" label="Highlights" />
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[] }>();
</script>
