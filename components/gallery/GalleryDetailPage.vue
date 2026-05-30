<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="config.basePath"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="gallery-detail gallery-page--editorial section" :class="galleryVariantClass">
            <nav class="gallery-detail__breadcrumb" :aria-label="t('gallery.breadcrumbLabel')">
                <button type="button" class="gallery-detail__breadcrumb-link" aria-keyshortcuts="Escape"
                    aria-describedby="gallery-detail-back-hint" @click="goBack">
                    {{ t(config.listLabelKey) }}
                </button>
                <span id="gallery-detail-back-hint" class="gallery-detail__breadcrumb-sr">{{ t('gallery.backHint')
                    }}</span>
                <span class="gallery-detail__breadcrumb-sep" aria-hidden="true">•</span>
                <span class="gallery-detail__breadcrumb-current" aria-current="page">{{ pick(work.title) }}</span>
            </nav>

            <header class="gallery-detail__header gallery-editorial__poster">
                <div class="gallery-editorial__poster-top">
                    <p class="gallery-editorial__kicker">{{ detailKicker }}</p>
                    <p class="gallery-editorial__stats">{{ work.period }} · {{ pick(work.type) }}</p>
                </div>
                <div class="gallery-editorial__poster-hero">
                    <h1 class="gallery-detail__title">{{ pick(work.title) }}</h1>
                    <span class="gallery-editorial__rule" aria-hidden="true" />
                    <p class="gallery-detail__status">{{ t('gallery.detailLabel') }}</p>
                </div>
                <p class="gallery-detail__intro gallery-editorial__dek">{{ pick(work.introduction) }}</p>
                <dl class="gallery-detail__facts">
                    <div>
                        <dt>{{ t('gallery.duration') }}</dt>
                        <dd>{{ pick(work.duration) }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('gallery.languages') }}</dt>
                        <dd>
                            <span v-for="lang in work.languages" :key="lang" class="gallery-detail__chip">{{ lang
                                }}</span>
                            <template v-if="!work.languages.length">-</template>
                        </dd>
                    </div>
                    <div class="gallery-detail__facts--wide">
                        <dt>{{ t('gallery.techFull') }}</dt>
                        <dd>
                            <span v-for="tech in work.tech" :key="tech"
                                class="gallery-detail__chip gallery-detail__chip--muted">{{ tech
                                }}</span>
                            <template v-if="!work.tech.length">-</template>
                        </dd>
                    </div>
                </dl>
                <p v-if="work.links?.length" class="gallery-detail__links">
                    <BaseButton v-for="link in work.links" :key="link.href" :label="pick(link.label)"
                        :href="link.href" />
                </p>
            </header>

            <section v-if="work.captures.length" class="gallery-detail__captures-section"
                :aria-labelledby="capturesTitleId">
                <h2 :id="capturesTitleId" class="gallery-detail__section-title">{{ t('gallery.captures') }}</h2>
                <div class="gallery-detail__captures">
                    <figure v-for="(src, index) in work.captures" :key="`${src}-${index}`"
                        class="gallery-detail__figure"
                        :class="{ 'gallery-detail__figure--empty': isPlaceholderCapture(src) }">
                        <GalleryEmptyCapture v-if="isPlaceholderCapture(src)" />
                        <img v-else :src="resolveAppPath(src)" :alt="captureAlt(index)" loading="lazy"
                            decoding="async" fetchpriority="low" width="1200" height="675" />
                    </figure>
                </div>
            </section>

            <section class="gallery-detail__body" :aria-labelledby="overviewTitleId">
                <div class="gallery-detail__column">
                    <h2 :id="overviewTitleId">{{ t('gallery.overview') }}</h2>
                    <p><strong>{{ t('gallery.role') }}:</strong> {{ pick(work.role) }}</p>
                    <h3 class="gallery-detail__section-title">{{ labels.contributions }}</h3>
                    <ul>
                        <li v-for="item in work.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                    <template v-if="work.achievements.length">
                        <h3 class="gallery-detail__section-title">{{ labels.results }}</h3>
                        <ul>
                            <li v-for="item in work.achievements" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                    </template>
                    <h3 class="gallery-detail__section-title">{{ labels.points }}</h3>
                    <ul>
                        <li v-for="item in work.points" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                </div>
            </section>

            <footer class="gallery-detail__end">
                <p class="gallery-detail__end-line">{{ t('gallery.detailEndLine') }}</p>
                <p class="gallery-detail__footer-nav">
                    <button type="button" class="base-button base-button--ghost" @click="goBack">
                        {{ t(detailEndCtaKey) }}
                    </button>
                </p>
            </footer>

        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import type { WorkItem } from '@data/works';
import { getGalleryVariantConfig } from '@composables/gallery/useGallery';
import { seoConfig } from '@config/seo';
import { profile } from '@data/site';
import { getRealCaptures, isPlaceholderCapture } from '@utils/capture-image';
import { buildAbsoluteSeoUrl } from '@utils/seo-url';
import GalleryEmptyCapture from '~/components/work/GalleryEmptyCapture.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    work: WorkItem;
}>();

const { t, pick, locale } = useLocale();
const { resolveAppPath } = useAppPathResolver();
const layoutLinks = useSubpageNavLinks();
const config = getGalleryVariantConfig(props.variant);
const { goBack } = useNavigationRestore(config.basePath);
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const capturesTitleId = `gallery-${props.variant}-captures`;
const overviewTitleId = `gallery-${props.variant}-overview`;
const labels = useWorkDetailLabels();

const detailKicker = computed(() =>
    locale.value === 'ko'
        ? `${config.koName} • ${props.work.period} • 결과`
        : `${config.enName} • ${props.work.period} • RESULT`,
);

const detailEndCtaKey = computed(() =>
    props.variant === 'career' ? 'gallery.detailEndBackCareer' : 'gallery.detailEndBackPersonal',
);

function captureAlt(index: number) {
    const base = pick(props.work.title);
    return locale.value === 'ko' ? `${base} 캡처 ${index + 1}` : `${base} screenshot ${index + 1}`;
}

usePortfolioSeo(() => {
    const homeUrl = buildAbsoluteSeoUrl('/');
    const archiveUrl = buildAbsoluteSeoUrl(config.basePath);
    const detailUrl = buildAbsoluteSeoUrl(`${config.basePath}/${props.work.id}`);
    const coverImage = getRealCaptures(props.work.captures)[0];

    return {
        title: `${pick(props.work.title)} | ${t(config.metaTitleKey)}`,
        description: pick(props.work.introduction),
        path: `${config.basePath}/${props.work.id}`,
        locale: locale.value,
        type: 'article',
        image: coverImage,
        imageAlt: coverImage ? captureAlt(0) : undefined,
        keywords: [pick(props.work.title), pick(props.work.type), pick(props.work.role), ...props.work.languages, ...props.work.tech],
        jsonLd: [
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: locale.value === 'ko' ? '홈' : 'Home',
                        item: homeUrl,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: t(config.titleKey),
                        item: archiveUrl,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: pick(props.work.title),
                        item: detailUrl,
                    },
                ],
            },
            {
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: pick(props.work.title),
                description: pick(props.work.introduction),
                url: detailUrl,
                inLanguage: locale.value === 'ko' ? 'ko-KR' : 'en-US',
                ...(coverImage ? { image: buildAbsoluteSeoUrl(coverImage) } : {}),
                creator: {
                    '@type': 'Person',
                    '@id': `${homeUrl}${seoConfig.personId}`,
                    name: profile.name,
                },
                keywords: [pick(props.work.type), pick(props.work.role), ...props.work.languages, ...props.work.tech].join(', '),
            },
        ],
    };
});
</script>
