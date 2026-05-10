import activitiesJson from './json/highlights/activities.json';
import awardsJson from './json/highlights/awards.json';
import certificationsJson from './json/highlights/certifications.json';
import descriptionsJson from './json/highlights/descriptions.json';
import rolesJson from './json/highlights/roles.json';

import type { HighlightTabKey } from '~/core/types/highlights';

type Localized = { ko: string; en: string };

export const highlights = {
    awards: awardsJson as Localized[],
    certifications: certificationsJson as Localized[],
    roles: rolesJson as Localized[],
    activities: activitiesJson as Localized[],
    descriptions: descriptionsJson as Record<HighlightTabKey, Localized>,
};
