<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="catalog-page section" aria-labelledby="catalog-page-title">
            <header class="catalog-hero">
                <BaseLabel tone="technical">{{ t('catalog.pageLabel') }}</BaseLabel>
                <h1 id="catalog-page-title">{{ t('catalog.title') }}</h1>
                <p>
                    {{ t('catalog.introBefore') }} <code>assets/style/base/</code> {{ t('catalog.introAfter') }}
                </p>
                <nav class="catalog-hero__actions" :aria-label="t('catalog.navigation')">
                    <BaseButton :label="t('catalog.viewTokens')" href="/personal/design-tokens" variant="ghost" />
                    <BaseButton :label="t('catalog.viewPersonal')" href="/personal" variant="ghost" />
                    <BaseButton :label="t('catalog.viewHome')" href="/" />
                </nav>
            </header>

            <section class="catalog-section" aria-labelledby="button-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseButton</BaseLabel>
                    <h2 id="button-section-title">{{ t('catalog.buttonTitle') }}</h2>
                    <p>{{ t('catalog.buttonDescription') }}</p>
                </header>
                <div class="catalog-row">
                    <BaseButton label="Primary" />
                    <BaseButton label="Ghost" variant="ghost" />
                    <BaseButton href="#button-section-title" label="Anchor" variant="ghost" />
                    <BaseButton to="/projects" label="NuxtLink" variant="ghost" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="label-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseLabel</BaseLabel>
                    <h2 id="label-section-title">{{ t('catalog.labelTitle') }}</h2>
                    <p>{{ t('catalog.labelDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseLabel label="Default" />
                    <BaseLabel tone="work" label="Work" />
                    <BaseLabel tone="personal" label="Personal" />
                    <BaseLabel tone="toolbox" label="Toolbox" />
                    <BaseLabel tone="highlight" label="Highlight" />
                    <BaseLabel tone="technical" label="Technical" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="badge-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseBadge · BaseAccentBadge</BaseLabel>
                    <h2 id="badge-section-title">{{ t('catalog.badgeTitle') }}</h2>
                    <p>{{ t('catalog.badgeDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseBadge>Default</BaseBadge>
                    <BaseBadge tone="work">Work</BaseBadge>
                    <BaseBadge tone="toolbox" size="sm">Toolbox sm</BaseBadge>
                    <BaseBadge plain>Plain</BaseBadge>
                    <BaseAccentBadge label="Featured" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="index-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseIndexLabel</BaseLabel>
                    <h2 id="index-section-title">{{ t('catalog.indexTitle') }}</h2>
                    <p>{{ t('catalog.indexDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseIndexLabel value="01" />
                    <BaseIndexLabel value="02" />
                    <BaseIndexLabel variant="tag">SI PROJECT
                        <BaseAccentBadge :label="t('story.featuredBadge')" />
                    </BaseIndexLabel>
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="chip-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseChipList</BaseLabel>
                    <h2 id="chip-section-title">{{ t('catalog.chipTitle') }}</h2>
                    <p>{{ t('catalog.chipDescription') }}</p>
                </header>
                <BaseChipList :items="sampleTech" :aria-label="t('catalog.sampleTech')" />
            </section>

            <section class="catalog-section" aria-labelledby="stat-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseStatList</BaseLabel>
                    <h2 id="stat-section-title">{{ t('catalog.statTitle') }}</h2>
                    <p>{{ t('catalog.statDescription') }}</p>
                </header>
                <BaseStatList :stats="sampleStats" :aria-label="t('catalog.sampleStats')" />
            </section>

            <section class="catalog-section" aria-labelledby="section-title-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseSectionTitle</BaseLabel>
                    <h2 id="section-title-section-title">{{ t('catalog.sectionTitle') }}</h2>
                    <p>{{ t('catalog.sectionDescription') }}</p>
                </header>
                <BaseSectionTitle title-id="catalog-section-title-demo" eyebrow="Works"
                    :title="t('catalog.sectionDemoTitle')" :description="t('catalog.sectionDemoDescription')"
                    :animate="false" />
            </section>

            <section class="catalog-section" aria-labelledby="card-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseCard · StoryCaseCard</BaseLabel>
                    <h2 id="card-section-title">{{ t('catalog.cardTitle') }}</h2>
                    <p>{{ t('catalog.cardDescription') }}</p>
                </header>
                <div class="catalog-grid">
                    <BaseCard>
                        <BaseLabel tone="work" label="Career" />
                        <h3>BaseCard</h3>
                        <p>{{ t('catalog.baseCardDescription') }}</p>
                    </BaseCard>
                    <StoryCaseCard to="/projects/toms" :aria-label="t('catalog.caseAria')" index-label="01"
                        :tag="t('catalog.caseTag')" period="2024.03 – 2024.11" :title="t('catalog.caseTitle')"
                        :summary="t('catalog.caseSummary')" :tech="['Vue 3', 'TypeScript', 'SCSS']"
                        :cta-label="t('catalog.caseCta')" :tech-aria-label="t('catalog.caseTech')" featured
                        :featured-badge="t('story.featuredBadge')" />
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, content, locale } = useLocale();

const layoutLinks = useSubpageLinks();
const sampleTech = computed(() => content.value.componentCatalogSamples.tech);
const sampleStats = computed(() => content.value.componentCatalogSamples.stats);

usePortfolioSeo(() => ({
    title: t('catalog.componentsMetaTitle'),
    description: t('catalog.componentsMetaDescription'),
    path: '/personal/components',
    locale: locale.value,
    type: 'article',
    noindex: true,
}));
</script>

<style scoped>
.catalog-page {
    display: grid;
    gap: var(--space-fluid-xl);
    width: min(100%, var(--layout-content-max));
    margin: 0 auto;
    padding: calc(var(--layout-header-height) + var(--space-fluid-xl)) var(--inset-page) var(--space-fluid-2xl);
}

.catalog-hero,
.catalog-section {
    display: grid;
    gap: var(--space-6);
}

.catalog-hero h1,
.catalog-section__head h2 {
    margin: 0;
    font-family: var(--font-display);
    letter-spacing: var(--tracking-tight);
}

.catalog-hero h1 {
    font-size: clamp(2rem, 4vw, 3rem);
}

.catalog-section__head h2 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
}

.catalog-hero p,
.catalog-section__head p {
    max-width: 62ch;
    margin: 0;
    color: var(--color-text-muted);
    line-height: var(--line-height-body);
}

.catalog-hero__actions,
.catalog-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: center;
}

.catalog-row--wrap {
    align-items: flex-start;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 32px);
}

@media (max-width: 767px) {
    .catalog-page {
        padding-inline: max(var(--space-5), env(safe-area-inset-left)) max(var(--space-5), env(safe-area-inset-right));
    }

    .catalog-hero__actions {
        display: grid;
    }

    .catalog-hero__actions :deep(.base-button),
    .catalog-row :deep(.base-button) {
        width: 100%;
        justify-content: center;
    }

    .catalog-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
