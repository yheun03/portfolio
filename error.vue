<template>
    <main id="main-content" class="error-page" tabindex="-1">
        <article class="error-page__card base-card" role="alert" aria-live="assertive">
            <span class="error-page__emoji emoji emoji--soft" aria-hidden="true">{{ emoji }}</span>

            <div class="error-page__layout">
                <div class="error-page__status" aria-hidden="true">
                    <p class="error-page__code">{{ statusCode }}</p>
                </div>

                <div class="error-page__main">
                    <header class="error-page__head section-title section-title--minimal">
                        <p class="section-title__eyebrow">{{ eyebrow }}</p>
                        <h1 class="section-title__title">{{ title }}</h1>
                    </header>

                    <p class="error-page__lead">{{ message }}</p>

                    <p v-if="requestedPath" class="error-page__path">
                        <span class="error-page__path-label">{{ t('error.pathLabel') }}</span>
                        <code class="error-page__path-value">{{ requestedPath }}</code>
                    </p>

                    <nav class="error-page__actions" :aria-label="t('a11y.errorActions')">
                        <BaseButton :label="t('error.home')" href="/" @click="handleError" />
                        <BaseButton :label="t('error.report')" :href="reportHref" variant="ghost" />
                    </nav>
                </div>
            </div>
        </article>
    </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
    error: NuxtError;
}>();

const route = useRoute();
const { content, locale, t } = useLocale();
const profile = computed(() => content.value.profile);
const statusCode = computed(() => props.error.statusCode ?? 500);
const is404 = computed(() => statusCode.value === 404);

const eyebrow = computed(() => t(is404.value ? 'error.eyebrow404' : 'error.eyebrow500'));
const title = computed(() => t(is404.value ? 'error.title404' : 'error.title500'));
const message = computed(() => t(is404.value ? 'error.message404' : 'error.message500'));
const emoji = computed(() => (is404.value ? '📎' : '🛠️'));
const requestedPath = computed(() => route.fullPath || route.path || '');

const reportHref = computed(() => {
    const subject = encodeURIComponent(t('error.reportSubject'));
    const body = encodeURIComponent(`${t('error.reportBody')}\n\n${requestedPath.value}`);
    return `mailto:${profile.value.contacts.email}?subject=${subject}&body=${body}`;
});

usePortfolioSeo(() => ({
    title: t('error.seoTitle').replace('{code}', String(statusCode.value)),
    description: message.value,
    path: route.path || '/',
    locale: locale.value,
    noindex: true,
}));

const handleError = () => clearError({ redirect: '/' });
</script>
