/**
 * 목표: 홈 Works 섹션의 필터와 상세 모달 상태를 전역으로 관리한다.
 * 기능: 선택 카테고리, 필터링된 프로젝트 목록, 활성 프로젝트를 제공한다.
 */
import { defineStore } from 'pinia';
import { works, type WorkCategory, type WorkItem } from '@data/works';

export const useWorksUiStore = defineStore('worksUi', () => {
    const selectedCategory = ref<WorkCategory>('all');
    const activeWorkId = ref<string | null>(null);

    const filteredWorks = computed(() => {
        if (selectedCategory.value === 'all') {
            return works.filter((work) => work.category !== 'personal');
        }
        return works.filter((work) => work.category === selectedCategory.value);
    });

    const activeWork = computed((): WorkItem | null => {
        if (!activeWorkId.value) return null;
        return works.find((work) => work.id === activeWorkId.value) ?? null;
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
        filteredWorks,
        activeWork,
        setCategory,
        openWork,
        closeModal,
    };
});
