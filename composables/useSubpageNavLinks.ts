/** 갤러리·상세 페이지 GNB / LNB */
export function useSubpageNavLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
    ]);
}
