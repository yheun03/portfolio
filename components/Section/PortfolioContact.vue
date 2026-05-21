<template>
    <section id="contact" class="section section--contact">
        <span class="section__emoji section__emoji--contact accent-emoji accent-emoji--soft"
            aria-hidden="true">💬</span>

        <div class="contact__poster" data-animate>
            <header class="contact__head">
                <BaseSectionTitle :eyebrow="t('nav.contact')" :title="t('contact.title')" />
                <p class="contact__lead">{{ t("contact.description") }}</p>
            </header>

            <section class="contact__spotlight promo-spotlight" :aria-label="locale === 'ko' ? '연락처' : 'Contact'">
                <h3 class="promo-spotlight__kicker">{{ t("contact.kicker") }}</h3>
                <a class="contact__mail-display" :href="`mailto:${profile.contacts.email}`">
                    <span v-for="(letter, index) in emailLetters" :key="`${letter}-${index}`">{{ letter }}</span>
                </a>
            </section>

            <p class="contact__note">{{ t("contact.note") }}</p>

            <nav class="contact__actions" :aria-label="locale === 'ko' ? '연락 링크' : 'Contact links'">
                <a class="base-button base-button--primary" :href="`mailto:${profile.contacts.email}`">
                    {{ t("contact.email") }}
                </a>
                <a class="base-button base-button--ghost" :href="profile.contacts.github" target="_blank"
                    rel="noopener noreferrer">
                    {{ t("contact.github") }}
                </a>
                <a class="base-button base-button--ghost" :href="profile.contacts.resume" target="_blank"
                    rel="noopener noreferrer">
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
import profilePhotoUrl from "~/assets/image/photo-1440.webp";

const { t, locale } = useLocale();
const emailLetters = computed(() => profile.contacts.email.split(""));
const profilePhotoSrc = profilePhotoUrl;
</script>
