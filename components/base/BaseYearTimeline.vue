<template>
    <div class="year-timeline" :class="`year-timeline--${variant}`" :aria-label="ariaLabel">
        <section v-for="(era, index) in eras" :key="era.key" class="year-timeline__era" :class="eraClasses(era)"
            :aria-labelledby="era.year ? yearHeadingId(era) : undefined"
            :aria-label="!era.year ? flatAriaLabel : undefined">
            <div v-if="era.year" class="year-timeline__year">
                <h2 :id="yearHeadingId(era)" class="year-timeline__year-title"
                    :class="`year-timeline__year-title--${variant}`">{{ era.year }}
                </h2>
            </div>
            <component :is="entriesTag" class="year-timeline__entries">
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
        idPrefix: 'year-timeline',
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
        { 'year-timeline__era--flat': !era.year },
        `year-timeline__era--${props.variant}`,
    ];
}
</script>
