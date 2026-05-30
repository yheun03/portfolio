/**
 * 목표: 연도 타임라인 UI에서 공유하는 타입을 명확히 분리한다.
 * 기능: 홈/갤러리 변형, 연도 항목, 렌더링 태그 타입을 제공한다.
 */
export type EditorialYearVariant = 'home' | 'gallery';

export type EditorialYearEraItem = {
    key: string;
    year?: string;
};

export type EditorialYearEntriesTag = 'ol' | 'ul' | 'div';
