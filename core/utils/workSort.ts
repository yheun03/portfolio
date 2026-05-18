import type { WorkItem } from '~/core/data/works';

export type WorkSortMode = 'start' | 'title';

const getStartValue = (period: string) => {
    const [start = ''] = period.split('~');
    const match = start.match(/(\d{4})(?:\D+(\d{1,2}))?/);

    if (!match) return 0;

    const year = Number(match[1]);
    const month = Number(match[2] ?? '1');

    return year * 100 + month;
};

export type WorkYearEntry =
    | {
          type: 'year';
          key: string;
          year: string;
      }
    | {
          type: 'work';
          key: string;
          work: WorkItem;
      };

export const getWorkStartYear = (work: WorkItem) => {
    const [start = ''] = work.period.split('~');
    const match = start.match(/(\d{4})/);

    return match?.[1] ?? '';
};

export type WorkYearGroup = {
    year: string;
    key: string;
    works: WorkItem[];
};

/** 연도 헤더 + 해당 연도 작업 목록으로 묶음 (에디토리얼 sticky 연도 레일용) */
export const groupWorkYearEntries = (entries: readonly WorkYearEntry[]): WorkYearGroup[] => {
    const groups: WorkYearGroup[] = [];
    let current: WorkYearGroup | null = null;

    entries.forEach((entry) => {
        if (entry.type === 'year') {
            current = { year: entry.year, key: entry.key, works: [] };
            groups.push(current);
            return;
        }

        if (!current) {
            current = { year: '', key: 'works', works: [] };
            groups.push(current);
        }

        current.works.push(entry.work);
    });

    return groups;
};

export const createWorkYearEntries = (works: readonly WorkItem[]) => {
    const entries: WorkYearEntry[] = [];
    let currentYear = '';

    works.forEach((work) => {
        const year = getWorkStartYear(work);

        if (year && year !== currentYear) {
            entries.push({
                type: 'year',
                key: `year-${year}`,
                year,
            });
            currentYear = year;
        }

        entries.push({
            type: 'work',
            key: work.id,
            work,
        });
    });

    return entries;
};

export const sortWorksByStartDesc = (a: WorkItem, b: WorkItem) => getStartValue(b.period) - getStartValue(a.period);

export const sortWorksByTitleAsc = (a: WorkItem, b: WorkItem, pick: (value: WorkItem['title']) => string, locale: string) =>
    pick(a.title).localeCompare(pick(b.title), locale === 'ko' ? 'ko-KR' : 'en-US', {
        numeric: true,
        sensitivity: 'base',
    });
