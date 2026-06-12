// APG Tabs 패턴 키보드 접근성 전역 기본값 — 방향키·Home·End 동작 여부
export type TablistA11yOptions = {
    arrowKeys?: boolean;
    tabCyclesTabs?: boolean;
};

export const tablistKeyboardA11y: Required<TablistA11yOptions> = {
    arrowKeys: true,
    tabCyclesTabs: false,
} as const;
