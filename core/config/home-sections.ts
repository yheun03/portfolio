/**
 * 목표: 홈 페이지 섹션 순서를 라우팅, 내비게이션, 스크롤 스파이가 함께 쓰는 단일 기준으로 둔다.
 * 기능: 섹션 id 타입과 화면 노출 순서를 제공한다.
 */
export type HomeSectionKey = 'hello' | 'works' | 'personal' | 'about' | 'journey' | 'toolbox' | 'highlights' | 'contact';

/** 헤더 네비·스크롤 스파이와 동일한 홈 섹션 순서 */
export const HOME_SCROLL_SECTION_IDS: readonly HomeSectionKey[] = [
    'hello',
    'about',
    'works',
    'personal',
    'journey',
    'toolbox',
    'highlights',
    'contact',
] as const;
