/**
 * 목표: 초기 렌더를 방해하지 않도록 외부 분석 스크립트를 지연 로드한다.
 * 기능: GTM과 Naver WCS를 idle/load/user interaction 이후 한 번만 주입한다.
 */
declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        wcs_add?: Record<string, string>;
        wcs_do?: () => void;
    }
}

const GTM_ID = 'GTM-KJZM3PWS';
const WCS_ID = '1c95700c9231150';
const WCS_SRC = 'https://wcs.pstatic.net/wcslog.js';

function onIdle(callback: () => void, timeout = 4000) {
    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(callback, { timeout });
    } else {
        window.setTimeout(callback, Math.min(timeout, 3500));
    }
}

function loadGtm() {
    if (document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
}

function runNaverWcs() {
    window.wcs_add = window.wcs_add || {};
    window.wcs_add.wa = WCS_ID;
    window.wcs_do?.();
}

function loadNaverWcs() {
    if (document.querySelector(`script[src="${WCS_SRC}"]`)) {
        runNaverWcs();
        return;
    }

    const script = document.createElement('script');
    script.src = WCS_SRC;
    script.async = true;
    script.onload = () => runNaverWcs();
    document.body.appendChild(script);
}

export default defineNuxtPlugin(() => {
    let gtmLoaded = false;

    const loadGtmOnce = () => {
        if (gtmLoaded) return;
        gtmLoaded = true;
        loadGtm();
    };

    const scheduleAnalytics = () => {
        onIdle(loadGtmOnce, 5000);
        onIdle(loadNaverWcs, 4000);
    };

    if (document.readyState === 'complete') {
        scheduleAnalytics();
    } else {
        window.addEventListener('load', scheduleAnalytics, { once: true });
    }

    for (const event of ['scroll', 'pointerdown', 'keydown'] as const) {
        window.addEventListener(event, loadGtmOnce, { once: true, passive: true });
    }
});
