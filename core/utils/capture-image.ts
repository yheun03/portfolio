/**
 * 목표: 프로젝트 캡처 이미지 목록에서 임시 placeholder를 안전하게 걸러낸다.
 * 기능: placeholder 판별과 실제 캡처 목록 추출 함수를 제공한다.
 */
/** 캡처 경로가 아직 준비되지 않은 placeholder 이미지인지 판별 */
export function isPlaceholderCapture(src: string | undefined | null): boolean {
    if (!src) return true;
    return /placeholder/i.test(src);
}

/** placeholder를 제외한 실제 캡처 경로만 반환 */
export function getRealCaptures(captures: readonly string[]): string[] {
    return captures.filter((src) => !isPlaceholderCapture(src));
}
