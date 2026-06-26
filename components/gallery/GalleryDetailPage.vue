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

            <header class="gallery-detail__header gallery-detail__hero">
                <div class="gallery-detail__hero-copy">
                    <p class="gallery-editorial__kicker">{{ detailKicker }}</p>
                    <h1 class="gallery-detail__title">{{ pick(work.title) }}</h1>
                    <p class="gallery-detail__intro">{{ pick(work.introduction) }}</p>
                    <p v-if="work.links?.length" class="gallery-detail__links">
                        <BaseButton v-for="link in work.links" :key="link.href" :label="projectLinkLabel(link)"
                            :href="link.href" :aria-label="projectLinkAriaLabel(link)"
                            :variant="isGithubLink(link.href) ? 'ghost' : 'primary'" />
                    </p>
                </div>
                <dl class="gallery-detail__hero-meta">
                    <div>
                        <dt>{{ metaLabels.type }}</dt>
                        <dd>{{ pick(work.type) }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('gallery.duration') }}</dt>
                        <dd>{{ pick(work.duration) }}</dd>
                    </div>
                    <div>
                        <dt>{{ metaLabels.period }}</dt>
                        <dd>{{ work.period }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('gallery.role') }}</dt>
                        <dd>{{ pick(work.role) }}</dd>
                    </div>
                </dl>
            </header>

            <section class="gallery-detail__showcase" :aria-labelledby="capturesTitleId">
                <div class="gallery-detail__gallery">
                    <div class="gallery-detail__section-head">
                        <h2 :id="capturesTitleId" class="gallery-detail__section-title">{{ t('gallery.captures') }}</h2>
                        <span class="gallery-detail__counter">{{ activeCaptureIndex + 1 }} / {{ galleryCaptures.length
                            }}</span>
                    </div>
                    <figure class="gallery-detail__figure"
                        :class="{ 'gallery-detail__figure--empty': isPlaceholderCapture(activeCapture) }">
                        <GalleryEmptyCapture v-if="isPlaceholderCapture(activeCapture)" />
                        <div v-else class="gallery-detail__image-frame">
                            <img :src="resolveAppPath(activeCapture)" :alt="captureAlt(activeCaptureIndex)"
                                :class="{ 'is-loading': isCaptureLoading }" loading="lazy" decoding="async"
                                fetchpriority="low" width="1200" height="675" @load="completeCaptureLoading"
                                @error="completeCaptureLoading" />
                            <div v-if="isCaptureLoading" class="gallery-detail__capture-loader"
                                :aria-label="loadingLabel" role="status" />
                        </div>
                    </figure>
                    <div class="gallery-detail__gallery-controls" :class="{ 'is-single': galleryCaptures.length < 2 }">
                        <button type="button" class="gallery-detail__arrow" :disabled="galleryCaptures.length < 2"
                            :aria-label="galleryLabels.prev" @click="moveCapture(-1)">‹</button>
                        <div class="gallery-detail__dots">
                            <button v-for="(_, index) in galleryCaptures" :key="index" type="button"
                                class="gallery-detail__dot" :class="{ 'is-active': index === activeCaptureIndex }"
                                :aria-label="captureDotLabel(index)" @click="activeCaptureIndex = index" />
                        </div>
                        <button type="button" class="gallery-detail__arrow" :disabled="galleryCaptures.length < 2"
                            :aria-label="galleryLabels.next" @click="moveCapture(1)">›</button>
                    </div>
                    <p class="gallery-detail__caption">{{ captureCaption }}</p>
                </div>

                <aside class="gallery-detail__summary" :aria-labelledby="overviewTitleId">
                    <h2 :id="overviewTitleId" class="gallery-detail__section-title">{{ t('gallery.overview') }}</h2>
                    <dl class="gallery-detail__summary-grid">
                        <div>
                            <dt>{{ metaLabels.type }}</dt>
                            <dd>{{ pick(work.type) }}</dd>
                        </div>
                        <div>
                            <dt>{{ metaLabels.period }}</dt>
                            <dd>{{ work.period }}</dd>
                        </div>
                    </dl>
                    <div class="gallery-detail__stack-group">
                        <h3>{{ stackLabels.core }}</h3>
                        <p>
                            <span v-for="lang in work.languages" :key="lang" class="gallery-detail__chip">{{ lang
                                }}</span>
                            <template v-if="!work.languages.length">-</template>
                        </p>
                    </div>
                    <div class="gallery-detail__stack-group">
                        <h3>{{ stackLabels.library }}</h3>
                        <p>
                            <span v-for="tech in secondaryTech" :key="tech"
                                class="gallery-detail__chip gallery-detail__chip--muted">{{ tech }}</span>
                            <template v-if="!secondaryTech.length">-</template>
                        </p>
                    </div>
                </aside>
            </section>

            <section class="gallery-detail__body">
                <div class="gallery-detail__content-grid">
                    <section class="gallery-detail__content-card gallery-detail__content-card--wide">
                        <h2 class="gallery-detail__section-title">{{ labels.contributions }}</h2>
                        <ol class="gallery-detail__number-list">
                            <li v-for="item in work.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                        </ol>
                    </section>
                    <section v-if="work.achievements.length" class="gallery-detail__content-card">
                        <h2 class="gallery-detail__section-title">{{ labels.results }}</h2>
                        <ul class="gallery-detail__card-list">
                            <li v-for="item in work.achievements" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                    </section>
                    <section class="gallery-detail__content-card">
                        <h2 class="gallery-detail__section-title">{{ labels.points }}</h2>
                        <ul class="gallery-detail__point-list">
                            <li v-for="item in work.points" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                    </section>
                </div>
            </section>

            <footer class="gallery-detail__end">
                <p class="gallery-detail__end-line">{{ t('gallery.detailEndLine') }}</p>
                <p class="gallery-detail__footer-nav">
                    <NuxtLink v-if="prevWork" class="base-button base-button--ghost"
                        :to="`${config.basePath}/${prevWork.id}`">{{ navLabels.prev }}</NuxtLink>
                    <button type="button" class="base-button base-button--ghost" @click="goBack">
                        {{ t(detailEndCtaKey) }}
                    </button>
                    <NuxtLink v-if="nextWork" class="base-button base-button--ghost"
                        :to="`${config.basePath}/${nextWork.id}`">{{ navLabels.next }}</NuxtLink>
                </p>
            </footer>

        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import type { WorkItem } from '@data/works';
import { getGalleryVariantConfig, useGalleryRouteWorks } from '@composables/gallery/useGallery';
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
const { resolveAppPath } = useAppPath();
const layoutLinks = useSubpageLinks();
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
const galleryCaptures = computed(() => (props.work.captures.length ? props.work.captures : ['']));
const activeCaptureIndex = ref(0);
const activeCapture = computed(() => galleryCaptures.value[activeCaptureIndex.value] ?? '');
const isCaptureLoading = ref(!isPlaceholderCapture(activeCapture.value));
const works = useGalleryRouteWorks(props.variant);
const currentWorkIndex = computed(() => works.findIndex((item) => item.id === props.work.id));
const prevWork = computed(() => (currentWorkIndex.value > 0 ? works[currentWorkIndex.value - 1] : null));
const nextWork = computed(() => (currentWorkIndex.value >= 0 ? works[currentWorkIndex.value + 1] ?? null : null));
const secondaryTech = computed(() => props.work.tech.filter((tech) => !props.work.languages.includes(tech)));
const metaLabels = computed(() => ({
    type: locale.value === 'ko' ? '유형' : 'Type',
    period: locale.value === 'ko' ? '기간' : 'Period',
}));
const stackLabels = computed(() => ({
    core: locale.value === 'ko' ? 'Core' : 'Core',
    library: locale.value === 'ko' ? 'Library / Tool' : 'Library / Tool',
}));
const galleryLabels = computed(() => ({
    prev: locale.value === 'ko' ? '이전 이미지' : 'Previous image',
    next: locale.value === 'ko' ? '다음 이미지' : 'Next image',
}));
const navLabels = computed(() => ({
    prev: locale.value === 'ko' ? '이전 프로젝트' : 'Previous project',
    next: locale.value === 'ko' ? '다음 프로젝트' : 'Next project',
}));
const captureCaption = computed(() =>
    isPlaceholderCapture(activeCapture.value)
        ? locale.value === 'ko'
            ? '등록된 프로젝트 이미지가 없습니다.'
            : 'No project image is available.'
        : captureAlt(activeCaptureIndex.value),
);
const loadingLabel = computed(() => (locale.value === 'ko' ? '이미지 불러오는 중' : 'Loading image'));

watch(activeCapture, (src) => {
    isCaptureLoading.value = !isPlaceholderCapture(src);
});

function moveCapture(direction: -1 | 1) {
    const total = galleryCaptures.value.length;
    if (total < 2) return;
    activeCaptureIndex.value = (activeCaptureIndex.value + direction + total) % total;
}

function completeCaptureLoading() {
    isCaptureLoading.value = false;
}

function captureAlt(index: number) {
    const base = pick(props.work.title);
    return locale.value === 'ko' ? `${base} 캡처 ${index + 1}` : `${base} screenshot ${index + 1}`;
}

function captureDotLabel(index: number) {
    return locale.value === 'ko' ? `${index + 1}번째 이미지 보기` : `View image ${index + 1}`;
}

function projectLinkAriaLabel(link: NonNullable<WorkItem['links']>[number]) {
    const title = pick(props.work.title);
    const label = pick(link.label);

    return locale.value === 'ko' ? `${title} ${label}` : `${label} for ${title}`;
}

function isGithubLink(href: string) {
    return /github\.com/i.test(href);
}

function projectLinkLabel(link: NonNullable<WorkItem['links']>[number]) {
    if (isGithubLink(link.href)) return 'GitHub';
    return locale.value === 'ko' ? '페이지 이동하기' : 'Open page';
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
