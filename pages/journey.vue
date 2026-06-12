<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/journey"
        :footer-text="t('footer.copyright')">
        <PortfolioJourney />
        <PortfolioHighlights />
    </AppLayout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import PortfolioJourney from '~/components/home/PortfolioJourney.vue';

const PortfolioHighlights = defineAsyncComponent(() => import('~/components/home/PortfolioHighlights.vue'));

const { t, locale } = useLocale();
const layoutLinks = useSubpageLinks();

useRevealOnScroll();

usePortfolioSeo(() => ({
    title: t('journey.title'),
    description: t('journey.summary'),
    path: '/journey',
    locale: locale.value,
}));
</script>
