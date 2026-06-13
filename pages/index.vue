<template>
    <AppLayout :links="appDockLinks" :header-links="headerNavLinks" :active-id="activeId"
        page-variant="home" :footer-text="t('footer.copyright')">
        <div class="page__layer page__layer--hero">
            <PortfolioHero />
        </div>
        <div class="page__layer page__layer--profile">
            <PortfolioWhy />
        </div>
        <div class="page__layer page__layer--works">
            <PortfolioShowcase />
        </div>
        <div class="page__layer page__layer--capability">
            <PortfolioProof />
            <PortfolioHow />
            <PortfolioToolbox />
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

const PortfolioWhy = defineAsyncComponent(() => import('~/components/home/PortfolioWhy.vue'));
const PortfolioShowcase = defineAsyncComponent(() => import('~/components/home/PortfolioShowcase.vue'));
const PortfolioProof = defineAsyncComponent(() => import('~/components/home/PortfolioProof.vue'));
const PortfolioHow = defineAsyncComponent(() => import('~/components/home/PortfolioHow.vue'));
const PortfolioToolbox = defineAsyncComponent(() => import('~/components/home/PortfolioToolbox.vue'));
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

const headerNavLinks = useSubpageLinks();

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
