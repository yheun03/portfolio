<template>
    <NuxtPage />
</template>

<script setup lang="ts">
const { initLocale } = useLocale();
const { initTheme } = useTheme();

onMounted(() => {
    initLocale();
    initTheme();
});
</script>
