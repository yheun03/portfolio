<template>
    <article
        ref="cardRef"
        class="feature-card"
        :class="cardClass"
        :data-animate="animate ? '' : null"
        :style="tiltStyle"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
    >
        <p v-if="eyebrow" class="feature-card__eyebrow">{{ eyebrow }}</p>
        <p v-if="icon" class="feature-card__icon" aria-hidden="true">{{ icon }}</p>
        <h3 class="feature-card__title">{{ title }}</h3>
        <ul v-if="items.length" class="feature-card__tags">
            <li v-for="item in items" :key="item">
                <BaseBadge size="sm" tone="toolbox" plain>{{ item }}</BaseBadge>
            </li>
        </ul>
        <p v-if="description" class="feature-card__description">{{ description }}</p>
        <slot />
    </article>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        eyebrow?: string;
        icon?: string;
        title: string;
        description?: string;
        items?: readonly string[];
        variant?: 'plain' | 'skill';
        animate?: boolean;
    }>(),
    {
        items: () => [],
        variant: 'plain',
        animate: true,
    },
);

const cardRef = ref<HTMLElement | null>(null);
const rotateX = ref(0);
const rotateY = ref(0);
const glowX = ref(50);
const glowY = ref(50);
const isHovered = ref(false);

const cardClass = computed(() => ({
    'surface-card': props.variant === 'skill',
    'feature-card--skill': props.variant === 'skill',
    'feature-card--tilted': isHovered.value,
}));

const tiltStyle = computed(() => {
    const style: Record<string, string> = {
        '--glow-x': `${glowX.value}%`,
        '--glow-y': `${glowY.value}%`,
    };
    if (isHovered.value) {
        style.transform = `perspective(700px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translateZ(8px)`;
    }
    return style;
});

let rafId = 0;

function onMouseMove(e: MouseEvent) {
    const el = cardRef.value;
    if (!el) return;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        rotateX.value = +(dy * -5).toFixed(2);
        rotateY.value = +(dx * 5).toFixed(2);
        glowX.value = +(((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
        glowY.value = +(((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
        isHovered.value = true;
    });
}

function onMouseLeave() {
    cancelAnimationFrame(rafId);
    rotateX.value = 0;
    rotateY.value = 0;
    isHovered.value = false;
}

onBeforeUnmount(() => cancelAnimationFrame(rafId));
</script>
