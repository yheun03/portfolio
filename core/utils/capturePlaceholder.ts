/** 캡처 경로가 아직 준비되지 않은 placeholder 이미지인지 판별 */
export function isPlaceholderCapture(src: string | undefined | null): boolean {
    if (!src) return true;
    return /placeholder/i.test(src);
}

/** placeholder를 제외한 실제 캡처 경로만 반환 */
export function getRealCaptures(captures: readonly string[]): string[] {
    return captures.filter((src) => !isPlaceholderCapture(src));
}
