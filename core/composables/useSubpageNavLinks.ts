/**
 * 갤러리/상세 페이지 GNB — 홈, 회사 프로젝트, 개인 프로젝트
 */
export function useSubpageNavLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
    ]);
}
