<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="token-page section" aria-labelledby="token-page-title">
            <header class="token-hero">
                <p class="base-label base-label--technical">2026 Portfolio Design Tokens</p>
                <h1 id="token-page-title">디자인 토큰 정리</h1>
                <p>
                    2026 포트폴리오에서 반복해서 쓰는 색, 여백, 타이포그래피, 형태 값을 목적별 토큰으로
                    나눠 정리했습니다. 이름은 값 자체보다 화면 안에서 맡는 역할이 먼저 읽히도록 잡았습니다.
                </p>
                <div class="token-hero__actions" aria-label="토큰 페이지 이동">
                    <BaseButton label="개인 프로젝트 목록으로" href="/personal" variant="ghost" />
                    <BaseButton label="홈에서 포트폴리오 보기" href="/" />
                </div>
            </header>

            <section class="token-section" aria-labelledby="color-token-title">
                <div class="token-section__head">
                    <p class="base-label base-label--technical">Color</p>
                    <h2 id="color-token-title">색상 토큰</h2>
                    <p>Primitive는 색상 원재료, Semantic은 실제 UI 역할을 나타냅니다.</p>
                </div>
                <div class="token-grid token-grid--colors">
                    <article v-for="token in colorTokens" :key="token.name" class="token-card">
                        <span class="token-swatch" :style="{ background: token.value }" aria-hidden="true" />
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="token-card__value">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                    </article>
                </div>
            </section>

            <section class="token-section" aria-labelledby="space-token-title">
                <div class="token-section__head">
                    <p class="base-label base-label--technical">Spacing</p>
                    <h2 id="space-token-title">여백 토큰</h2>
                    <p>칩과 라벨은 12px~14px 최소 단위를 지키고, 화면·섹션·카드 여백은 PC/TB/MB 순으로 밀도를 낮춥니다.</p>
                </div>
                <div class="token-table" role="table" aria-label="여백 토큰 목록">
                    <div class="token-table__row token-table__row--head" role="row">
                        <span role="columnheader">토큰</span>
                        <span role="columnheader">값</span>
                        <span role="columnheader">네이밍 이유</span>
                    </div>
                    <div v-for="token in spacingTokens" :key="token.name" class="token-table__row" role="row">
                        <span role="cell">{{ token.name }}</span>
                        <span role="cell">{{ token.value }}</span>
                        <span role="cell">{{ token.reason }}</span>
                    </div>
                </div>
            </section>

            <section class="token-section" aria-labelledby="type-token-title">
                <div class="token-section__head">
                    <p class="base-label base-label--technical">Typography</p>
                    <h2 id="type-token-title">폰트 토큰</h2>
                    <p>폰트는 Display가 화면의 리듬을 잡고, Title과 Body가 정보 밀도를 조절하며, Label/Chip은 UI 최소 단위를 지킵니다.</p>
                </div>
                <div class="type-list">
                    <article v-for="token in typographyTokens" :key="token.name" class="type-item">
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="type-item__meta">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                        <p class="type-item__sample" :class="token.sampleClass">The structure feels light.</p>
                    </article>
                </div>
            </section>

            <section class="token-section" aria-labelledby="shape-token-title">
                <div class="token-section__head">
                    <p class="base-label base-label--technical">Shape & Effect</p>
                    <h2 id="shape-token-title">형태와 효과 토큰</h2>
                    <p>라운드와 그림자는 컴포넌트의 위계, 터치 영역, 포커스 상태를 일관되게 맞춥니다.</p>
                </div>
                <div class="token-grid">
                    <article v-for="token in shapeTokens" :key="token.name" class="token-card token-card--shape">
                        <span class="shape-demo" :class="token.demoClass" aria-hidden="true" />
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="token-card__value">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                    </article>
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue';

const { t, locale } = useLocale();

const layoutLinks = useSubpageNavLinks();

const colorTokens = [
    {
        name: '--primary-*',
        value: 'var(--primary-600)',
        reason: '브랜드의 중심 색을 단계형 스케일로 두어 버튼, 링크, 포커스 링이 같은 계열에서 움직이게 합니다.',
    },
    {
        name: '--grayscale-*',
        value: 'var(--grayscale-100)',
        reason: '배경부터 본문까지 넓게 쓰는 중립 색이라 숫자 스케일로 명암 관계를 바로 읽게 했습니다.',
    },
    {
        name: '--color-surface',
        value: 'var(--color-surface)',
        reason: '카드와 패널의 실제 역할 이름입니다. 테마가 바뀌어도 컴포넌트 코드는 surface만 바라봅니다.',
    },
    {
        name: '--color-text-muted',
        value: 'var(--color-text-muted)',
        reason: '보조 설명과 메타 정보처럼 시선을 한 단계 낮춰야 하는 텍스트를 명확히 분리합니다.',
    },
    {
        name: '--accent-hot / --accent-mint',
        value: 'linear-gradient(135deg, var(--accent-hot), var(--accent-mint))',
        reason: '강조점이 필요할 때 쓰는 보조 색입니다. 감정적 이름 대신 accent 역할과 온도감만 남겼습니다.',
    },
    {
        name: '--gallery-*',
        value: 'var(--gallery-bg)',
        reason: '개인·실무 갤러리는 별도 편집 톤을 갖기 때문에 portfolio 토큰과 충돌하지 않게 namespace를 나눴습니다.',
    },
];

const spacingTokens = [
    { name: '--space-1 ~ --space-11', value: '4px ~ 54px', reason: '칩, 버튼, 카드 내부처럼 촘촘한 UI 간격은 4px 계열의 숫자 단계로 맞춥니다.' },
    { name: '--space-fluid-xs ~ 3xl', value: 'clamp(...)', reason: 'PC에서는 호흡을 크게, TB/MB에서는 정보 밀도를 유지하도록 화면 단위 여백을 유동값으로 둡니다.' },
    { name: '--space-section-y / gap', value: 'PC > TB > MB override', reason: '섹션 상하 여백과 섹션 내부 간격은 breakpoint별 CSS 변수 override로 우선순위를 둡니다.' },
    { name: '--inset-page / --inset-panel', value: 'responsive inset', reason: '페이지와 패널의 좌우 여백을 분리해 모바일에서 카드가 과하게 좁아지지 않게 했습니다.' },
    { name: '--card-padding / lg', value: 'responsive padding', reason: '반복 카드의 내부 여백은 카드 namespace로 묶고 모바일에서는 16px대까지 낮춥니다.' },
    { name: '--size-touch / compact', value: '44px / 40px', reason: '버튼과 토글은 접근성 터치 영역을 기준으로 크기 토큰을 분리했습니다.' },
];

const typographyTokens = [
    { name: 'Display-1', value: 'PC 64~136 / TB 51~96 / MB 44~76px · 900', reason: '홈 히어로와 가장 강한 액티비티 타이틀에만 쓰는 최상위 토큰입니다.', sampleClass: 'type-item__sample--display1' },
    { name: 'Display-2 / Display-3', value: '강조 섹션·대형 카드 · 900', reason: '큰 시각 신호는 유지하되 Display-1보다 먼저 튀지 않도록 2~3단계로 낮춥니다.', sampleClass: 'type-item__sample--display3' },
    { name: 'Display-4 / Display-5 / Display-6', value: '섹션·카드 제목 · 760~900', reason: '섹션 제목, 주요 카드 제목, 작은 모듈 제목의 우선순위를 분리합니다.', sampleClass: 'type-item__sample--display5' },
    { name: 'Title-1 / Title-2 / Title-3', value: '18~23 / 16~19 / 16~17px · 720~760', reason: '카드·리스트 안에서 Display보다 낮은 정보 제목으로 사용합니다.', sampleClass: 'type-item__sample--title' },
    { name: 'Body-1 / Body-2', value: '16px+ / 15px · 500', reason: '본문은 16px 이상을 기준으로 두고, 보조 설명만 15px 밀도로 낮춥니다.', sampleClass: 'type-item__sample--body' },
    { name: 'Label / Chip', value: '14px / 12px · 720', reason: '메타 라벨은 14px, 칩은 최소 단위인 12px로 고정해 작은 UI의 밀도를 통일합니다.', sampleClass: 'type-item__sample--label' },
];

const shapeTokens = [
    { name: '--radius-card', value: '0.95rem', reason: '주요 카드와 버튼의 공통 모서리입니다. 포트폴리오의 부드러운 톤을 기본값으로 둡니다.', demoClass: 'shape-demo--card' },
    { name: '--radius-pill', value: '999px', reason: '태그, 세그먼트, 작은 상태값처럼 알약형 UI임을 이름만으로 알 수 있습니다.', demoClass: 'shape-demo--pill' },
    { name: '--shadow-soft', value: '0 18px 44px ...', reason: '기본 떠오름 상태입니다. 과한 장식보다 계층을 보여주는 용도라 soft로 부릅니다.', demoClass: 'shape-demo--soft' },
    { name: '--shadow-ring', value: '0 0 0 3px ...', reason: '키보드 포커스와 선택 상태처럼 둘러싸는 피드백을 ring으로 분리했습니다.', demoClass: 'shape-demo--ring' },
];

usePortfolioSeo(() => ({
    title: locale.value === 'ko' ? '2026 포트폴리오 디자인 토큰 | 은영환' : '2026 Portfolio Design Tokens | Eunyounghwan',
    description: locale.value === 'ko'
        ? '2026 포트폴리오에서 쓰는 색상, 여백, 폰트, 라운드, 그림자 디자인 토큰과 네이밍 이유를 정리한 페이지입니다.'
        : 'A design token overview for the 2026 portfolio, covering color, spacing, typography, radius, shadows, and naming rationale.',
    path: '/personal/design-tokens',
    locale: locale.value,
    type: 'article',
    keywords: ['design tokens', '디자인 토큰', 'SCSS', 'Vue portfolio'],
}));
</script>

<style scoped>
.token-page {
    display: grid;
    gap: var(--space-fluid-xl);
    width: min(100%, var(--layout-content-max));
    margin: 0 auto;
    padding: calc(var(--layout-header-height) + var(--space-fluid-xl)) var(--inset-page) var(--space-fluid-2xl);
}

.token-hero,
.token-section {
    display: grid;
    gap: var(--space-fluid-md);
}

.token-hero {
    max-width: 76rem;
}

.token-hero h1 {
    max-width: 11ch;
    font-family: var(--font-display);
    font-size: var(--font-size-display-2);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-display);
    letter-spacing: var(--tracking-tight);
}

.token-hero p:not(.base-label--technical),
.token-section__head p:not(.base-label--technical) {
    max-width: 64ch;
    color: var(--color-text-muted);
}

.token-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
}

.token-section__head {
    display: grid;
    gap: var(--space-4);
}

.token-section__head h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-4);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-heading);
    letter-spacing: var(--tracking-tight);
}

.token-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-fluid-sm);
}

.token-card,
.type-item,
.token-table {
    border: 1px solid color-mix(in srgb, var(--color-border) 78%, var(--color-primary));
    border-radius: var(--radius-card);
    background: var(--color-glass-2-strong);
    box-shadow: var(--shadow-soft), var(--shadow-glow);
    backdrop-filter: blur(14px);
}

.token-card {
    display: grid;
    gap: var(--space-6);
    padding: var(--card-padding);
}

.token-card h3,
.type-item h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
    letter-spacing: var(--tracking-heading);
}

.token-card p,
.type-item p {
    color: var(--color-text-muted);
}

.token-card__value {
    margin: var(--space-2) 0 var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
    color: var(--color-primary);
}

.token-swatch {
    min-height: 7rem;
    border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-glow);
}

.token-table {
    overflow: hidden;
}

.token-table__row {
    display: grid;
    grid-template-columns: minmax(9rem, 0.8fr) minmax(8rem, 0.7fr) minmax(0, 1.5fr);
    gap: var(--space-5);
    padding: var(--space-5) var(--space-6);
    border-top: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);
}

.token-table__row:first-child {
    border-top: 0;
}

.token-table__row--head {
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    color: var(--color-primary);
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.token-table__row span:nth-child(1),
.token-table__row span:nth-child(2) {
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.type-list {
    display: grid;
    gap: var(--space-fluid-sm);
}

.type-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.8fr);
    gap: var(--space-fluid-md);
    align-items: center;
    padding: var(--card-padding);
}

.type-item__sample {
    color: var(--color-text);
}

.type-item__meta {
    margin: var(--space-2) 0 var(--space-3);
    color: var(--color-primary) !important;
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.type-item__sample--display1 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-1);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
}

.type-item__sample--display3 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-3);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-display);
    letter-spacing: var(--tracking-tight);
}

.type-item__sample--display5 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-5);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-heading);
    letter-spacing: var(--tracking-heading);
}

.type-item__sample--title {
    font-family: var(--font-display);
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
    letter-spacing: var(--tracking-heading);
}

.type-item__sample--body {
    font-family: var(--font-body);
    font-size: var(--font-size-body-1);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);
    letter-spacing: 0;
}

.type-item__sample--label {
    font-family: var(--font-body);
    font-size: var(--font-size-chip);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-ui);
    text-transform: uppercase;
}

.shape-demo {
    width: min(100%, 12rem);
    height: 5rem;
    background: var(--gradient-surface);
    border: 1px solid var(--color-border);
}

.shape-demo--card {
    border-radius: var(--radius-card);
}

.shape-demo--pill {
    width: 12rem;
    height: 3.5rem;
    border-radius: var(--radius-pill);
}

.shape-demo--soft {
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
}

.shape-demo--ring {
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-ring);
}

@media (max-width: 767px) {
    .token-page {
        padding-inline: max(var(--space-5), env(safe-area-inset-left)) max(var(--space-5), env(safe-area-inset-right));
    }

    .token-hero h1,
    .token-section__head h2 {
        overflow-wrap: anywhere;
    }

    .token-hero__actions {
        display: grid;

        .base-button {
            width: 100%;
            justify-content: center;
        }
    }

    .token-table__row,
    .type-item {
        grid-template-columns: 1fr;
    }

    .token-table__row {
        gap: var(--space-2);
        padding: var(--space-4);
    }

    .type-item__sample {
        overflow-wrap: anywhere;
    }

    .shape-demo,
    .shape-demo--pill {
        width: min(100%, 12rem);
    }
}
</style>
