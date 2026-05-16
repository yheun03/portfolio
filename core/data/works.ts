/**
 * 작업 데이터: `core/data/content/works/*.ts` (카테고리별) + `personal.ts`
 */
import awardData from './content/works/award';
import operationData from './content/works/operation';
import personalData from './content/works/personal';
import projectData from './content/works/project';
import renewalData from './content/works/renewal';
import solutionData from './content/works/solution';

export type WorkCategory = 'all' | 'project' | 'operation' | 'solution' | 'renewal' | 'award' | 'personal';

/** `content/works/*.ts` 의 `as const` 항목과 동기화 (readonly 추론 유지) */
type WorkEntry =
    | (typeof projectData)[number]
    | (typeof operationData)[number]
    | (typeof solutionData)[number]
    | (typeof renewalData)[number]
    | (typeof awardData)[number]
    | (typeof personalData)[number];

/** 일부 항목만 `links` 보유 → 공통 optional로 두어 UI에서 별도 narrow 없이 접근 */
export type WorkItem = WorkEntry & {
    readonly links?: readonly {
        readonly label: { readonly ko: string; readonly en: string };
        readonly href: string;
    }[];
};

export const workCategories = [
    { key: 'all', label: { ko: 'All', en: 'All' } },
    { key: 'project', label: { ko: '실무 프로젝트', en: 'Project' } },
    { key: 'operation', label: { ko: '운영 프로젝트', en: 'Operation' } },
    { key: 'solution', label: { ko: '자사 솔루션', en: 'In-house Solution' } },
    { key: 'renewal', label: { ko: '브랜딩/리뉴얼', en: 'Branding/Renewal' } },
    { key: 'award', label: { ko: '수상 연계 프로젝트', en: 'Award-linked' } },
] as const;

/** 실무 경력 — 카테고리별 TS 데이터를 한 목록으로 합침 (`core/data/content/works/`) */
export const careerWorks = [...projectData, ...operationData, ...solutionData, ...renewalData, ...awardData];

export const personalWorksList = personalData;

/** 스토어·필터용 전체 목록 (실무 + 개인) */
export const works = [...careerWorks, ...personalWorksList];

export function getCareerWorkById(id: string): WorkItem | null {
    return careerWorks.find((w) => w.id === id) ?? null;
}

export function getPersonalWorkById(id: string): WorkItem | null {
    return personalWorksList.find((w) => w.id === id) ?? null;
}
