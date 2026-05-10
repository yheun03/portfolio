<template>
    <AppLayout :links="sectionDockLinks" :header-links="headerNavLinks" :active-id="activeId"
        :footer-text="t('footer.copyright')">
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

const { t, locale } = useLocale();

useIntersectionAnimation();
usePortfolioGsap();

const sectionDockLinks = computed(() =>
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
