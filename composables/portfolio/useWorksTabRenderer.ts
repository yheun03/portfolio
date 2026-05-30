/**
 * 목표: 홈 Works 섹션의 카테고리 탭과 프로젝트 목록 렌더링 데이터를 연결한다.
 * 기능: 카테고리 목록, 필터 결과, 렌더 key, 탭 선택/모달 열기 액션을 제공한다.
 */
import { storeToRefs } from 'pinia';
import { workCategories, type WorkCategory } from '@data/works';
import { useWorksUiStore } from '@stores/worksUiStore';

export function useWorksTabRenderer() {
    const worksUi = useWorksUiStore();
    const { selectedCategory, filteredWorks } = storeToRefs(worksUi);

    /** 탭·그리드 리마운트용 — 카테고리가 바뀔 때마다 갱신 */
    const panelRenderKey = computed(() => selectedCategory.value);

    function selectCategory(key: WorkCategory) {
        worksUi.setCategory(key);
    }

    return {
        workCategories,
        selectedCategory,
        filteredWorks,
        panelRenderKey,
        selectCategory,
        openWork: worksUi.openWork,
    };
}
