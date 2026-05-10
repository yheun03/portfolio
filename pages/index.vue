<template>
    <AppLayout :links="navLinks" :active-id="activeId" :footer-text="t('footer.copyright')">
        <div v-for="layer in pageLayers" :key="layer.name" class="page-layer" :class="`page-layer--${layer.name}`">
            <component :is="section.component" v-for="section in layer.sections" :key="section.key" />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue';
import AppLayout from '~/components/Layout/AppLayout.vue';
import PortfolioHero from '~/components/Section/PortfolioHero.vue';
import PortfolioWorks from '~/components/Section/PortfolioWorks.vue';
import PortfolioPersonal from '~/components/Section/PortfolioPersonal.vue';
import { HOME_PAGE_LAYERS, type HomeSectionKey, SCROLL_SECTION_IDS } from '~/core/data/homePage';

const PortfolioAbout = defineAsyncComponent(() => import('~/components/Section/PortfolioAbout.vue'));
const PortfolioJourney = defineAsyncComponent(() => import('~/components/Section/PortfolioJourney.vue'));
const PortfolioToolbox = defineAsyncComponent(() => import('~/components/Section/PortfolioToolbox.vue'));
const PortfolioHighlights = defineAsyncComponent(() => import('~/components/Section/PortfolioHighlights.vue'));
const PortfolioContact = defineAsyncComponent(() => import('~/components/Section/PortfolioContact.vue'));

const SECTION_COMPONENTS: Record<HomeSectionKey, Component> = {
    hello: PortfolioHero,
    works: PortfolioWorks,
    personal: PortfolioPersonal,
    about: PortfolioAbout,
    journey: PortfolioJourney,
    toolbox: PortfolioToolbox,
    highlights: PortfolioHighlights,
    contact: PortfolioContact,
};

const pageLayers = HOME_PAGE_LAYERS.map((layer) => ({
    name: layer.name,
    sections: layer.sectionKeys.map((key) => ({
        key,
        component: SECTION_COMPONENTS[key],
    })),
}));

const { t, initLocale, locale } = useLocale();
const { initTheme } = useTheme();
const requestURL = useRequestURL();
const baseUrl = computed(() => requestURL.origin || 'https://eun-portfolio.dev');
const canonicalUrl = computed(() => `${baseUrl.value}/`);

useIntersectionAnimation();
usePortfolioGsap();

const navLinks = computed(() =>
    SCROLL_SECTION_IDS.map((id) => ({
        href: `#${id}`,
        label: t(`nav.${id}`),
    }))
);

const { activeId } = useScrollSpy([...SCROLL_SECTION_IDS]);

useHead(() => ({
    htmlAttrs: {
        lang: locale.value,
    },
    title: t('meta.title'),
    link: [
        { rel: 'canonical', href: canonicalUrl.value },
        { rel: 'alternate', hreflang: 'ko', href: canonicalUrl.value },
        { rel: 'alternate', hreflang: 'en', href: canonicalUrl.value },
        { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl.value },
    ],
    meta: [
        { name: 'description', content: t('meta.description') },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: locale.value === 'ko' ? 'ko_KR' : 'en_US' },
        { property: 'og:url', content: canonicalUrl.value },
        { property: 'og:title', content: t('meta.ogTitle') },
        { property: 'og:description', content: t('meta.ogDescription') },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: t('meta.ogTitle') },
        { name: 'twitter:description', content: t('meta.ogDescription') },
    ],
}));

onMounted(() => {
    initTheme();
    initLocale();
});
</script>
