<template>
    <a class="skip-link" href="#main-content" @click="focusMainContent">{{ locale === "ko" ? "본문으로 건너뛰기" : "Skip to main content" }}</a>
    <AppDock v-if="showAppDock" :links="dockLinks" :active-id="activeId" :active-path="activePath" />
    <div class="app-background" aria-hidden="true" />
    <AppHeader :links="headerNavLinks" :active-id="activeId" :brand-href="brandHref" :active-path="activePath" />
    <main id="main-content" class="portfolio-page" :class="{ 'portfolio-page--app-dock': showAppDock }" tabindex="-1">
        <slot />
    </main>
    <AppFooter :text="footerText" />
</template>

<script setup lang="ts">
const { locale } = useLocale();

const props = withDefaults(
    defineProps<{
        /** AppDock용 섹션 앵커(홈). 서브페이지에서는 헤더와 동일하게 쓰면 됨 */
        links: { href: string; label: string }[];
        activeId: string;
        footerText: string;
        /** GNB·모바일 메뉴 전용 링크. 없으면 `links`와 동일 */
        headerLinks?: { href: string; label: string }[];
        /** 서브페이지에서 로고 링크 — 기본 홈 앵커 */
        brandHref?: string;
        /** 서브페이지 네비 활성 경로 (예: `/projects`) */
        activePath?: string;
        showAppDock?: boolean;
    }>(),
    {
        brandHref: "#hello",
        showAppDock: true,
    }
);

const dockLinks = computed(() => props.links);
const headerNavLinks = computed(() => props.headerLinks ?? props.links);

function focusMainContent(event: MouseEvent) {
    if (!import.meta.client) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: false });
}
</script>
