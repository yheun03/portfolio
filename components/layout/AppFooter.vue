<template>
    <footer class="app-footer">
        <p class="app-footer__emoji-line" aria-hidden="true">
            <span class="emoji emoji--soft">✦</span>
        </p>
        <p class="app-footer__tagline">{{ t('footer.tagline') }}</p>
        <nav class="app-footer__nav" :aria-label="t('footer.navLabel')">
            <ul class="app-footer__links">
                <li>
                    <NuxtLink to="/">{{ t('footer.homeLink') }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/projects">{{ t('footer.careerLink') }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/personal">{{ t('footer.personalLink') }}</NuxtLink>
                </li>
            </ul>
        </nav>
        <p class="app-footer__copyright">{{ text }}</p>
    </footer>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
const { t } = useLocale();
</script>
