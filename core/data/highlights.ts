/** 수상·자격 등 — 원본: `core/data/json/site/highlights/*.json` */
import activitiesJson from './json/site/highlights/activities.json';
import awardsJson from './json/site/highlights/awards.json';
import certificationsJson from './json/site/highlights/certifications.json';
import descriptionsJson from './json/site/highlights/descriptions.json';
import rolesJson from './json/site/highlights/roles.json';

import type { HighlightTabKey } from '~/core/types/highlights';

type Localized = { ko: string; en: string };

export const highlights = {
    awards: awardsJson as Localized[],
    certifications: certificationsJson as Localized[],
    roles: rolesJson as Localized[],
    activities: activitiesJson as Localized[],
    descriptions: descriptionsJson as Record<HighlightTabKey, Localized>,
};
