<template>
    <button type="button" class="theme-toggle"
        :title="theme === 'dark' ? (locale === 'ko' ? '라이트 모드 전환' : 'Switch to light mode') : (locale === 'ko' ? '다크 모드 전환' : 'Switch to dark mode')"
        @click="toggleTheme">
        Theme
    </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme();
const { locale } = useLocale();
</script>
