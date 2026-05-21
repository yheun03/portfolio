<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="config.basePath"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="gallery-detail gallery-page--editorial section" :class="galleryVariantClass">
            <nav class="gallery-detail__breadcrumb" :aria-label="t('gallery.breadcrumbLabel')">
                <NuxtLink :to="config.basePath">{{ t(config.listLabelKey) }}</NuxtLink>
                <span aria-hidden="true">•</span>
                <span aria-current="page">{{ pick(work.title) }}</span>
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
                    <template v-for="link in work.links" :key="link.href">
                        <NuxtLink v-if="isAppRoute(link.href)" class="base-button base-button--primary" :to="link.href">
                            {{ pick(link.label) }}
                        </NuxtLink>
                        <a v-else class="base-button base-button--primary" :href="link.href" target="_blank"
                            rel="noopener noreferrer">
                            {{ pick(link.label) }}
                        </a>
                    </template>
                </p>
            </header>

            <section v-if="work.captures.length" class="gallery-detail__captures-section"
                :aria-labelledby="capturesTitleId">
                <h2 :id="capturesTitleId" class="gallery-detail__section-title">{{ t('gallery.captures') }}</h2>
                <div class="gallery-detail__captures">
                    <figure v-for="(src, index) in work.captures" :key="`${src}-${index}`"
                        class="gallery-detail__figure">
                        <img :src="resolveAppPath(src)" :alt="captureAlt(index)"
                            :loading="index === 0 ? 'eager' : 'lazy'" decoding="async"
                            :fetchpriority="index === 0 ? 'high' : 'low'" width="1200" height="675" />
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

        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '@composables/useGallery';
import type { WorkItem } from '@data/works';
import { getGalleryVariantConfig } from '@composables/useGallery';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    work: WorkItem;
}>();

const { t, pick, locale } = useLocale();
const { resolveAppPath, isAppRoute } = useAppPathResolver();
const layoutLinks = useSubpageNavLinks();
const config = getGalleryVariantConfig(props.variant);
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const capturesTitleId = `gallery-${props.variant}-captures`;
const overviewTitleId = `gallery-${props.variant}-overview`;

const labels = computed(() => ({
    contributions: locale.value === 'ko' ? '내가 한 일' : 'My Contributions',
    results: locale.value === 'ko' ? '성과' : 'Results',
    points: locale.value === 'ko' ? '포인트' : 'Key Points',
}));

const detailKicker = computed(() =>
    locale.value === 'ko'
        ? `${config.koName} • ${props.work.period} • 결과`
        : `${config.enName} • ${props.work.period} • RESULT`,
);

function captureAlt(index: number) {
    const base = pick(props.work.title);
    return locale.value === 'ko' ? `${base} 캡처 ${index + 1}` : `${base} screenshot ${index + 1}`;
}

usePortfolioSeo(() => ({
    title: `${pick(props.work.title)} | ${t(config.metaTitleKey)}`,
    description: pick(props.work.introduction),
    path: `${config.basePath}/${props.work.id}`,
    locale: locale.value,
    type: 'article',
    image: props.work.captures[0],
    imageAlt: captureAlt(0),
    keywords: [pick(props.work.title), pick(props.work.type), pick(props.work.role), ...props.work.languages, ...props.work.tech],
    jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: pick(props.work.title),
        description: pick(props.work.introduction),
        url: `https://yheun03.github.io/portfolio${config.basePath}/${props.work.id}`,
        inLanguage: locale.value === 'ko' ? 'ko-KR' : 'en-US',
        creator: {
            '@type': 'Person',
            name: '은영환',
            jobTitle: locale.value === 'ko' ? '웹 퍼블리셔 / 프론트엔드 개발자' : 'Web Publisher / Frontend Developer',
        },
        keywords: [pick(props.work.type), pick(props.work.role), ...props.work.languages, ...props.work.tech].join(', '),
    },
}));
</script>
