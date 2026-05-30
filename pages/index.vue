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
import PortfolioWorks from '~/components/home/PortfolioWorks.vue';
import PortfolioPersonal from '~/components/home/PortfolioPersonal.vue';
import TempMainProgressModalRenderer from '~/components/page/TempMainProgressModalRenderer.vue';
import { SCROLL_SECTION_IDS } from '@config/homePage';

const PortfolioAbout = defineAsyncComponent(() => import('~/components/home/PortfolioAbout.vue'));
const PortfolioJourney = defineAsyncComponent(() => import('~/components/home/PortfolioJourney.vue'));
const PortfolioToolbox = defineAsyncComponent(() => import('~/components/home/PortfolioToolbox.vue'));
const PortfolioHighlights = defineAsyncComponent(() => import('~/components/home/PortfolioHighlights.vue'));
const PortfolioContact = defineAsyncComponent(() => import('~/components/home/PortfolioContact.vue'));

const { t, locale } = useLocale();

useIntersectionAnimation();
usePortfolioGsap();

const appDockLinks = computed(() =>
    SCROLL_SECTION_IDS.map((id) => ({
        href: `#${id}`,
        label: t(`nav.${id}`),
    }))
);

const headerNavLinks = computed(() => [
    { href: '/', label: t('nav.home') },
    { href: '/projects', label: t('nav.worksArchive') },
    { href: '/personal', label: t('nav.personalArchive') },
]);

const { activeId } = useScrollSpy([...SCROLL_SECTION_IDS]);

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
