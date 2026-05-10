import journeyJson from './json/site/journey.json';

export interface JourneyTimelineEntry {
    period: string;
    title: { ko: string; en: string };
    description: { ko: string; en: string };
}

export interface JourneySummary {
    company: { ko: string; en: string };
    team: { ko: string; en: string };
    period: { ko: string; en: string };
    intro: { ko: string; en: string };
    roles: { ko: string; en: string }[];
}

export interface JourneyCompanyBlock {
    summary: JourneySummary;
    timeline: JourneyTimelineEntry[];
    /** 레이아웃·예시용 임시 블록 표시 */
    temp?: boolean;
}

/** 회사별 요약 카드 + 타임라인 — `core/data/json/site/journey.json` */
export const journeyCompanies = journeyJson.companies as JourneyCompanyBlock[];
