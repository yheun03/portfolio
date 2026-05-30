/**
 * 목표: 탭 UI의 키보드 접근성 정책을 전역 기본값으로 관리한다.
 * 기능: APG Tabs 패턴 기반 방향키/Home/End 처리 옵션을 제공한다.
 */
export const tablistKeyboardA11y = {
    arrowKeys: true,
    tabCyclesTabs: false,
} as const;

export type TablistA11yOptions = {
    arrowKeys?: boolean;
    tabCyclesTabs?: boolean;
};
