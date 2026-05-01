<template>
    <header class="app-header">
        <a class="app-header__brand" href="#hello">Eun</a>
        <nav class="app-header__nav" :aria-label="locale === 'ko' ? '섹션 네비게이션' : 'Section navigation'">
            <a v-for="link in links" :key="link.href" :href="link.href"
                :class="{ 'is-active': activeId === link.href.slice(1) }"
                :aria-current="activeId === link.href.slice(1) ? 'true' : undefined">
                {{ link.label }}
            </a>
        </nav>
        <div class="app-header__actions">
            <LanguageToggle />
            <ThemeToggle />
            <button type="button" class="app-header__menu-btn" :aria-label="locale === 'ko' ? '모바일 메뉴 열기' : 'Open mobile menu'" :aria-expanded="menuOpen"
                aria-controls="mobile-menu-panel" @click="menuOpen = !menuOpen">
                Menu
            </button>
        </div>
        <MobileMenu id="mobile-menu-panel" :open="menuOpen" :links="links" @close="menuOpen = false" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const { locale } = useLocale();
defineProps<{ links: { href: string; label: string }[]; activeId: string }>();

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") menuOpen.value = false;
};

watch(
    () => menuOpen.value,
    (open) => {
        if (!import.meta.client) return;
        document.body.style.overflow = open ? "hidden" : "";
    }
);

onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", closeOnEscape);
});
</script>
