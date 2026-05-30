/**
 * GTM · GA4(gtag) · 네이버 WCS — 값은 `.env` → `runtimeConfig.public`
 */
declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        wcs_add?: Record<string, string>;
        wcs?: unknown;
        wcs_do?: () => void;
    }
}

type AnalyticsConfig = {
    gtmId: string;
    gaMeasurementId: string;
    naverWcsWa: string;
    naverWcsScriptUrl: string;
};

function onIdle(callback: () => void, timeout = 4000) {
    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(callback, { timeout });
    } else {
        window.setTimeout(callback, Math.min(timeout, 3500));
    }
}

function loadGtm(gtmId: string) {
    if (!gtmId || document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;

    window.dataLayer = window.dataLayer || [];
    (window.dataLayer as Record<string, unknown>[]).push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
}

function loadGa4(measurementId: string) {
    if (!measurementId || document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
}

function runNaverWcs(wa: string) {
    if (!wa) return;
    if (!window.wcs_add) window.wcs_add = {};
    window.wcs_add.wa = wa;
    if (window.wcs) window.wcs_do?.();
}

function loadNaverWcs({ naverWcsWa, naverWcsScriptUrl }: AnalyticsConfig) {
    if (!naverWcsWa || !naverWcsScriptUrl) return;

    const scriptUrl = naverWcsScriptUrl.replace(/^\/\//, 'https://');
    const hostPath = scriptUrl.replace(/^https?:\/\//, '');

    if (document.querySelector(`script[src="${scriptUrl}"], script[src="//${hostPath}"]`)) {
        runNaverWcs(naverWcsWa);
        return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => runNaverWcs(naverWcsWa);
    document.body.appendChild(script);
}

function readAnalyticsConfig(): AnalyticsConfig {
    const { public: config } = useRuntimeConfig();

    return {
        gtmId: String(config.gtmId ?? '').trim(),
        gaMeasurementId: String(config.gaMeasurementId ?? '').trim(),
        naverWcsWa: String(config.naverWcsWa ?? '').trim(),
        naverWcsScriptUrl: String(config.naverWcsScriptUrl ?? '').trim(),
    };
}

function hasAnyAnalyticsId(analytics: AnalyticsConfig) {
    return Boolean(analytics.gtmId || analytics.gaMeasurementId || analytics.naverWcsWa);
}

export default defineNuxtPlugin(() => {
    const { public: config } = useRuntimeConfig();
    if (!config.analyticsEnabled) return;

    const analytics = readAnalyticsConfig();
    if (!hasAnyAnalyticsId(analytics)) return;

    let gtmLoaded = false;
    let gaLoaded = false;
    let naverLoaded = false;
    let analyticsScheduled = false;

    const loadAllOnce = () => {
        if (!gtmLoaded && analytics.gtmId) {
            gtmLoaded = true;
            loadGtm(analytics.gtmId);
        }
        if (!gaLoaded && analytics.gaMeasurementId) {
            gaLoaded = true;
            loadGa4(analytics.gaMeasurementId);
        }
        if (!naverLoaded && analytics.naverWcsWa) {
            naverLoaded = true;
            loadNaverWcs(analytics);
        }
    };

    const scheduleAnalytics = () => {
        if (analyticsScheduled) return;
        analyticsScheduled = true;
        window.setTimeout(() => onIdle(loadAllOnce, 2500), 12000);
    };

    if (document.readyState === 'complete') {
        scheduleAnalytics();
    } else {
        window.addEventListener('load', scheduleAnalytics, { once: true });
    }

    for (const event of ['scroll', 'pointerdown', 'keydown'] as const) {
        window.addEventListener(event, loadAllOnce, { once: true, passive: true });
    }
});
