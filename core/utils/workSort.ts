import type { WorkItem } from "~/core/data/works";

export type WorkSortMode = "start" | "title";

const getStartValue = (period: string) => {
    const [start = ""] = period.split("~");
    const match = start.match(/(\d{4})(?:\D+(\d{1,2}))?/);

    if (!match) return 0;

    const year = Number(match[1]);
    const month = Number(match[2] ?? "1");

    return year * 100 + month;
};

export type WorkYearEntry =
    | {
        type: "year";
        key: string;
        year: string;
    }
    | {
        type: "work";
        key: string;
        work: WorkItem;
    };

export const getWorkStartYear = (work: WorkItem) => {
    const [start = ""] = work.period.split("~");
    const match = start.match(/(\d{4})/);

    return match?.[1] ?? "";
};

export const createWorkYearEntries = (works: readonly WorkItem[]) => {
    const entries: WorkYearEntry[] = [];
    let currentYear = "";

    works.forEach((work) => {
        const year = getWorkStartYear(work);

        if (year && year !== currentYear) {
            entries.push({
                type: "year",
                key: `year-${year}`,
                year,
            });
            currentYear = year;
        }

        entries.push({
            type: "work",
            key: work.id,
            work,
        });
    });

    return entries;
};

export const sortWorksByStartDesc = (a: WorkItem, b: WorkItem) => getStartValue(b.period) - getStartValue(a.period);

export const sortWorksByTitleAsc = (
    a: WorkItem,
    b: WorkItem,
    pick: (value: WorkItem["title"]) => string,
    locale: string,
) => pick(a.title).localeCompare(pick(b.title), locale === "ko" ? "ko-KR" : "en-US", {
    numeric: true,
    sensitivity: "base",
});
