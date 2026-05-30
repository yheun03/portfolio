<template>
    <header ref="headerRef" class="app-header">
        <BaseLink class="app-header__brand" :href="brandHref"
            :aria-label="locale === 'ko' ? '포트폴리오 홈' : 'Portfolio home'">
            <span aria-hidden="true">Eun</span>
        </BaseLink>
        <nav class="app-header__nav" :aria-label="locale === 'ko' ? '주요 페이지' : 'Primary pages'">
            <BaseLink v-for="link in links" :key="link.href" :href="link.href" class="app-header__link"
                :class="{ 'app-header__link--active': isActive(link.href) }" :aria-current="getAriaCurrent(link.href)">
                {{ link.label }}
            </BaseLink>
        </nav>
        <div class="app-header__actions">
            <p class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{{ statusMessage }}</p>
            <BaseButton class="app-header__theme-toggle" variant="ghost" :label="themeToggleLabel"
                :aria-label="themeToggleAriaLabel" @click="handleThemeToggle" />
            <BaseButton class="app-header__language-toggle" variant="ghost" :label="locale.toUpperCase()"
                :aria-label="languageToggleAriaLabel" @click="handleLocaleToggle" />
            <button ref="menuButtonRef" type="button" class="app-header__menu-btn" :aria-label="menuOpen
                ? locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'
                : locale === 'ko' ? '모바일 메뉴 열기' : 'Open mobile menu'" :aria-expanded="menuOpen"
                aria-controls="app-lnb-panel" aria-haspopup="dialog" @click="handleAppLnbToggle">
                <span class="app-header__menu-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
                <span class="visually-hidden">
                    {{ menuOpen ? locale === "ko" ? "닫기" : "Close" : locale === "ko" ? "메뉴" : "Menu" }}
                </span>
            </button>
        </div>
        <AppLnb id="app-lnb-panel" :open="menuOpen" :links="links" :active-path="activePath" :active-id="activeId"
            @close="closeMobileMenu" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const headerRef = ref<HTMLElement | null>(null);
const menuButtonRef = ref<HTMLButtonElement | null>(null);

useLayoutHeaderHeight(headerRef);
const statusMessage = ref('');
const { locale, toggleLocale, t } = useLocale();
const { isDarkTheme, toggleTheme } = useTheme();

const languageToggleAriaLabel = computed(() =>
    locale.value === 'ko' ? t('a11y.switchToEn') : t('a11y.switchToKo'),
);
const themeToggleLabel = computed(() => {
    if (locale.value === 'ko') return isDarkTheme.value ? 'Light' : 'Dark';

    return isDarkTheme.value ? 'Light' : 'Dark';
});
const themeToggleAriaLabel = computed(() =>
    isDarkTheme.value ? t('a11y.switchToLightTheme') : t('a11y.switchToDarkTheme'),
);

function handleLocaleToggle() {
    const switchingToEn = locale.value === 'ko';
    toggleLocale();
    statusMessage.value = t(switchingToEn ? 'a11y.localeChangedEn' : 'a11y.localeChangedKo');
}

function handleThemeToggle() {
    const switchingToLight = isDarkTheme.value;
    toggleTheme();
    statusMessage.value = t(switchingToLight ? 'a11y.themeChangedLight' : 'a11y.themeChangedDark');
}

function closeMobileMenu() {
    menuOpen.value = false;
    nextTick(() => menuButtonRef.value?.focus());
}

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

const { isActive, getAriaCurrent } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

const handleAppLnbToggle = () => {
    menuOpen.value = !menuOpen.value;
};

const handleEscapeKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuOpen.value) closeMobileMenu();
};

watch(
    () => menuOpen.value,
    (open) => {
        if (!import.meta.client) return;
        document.documentElement.classList.toggle("app--menu-open", open);
    }
);

onMounted(() => {
    window.addEventListener("keydown", handleEscapeKeydown);
});

onBeforeUnmount(() => {
    document.documentElement.classList.remove("app--menu-open");
    window.removeEventListener("keydown", handleEscapeKeydown);
});
</script>
