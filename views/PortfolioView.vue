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
const { t } = useLocale();
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
</script>
