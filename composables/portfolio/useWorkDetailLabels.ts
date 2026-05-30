/**
 * 목표: Works 상세 모달에서 사용하는 고정 라벨을 locale별로 제공한다.
 * 기능: 닫기, 역할, 기여, 성과, 포인트 라벨 computed 값을 만든다.
 */
export function useWorkDetailLabels() {
    const { locale } = useLocale();

    return computed(() => ({
        close: locale.value === 'ko' ? '닫기' : 'Close',
        closeModalAria: locale.value === 'ko' ? '상세 모달 닫기' : 'Close detail modal',
        role: locale.value === 'ko' ? '역할' : 'Role',
        contributions: locale.value === 'ko' ? '내가 한 일' : 'My Contributions',
        results: locale.value === 'ko' ? '성과' : 'Results',
        points: locale.value === 'ko' ? '포인트' : 'Key Points',
    }));
}
