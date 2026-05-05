<template>
    <section id="contact" class="section section--contact">
        <span class="section__emoji section__emoji--contact accent-emoji accent-emoji--soft"
            aria-hidden="true">💬</span>
        <div class="contact__composition">
            <BaseSectionTitle :eyebrow="t('nav.contact')" :title="t('contact.title')"
                :description="t('contact.description')" />
            <a class="contact__mail-art" :href="`mailto:${profile.contacts.email}`"
                :aria-label="locale === 'ko' ? '메일 보내기' : 'Send email'">
                <span v-for="(letter, index) in emailLetters" :key="`${letter}-${index}`">{{ letter }}</span>
            </a>
            <BaseCard class="contact__summary">
                <BaseLabel tone="contact" label="Collaboration" />
                <div class="contact__profile" aria-hidden="true">
                    <img src="/assets/image/photo-1440.webp" alt="" loading="lazy" />
                    <span>{{ locale === "ko" ? "열린 협업 가능" : "Open to collaborate" }}</span>
                </div>
                <p class="contact__summary-text">
                    {{ locale === "ko"
                        ? "프로젝트 맥락을 빠르게 파악하고, 구조 중심으로 일정과 품질을 함께 맞추는 협업을 지향합니다."
                        : "I collaborate with a structure-first mindset, balancing delivery speed and quality with clear" +
                        " context sharing." }}
                </p>
            </BaseCard>
            <div class="contact__cta">
                <BaseButton :label="t('contact.email')" :href="`mailto:${profile.contacts.email}`"
                    :aria-label="locale === 'ko' ? '메일 보내기' : 'Send email'" />
                <BaseButton :label="t('contact.github')" :href="profile.contacts.github" variant="ghost" />
                <BaseButton :label="t('contact.portfolio')" :href="profile.contacts.portfolio" variant="ghost" />
                <BaseButton :label="t('contact.archive')" :href="profile.contacts.archive" variant="ghost" />
                <BaseButton :label="t('contact.resume')" :href="profile.contacts.resume" variant="ghost" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "~/core/data/profile";
const { t, locale } = useLocale();
const emailLetters = computed(() => profile.contacts.email.split(""));
</script>
