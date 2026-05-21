# Portfolio

Nuxt 3 기반 개인 포트폴리오 사이트입니다.

## 문서

- **[데이터 · 다국어 · 폴더 구조](docs/project-data-notes.md)** — `core/content`, `core/locales`, 작업 JSON, 갤러리 라우트 정리

## 디자인 토큰 사용법

스타일 토큰은 `assets/style/_tokens.scss`에서 관리합니다. Nuxt 설정에서 `@use "tokens" as *;`가 전역 주입되며, 화면 스타일은 `assets/style/main.scss` 한 파일에 모아 관리합니다.

```scss
@use 'tokens' as *;
```

### 색상

색상은 `text-primary`, `surface-bg`처럼 의미별 alias를 새로 만들지 않고 기본 스케일 토큰을 직접 사용합니다. 다크 테마에서는 CSS 변수 값만 바뀌므로 SCSS 사용 코드는 그대로 유지됩니다.

```scss
.card {
    color: $grayscale-900;
    background: $grayscale-0;
    border: 1px solid $grayscale-300;
}

.button {
    color: $grayscale-0;
    background: $primary-600;
}

.error {
    color: $state-error;
}
```

사용 기준:

- `$grayscale-0` ~ `$grayscale-200`: 배경, 카드, 강조 면
- `$grayscale-300` ~ `$grayscale-500`: 보더, 디바이더, 비활성 요소
- `$grayscale-600` ~ `$grayscale-700`: 보조 텍스트
- `$grayscale-800` ~ `$grayscale-950`: 주요 텍스트
- `$primary-50` ~ `$primary-900`: 브랜드/액션 컬러
- `$state-error`, `$state-success`, `$state-warning`: 상태 컬러

기존 코드 호환을 위해 `--color-bg`, `--color-text`, `--color-primary` 같은 CSS 변수 alias는 남겨두지만, 새 SCSS 작성 시에는 `$grayscale-*`, `$primary-*`, `$state-*`를 우선 사용합니다.

### 폰트

폰트는 `@include font(...)` 믹스인을 사용합니다. 각 프리셋은 기본 `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`을 가지고 있어 프리셋 이름만 넘겨도 됩니다.

```scss
.hero-title {
    @include font(heading-1);
}

.section-title {
    @include font(heading-2);
}

.card-title {
    @include font(title-1);
}

.description {
    @include font(body-1);
}

.caption {
    @include font(caption-1);
}
```

필요한 값만 덮어쓸 수도 있습니다.

```scss
.strong-title {
    @include font(title-1, $font-weight-black);
}

.label {
    @include font(caption-2, $letter-spacing: 0.08em);
}

.compact-text {
    @include font(body-2, $line-height: 1.45);
}
```

현재 프리셋:

- `heading-1`, `heading-2`, `heading-3`
- `title-1`, `title-2`
- `body-1`, `body-2`
- `caption-1`, `caption-2`
- `label`, `button`

### 여백과 형태

여백과 크기도 토큰을 우선 사용합니다.

```scss
.panel {
    padding: $space-7;
    gap: $space-4;
    border-radius: $radius-card;
}
```

주요 토큰:

- `$space-0` ~ `$space-11`: 고정 간격
- `$space-fluid-xs` ~ `$space-fluid-2xl`: 반응형 간격
- `$radius-card`, `$radius-md`, `$radius-lg`, `$radius-xl`: radius
- `$shadow-soft`, `$shadow-lift`, `$shadow-glow`: shadow

## 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run generate # 정적 생성
npm run deploy   # build + GitHub Pages(gh-pages 브랜치) 배포
```
