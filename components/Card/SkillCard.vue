<template>
    <BaseCard class="skill-card">
        <BaseLabel tone="toolbox" label="Toolbox" />
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="item in items" :key="item">
                <BaseBadge size="sm" tone="toolbox" plain>{{ item }}</BaseBadge>
            </li>
        </ul>
        <p>{{ description }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[]; description: string }>();
</script>
