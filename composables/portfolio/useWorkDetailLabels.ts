// Works 상세 모달에서 사용하는 locale별 고정 라벨 (닫기, 역할, 기여 등)
export function useWorkDetailLabels() {
    const { pick } = useLocale();

    return computed(() => ({
        close: pick({ ko: '닫기', en: 'Close' }),
        closeModalAria: pick({ ko: '상세 모달 닫기', en: 'Close detail modal' }),
        role: pick({ ko: '역할', en: 'Role' }),
        contributions: pick({ ko: '내가 한 일', en: 'My Contributions' }),
        results: pick({ ko: '성과', en: 'Results' }),
        points: pick({ ko: '포인트', en: 'Key Points' }),
    }));
}
