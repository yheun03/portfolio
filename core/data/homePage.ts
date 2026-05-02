export type HomeSectionKey =
    | 'hello'
    | 'works'
    | 'about'
    | 'journey'
    | 'toolbox'
    | 'highlights'
    | 'contact';

/** 헤더 네비·스크롤 스파이와 동일한 섹션 순서 */
export const SCROLL_SECTION_IDS: readonly HomeSectionKey[] = [
    'hello',
    'about',
    'works',
    'journey',
    'toolbox',
    'highlights',
    'contact',
] as const;

/** 홈 페이지 레이어(비주얼 그룹)별 섹션 키 — 컴포넌트 매핑은 `pages/index.vue`에서 수행 */
export const HOME_PAGE_LAYERS: readonly {
    readonly name: string;
    readonly sectionKeys: readonly HomeSectionKey[];
}[] = [
    { name: 'hero', sectionKeys: ['hello'] },
    { name: 'works', sectionKeys: ['works'] },
    { name: 'capability', sectionKeys: ['about', 'journey', 'toolbox', 'highlights'] },
    { name: 'contact', sectionKeys: ['contact'] },
] as const;
