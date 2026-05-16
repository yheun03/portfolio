<template>
    <button type="button" class="language-toggle"
        :aria-label="locale === 'ko' ? `${locale.toUpperCase()} 언어 전환` : `${locale.toUpperCase()} switch language`"
        @click="toggleLocale">
        {{ locale.toUpperCase() }}
    </button>
</template>

<script setup lang="ts">
const { locale, toggleLocale } = useLocale();
</script>
