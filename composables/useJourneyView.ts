import { journeyCompanies, type JourneyCompanyBlock, type JourneyTimelineEntry } from '@data/site';

export type JourneyViewMode = 'affiliation' | 'chronological';

const JOURNEY_VIEW_STORAGE_KEY = 'portfolio-journey-view';

export type JourneyChronologicalEntry = {
    key: string;
    period: JourneyTimelineEntry['period'];
    title: JourneyTimelineEntry['title'];
    description: JourneyTimelineEntry['description'];
    company: JourneyCompanyBlock['summary']['company'];
    sortKey: number;
    yearLabel: string;
};

export type JourneyYearGroup = {
    key: string;
    year: string;
    sortKey: number;
    entries: JourneyChronologicalEntry[];
};

/** `2026`, `2026~`, `2022~2023`, `2019.11` 등을 정렬용 숫자로 변환 */
export function parseJourneyPeriodSortKey(period: string): number {
    const monthMatch = period.match(/(\d{4})\.(\d{1,2})/);
    if (monthMatch) {
        return Number(monthMatch[1]) + Number(monthMatch[2]) / 100;
    }

    const years = period.match(/\d{4}/g)?.map(Number) ?? [];
    if (!years.length) return 0;
    return Math.max(...years);
}

/** 타임라인 period를 연도 헤더 라벨로 (예: `2022~2023` → `2022–2023`) */
export function formatJourneyYearLabel(period: string): string {
    return period.replace(/~/g, '–');
}

/** 소속 summary.period 시작 시점 (예: `2019.11 ~ 현재` → 2019.11) */
export function parseAffiliationPeriodStart(period: string): number {
    const head = period.split('~')[0]?.trim() ?? period;
    return parseJourneyPeriodSortKey(head);
}

/** `현재` 등 진행 중 기간은 정렬 시 가장 최신으로 취급 */
function parseAffiliationPeriodEnd(period: string): number {
    const tail = period.split('~')[1]?.trim() ?? '';
    if (/현재|present/i.test(tail)) {
        return parseJourneyPeriodSortKey(new Date().getFullYear().toString()) + 0.99;
    }
    if (tail) {
        return parseJourneyPeriodSortKey(tail);
    }
    return parseAffiliationPeriodStart(period);
}

function sortAffiliationBlocksByTime(companies: readonly JourneyCompanyBlock[]): JourneyCompanyBlock[] {
    return [...companies]
        .map((block) => ({
            ...block,
            timeline: [...block.timeline].sort(
                (a, b) => parseJourneyPeriodSortKey(b.period) - parseJourneyPeriodSortKey(a.period),
            ),
        }))
        .sort(
            (a, b) =>
                parseAffiliationPeriodEnd(b.summary.period.ko) - parseAffiliationPeriodEnd(a.summary.period.ko),
        );
}

export function buildJourneyChronologicalEntries(
    companies: readonly JourneyCompanyBlock[] = journeyCompanies,
): JourneyChronologicalEntry[] {
    const entries: JourneyChronologicalEntry[] = [];

    companies.forEach((block, companyIndex) => {
        const companyLabel = block.summary.company.ko;

        block.timeline.forEach((item, itemIndex) => {
            entries.push({
                key: `${companyIndex}-${itemIndex}-${item.period}-${companyLabel}`,
                period: item.period,
                title: item.title,
                description: item.description,
                company: block.summary.company,
                sortKey: parseJourneyPeriodSortKey(item.period),
                yearLabel: formatJourneyYearLabel(item.period),
            });
        });
    });

    return entries.sort((a, b) => b.sortKey - a.sortKey);
}

/** 프로젝트 갤러리처럼 연도별 그룹 (동일 연도·기간 라벨은 한 섹션에 묶음) */
export function buildJourneyYearGroups(
    companies: readonly JourneyCompanyBlock[] = journeyCompanies,
): JourneyYearGroup[] {
    const groups = new Map<string, JourneyYearGroup>();

    for (const entry of buildJourneyChronologicalEntries(companies)) {
        const existing = groups.get(entry.yearLabel);
        if (existing) {
            existing.entries.push(entry);
            continue;
        }

        groups.set(entry.yearLabel, {
            key: entry.yearLabel,
            year: entry.yearLabel,
            sortKey: entry.sortKey,
            entries: [entry],
        });
    }

    return [...groups.values()].sort((a, b) => b.sortKey - a.sortKey);
}

export function useJourneyView() {
    const viewMode = ref<JourneyViewMode>('affiliation');

    const viewOptions = computed(() => [
        { value: 'affiliation' as const, labelKey: 'journey.viewAffiliation' },
        { value: 'chronological' as const, labelKey: 'journey.viewChronological' },
    ]);

    /** 소속순: 회사 → 대학교 → 고등학교 → 중학교 (최신 → 과거), 챕터 내 타임라인도 최신순 */
    const affiliationBlocks = computed(() => sortAffiliationBlocksByTime(journeyCompanies));

    const chronologicalYearGroups = computed(() => buildJourneyYearGroups());

    onMounted(() => {
        if (!import.meta.client) return;
        const stored = sessionStorage.getItem(JOURNEY_VIEW_STORAGE_KEY);
        if (stored === 'affiliation' || stored === 'chronological') {
            viewMode.value = stored;
        }
    });

    function setViewMode(mode: JourneyViewMode) {
        viewMode.value = mode;
        if (import.meta.client) {
            sessionStorage.setItem(JOURNEY_VIEW_STORAGE_KEY, mode);
        }
    }

    function handleViewKeydown(event: KeyboardEvent, current: JourneyViewMode) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

        const list = viewOptions.value.map((o) => o.value);
        const index = list.indexOf(current);
        if (index < 0) return;

        event.preventDefault();

        let nextIndex = index;
        if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = list.length - 1;
        else if (event.key === 'ArrowRight') nextIndex = (index + 1) % list.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + list.length) % list.length;

        const next = list[nextIndex];
        if (next) setViewMode(next);
    }

    return {
        viewMode,
        viewOptions,
        affiliationBlocks,
        chronologicalYearGroups,
        setViewMode,
        handleViewKeydown,
    };
}
