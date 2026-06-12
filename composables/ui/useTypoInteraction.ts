// 타이포그래피 단어 단위 인터랙션 — 단어 분리, 활성 key 관리
export function splitTypoWords(text: string): string[] {
    return text.trim().split(/\s+/).filter(Boolean);
}

export function useTypoInteraction() {
    const activeKey = ref<string | null>(null);

    function wordKey(group: string, index: number) {
        return `${group}-${index}`;
    }

    function setActive(key: string | null) {
        activeKey.value = key;
    }

    function isActive(key: string) {
        return activeKey.value === key;
    }

    return { activeKey, wordKey, setActive, isActive };
}
