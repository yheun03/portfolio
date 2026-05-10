<template>
    <header class="app-header">
        <a class="app-header__brand" :href="brandHref">
            Eun
        </a>
        <nav class="app-header__nav" :aria-label="locale === 'ko' ? '섹션 네비게이션' : 'Section navigation'">
            <a v-for="link in links" :key="link.href" :href="link.href" :class="{ 'is-active': isNavActive(link.href) }"
                :aria-current="isNavActive(link.href) ? 'true' : undefined">
                {{ link.label }}
            </a>
        </nav>
        <div class="app-header__actions">
            <LanguageToggle />
            <ThemeToggle />
            <button type="button" class="app-header__menu-btn" :aria-label="menuOpen
                ? locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'
                : locale === 'ko' ? '모바일 메뉴 열기' : 'Open mobile menu'" :aria-expanded="menuOpen"
                aria-controls="mobile-menu-panel" @click="onMobileMenuToggle">
                {{ menuOpen ? locale === "ko" ? "닫기" : "Close" : locale === "ko" ? "메뉴" : "Menu" }}
            </button>
        </div>
        <MobileMenu id="mobile-menu-panel" :open="menuOpen" :links="links" :active-path="activePath"
            :active-id="activeId" @close="menuOpen = false" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const { locale } = useLocale();
const route = useRoute();

const props = withDefaults(
    defineProps<{
        links: { href: string; label: string }[];
        activeId: string;
        brandHref?: string;
        activePath?: string;
    }>(),
    {
        brandHref: "#hello",
    }
);

function isNavActive(href: string) {
    if (props.activePath) {
        if (href === "/") return route.path === "/";
        return props.activePath === href;
    }
    if (href.startsWith("#")) {
        return props.activeId === href.slice(1);
    }
    return false;
}

const onMobileMenuToggle = () => {
    menuOpen.value = !menuOpen.value;
};

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") menuOpen.value = false;
};

watch(
    () => menuOpen.value,
    (open) => {
        if (!import.meta.client) return;
        document.documentElement.classList.toggle("is-menu-open", open);
    }
);

onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
    document.documentElement.classList.remove("is-menu-open");
    window.removeEventListener("keydown", closeOnEscape);
});
</script>
