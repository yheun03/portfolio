<template>
    <section id="contact" ref="contactSectionRef" class="section section--contact" aria-labelledby="section-contact-title">
        <div class="contact__poster" data-animate="zoom">
            <header class="contact__head">
                <BaseSectionTitle title-id="section-contact-title" :eyebrow="t('nav.contact')" :title="t('contact.title')" />
                <p class="contact__lead">{{ t("contact.description") }}</p>
            </header>

            <section class="spotlight-block spotlight" :aria-label="locale === 'ko' ? '연락처' : 'Contact'">
                <h3 class="spotlight__kicker">{{ t("contact.kicker") }}</h3>
                <a class="contact__mail-display" :href="`mailto:${profile.contacts.email}`"
                    :aria-label="emailDisplayLabel">
                    <span v-for="(letter, index) in emailLetters" :key="`${letter}-${index}`"
                        :class="{ 'contact__mail-slot--suffix': atSignIndex >= 0 && index >= atSignIndex }"
                        :style="{ '--mail-index': index }" aria-hidden="true">
                        <span>{{ letter }}</span>
                    </span>
                </a>
            </section>

            <p class="contact__note">{{ t("contact.note") }}</p>

            <nav class="contact__actions" :aria-label="locale === 'ko' ? '연락 링크' : 'Contact links'">
                <a class="base-button base-button--primary" :href="`mailto:${profile.contacts.email}`">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    {{ t("contact.email") }}
                </a>
                <a class="base-button base-button--ghost" :href="profile.contacts.github" target="_blank"
                    rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
                    {{ t("contact.github") }}
                </a>
                <a class="base-button base-button--ghost" :href="profile.contacts.resume" target="_blank"
                    rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    {{ t("contact.resume") }}
                </a>
            </nav>

            <div class="contact__profile" aria-hidden="true">
                <img :src="profilePhotoSrc" alt="" loading="lazy" decoding="async" fetchpriority="low" />
                <p class="contact__profile-label">{{ t("contact.profileLabel") }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "@data/site";
import profilePhotoUrl from "~/assets/images/profile/photo-1440.webp";
import { useMagnetic } from "@composables/ui/useMagnetic";

const { t, locale } = useLocale();
const contactSectionRef = ref<HTMLElement | null>(null);
useMagnetic(contactSectionRef, ".contact__actions .base-button");
const emailLetters = computed(() => profile.contacts.email.split(""));
const atSignIndex = computed(() => profile.contacts.email.indexOf("@"));
const profilePhotoSrc = profilePhotoUrl;
const emailDisplayLabel = computed(() =>
    locale.value === "ko" ? `이메일 주소 ${profile.contacts.email}` : `Email address ${profile.contacts.email}`,
);
</script>
