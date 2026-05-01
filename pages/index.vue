<template>
    <AppLayout :links="navLinks" :active-id="activeId" :footer-text="t('footer.copyright')">
        <PortfolioHero />
        <PortfolioAbout />
        <PortfolioWorks />
        <PortfolioJourney />
        <PortfolioToolbox />
        <PortfolioHighlights />
        <PortfolioContact />
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import PortfolioHero from "~/components/sections/PortfolioHero.vue";
import PortfolioAbout from "~/components/sections/PortfolioAbout.vue";
import PortfolioWorks from "~/components/sections/PortfolioWorks.vue";
import PortfolioJourney from "~/components/sections/PortfolioJourney.vue";
import PortfolioToolbox from "~/components/sections/PortfolioToolbox.vue";
import PortfolioHighlights from "~/components/sections/PortfolioHighlights.vue";
import PortfolioContact from "~/components/sections/PortfolioContact.vue";

const { t, initLocale } = useLocale();
const { initTheme } = useTheme();

useIntersectionAnimation();

const navLinks = computed(() => [
    { href: "#hello", label: t("nav.hello") },
    { href: "#about", label: t("nav.about") },
    { href: "#works", label: t("nav.works") },
    { href: "#journey", label: t("nav.journey") },
    { href: "#toolbox", label: t("nav.toolbox") },
    { href: "#highlights", label: t("nav.highlights") },
    { href: "#contact", label: t("nav.contact") },
]);

const { activeId } = useScrollSpy(["hello", "about", "works", "journey", "toolbox", "highlights", "contact"]);

useHead(() => ({
    title: t("meta.title"),
    meta: [
        { name: "description", content: t("meta.description") },
        { property: "og:title", content: t("meta.ogTitle") },
        { property: "og:description", content: t("meta.ogDescription") }
    ]
}));

onMounted(() => {
    initTheme();
    initLocale();
});
</script>
