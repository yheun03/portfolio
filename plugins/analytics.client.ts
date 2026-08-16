declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        wcs_add?: Record<string, string>;
        wcs?: unknown;
        wcs_do?: () => void;
    }
}

function loadScript(src: string, onload?: () => void) {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    if (onload) script.onload = onload;
    document.head.appendChild(script);
}

export default defineNuxtPlugin(() => {
    const { public: config } = useRuntimeConfig();
    if (!config.analyticsEnabled) return;

    const gtmId = String(config.gtmId ?? '').trim();
    const gaId = String(config.gaMeasurementId ?? '').trim();
    const naverId = String(config.naverWcsWa ?? '').trim();
    const naverScript = String(config.naverWcsScriptUrl ?? '')
        .trim()
        .replace(/^\/\//, 'https://');

    window.dataLayer = window.dataLayer || [];

    if (gtmId) {
        (window.dataLayer as Record<string, unknown>[]).push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
    }

    if (gaId) {
        window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
        window.gtag('js', new Date());
        window.gtag('config', gaId);
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
    }

    if (naverId && naverScript) {
        window.wcs_add = { ...(window.wcs_add ?? {}), wa: naverId };
        loadScript(naverScript, () => {
            if (window.wcs) window.wcs_do?.();
        });
    }
});
