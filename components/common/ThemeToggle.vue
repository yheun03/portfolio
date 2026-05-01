<template>
    <button
        class="theme-toggle"
        :aria-label="theme === 'dark' ? '라이트 모드 전환' : '다크 모드 전환'"
        @click="toggleTheme"
    >
        {{ theme === "dark" ? "Light" : "Dark" }}
    </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme();
</script>
