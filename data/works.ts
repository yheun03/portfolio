// 프로젝트 데이터 진입점 — 카테고리별 works/*.ts 집계, WorkItem 타입, 필터·조회 함수 내보내기
import awardData from './works/award';
import operationData from './works/operation';
import personalData from './works/personal';
import projectData from './works/project';
import renewalData from './works/renewal';
import solutionData from './works/solution';

export type WorkCategory = 'all' | 'project' | 'operation' | 'solution' | 'renewal' | 'award' | 'personal';

// works/*.ts의 as const 항목에서 readonly 추론을 그대로 유지하는 파생 타입
type WorkEntry =
    | (typeof projectData)[number]
    | (typeof operationData)[number]
    | (typeof solutionData)[number]
    | (typeof renewalData)[number]
    | (typeof awardData)[number]
    | (typeof personalData)[number];

// 일부 항목만 links를 보유 → 공통 optional로 선언해 UI에서 타입 좁히기 불필요
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

// 실무 경력 전체 (카테고리별 데이터 합산)
export const careerWorks = [...projectData, ...operationData, ...solutionData, ...renewalData, ...awardData];
export const personalWorksList = personalData;

// 스토어·필터 공용 전체 목록 (실무 + 개인)
export const works = [...careerWorks, ...personalWorksList];

export function getCareerWorkById(id: string): WorkItem | null {
    return careerWorks.find((w) => w.id === id) ?? null;
}

export function getPersonalWorkById(id: string): WorkItem | null {
    return personalWorksList.find((w) => w.id === id) ?? null;
}
