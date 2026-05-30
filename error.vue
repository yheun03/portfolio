<template>
    <main id="main-content" class="error-page" tabindex="-1">
        <section class="error-page__panel" role="alert" aria-live="assertive">
            <p class="base-label">Route Check</p>
            <span class="error-page__emoji emoji emoji--soft" aria-hidden="true">🧭</span>
            <p class="error-page__code" aria-hidden="true">{{ statusCode }}</p>
            <h1>{{ title }}</h1>
            <p class="error-page__message">{{ message }}</p>
            <div class="error-page__actions">
                <button type="button" class="base-button base-button--primary" @click="handleError">
                    {{ locale === 'ko' ? '홈으로 재정렬' : 'Back to home' }}
                </button>
                <a class="base-button base-button--ghost" href="mailto:eyh208@naver.com">
                    {{ locale === 'ko' ? '길 잃은 링크 제보' : 'Report the lost link' }}
                </a>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
    error: NuxtError;
}>();

const route = useRoute();
const { locale } = useLocale();
const statusCode = computed(() => props.error.statusCode ?? 500);
const title = computed(() =>
    locale.value === 'ko'
        ? statusCode.value === 404
            ? '이 화면은 아직 퍼블리싱 대기열에 있어요.'
            : '잠깐, 화면 조립 중 문제가 생겼어요.'
        : statusCode.value === 404
          ? 'This screen is still waiting in the publishing queue.'
          : 'Something slipped while assembling this screen.',
);
const message = computed(() =>
    locale.value === 'ko'
        ? '주소를 다시 확인하거나 홈으로 돌아가면 안전한 레이아웃으로 복귀할 수 있습니다.'
        : 'Check the address again, or return home to get back to a stable layout.',
);

usePortfolioSeo(() => ({
    title:
        locale.value === 'ko'
            ? `${statusCode.value} 오류 | 은영환 포트폴리오`
            : `Error ${statusCode.value} | Eunyounghwan Portfolio`,
    description: message.value,
    path: route.path || '/',
    locale: locale.value,
    noindex: true,
}));

const handleError = () => clearError({ redirect: '/' });
</script>
