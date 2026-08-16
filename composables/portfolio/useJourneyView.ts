// Journey 섹션 소속별·연대기별 보기 데이터 구성 — 기간 정렬, 연도 그룹, sessionStorage 보기 모드 저장
import type { PortfolioContent } from '~/composables/useLocale';

export type JourneyViewMode = 'affiliation' | 'chronological';
export type JourneyCompanyBlock = PortfolioContent['journey'][number];
type JourneyTimelineEntry = JourneyCompanyBlock['timeline'][number];

const STORAGE_KEY = 'portfolio-journey-view';

// --- 내부 타입 ---

type JourneyChronologicalEntry = {
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

// --- 기간 파싱 헬퍼 ---

// `2026`, `2026~`, `2022~2023`, `2019.11` 등을 정렬용 숫자로 변환
function parsePeriodSortKey(period: string): number {
    const monthMatch = period.match(/(\d{4})\.(\d{1,2})/);
    if (monthMatch) return Number(monthMatch[1]) + Number(monthMatch[2]) / 100;

    const years = period.match(/\d{4}/g)?.map(Number) ?? [];
    return years.length ? Math.max(...years) : 0;
}

// `2022~2023` → `2022–2023` (표시용 대시 변환)
function formatYearLabel(period: string): string {
    return period.replace(/~/g, '–');
}

function parseAffiliationStart(period: string): number {
    return parsePeriodSortKey(period.split('~')[0]?.trim() ?? period);
}

// `현재`·`present` 포함 기간은 정렬 시 가장 최신으로 취급
function parseAffiliationEnd(period: string): number {
    const tail = period.split('~')[1]?.trim() ?? '';
    if (/현재|present/i.test(tail)) {
        return parsePeriodSortKey(new Date().getFullYear().toString()) + 0.99;
    }
    return tail ? parsePeriodSortKey(tail) : parseAffiliationStart(period);
}

// --- 데이터 빌더 ---

function sortAffiliationBlocks(companies: readonly JourneyCompanyBlock[]): JourneyCompanyBlock[] {
    return [...companies]
        .map((block) => ({
            ...block,
            timeline: [...block.timeline].sort((a, b) => parsePeriodSortKey(b.period) - parsePeriodSortKey(a.period)),
        }))
        .sort((a, b) => parseAffiliationEnd(b.summary.period) - parseAffiliationEnd(a.summary.period)) as JourneyCompanyBlock[];
}

function buildChronologicalEntries(companies: readonly JourneyCompanyBlock[]): JourneyChronologicalEntry[] {
    const entries: JourneyChronologicalEntry[] = [];

    companies.forEach((block, ci) => {
        block.timeline.forEach((item, ti) => {
            entries.push({
                key: `${ci}-${ti}-${item.period}-${block.summary.company}`,
                period: item.period,
                title: item.title,
                description: item.description,
                company: block.summary.company,
                sortKey: parsePeriodSortKey(item.period),
                yearLabel: formatYearLabel(item.period),
            });
        });
    });

    return entries.sort((a, b) => b.sortKey - a.sortKey);
}

// 동일 연도·기간 라벨은 한 그룹으로 묶음 (갤러리 연도 레일과 동일 패턴)
function buildYearGroups(companies: readonly JourneyCompanyBlock[]): JourneyYearGroup[] {
    const groups = new Map<string, JourneyYearGroup>();

    for (const entry of buildChronologicalEntries(companies)) {
        const existing = groups.get(entry.yearLabel);
        if (existing) {
            existing.entries.push(entry);
        } else {
            groups.set(entry.yearLabel, {
                key: entry.yearLabel,
                year: entry.yearLabel,
                sortKey: entry.sortKey,
                entries: [entry],
            });
        }
    }

    return [...groups.values()].sort((a, b) => b.sortKey - a.sortKey);
}

// --- 컴포저블 ---

export function useJourneyView() {
    const { content } = useLocale();
    const viewMode = ref<JourneyViewMode>('affiliation');

    const viewOptions = computed(() => [
        { value: 'affiliation' as const, labelKey: 'journey.viewAffiliation' },
        { value: 'chronological' as const, labelKey: 'journey.viewChronological' },
    ]);

    // 소속순: 최신 회사부터, 각 챕터 내 타임라인도 최신순
    const affiliationBlocks = computed(() => sortAffiliationBlocks(content.value.journey));
    const chronologicalYearGroups = computed(() => buildYearGroups(content.value.journey));

    function setViewMode(mode: JourneyViewMode) {
        viewMode.value = mode;
        if (import.meta.client) sessionStorage.setItem(STORAGE_KEY, mode);
    }

    onMounted(() => {
        if (!import.meta.client) return;
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored === 'affiliation' || stored === 'chronological') viewMode.value = stored;
    });

    return { viewMode, viewOptions, affiliationBlocks, chronologicalYearGroups, setViewMode };
}
