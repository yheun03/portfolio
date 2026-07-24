import { getCareerWorkById, type WorkItem } from '../works';

export const HOME_SHOWCASE_IDS = ['toms', 'framework', 'samhwa-eco-dashboard'] as const;

export const homeShowcaseWorks = HOME_SHOWCASE_IDS
    .map((id) => getCareerWorkById(id))
    .filter((work): work is WorkItem => work !== null);
