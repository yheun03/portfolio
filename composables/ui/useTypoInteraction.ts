/**
 * 목표: 단어 단위 타이포그래피 인터랙션 상태를 컴포넌트 밖으로 분리한다.
 * 기능: 문장 단어 분리, 활성 단어 key 생성/설정/판별을 제공한다.
 */
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
