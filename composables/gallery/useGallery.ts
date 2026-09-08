// 갤러리(실무·개인) 뷰 상태 — 보기 모드·정렬·연도 그룹·SEO·상세 라우트 작업 조회 제공
import type { WorkItem } from '@data/works';

export type GalleryViewMode = 'editorial' | 'grid';
export type GalleryArchiveVariant = 'career' | 'personal';
export type WorkSortMode = 'start' | 'title';

export type WorkYearEntry = { type: 'year'; key: string; year: string } | { type: 'work'; key: string; work: WorkItem; firstWork?: boolean };

export type WorkYearGroup = {
    year: string;
    key: string;
    works: WorkItem[];
};

const GALLERY_VIEW_STORAGE_KEY = 'portfolio-gallery-view';

function getStartValue(period: string) {
    const [start = ''] = period.split('~');
    const match = start.match(/(\d{4})(?:\D+(\d{1,2}))?/);
    if (!match) return 0;
    return Number(match[1]) * 100 + Number(match[2] ?? '1');
}

function getWorkStartYear(work: WorkItem) {
    return work.period.match(/\d{4}/)?.[0] ?? '';
}

export function isPlaceholderCapture(src: string | undefined | null) {
    return !src || /placeholder/i.test(src);
}

function createWorkYearEntries(works: readonly WorkItem[]): WorkYearEntry[] {
    const entries: WorkYearEntry[] = [];
    let currentYear = '';

    works.forEach((work, index) => {
        const year = getWorkStartYear(work);
        if (year && year !== currentYear) {
            entries.push({ type: 'year', key: `year-${year}`, year });
            currentYear = year;
        }
        entries.push({ type: 'work', key: work.id, work, firstWork: index === 0 });
    });

    return entries;
}

function groupWorkYearEntries(entries: readonly WorkYearEntry[]): WorkYearGroup[] {
    const groups: WorkYearGroup[] = [];
    let current: WorkYearGroup | null = null;

    entries.forEach((entry) => {
        if (entry.type === 'year') {
            current = { year: entry.year, key: entry.key, works: [] };
            groups.push(current);
        } else {
            if (!current) {
                current = { year: '', key: 'works', works: [] };
                groups.push(current);
            }
            current.works.push(entry.work);
        }
    });

    return groups;
}

const galleryVariantConfig = {
    career: {
        titleKey: 'gallery.careerTitle',
        metaTitleKey: 'gallery.careerMetaTitle',
        metaDescriptionKey: 'gallery.careerMetaDescription',
        basePath: '/projects',
        listLabelKey: 'gallery.backToCareerList',
    },
    personal: {
        titleKey: 'gallery.personalTitle',
        metaTitleKey: 'gallery.personalMetaTitle',
        metaDescriptionKey: 'gallery.personalMetaDescription',
        basePath: '/personal',
        listLabelKey: 'gallery.backToPersonalList',
    },
} as const;

export function getGalleryVariantConfig(variant: GalleryArchiveVariant) {
    return galleryVariantConfig[variant];
}

function useGalleryViewMode() {
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

export function useGalleryArchive(variant: GalleryArchiveVariant, works: ComputedRef<WorkItem[]>) {
    const { t, locale } = useLocale();
    const sortMode = ref<WorkSortMode>('start');
    const { viewMode } = useGalleryViewMode();
    const editorialYear = new Date().getFullYear();
    const config = getGalleryVariantConfig(variant);

    const sortOptions = computed<{ value: WorkSortMode; label: string }[]>(() => [
        { value: 'start', label: t('gallery.sortStart') },
        { value: 'title', label: t('gallery.sortTitle') },
    ]);

    const sortedWorks = computed(() =>
        [...works.value].sort((a, b) =>
            sortMode.value === 'start'
                ? getStartValue(b.period) - getStartValue(a.period)
                : a.title.localeCompare(b.title, locale.value === 'ko' ? 'ko-KR' : 'en-US', {
                      numeric: true,
                      sensitivity: 'base',
                  }),
        ),
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

    const editorialYearGroups = computed(() => groupWorkYearEntries(galleryEntries.value));

    const lead = computed(() =>
        t(variant === 'career' ? 'gallery.careerLead' : 'gallery.personalLead').replace('{total}', String(works.value.length)),
    );

    const editorialKicker = computed(() => `${t(config.titleKey)} • ${editorialYear} • ${t('gallery.archive')}`);

    const editorialStats = computed(() => t('gallery.stats').replace('{total}', String(works.value.length)));

    const heroNumber = computed(() => String(works.value.length).padStart(2, '0'));

    const heroAriaLabel = computed(() => t('gallery.totalProjects').replace('{total}', String(works.value.length)));

    const sortLegend = computed(() => t('gallery.sortLegend'));
    const sortAriaLabel = computed(() => t(variant === 'career' ? 'gallery.careerSortLabel' : 'gallery.personalSortLabel'));

    const viewOptions = computed(() => [
        { value: 'editorial' as const, label: t('gallery.viewEditorial') },
        { value: 'grid' as const, label: t('gallery.viewGrid') },
    ]);

    const viewLegend = computed(() => t('gallery.viewLegend'));
    const viewAriaLabel = computed(() => t('gallery.viewAriaLabel'));
    const toolbarAriaLabel = computed(() => t('gallery.toolbarAriaLabel'));

    usePortfolioSeo(() => ({
        title: t(config.metaTitleKey),
        description: t(config.metaDescriptionKey),
        path: config.basePath,
        locale: locale.value,
        keywords: works.value.flatMap((work) => [work.title, ...work.languages, ...work.tech]),
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
        toolbarAriaLabel,
        titleKey: config.titleKey,
        basePath: config.basePath,
    };
}

export function useGalleryRouteWorks(variant: GalleryArchiveVariant) {
    const { content } = useLocale();

    return computed(() => (variant === 'career' ? content.value.works.career : content.value.works.personal) as unknown as WorkItem[]);
}

export function useGalleryRouteWork(variant: GalleryArchiveVariant, id: string) {
    const works = useGalleryRouteWorks(variant);

    return computed(() => {
        const work = works.value.find((item) => item.id === id);

        if (!work) {
            throw createError({
                statusCode: 404,
                statusMessage: variant === 'career' ? 'Project not found' : 'Personal project not found',
            });
        }

        return work;
    });
}
