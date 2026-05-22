<template>
    <div class="editorial-year-timeline" :class="`editorial-year-timeline--${variant}`" :aria-label="ariaLabel">
        <section v-for="(era, index) in eras" :key="era.key" class="editorial-year-era" :class="eraClasses(era)"
            :aria-labelledby="era.year ? yearHeadingId(era) : undefined"
            :aria-label="!era.year ? flatAriaLabel : undefined">
            <div v-if="era.year" class="editorial-year-era__year">
                <h2 :id="yearHeadingId(era)" class="editorial-year" :class="`editorial-year--${variant}`">{{ era.year }}
                </h2>
            </div>
            <component :is="entriesTag" class="editorial-year-era__entries">
                <slot name="era" :era="era" :index="index" />
            </component>
        </section>
    </div>
</template>

<script setup lang="ts" generic="TEra extends EditorialYearEraItem = EditorialYearEraItem">
import type { EditorialYearEntriesTag, EditorialYearEraItem, EditorialYearVariant } from '@config/editorialYear';

const props = withDefaults(
    defineProps<{
        eras: readonly TEra[];
        ariaLabel: string;
        variant?: EditorialYearVariant;
        idPrefix?: string;
        flatAriaLabel?: string;
        entriesTag?: EditorialYearEntriesTag;
    }>(),
    {
        variant: 'home',
        idPrefix: 'editorial-year',
        entriesTag: 'div',
    },
);

defineSlots<{
    era(props: { era: TEra; index: number }): unknown;
}>();

function yearHeadingId(era: EditorialYearEraItem) {
    return `${props.idPrefix}-${era.key}`;
}

function eraClasses(era: EditorialYearEraItem) {
    return [
        { 'editorial-year-era--flat': !era.year },
        `editorial-year-era--${props.variant}`,
    ];
}
</script>
