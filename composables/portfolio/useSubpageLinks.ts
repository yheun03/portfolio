// 갤러리·상세·이력 페이지 공통 서브 내비게이션 링크 목록
export function useSubpageLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
        { href: '/journey', label: t('nav.journey') },
    ]);
}
