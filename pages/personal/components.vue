<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article class="catalog-page section" aria-labelledby="catalog-page-title">
            <header class="catalog-hero">
                <BaseLabel tone="technical">2026 Portfolio Components</BaseLabel>
                <h1 id="catalog-page-title">컴포넌트 카탈로그</h1>
                <p>
                    홈·갤러리·상세 페이지에서 반복되는 UI 패턴을 Vue base 컴포넌트로 모았습니다.
                    스타일은 <code>assets/style/base/</code> SCSS와 1:1로 대응합니다.
                </p>
                <nav class="catalog-hero__actions" aria-label="카탈로그 페이지 이동">
                    <BaseButton label="디자인 토큰 보기" href="/personal/design-tokens" variant="ghost" />
                    <BaseButton label="개인 프로젝트 목록" href="/personal" variant="ghost" />
                    <BaseButton label="홈으로" href="/" />
                </nav>
            </header>

            <section class="catalog-section" aria-labelledby="button-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseButton</BaseLabel>
                    <h2 id="button-section-title">버튼</h2>
                    <p>primary · ghost 변형. 내부 라우트(<code>to</code>), 앵커·외부 링크(<code>href</code>), 클릭 핸들러를 지원합니다.</p>
                </header>
                <div class="catalog-row">
                    <BaseButton label="Primary" />
                    <BaseButton label="Ghost" variant="ghost" />
                    <BaseButton href="#button-section-title" label="Anchor" variant="ghost" />
                    <BaseButton to="/projects" label="NuxtLink" variant="ghost" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="label-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseLabel</BaseLabel>
                    <h2 id="label-section-title">라벨</h2>
                    <p>섹션 칩·카드 분류 등 UI 계층을 표시하는 pill 라벨입니다.</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseLabel label="Default" />
                    <BaseLabel tone="work" label="Work" />
                    <BaseLabel tone="personal" label="Personal" />
                    <BaseLabel tone="toolbox" label="Toolbox" />
                    <BaseLabel tone="highlight" label="Highlight" />
                    <BaseLabel tone="technical" label="Technical" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="badge-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseBadge · BaseAccentBadge</BaseLabel>
                    <h2 id="badge-section-title">배지</h2>
                    <p>상태·분류 점 배지와 강조 pill 배지입니다.</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseBadge>Default</BaseBadge>
                    <BaseBadge tone="work">Work</BaseBadge>
                    <BaseBadge tone="toolbox" size="sm">Toolbox sm</BaseBadge>
                    <BaseBadge plain>Plain</BaseBadge>
                    <BaseAccentBadge label="Featured" />
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="index-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseIndexLabel</BaseLabel>
                    <h2 id="index-section-title">인덱스 라벨</h2>
                    <p>원칙 목록·케이스 태그 등 mono accent 텍스트입니다.</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseIndexLabel value="01" />
                    <BaseIndexLabel value="02" />
                    <BaseIndexLabel variant="tag">SI PROJECT <BaseAccentBadge label="Featured" /></BaseIndexLabel>
                </div>
            </section>

            <section class="catalog-section" aria-labelledby="chip-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseChipList</BaseLabel>
                    <h2 id="chip-section-title">기술 칩</h2>
                    <p>프로젝트 카드·상세에서 쓰는 mono pill 목록입니다.</p>
                </header>
                <BaseChipList :items="sampleTech" aria-label="샘플 기술 스택" />
            </section>

            <section class="catalog-section" aria-labelledby="stat-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseStatList</BaseLabel>
                    <h2 id="stat-section-title">지표</h2>
                    <p>Proof 섹션의 숫자·라벨 그리드입니다.</p>
                </header>
                <BaseStatList :stats="sampleStats" aria-label="샘플 지표" />
            </section>

            <section class="catalog-section" aria-labelledby="section-title-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseSectionTitle</BaseLabel>
                    <h2 id="section-title-section-title">섹션 타이틀</h2>
                    <p>eyebrow · title · description 조합입니다.</p>
                </header>
                <BaseSectionTitle title-id="catalog-section-title-demo" eyebrow="Works" title="대표 프로젝트"
                    description="홈 쇼케이스와 동일한 섹션 헤더 패턴입니다." :animate="false" />
            </section>

            <section class="catalog-section" aria-labelledby="card-section-title">
                <header class="catalog-section__head">
                    <BaseLabel tone="technical">BaseCard · StoryCaseCard</BaseLabel>
                    <h2 id="card-section-title">카드</h2>
                    <p>범용 카드 shell과 홈 쇼케이스 케이스 카드입니다.</p>
                </header>
                <div class="catalog-grid">
                    <BaseCard>
                        <BaseLabel tone="work" label="Career" />
                        <h3>BaseCard</h3>
                        <p>갤러리·모달 등에서 쓰는 기본 카드 컨테이너입니다.</p>
                    </BaseCard>
                    <StoryCaseCard to="/projects/toms" aria-label="TOMS, 자세히 보기" index-label="01"
                        tag="AWARD PROJECT" period="2024.03 – 2024.11" title="TOMS 통합 관리 시스템"
                        summary="운영 흐름을 한 화면에서 읽을 수 있게 정리한 대표 SI 케이스입니다."
                        :tech="['Vue 3', 'TypeScript', 'SCSS']" cta-label="자세히 보기" tech-aria-label="사용 기술"
                        featured featured-badge="Featured" />
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import { componentCatalogSamples } from '@data/home/component-catalog';

const { t, locale } = useLocale();

const layoutLinks = useSubpageLinks();
const { tech: sampleTech, stats: sampleStats } = componentCatalogSamples;

usePortfolioSeo(() => ({
    title: locale.value === 'ko' ? '2026 포트폴리오 컴포넌트 카탈로그 | 은영환' : '2026 Portfolio Component Catalog | Eunyounghwan',
    description: locale.value === 'ko'
        ? '2026 포트폴리오에서 사용하는 BaseButton, BaseLabel, BaseBadge, BaseChipList, StoryCaseCard 등 Vue base 컴포넌트 미리보기 페이지입니다.'
        : 'A preview page for Vue base components used in the 2026 portfolio — buttons, labels, badges, chips, stats, and cards.',
    path: '/personal/components',
    locale: locale.value,
    type: 'article',
    noindex: true,
    keywords: ['Vue components', '컴포넌트', 'design system', 'portfolio'],
}));
</script>

<style scoped>
.catalog-page {
    display: grid;
    gap: var(--space-fluid-xl);
    width: min(100%, var(--layout-content-max));
    margin: 0 auto;
    padding: calc(var(--layout-header-height) + var(--space-fluid-xl)) var(--inset-page) var(--space-fluid-2xl);
}

.catalog-hero,
.catalog-section {
    display: grid;
    gap: var(--space-6);
}

.catalog-hero h1,
.catalog-section__head h2 {
    margin: 0;
    font-family: var(--font-display);
    letter-spacing: var(--tracking-tight);
}

.catalog-hero h1 {
    font-size: clamp(2rem, 4vw, 3rem);
}

.catalog-section__head h2 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
}

.catalog-hero p,
.catalog-section__head p {
    max-width: 62ch;
    margin: 0;
    color: var(--color-text-muted);
    line-height: var(--line-height-body);
}

.catalog-hero__actions,
.catalog-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: center;
}

.catalog-row--wrap {
    align-items: flex-start;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 32px);
}

@media (max-width: 767px) {
    .catalog-page {
        padding-inline: max(var(--space-5), env(safe-area-inset-left)) max(var(--space-5), env(safe-area-inset-right));
    }

    .catalog-hero__actions {
        display: grid;
    }

    .catalog-hero__actions :deep(.base-button),
    .catalog-row :deep(.base-button) {
        width: 100%;
        justify-content: center;
    }

    .catalog-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
