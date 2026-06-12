// 홈 페이지 섹션 id 타입과 노출 순서 — 라우팅·내비게이션·스크롤 스파이 공용 기준
export type HomeSectionKey = 'hello' | 'about' | 'works' | 'proof' | 'how' | 'toolbox' | 'contact';

export const HOME_SCROLL_SECTION_IDS: readonly HomeSectionKey[] = [
    'hello',
    'about',
    'works',
    'proof',
    'how',
    'toolbox',
    'contact',
] as const;
