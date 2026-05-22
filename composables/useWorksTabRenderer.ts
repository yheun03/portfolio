import { storeToRefs } from 'pinia';
import { workCategories, type WorkCategory } from '@data/works';
import { useWorksUiStore } from '@stores/portfolioUiStore';

/**
 * 프로젝트 섹션 탭 → 필터된 목록 렌더링.
 * 스토어와 `workCategories`를 묶고, 패널 `:key`용 값을 제공해 탭 전환 시 리스트를 안정적으로 갱신한다.
 */
export function useWorksTabRenderer() {
    const worksUi = useWorksUiStore();
    const { selectedCategory, filteredWorks, activeWork } = storeToRefs(worksUi);

    /** 탭·그리드 리마운트용 — 카테고리가 바뀔 때마다 갱신 */
    const panelRenderKey = computed(() => selectedCategory.value);

    function selectCategory(key: WorkCategory) {
        worksUi.setCategory(key);
    }

    return {
        workCategories,
        selectedCategory,
        filteredWorks,
        activeWork,
        panelRenderKey,
        selectCategory,
        openWork: worksUi.openWork,
        closeModal: worksUi.closeModal,
    };
}
