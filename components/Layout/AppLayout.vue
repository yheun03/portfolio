<template>
    <ScrollProgress />
    <SectionDock :links="links" :active-id="activeId" />
    <a class="skip-link" href="#main-content">{{ locale === "ko" ? "본문으로 건너뛰기" : "Skip to main content" }}</a>
    <div class="app-background" aria-hidden="true">
        <div class="app-background__orb app-background__orb--one" />
        <div class="app-background__orb app-background__orb--two" />
    </div>
    <LayoutAppHeader :links="links" :active-id="activeId" />
    <main id="main-content" class="portfolio-page">
        <slot />
    </main>
    <LayoutAppFooter :text="footerText" />
</template>

<script setup lang="ts">
import LayoutAppHeader from "~/components/Layout/AppHeader.vue";
import LayoutAppFooter from "~/components/Layout/AppFooter.vue";
import SectionDock from "~/components/common/SectionDock.vue";
const { locale } = useLocale();

defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    footerText: string;
}>();
</script>
