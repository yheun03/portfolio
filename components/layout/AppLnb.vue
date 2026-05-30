<template>
    <Teleport to="body">
        <transition name="app-lnb-fade">
            <button v-if="open" type="button" class="app-lnb__backdrop"
                :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="emitClose" />
        </transition>
        <transition name="app-lnb-drawer">
            <nav v-if="open" :id="id" class="app-lnb"
                :aria-label="locale === 'ko' ? '모바일 주요 메뉴' : 'Mobile primary menu'">
                <p class="app-lnb__eyebrow">{{ locale === 'ko' ? '페이지' : 'Pages' }}</p>
                <BaseLink v-for="item in links" :key="item.href" :href="item.href" class="app-lnb__link"
                    :class="{ 'app-lnb__link--active': isActive(item.href) }" @click="emitClose">
                    {{ item.label }}
                </BaseLink>
            </nav>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { AppNavLink } from '@composables/portfolio/useNavLinkState';

const { locale } = useLocale();

const props = withDefaults(
    defineProps<{
        id?: string;
        open: boolean;
        links: AppNavLink[];
        activeId?: string;
        activePath?: string;
    }>(),
    { activeId: '' },
);

const emit = defineEmits(['close']);

function emitClose(): void {
    emit('close');
}

const { isActive } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

</script>
