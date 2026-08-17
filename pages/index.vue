<template>
    <AppLayout :links="appDockLinks" :header-links="headerNavLinks" :active-id="activeId" page-variant="home"
        :footer-text="t('footer.copyright')">
        <PortfolioHero />
        <PortfolioAboutIntro />
        <PortfolioWhyList />
        <PortfolioShowcase />
        <PortfolioProof />
        <PortfolioHow />
        <PortfolioToolbox />
        <PortfolioContact />
    </AppLayout>
</template>

<script setup lang="ts">
import PortfolioHero from '~/components/home/PortfolioHero.vue';
import PortfolioAboutIntro from '~/components/home/PortfolioAboutIntro.vue';
import PortfolioWhyList from '~/components/home/PortfolioWhyList.vue';
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
let sectionObserver: IntersectionObserver | null = null;

onMounted(() => {
    const sections = document.querySelectorAll<HTMLElement>(
        '.portfolio-page--home > .section:not(.section--hero)',
    );

    const revealSection = (section: Element) => {
        section.querySelectorAll<HTMLElement>('[data-animate]')
            .forEach((target) => target.classList.add('animate--visible'));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sections.forEach(revealSection);
        return;
    }

    sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealSection(entry.target);
            sectionObserver?.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    sections.forEach((section) => sectionObserver?.observe(section));
});

onBeforeUnmount(() => sectionObserver?.disconnect());

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
