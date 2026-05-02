import { defineStore } from 'pinia';
import { showcaseProjects } from '~/core/data/projects';
import type { ProjectItem } from '~/core/types/site';

export const useProjectsUiStore = defineStore('projectsUi', () => {
    const activeProjectId = ref<number | null>(null);

    const activeProject = computed((): ProjectItem | null => {
        if (activeProjectId.value == null) return null;
        return showcaseProjects.find((p) => p.id === activeProjectId.value) ?? null;
    });

    function openProject(project: ProjectItem) {
        activeProjectId.value = project.id;
    }

    function closeModal() {
        activeProjectId.value = null;
    }

    return { activeProjectId, activeProject, openProject, closeModal };
});
