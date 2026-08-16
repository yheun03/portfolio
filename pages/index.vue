<template>
    <AppLayout :links="appDockLinks" :header-links="headerNavLinks" :active-id="activeId" page-variant="home"
        :footer-text="t('footer.copyright')">
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
</template>

<script setup lang="ts">
import PortfolioHero from '~/components/home/PortfolioHero.vue';
import PortfolioWhy from '~/components/home/PortfolioWhy.vue';
import PortfolioShowcase from '~/components/home/PortfolioShowcase.vue';
import PortfolioProof from '~/components/home/PortfolioProof.vue';
import PortfolioHow from '~/components/home/PortfolioHow.vue';
import PortfolioToolbox from '~/components/home/PortfolioToolbox.vue';
import PortfolioContact from '~/components/home/PortfolioContact.vue';
const { t, locale } = useLocale();
const sectionIds = ['hello', 'about', 'works', 'proof', 'how', 'toolbox', 'contact'] as const;

const appDockLinks = computed(() =>
    sectionIds.map((id) => ({
        href: `#${id}`,
        label: t(`nav.${id}`),
    }))
);

const headerNavLinks = useSubpageLinks();

const activeId = '';

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
