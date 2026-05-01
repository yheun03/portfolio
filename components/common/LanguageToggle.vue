<template>
    <button type="button" class="language-toggle" :aria-label="locale === 'ko' ? '언어 전환' : 'Switch language'" @click="toggleLocale">
        {{ locale.toUpperCase() }}
    </button>
</template>

<script setup lang="ts">
const { locale, toggleLocale } = useLocale();
</script>
