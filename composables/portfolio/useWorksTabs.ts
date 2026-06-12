// Works 섹션 카테고리 탭·필터 결과 연결 — 카테고리 목록·선택 액션·모달 열기 제공
import { storeToRefs } from 'pinia';
import { workCategories, type WorkCategory } from '@data/works';
import { useWorksUiStore } from '@stores/works-ui';

export function useWorksTabs() {
    const store = useWorksUiStore();
    const { selectedCategory, filteredWorks } = storeToRefs(store);

    function selectCategory(key: WorkCategory) {
        store.setCategory(key);
    }

    return {
        workCategories,
        selectedCategory,
        filteredWorks,
        panelRenderKey: selectedCategory,
        selectCategory,
        openWork: store.openWork,
    };
}
