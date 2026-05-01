<template>
    <AppLayout :links="navLinks" :active-id="activeId" :footer-text="t('footer.copyright')">
        <div class="page-layer page-layer--hero">
            <PortfolioHero />
        </div>

        <div class="page-layer page-layer--works">
            <PortfolioWorks />
        </div>

        <div class="page-layer page-layer--capability">
            <PortfolioAbout />
            <PortfolioJourney />
            <PortfolioToolbox />
            <PortfolioHighlights />
        </div>

        <div class="page-layer page-layer--contact">
            <PortfolioContact />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import AppLayout from "~/components/Layout/AppLayout.vue";
import PortfolioHero from "~/components/sections/PortfolioHero.vue";
import PortfolioWorks from "~/components/sections/PortfolioWorks.vue";
const PortfolioAbout = defineAsyncComponent(() => import("~/components/sections/PortfolioAbout.vue"));
const PortfolioJourney = defineAsyncComponent(() => import("~/components/sections/PortfolioJourney.vue"));
const PortfolioToolbox = defineAsyncComponent(() => import("~/components/sections/PortfolioToolbox.vue"));
const PortfolioHighlights = defineAsyncComponent(() => import("~/components/sections/PortfolioHighlights.vue"));
const PortfolioContact = defineAsyncComponent(() => import("~/components/sections/PortfolioContact.vue"));

const { t, initLocale, locale } = useLocale();
const { initTheme } = useTheme();
const requestURL = useRequestURL();
const baseUrl = computed(() => requestURL.origin || "https://eun-portfolio.dev");
const canonicalUrl = computed(() => `${baseUrl.value}/`);

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
    htmlAttrs: {
        lang: locale.value,
    },
    title: t("meta.title"),
    link: [
        { rel: "canonical", href: canonicalUrl.value },
        { rel: "alternate", hreflang: "ko", href: canonicalUrl.value },
        { rel: "alternate", hreflang: "en", href: canonicalUrl.value },
        { rel: "alternate", hreflang: "x-default", href: canonicalUrl.value },
    ],
    meta: [
        { name: "description", content: t("meta.description") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: locale.value === "ko" ? "ko_KR" : "en_US" },
        { property: "og:url", content: canonicalUrl.value },
        { property: "og:title", content: t("meta.ogTitle") },
        { property: "og:description", content: t("meta.ogDescription") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: t("meta.ogTitle") },
        { name: "twitter:description", content: t("meta.ogDescription") },
    ]
}));

onMounted(() => {
    initTheme();
    initLocale();
});
</script>
