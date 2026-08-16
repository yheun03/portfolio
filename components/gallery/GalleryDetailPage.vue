<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="config.basePath"
        :page-variant="`archive-${variant}`" :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="gallery-detail gallery-page--editorial section" :class="galleryVariantClass">
            <nav class="gallery-detail__breadcrumb" :aria-label="t('gallery.breadcrumbLabel')">
                <NuxtLink :to="config.basePath" class="gallery-detail__breadcrumb-link">
                    {{ t(config.listLabelKey) }}
                </NuxtLink>
                <span class="gallery-detail__breadcrumb-sep" aria-hidden="true">•</span>
                <span class="gallery-detail__breadcrumb-current" aria-current="page">{{ work.title }}</span>
            </nav>

            <header class="gallery-detail__header gallery-detail__hero">
                <div class="gallery-detail__hero-copy">
                    <p class="gallery-editorial__kicker">{{ detailKicker }}</p>
                    <h1 class="gallery-detail__title">{{ work.title }}</h1>
                    <p class="gallery-detail__intro">{{ work.introduction }}</p>
                    <p v-if="work.links?.length" class="gallery-detail__links">
                        <BaseButton v-for="link in work.links" :key="link.href" :label="projectLinkLabel(link)"
                            :href="link.href" :aria-label="projectLinkAriaLabel(link)"
                            :variant="isGithubLink(link.href) ? 'ghost' : 'primary'" />
                    </p>
                </div>
                <dl class="gallery-detail__hero-meta">
                    <div>
                        <dt>{{ metaLabels.type }}</dt>
                        <dd>{{ work.type }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('gallery.duration') }}</dt>
                        <dd>{{ work.duration }}</dd>
                    </div>
                    <div>
                        <dt>{{ metaLabels.period }}</dt>
                        <dd>{{ work.period }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('gallery.role') }}</dt>
                        <dd>{{ work.role }}</dd>
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
                            <dd>{{ work.type }}</dd>
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
                                class="gallery-detail__chip gallery-detail__chip--muted">{{ tech
                                }}</span>
                            <template v-if="!secondaryTech.length">-</template>
                        </p>
                    </div>
                </aside>
            </section>

            <section class="gallery-detail__body">
                <div class="gallery-detail__content-grid">
                    <section class="gallery-detail__content-card gallery-detail__content-card--wide">
                        <h2 class="gallery-detail__section-title">{{ t('gallery.contributions') }}</h2>
                        <ol class="gallery-detail__number-list">
                            <li v-for="item in work.myWorks" :key="item">{{ item }}</li>
                        </ol>
                    </section>
                    <section v-if="work.achievements.length" class="gallery-detail__content-card">
                        <h2 class="gallery-detail__section-title">{{ t('gallery.results') }}</h2>
                        <ul class="gallery-detail__card-list">
                            <li v-for="item in work.achievements" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                    <section class="gallery-detail__content-card">
                        <h2 class="gallery-detail__section-title">{{ t('gallery.points') }}</h2>
                        <ul class="gallery-detail__point-list">
                            <li v-for="item in work.points" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                </div>
            </section>

            <footer class="gallery-detail__end">
                <p class="gallery-detail__end-line">{{ t('gallery.detailEndLine') }}</p>
                <p class="gallery-detail__footer-nav">
                    <BaseButton v-if="prevWork" :to="`${config.basePath}/${prevWork.id}`" :label="navLabels.prev"
                        variant="ghost" />
                    <BaseButton :to="config.basePath" :label="t(detailEndCtaKey)" variant="ghost" />
                    <BaseButton v-if="nextWork" :to="`${config.basePath}/${nextWork.id}`" :label="navLabels.next"
                        variant="ghost" />
                </p>
            </footer>

        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import {
    type GalleryArchiveVariant,
    getGalleryVariantConfig,
    isPlaceholderCapture,
    useGalleryRouteWorks,
} from '~/composables/gallery/useGallery';
import GalleryEmptyCapture from '~/components/work/GalleryEmptyCapture.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    work: WorkItem;
}>();

const { t, locale } = useLocale();
const { resolveAppPath } = useAppPath();
const layoutLinks = useSubpageLinks();
const config = getGalleryVariantConfig(props.variant);
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const capturesTitleId = `gallery-${props.variant}-captures`;
const overviewTitleId = `gallery-${props.variant}-overview`;

const detailKicker = computed(() => `${t(config.titleKey)} • ${props.work.period} • ${t('gallery.result')}`);

const detailEndCtaKey = computed(() =>
    props.variant === 'career' ? 'gallery.detailEndBackCareer' : 'gallery.detailEndBackPersonal',
);
const galleryCaptures = computed(() => (props.work.captures.length ? props.work.captures : ['']));
const activeCaptureIndex = ref(0);
const activeCapture = computed(() => galleryCaptures.value[activeCaptureIndex.value] ?? '');
const isCaptureLoading = ref(!isPlaceholderCapture(activeCapture.value));
const works = useGalleryRouteWorks(props.variant);
const currentWorkIndex = computed(() => works.value.findIndex((item) => item.id === props.work.id));
const prevWork = computed(() => (currentWorkIndex.value > 0 ? works.value[currentWorkIndex.value - 1] : null));
const nextWork = computed(() => (currentWorkIndex.value >= 0 ? works.value[currentWorkIndex.value + 1] ?? null : null));
const secondaryTech = computed(() => props.work.tech.filter((tech) => !props.work.languages.includes(tech)));
const metaLabels = computed(() => ({
    type: t('gallery.type'),
    period: t('gallery.period'),
}));
const stackLabels = computed(() => ({
    core: t('gallery.coreStack'),
    library: t('gallery.libraryStack'),
}));
const galleryLabels = computed(() => ({
    prev: t('gallery.previousImage'),
    next: t('gallery.nextImage'),
}));
const navLabels = computed(() => ({
    prev: t('gallery.previousProject'),
    next: t('gallery.nextProject'),
}));
const captureCaption = computed(() =>
    isPlaceholderCapture(activeCapture.value) ? t('gallery.noCapture') : captureAlt(activeCaptureIndex.value),
);
const loadingLabel = computed(() => t('gallery.loadingImage'));

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
    return t('gallery.captureAlt')
        .replace('{title}', props.work.title)
        .replace('{index}', String(index + 1));
}

function captureDotLabel(index: number) {
    return t('gallery.captureDotLabel').replace('{index}', String(index + 1));
}

function projectLinkAriaLabel(link: NonNullable<WorkItem['links']>[number]) {
    const title = props.work.title;
    const label = link.label;

    return t('gallery.projectLinkLabel').replace('{title}', title).replace('{label}', label);
}

function isGithubLink(href: string) {
    return /github\.com/i.test(href);
}

function projectLinkLabel(link: NonNullable<WorkItem['links']>[number]) {
    if (isGithubLink(link.href)) return 'GitHub';
    return t('gallery.openPage');
}

usePortfolioSeo(() => {
    const coverImage = props.work.captures.find((src) => !isPlaceholderCapture(src));

    return {
        title: `${props.work.title} | ${t(config.metaTitleKey)}`,
        description: props.work.introduction,
        path: `${config.basePath}/${props.work.id}`,
        locale: locale.value,
        type: 'article',
        image: coverImage,
        imageAlt: coverImage ? captureAlt(0) : undefined,
        keywords: [props.work.title, props.work.type, props.work.role, ...props.work.languages, ...props.work.tech],
    };
});
</script>
