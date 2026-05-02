<template>
    <nav class="section-dock" :aria-label="locale === 'ko' ? '빠른 섹션 이동' : 'Quick section navigation'">
        <a v-for="link in links" :key="link.href" class="section-dock__item"
            :class="{ 'is-active': activeId === link.href.slice(1) }" :href="link.href"
            :aria-current="activeId === link.href.slice(1) ? 'true' : undefined">
            <span class="section-dock__dot" aria-hidden="true" />
            <span class="section-dock__label">{{ link.label }}</span>
        </a>
    </nav>
</template>

<script setup lang="ts">
const { locale } = useLocale();

defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
}>();
</script>
