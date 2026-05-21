<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-section-dock="true">
        <article class="token-page section" aria-labelledby="token-page-title">
            <header class="token-hero">
                <p class="technical-label">2026 Portfolio Design Tokens</p>
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
                    <p class="technical-label">Color</p>
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
                    <p class="technical-label">Spacing</p>
                    <h2 id="space-token-title">여백 토큰</h2>
                    <p>작은 UI 간격은 숫자 단계로, 화면 단위 간격은 fluid 이름으로 분리했습니다.</p>
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
                    <p class="technical-label">Typography</p>
                    <h2 id="type-token-title">폰트 토큰</h2>
                    <p>크기, 굵기, 행간을 분리하고 자주 쓰는 조합은 preset으로 부릅니다.</p>
                </div>
                <div class="type-list">
                    <article v-for="token in typographyTokens" :key="token.name" class="type-item">
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p>{{ token.reason }}</p>
                        </div>
                        <p class="type-item__sample" :class="token.sampleClass">The structure feels light.</p>
                    </article>
                </div>
            </section>

            <section class="token-section" aria-labelledby="shape-token-title">
                <div class="token-section__head">
                    <p class="technical-label">Shape & Effect</p>
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
import BaseButton from '~/components/Common/BaseButton.vue';

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
    { name: '--space-1 ~ --space-11', value: '0.25rem ~ 3.4rem', reason: '컴포넌트 내부 간격은 작은 증감이 많아 숫자 단계가 가장 빠르게 읽힙니다.' },
    { name: '--space-fluid-xs ~ 3xl', value: 'clamp(...)', reason: '화면 폭에 따라 자연스럽게 커져야 하는 섹션 간격은 fluid 접두어로 구분했습니다.' },
    { name: '--inset-page', value: 'clamp(2rem, 5vw, 6rem)', reason: '페이지 좌우 여백처럼 레이아웃의 안쪽 들여쓰기를 inset으로 명명했습니다.' },
    { name: '--card-padding', value: 'clamp(1.35rem, 3vw, 2.35rem)', reason: '카드 내부 여백은 반복 사용되는 컴포넌트 맥락이라 card namespace를 붙였습니다.' },
    { name: '--size-touch', value: '2.75rem', reason: '버튼과 토글의 최소 터치 영역을 값이 아닌 접근성 목적 중심으로 부릅니다.' },
];

const typographyTokens = [
    { name: 'heading-1 / heading-2', reason: '페이지의 시각적 시작점과 섹션 제목을 구분하기 위해 heading 단계로 묶었습니다.', sampleClass: 'type-item__sample--heading' },
    { name: 'title-1 / title-2', reason: '카드나 패널 안에서 쓰는 제목은 hero급 제목보다 작아 title preset으로 분리했습니다.', sampleClass: 'type-item__sample--title' },
    { name: 'body-1 / body-2', reason: '본문 밀도에 따라 읽기용과 보조 설명용을 나누되, 최소 14px 이상을 유지합니다.', sampleClass: 'type-item__sample--body' },
    { name: 'caption-1 / caption-2 / label', reason: '메타 정보, 작은 라벨, 기술 태그는 UI 목적이 달라 caption과 label로 나눴습니다.', sampleClass: 'type-item__sample--label' },
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
    font-size: clamp(3rem, 8vw, 7rem);
    line-height: var(--line-height-display);
    letter-spacing: var(--tracking-tight);
}

.token-hero p:not(.technical-label),
.token-section__head p:not(.technical-label) {
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
    font-size: var(--font-size-section-title);
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
    font-size: var(--font-size-lg);
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
    font-size: var(--font-size-xs);
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
    font-weight: var(--font-weight-bold);
}

.token-table__row span:nth-child(1),
.token-table__row span:nth-child(2) {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
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

.type-item__sample--heading {
    font-size: var(--font-size-section-title);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-heading);
    letter-spacing: var(--tracking-tight);
}

.type-item__sample--title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
}

.type-item__sample--body {
    font-size: var(--font-size-md);
    line-height: var(--line-height-body);
}

.type-item__sample--label {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-label);
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
        padding-inline: var(--space-7);
    }

    .token-table__row,
    .type-item {
        grid-template-columns: 1fr;
    }

    .token-table__row {
        gap: var(--space-2);
    }
}
</style>
