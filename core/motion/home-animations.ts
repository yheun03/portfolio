import { bindCardPointers, canUseCardPointer } from './card-pointer';
import { createHomeScrollMotion, revealStaticMotion } from './home-scroll-motion';

/** 홈 페이지 인터랙션·스크롤 모션 일괄 초기화 */
export async function initHomeAnimations(root: HTMLElement): Promise<() => void> {
    const cleanups: Array<() => void> = [];

    if (canUseCardPointer()) {
        cleanups.push(bindCardPointers(root));
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        revealStaticMotion(root);
        return () => cleanups.forEach((cleanup) => cleanup());
    }

    try {
        cleanups.push(await createHomeScrollMotion(root));
    } catch {
        revealStaticMotion(root);
    }

    return () => cleanups.forEach((cleanup) => cleanup());
}
