// 연도 타임라인 UI 공유 타입 — 홈·갤러리 변형, 연도 항목, 렌더 태그
export type EditorialYearVariant = 'home' | 'gallery';

export type EditorialYearEraItem = {
    key: string;
    year?: string;
};

export type EditorialYearEntriesTag = 'ol' | 'ul' | 'div';

// Highlights 섹션 탭 식별자 — 데이터·스토어·컴포넌트 공용 계약 타입
export type HighlightTabKey = 'awards' | 'certifications' | 'roles' | 'activities';
