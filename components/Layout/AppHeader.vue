<template>
    <header class="app-header">
        <BaseLink class="app-header__brand" :href="brandHref"
            :aria-label="locale === 'ko' ? '포트폴리오 홈' : 'Portfolio home'">
            <span aria-hidden="true">Eun</span>
        </BaseLink>
        <nav class="app-header__nav" :aria-label="locale === 'ko' ? '주요 페이지' : 'Primary pages'">
            <BaseLink v-for="link in links" :key="link.href" :href="link.href" class="app-header__link"
                :class="{ 'app-header__link--active': isActive(link.href) }"
                :aria-current="isActive(link.href) ? 'page' : undefined">
                {{ link.label }}
            </BaseLink>
        </nav>
        <div class="app-header__actions">
            <BaseButton class="app-header__language-toggle" variant="ghost" :label="locale.toUpperCase()"
                :aria-label="languageToggleAriaLabel" @click="toggleLocale" />
            <button type="button" class="app-header__menu-btn" :aria-label="menuOpen
                ? locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'
                : locale === 'ko' ? '모바일 메뉴 열기' : 'Open mobile menu'" :aria-expanded="menuOpen"
                aria-controls="app-lnb-panel" @click="onAppLnbToggle">
                {{ menuOpen ? locale === "ko" ? "닫기" : "Close" : locale === "ko" ? "메뉴" : "Menu" }}
            </button>
        </div>
        <AppLnb id="app-lnb-panel" :open="menuOpen" :links="links" :active-path="activePath" :active-id="activeId"
            @close="menuOpen = false" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const { locale, toggleLocale } = useLocale();

const languageToggleAriaLabel = computed(() =>
    locale.value === "ko"
        ? `${locale.value.toUpperCase()} 언어 전환`
        : `${locale.value.toUpperCase()} switch language`
);

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

const { isActive } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

const onAppLnbToggle = () => {
    menuOpen.value = !menuOpen.value;
};

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") menuOpen.value = false;
};

watch(
    () => menuOpen.value,
    (open) => {
        if (!import.meta.client) return;
        document.documentElement.classList.toggle("app--menu-open", open);
    }
);

onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
    document.documentElement.classList.remove("app--menu-open");
    window.removeEventListener("keydown", closeOnEscape);
});
</script>
