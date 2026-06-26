// 프로젝트 캡처 목록에서 placeholder를 걸러내는 유틸 — 경로에 'placeholder' 포함 여부로 판별
export function isPlaceholderCapture(src: string | undefined | null): boolean {
    if (!src) return true;
    return /placeholder/i.test(src);
}

export function getRealCaptures(captures: readonly string[]): string[] {
    return captures.filter((src) => !isPlaceholderCapture(src));
}
