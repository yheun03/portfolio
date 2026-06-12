// 사이트 콘텐츠 진입점 — profile·about·skills·journey·highlights 데이터 집계 및 타입 내보내기
import aboutData from './site/about';
import activitiesData from './site/highlights/activities';
import awardsData from './site/highlights/awards';
import certificationsData from './site/highlights/certifications';
import descriptionsData from './site/highlights/descriptions';
import rolesData from './site/highlights/roles';
import journeyData from './site/journey';
import profileData from './site/profile';
import skillsData from './site/skills';

import type { HighlightTabKey } from '@app-types/highlight-tabs';

// journey.ts의 as const 데이터에서 readonly 추론을 그대로 유지하는 파생 타입
export type JourneyCompanyBlock = (typeof journeyData.companies)[number];
export type JourneyTimelineEntry = JourneyCompanyBlock['timeline'][number];
export type JourneySummary = JourneyCompanyBlock['summary'];

export const profile = profileData;
export const aboutContent = aboutData;
export const skills = skillsData;
export const journeyCompanies = journeyData.companies;

export const highlights = {
    awards: awardsData,
    certifications: certificationsData,
    roles: rolesData,
    activities: activitiesData,
    descriptions: descriptionsData,
} satisfies {
    awards: typeof awardsData;
    certifications: typeof certificationsData;
    roles: typeof rolesData;
    activities: typeof activitiesData;
    descriptions: Record<HighlightTabKey, (typeof descriptionsData)[keyof typeof descriptionsData]>;
};
