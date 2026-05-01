<template>
    <section id="contact" class="section">
        <BaseSectionTitle eyebrow="Contact" :title="t('contact.title')" :description="t('contact.description')" />
        <div class="contact__cta">
            <BaseButton :label="t('contact.email')" :href="`mailto:${profile.contacts.email}`" aria-label="메일 보내기" />
            <BaseButton :label="t('contact.github')" :href="profile.contacts.github" variant="ghost" />
            <BaseButton :label="t('contact.portfolio')" :href="profile.contacts.portfolio" variant="ghost" />
            <BaseButton :label="t('contact.archive')" :href="profile.contacts.archive" variant="ghost" />
            <BaseButton :label="t('contact.resume')" :href="profile.contacts.resume" variant="ghost" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "~/core/data/profile";
const { t } = useLocale();
</script>
