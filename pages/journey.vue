<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/journey" page-variant="journey"
        :footer-text="t('footer.copyright')">
        <PortfolioJourney />
        <PortfolioHighlights />
    </AppLayout>
</template>

<script setup lang="ts">
import PortfolioJourney from '~/components/home/PortfolioJourney.vue';
import PortfolioHighlights from '~/components/home/PortfolioHighlights.vue';

const { t, locale } = useLocale();
const layoutLinks = useSubpageLinks();

usePortfolioSeo(() => ({
    title: t('journey.title'),
    description: t('journey.summary'),
    path: '/journey',
    locale: locale.value,
}));
</script>
