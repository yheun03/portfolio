/**
 * 홈 섹션 키·레이아웃 그룹 — JSON보다 TS에 두는 편이 타입 안전과 라우트 매핑에 유리함.
 * (본문 문구는 i18n / `content/site` / `content/works` 등에서 관리)
 */
export type HomeSectionKey = 'hello' | 'works' | 'personal' | 'about' | 'journey' | 'toolbox' | 'highlights' | 'contact';

/** 헤더 네비·스크롤 스파이와 동일한 섹션 순서 */
export const SCROLL_SECTION_IDS: readonly HomeSectionKey[] = [
    'hello',
    'about',
    'works',
    'personal',
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
    { name: 'profile', sectionKeys: ['about'] },
    { name: 'works', sectionKeys: ['works', 'personal'] },
    { name: 'capability', sectionKeys: ['journey', 'toolbox', 'highlights'] },
    { name: 'contact', sectionKeys: ['contact'] },
] as const;
