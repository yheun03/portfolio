import aboutJson from './json/site/about.json';
import activitiesJson from './json/site/highlights/activities.json';
import awardsJson from './json/site/highlights/awards.json';
import certificationsJson from './json/site/highlights/certifications.json';
import descriptionsJson from './json/site/highlights/descriptions.json';
import rolesJson from './json/site/highlights/roles.json';
import journeyJson from './json/site/journey.json';
import profileJson from './json/site/profile.json';
import skillsJson from './json/site/skills.json';

import type { HighlightTabKey } from '~/core/types/highlights';

type Localized = { ko: string; en: string };

export interface JourneyTimelineEntry {
    period: string;
    title: Localized;
    description: Localized;
}

export interface JourneySummary {
    company: Localized;
    team: Localized;
    period: Localized;
    intro: Localized;
    roles: Localized[];
}

export interface JourneyCompanyBlock {
    summary: JourneySummary;
    timeline: JourneyTimelineEntry[];
    temp?: boolean;
}

export const profile = profileJson;
export const aboutContent = aboutJson;
export const skills = skillsJson;
export const journeyCompanies = journeyJson.companies as JourneyCompanyBlock[];
export const highlights = {
    awards: awardsJson as Localized[],
    certifications: certificationsJson as Localized[],
    roles: rolesJson as Localized[],
    activities: activitiesJson as Localized[],
    descriptions: descriptionsJson as Record<HighlightTabKey, Localized>,
};
