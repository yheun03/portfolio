import { defineStore } from 'pinia';
import { works, type WorkCategory, type WorkItem } from '~/core/data/works';

export const useWorksUiStore = defineStore('worksUi', () => {
    const selectedCategory = ref<WorkCategory>('all');
    const activeWorkId = ref<string | null>(null);

    const filteredWorks = computed(() => {
        if (selectedCategory.value === 'all') return works;
        return works.filter((w) => w.category === selectedCategory.value);
    });

    const activeWork = computed((): WorkItem | null => {
        if (!activeWorkId.value) return null;
        return works.find((w) => w.id === activeWorkId.value) ?? null;
    });

    function setCategory(key: WorkCategory) {
        selectedCategory.value = key;
    }

    function openWork(work: WorkItem) {
        activeWorkId.value = work.id;
    }

    function closeModal() {
        activeWorkId.value = null;
    }

    return {
        selectedCategory,
        activeWorkId,
        filteredWorks,
        activeWork,
        setCategory,
        openWork,
        closeModal,
    };
});
