/**
 * 목표: 프로젝트/개인 작업 갤러리 화면에 필요한 데이터와 뷰 상태를 구성한다.
 * 기능: 갤러리 변형 설정, 정렬, 보기 모드 저장, SEO, 상세 라우트 작업 조회를 제공한다.
 */
import type { WorkItem } from '@data/works';
import { careerWorks, getCareerWorkById, getPersonalWorkById, personalWorksList } from '@data/works';
import { createWorkYearEntries, groupWorkYearEntries, sortWorksByStartDesc, sortWorksByTitleAsc, type WorkSortMode } from '@utils/work-timeline';
import { buildAbsoluteSeoUrl } from '@utils/seo-url';

export type GalleryViewMode = 'editorial' | 'grid';
export type GalleryArchiveVariant = 'career' | 'personal';

const GALLERY_VIEW_STORAGE_KEY = 'portfolio-gallery-view';

const galleryVariantConfig = {
    career: {
        titleKey: 'gallery.careerTitle',
        metaTitleKey: 'gallery.careerMetaTitle',
        metaDescriptionKey: 'gallery.careerMetaDescription',
        basePath: '/projects',
        listLabelKey: 'gallery.backToCareerList',
        koName: '실무 프로젝트',
        enName: 'WORKS',
    },
    personal: {
        titleKey: 'gallery.personalTitle',
        metaTitleKey: 'gallery.personalMetaTitle',
        metaDescriptionKey: 'gallery.personalMetaDescription',
        basePath: '/personal',
        listLabelKey: 'gallery.backToPersonalList',
        koName: '개인 프로젝트',
        enName: 'PERSONAL',
    },
} as const;

export function getGalleryVariantConfig(variant: GalleryArchiveVariant) {
    return galleryVariantConfig[variant];
}

export function useGalleryViewMode() {
    const viewMode = ref<GalleryViewMode>('editorial');

    onMounted(() => {
        if (!import.meta.client) return;
        const stored = localStorage.getItem(GALLERY_VIEW_STORAGE_KEY);
        if (stored === 'editorial' || stored === 'grid') {
            viewMode.value = stored;
        }
    });

    watch(viewMode, (mode) => {
        if (!import.meta.client) return;
        localStorage.setItem(GALLERY_VIEW_STORAGE_KEY, mode);
    });

    return { viewMode };
}

export function useGalleryArchive(variant: GalleryArchiveVariant, works: readonly WorkItem[]) {
    const { t, pick, locale } = useLocale();
    const sortMode = ref<WorkSortMode>('start');
    const { viewMode } = useGalleryViewMode();
    const editorialYear = new Date().getFullYear();
    const config = getGalleryVariantConfig(variant);

    const sortOptions = computed<{ value: WorkSortMode; label: string }[]>(() => [
        { value: 'start', label: locale.value === 'ko' ? '시작시간' : 'Start date' },
        { value: 'title', label: locale.value === 'ko' ? '가나다 순' : 'A-Z' },
    ]);

    const sortedWorks = computed(() =>
        [...works].sort((a, b) => (sortMode.value === 'start' ? sortWorksByStartDesc(a, b) : sortWorksByTitleAsc(a, b, pick, locale.value))),
    );

    const galleryEntries = computed(() =>
        sortMode.value === 'start'
            ? createWorkYearEntries(sortedWorks.value)
            : sortedWorks.value.map((work, index) => ({
                  type: 'work' as const,
                  key: work.id,
                  work,
                  firstWork: index === 0,
              })),
    );

    const editorialYearGroups = computed(() =>
        sortMode.value === 'start'
            ? groupWorkYearEntries(createWorkYearEntries(sortedWorks.value))
            : [{ year: '', key: 'all', works: sortedWorks.value }],
    );

    const lead = computed(() =>
        locale.value === 'ko'
            ? variant === 'career'
                ? `실무·내부 프로젝트 ${works.length}건을 캡처·소요 시간·언어 스택과 함께 정리했습니다.`
                : `개인 프로젝트 ${works.length}건을 아카이브로 정리했습니다.`
            : variant === 'career'
              ? `${works.length} client and in-house projects with captures, duration, and language stack.`
              : `${works.length} personal projects in an archive layout.`,
    );

    const editorialKicker = computed(() =>
        locale.value === 'ko' ? `${config.koName} • ${editorialYear} • 아카이브` : `${config.enName} • ${editorialYear} • ARCHIVE`,
    );

    const editorialStats = computed(() =>
        locale.value === 'ko' ? `${works.length}건 • 캡처 • 스택` : `${works.length} PROJECTS • CAPTURES • STACK`,
    );

    const heroNumber = computed(() => String(works.length).padStart(2, '0'));

    const heroAriaLabel = computed(() => (locale.value === 'ko' ? `총 ${works.length}개 프로젝트` : `${works.length} projects total`));

    const sortLegend = computed(() => (locale.value === 'ko' ? '정렬' : 'Sort'));
    const sortAriaLabel = computed(() =>
        locale.value === 'ko'
            ? variant === 'career'
                ? '프로젝트 정렬 기준'
                : '개인 프로젝트 정렬 기준'
            : variant === 'career'
              ? 'Project sort order'
              : 'Personal project sort order',
    );

    const viewOptions = computed(() => [
        { value: 'editorial' as const, label: t('gallery.viewEditorial') },
        { value: 'grid' as const, label: t('gallery.viewGrid') },
    ]);

    const viewLegend = computed(() => t('gallery.viewLegend'));
    const viewAriaLabel = computed(() => t('gallery.viewAriaLabel'));
    const toolbarAriaLabel = computed(() => t('gallery.toolbarAriaLabel'));

    usePortfolioSeo(() => {
        const homeUrl = buildAbsoluteSeoUrl('/');
        const archiveUrl = buildAbsoluteSeoUrl(config.basePath);

        return {
            title: t(config.metaTitleKey),
            description: t(config.metaDescriptionKey),
            path: config.basePath,
            locale: locale.value,
            keywords: works.flatMap((work) => [pick(work.title), ...work.languages, ...work.tech]),
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
                    ],
                },
                {
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: t(config.metaTitleKey),
                    description: t(config.metaDescriptionKey),
                    url: archiveUrl,
                    inLanguage: locale.value === 'ko' ? 'ko-KR' : 'en-US',
                    mainEntity: {
                        '@type': 'ItemList',
                        itemListElement: sortedWorks.value.map((work, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            name: pick(work.title),
                            url: buildAbsoluteSeoUrl(`${config.basePath}/${work.id}`),
                        })),
                    },
                },
            ],
        };
    });

    return {
        t,
        sortMode,
        viewMode,
        sortOptions,
        viewOptions,
        galleryEntries,
        editorialYearGroups,
        lead,
        editorialKicker,
        editorialStats,
        heroNumber,
        heroAriaLabel,
        sortLegend,
        sortAriaLabel,
        viewLegend,
        viewAriaLabel,
        toolbarAriaLabel,
        titleKey: config.titleKey,
        basePath: config.basePath,
    };
}

export function useGalleryRouteWorks(variant: GalleryArchiveVariant) {
    return variant === 'career' ? careerWorks : personalWorksList;
}

export function useGalleryRouteWork(variant: GalleryArchiveVariant, id: string) {
    const work = variant === 'career' ? getCareerWorkById(id) : getPersonalWorkById(id);

    if (!work) {
        throw createError({
            statusCode: 404,
            statusMessage: variant === 'career' ? 'Project not found' : 'Personal project not found',
        });
    }

    return work;
}
