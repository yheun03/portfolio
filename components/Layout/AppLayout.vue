<template>
    <ScrollProgress />
    <LayoutAppHeader :links="links" :active-id="activeId" />
    <main class="portfolio-page">
        <slot />
    </main>
    <LayoutAppFooter :text="footerText" />
</template>

<script setup lang="ts">
import LayoutAppHeader from "~/components/Layout/AppHeader.vue";
import LayoutAppFooter from "~/components/Layout/AppFooter.vue";

defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    footerText: string;
}>();
</script>
