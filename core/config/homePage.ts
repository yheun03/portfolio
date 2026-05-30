/**
 * 홈 섹션 키 — JSON보다 TS에 두는 편이 타입 안전과 라우트 매핑에 유리함.
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
