/**
 * 프로젝트·개인 프로젝트 아카이브 페이지 상단 네비 링크
 */
export function useSubpageNavLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
        { href: '/#contact', label: t('nav.contact') },
    ]);
}
