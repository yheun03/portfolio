<template>
    <AppLayout :links="appDockLinks" :header-links="headerNavLinks" :active-id="activeId"
        :footer-text="t('footer.copyright')">
        <div class="page__layer page__layer--hero">
            <PortfolioHero />
        </div>
        <div class="page__layer page__layer--profile">
            <PortfolioAbout />
        </div>
        <div class="page__layer page__layer--works">
            <PortfolioWorks />
            <PortfolioPersonal />
        </div>
        <div class="page__layer page__layer--capability">
            <PortfolioJourney />
            <PortfolioToolbox />
            <PortfolioHighlights />
        </div>
        <div class="page__layer page__layer--contact">
            <PortfolioContact />
        </div>
    </AppLayout>
    <TempMainProgressModalRenderer />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import PortfolioHero from '~/components/home/PortfolioHero.vue';
import { HOME_SCROLL_SECTION_IDS } from '@config/home-sections';

const PortfolioAbout = defineAsyncComponent(() => import('~/components/home/PortfolioAbout.vue'));
const PortfolioWorks = defineAsyncComponent(() => import('~/components/home/PortfolioWorks.vue'));
const PortfolioPersonal = defineAsyncComponent(() => import('~/components/home/PortfolioPersonal.vue'));
const PortfolioJourney = defineAsyncComponent(() => import('~/components/home/PortfolioJourney.vue'));
const PortfolioToolbox = defineAsyncComponent(() => import('~/components/home/PortfolioToolbox.vue'));
const PortfolioHighlights = defineAsyncComponent(() => import('~/components/home/PortfolioHighlights.vue'));
const PortfolioContact = defineAsyncComponent(() => import('~/components/home/PortfolioContact.vue'));
const TempMainProgressModalRenderer = defineAsyncComponent(
    () => import('~/components/renderers/Page_Home/TempMainProgressModalRenderer.vue'),
);

const { t, locale } = useLocale();

useRevealOnScroll({ deferred: true });
useHomeMotion();

const appDockLinks = computed(() =>
    HOME_SCROLL_SECTION_IDS.map((id) => ({
        href: `#${id}`,
        label: t(`nav.${id}`),
    }))
);

const headerNavLinks = computed(() => [
    { href: '/', label: t('nav.home') },
    { href: '/projects', label: t('nav.worksArchive') },
    { href: '/personal', label: t('nav.personalArchive') },
]);

const { activeId } = useScrollSpy([...HOME_SCROLL_SECTION_IDS]);

usePortfolioSeo(() => ({
    title: t('meta.title'),
    description: t('meta.description'),
    ogTitle: t('meta.ogTitle'),
    ogDescription: t('meta.ogDescription'),
    path: '/',
    locale: locale.value,
    imageAlt: t('meta.ogTitle'),
}));

</script>
