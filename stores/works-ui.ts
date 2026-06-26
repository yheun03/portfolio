// Works 섹션 카테고리 필터·모달 상태 — 필터링된 목록·활성 항목 computed 포함
import { defineStore } from 'pinia';
import { works, type WorkCategory, type WorkItem } from '@data/works';

export const useWorksUiStore = defineStore('worksUi', () => {
    const selectedCategory = ref<WorkCategory>('all');
    const activeWorkId = ref<string | null>(null);

    const filteredWorks = computed(() => {
        if (selectedCategory.value === 'all') return works.filter((w) => w.category !== 'personal');
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

    return { selectedCategory, filteredWorks, activeWork, setCategory, openWork, closeModal };
});
