/**
 * 탭 리스트 키보드 접근성 (APG Tabs 패턴 기준 + 선택 옵션)
 *
 * - arrowKeys: true — 방향키·Home/End로 탭 선택 (권장)
 * - tabCyclesTabs: false — Tab 키는 활성 탭에서 패널/다음 포커스로 이동 (표준)
 * - tabCyclesTabs: true — Tab 키로 탭 버튼만 순환 (비표준, 필요 시만)
 */
export const tablistA11y = {
    arrowKeys: true,
    tabCyclesTabs: false,
} as const;

export type TablistA11yOptions = {
    arrowKeys?: boolean;
    tabCyclesTabs?: boolean;
};
