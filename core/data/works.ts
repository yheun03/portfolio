import awardJson from "./json/works/award.json";
import operationJson from "./json/works/operation.json";
import personalJson from "./json/works/personal.json";
import projectJson from "./json/works/project.json";
import renewalJson from "./json/works/renewal.json";
import solutionJson from "./json/works/solution.json";

export type WorkCategory =
    | "all"
    | "project"
    | "operation"
    | "solution"
    | "renewal"
    | "award"
    | "personal";

export interface WorkItem {
    id: string;
    category: Exclude<WorkCategory, "all">;
    /** 메인 페이지 카드 노출 여부 — `core/data/json/works/*.json` 에서 관리 */
    pin: boolean;
    duration: { ko: string; en: string };
    captures: string[];
    /** 표시용 언어·스택 (대표 마크업·스크립트 위주) */
    languages: string[];
    title: { ko: string; en: string };
    period: string;
    type: { ko: string; en: string };
    role: { ko: string; en: string };
    tech: string[];
    introduction: { ko: string; en: string };
    myWorks: { ko: string; en: string }[];
    achievements: { ko: string; en: string }[];
    points: { ko: string; en: string }[];
}

export const workCategories = [
    { key: "all", label: { ko: "All", en: "All" } },
    { key: "project", label: { ko: "실무 프로젝트", en: "Project" } },
    { key: "operation", label: { ko: "운영 프로젝트", en: "Operation" } },
    { key: "solution", label: { ko: "자사 솔루션", en: "In-house Solution" } },
    { key: "renewal", label: { ko: "브랜딩/리뉴얼", en: "Branding/Renewal" } },
    { key: "award", label: { ko: "수상 연계 프로젝트", en: "Award-linked" } },
    { key: "personal", label: { ko: "개인 프로젝트", en: "Personal" } },
] as const;

/** 실무 경력 — 카테고리별 JSON을 한 목록으로 합침 (`core/data/json/works/`) */
export const careerWorks: WorkItem[] = [
    ...(projectJson as WorkItem[]),
    ...(operationJson as WorkItem[]),
    ...(solutionJson as WorkItem[]),
    ...(renewalJson as WorkItem[]),
    ...(awardJson as WorkItem[]),
];

export const personalWorksList = personalJson as WorkItem[];

/** 스토어·필터용 전체 목록 (실무 + 개인) */
export const works: WorkItem[] = [...careerWorks, ...personalWorksList];

export function getCareerWorkById(id: string): WorkItem | null {
    return careerWorks.find((w) => w.id === id) ?? null;
}

export function getPersonalWorkById(id: string): WorkItem | null {
    return personalWorksList.find((w) => w.id === id) ?? null;
}
