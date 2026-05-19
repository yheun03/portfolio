export const splitTypoWords = (text: string) => text.trim().split(/\s+/).filter(Boolean);

export const useTypoInteraction = () => {
    const activeKey = ref<string | null>(null);

    const wordKey = (group: string, index: number) => `${group}-${index}`;

    const setActive = (key: string | null) => {
        activeKey.value = key;
    };

    const isActive = (key: string) => activeKey.value === key;

    return { activeKey, wordKey, setActive, isActive };
};
