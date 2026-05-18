declare global {
    interface Window {
        wcs_add?: Record<string, string>;
        wcs_do?: () => void;
    }
}

const WCS_ID = '1c95700c9231150';
const WCS_SRC = 'https://wcs.pstatic.net/wcslog.js';

function runWcs() {
    if (!window.wcs_add) {
        window.wcs_add = {};
    }
    window.wcs_add.wa = WCS_ID;
    window.wcs_do?.();
}

function loadNaverWcs() {
    if (document.querySelector(`script[src="${WCS_SRC}"]`)) {
        runWcs();
        return;
    }

    const script = document.createElement('script');
    script.src = WCS_SRC;
    script.async = true;
    script.onload = () => runWcs();
    document.body.appendChild(script);
}

/** 네이버 프리미엄로그 — 초기 페인트 이후 idle 시 로드 (렌더 차단·크리티컬 체인 완화) */
export default defineNuxtPlugin(() => {
    const schedule = () => {
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(() => loadNaverWcs(), { timeout: 4000 });
        } else {
            window.setTimeout(loadNaverWcs, 2000);
        }
    };

    if (document.readyState === 'complete') {
        schedule();
    } else {
        window.addEventListener('load', schedule, { once: true });
    }
});
