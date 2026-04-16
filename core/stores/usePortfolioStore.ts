import { defineStore } from 'pinia';
import type { PortfolioProject } from '@core/types/portfolio';

export const usePortfolioStore = defineStore('portfolio', () => {
    const projects = ref<PortfolioProject[]>([]);
    const loading = ref(false);

    const setProjects = (nextProjects: PortfolioProject[]) => {
        projects.value = nextProjects;
    };

    return { projects, loading, setProjects };
});
