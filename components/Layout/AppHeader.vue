<template>
    <header class="app-header">
        <a class="app-header__brand" href="#hello">Eun</a>
        <nav class="app-header__nav" aria-label="섹션 네비게이션">
            <a
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                :class="{ 'is-active': activeId === link.href.slice(1) }"
            >
                {{ link.label }}
            </a>
        </nav>
        <div class="app-header__actions">
            <LanguageToggle />
            <ThemeToggle />
            <button
                class="app-header__menu-btn"
                aria-label="모바일 메뉴 열기"
                :aria-expanded="menuOpen"
                aria-controls="mobile-menu-panel"
                @click="menuOpen = !menuOpen"
            >
                Menu
            </button>
        </div>
        <MobileMenu id="mobile-menu-panel" :open="menuOpen" :links="links" @close="menuOpen = false" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
defineProps<{ links: { href: string; label: string }[]; activeId: string }>();

watch(
    () => menuOpen.value,
    (open) => {
        if (!open) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") menuOpen.value = false;
        };
        window.addEventListener("keydown", closeOnEscape, { once: true });
    }
);
</script>
