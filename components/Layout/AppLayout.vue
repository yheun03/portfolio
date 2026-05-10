<template>
    <ScrollProgress />
    <SectionDock v-if="showSectionDock" :links="links" :active-id="activeId" />
    <a class="skip-link" href="#main-content">{{ locale === "ko" ? "본문으로 건너뛰기" : "Skip to main content" }}</a>
    <div class="app-background" aria-hidden="true" />
    <LayoutAppHeader :links="links" :active-id="activeId" :brand-href="brandHref" :active-path="activePath" />
    <main id="main-content" class="portfolio-page">
        <slot />
    </main>
    <LayoutAppFooter :text="footerText" />
</template>

<script setup lang="ts">
import LayoutAppHeader from "~/components/Layout/AppHeader.vue";
import LayoutAppFooter from "~/components/Layout/AppFooter.vue";
import SectionDock from "~/components/Common/SectionDock.vue";
const { locale } = useLocale();

withDefaults(
    defineProps<{
        links: { href: string; label: string }[];
        activeId: string;
        footerText: string;
        /** 서브페이지에서 로고 링크 — 기본 홈 앵커 */
        brandHref?: string;
        /** 서브페이지 네비 활성 경로 (예: `/projects`) */
        activePath?: string;
        showSectionDock?: boolean;
    }>(),
    {
        brandHref: "#hello",
        showSectionDock: true,
    }
);
</script>
