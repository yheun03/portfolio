import aboutData from './content/site/about';
import activitiesData from './content/site/highlights/activities';
import awardsData from './content/site/highlights/awards';
import certificationsData from './content/site/highlights/certifications';
import descriptionsData from './content/site/highlights/descriptions';
import rolesData from './content/site/highlights/roles';
import journeyData from './content/site/journey';
import profileData from './content/site/profile';
import skillsData from './content/site/skills';

import type { HighlightTabKey } from '~/core/types/highlights';

/** `content/site/journey.ts` 의 `as const` 데이터와 동기화된 타입 (readonly 추론 유지) */
export type JourneyCompanyBlock = (typeof journeyData.companies)[number];
export type JourneyTimelineEntry = JourneyCompanyBlock['timeline'][number];
export type JourneySummary = JourneyCompanyBlock['summary'];

export const profile = profileData;
export const aboutContent = aboutData;
export const skills = skillsData;
export const journeyCompanies = journeyData.companies;

/** 하이라이트 항목·설명 — `as const` JSON과 동일 구조로 두고 불필요한 가변 캐스트 제거 */
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
