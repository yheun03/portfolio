declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

const GTM_ID = 'GTM-KJZM3PWS';

function loadGtm() {
    if (document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
}

/** GTM — 첫 인터랙션 또는 idle 이후 로드 (TBT·미사용 JS 완화) */
export default defineNuxtPlugin(() => {
    let loaded = false;

    const schedule = () => {
        if (loaded) return;
        loaded = true;
        loadGtm();
    };

    const onIdle = () => {
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(schedule, { timeout: 5000 });
        } else {
            window.setTimeout(schedule, 3500);
        }
    };

    const onInteraction = () => schedule();

    if (document.readyState === 'complete') {
        onIdle();
    } else {
        window.addEventListener('load', onIdle, { once: true });
    }

    for (const event of ['scroll', 'pointerdown', 'keydown'] as const) {
        window.addEventListener(event, onInteraction, { once: true, passive: true });
    }
});
