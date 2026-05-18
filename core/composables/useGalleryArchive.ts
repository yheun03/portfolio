import type { WorkItem } from '~/core/data/works';
import {
    createWorkYearEntries,
    groupWorkYearEntries,
    sortWorksByStartDesc,
    sortWorksByTitleAsc,
    type WorkSortMode,
} from '~/core/utils/workSort';

export type GalleryArchiveVariant = 'career' | 'personal';

export function useGalleryArchive(variant: GalleryArchiveVariant, works: WorkItem[]) {
    const { t, pick, locale } = useLocale();
    const sortMode = ref<WorkSortMode>('start');
    const { viewMode } = useGalleryViewMode();
    const editorialYear = new Date().getFullYear();

    const isCareer = variant === 'career';

    const titleKey = isCareer ? 'gallery.careerTitle' : 'gallery.personalTitle';
    const metaTitleKey = isCareer ? 'gallery.careerMetaTitle' : 'gallery.personalMetaTitle';
    const metaDescriptionKey = isCareer ? 'gallery.careerMetaDescription' : 'gallery.personalMetaDescription';
    const basePath = isCareer ? '/projects' : '/personal';

    const sortOptions = computed<{ value: WorkSortMode; label: string }[]>(() => [
        { value: 'start', label: locale.value === 'ko' ? '시작시간' : 'Start date' },
        { value: 'title', label: locale.value === 'ko' ? '가나다 순' : 'A-Z' },
    ]);

    const sortedWorks = computed(() =>
        [...works].sort((a, b) =>
            sortMode.value === 'start'
                ? sortWorksByStartDesc(a, b)
                : sortWorksByTitleAsc(a, b, pick, locale.value),
        ),
    );

    const galleryEntries = computed(() =>
        sortMode.value === 'start'
            ? createWorkYearEntries(sortedWorks.value)
            : sortedWorks.value.map((work) => ({
                  type: 'work' as const,
                  key: work.id,
                  work,
              })),
    );

    const editorialYearGroups = computed(() =>
        sortMode.value === 'start'
            ? groupWorkYearEntries(createWorkYearEntries(sortedWorks.value))
            : [{ year: '', key: 'all', works: sortedWorks.value }],
    );

    const lead = computed(() =>
        locale.value === 'ko'
            ? isCareer
                ? `실무·내부 프로젝트 ${works.length}건을 캡처·소요 시간·언어 스택과 함께 정리했습니다.`
                : `개인 프로젝트 ${works.length}건을 아카이브로 정리했습니다.`
            : isCareer
              ? `${works.length} client and in-house projects with captures, duration, and language stack.`
              : `${works.length} personal projects in an archive layout.`,
    );

    const editorialKicker = computed(() =>
        locale.value === 'ko'
            ? isCareer
                ? `실무 프로젝트 • ${editorialYear} • 아카이브`
                : `개인 프로젝트 • ${editorialYear} • 아카이브`
            : isCareer
              ? `WORKS • ${editorialYear} • ARCHIVE`
              : `PERSONAL • ${editorialYear} • ARCHIVE`,
    );

    const editorialStats = computed(() =>
        locale.value === 'ko'
            ? `${works.length}건 • 캡처 • 스택`
            : `${works.length} PROJECTS • CAPTURES • STACK`,
    );

    const heroNumber = computed(() => String(works.length).padStart(2, '0'));

    const heroAriaLabel = computed(() =>
        locale.value === 'ko' ? `총 ${works.length}개 프로젝트` : `${works.length} projects total`,
    );

    const sortLegend = computed(() => (locale.value === 'ko' ? '정렬' : 'Sort'));
    const sortAriaLabel = computed(() =>
        locale.value === 'ko'
            ? isCareer
                ? '프로젝트 정렬 기준'
                : '개인 프로젝트 정렬 기준'
            : isCareer
              ? 'Project sort order'
              : 'Personal project sort order',
    );

    const viewOptions = computed(() => [
        { value: 'editorial' as const, label: t('gallery.viewEditorial') },
        { value: 'grid' as const, label: t('gallery.viewGrid') },
    ]);

    const viewLegend = computed(() => t('gallery.viewLegend'));
    const viewAriaLabel = computed(() => t('gallery.viewAriaLabel'));

    const gridEyebrow = computed(() => (isCareer ? t('gallery.careerEyebrow') : t('gallery.personalEyebrow')));

    usePortfolioSeo(() => ({
        title: t(metaTitleKey),
        description: t(metaDescriptionKey),
        path: basePath,
        locale: locale.value,
        keywords: works.flatMap((work) => [pick(work.title), ...work.languages, ...work.tech]),
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t(metaTitleKey),
            description: t(metaDescriptionKey),
            url: `https://yheun03.github.io/portfolio${basePath}`,
            inLanguage: locale.value === 'ko' ? 'ko-KR' : 'en-US',
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: sortedWorks.value.map((work, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: pick(work.title),
                    url: `https://yheun03.github.io/portfolio${basePath}/${work.id}`,
                })),
            },
        },
    }));

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
        gridEyebrow,
        titleKey,
        basePath,
        isCareer,
    };
}
