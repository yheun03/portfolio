// 갤러리·상세 페이지 공통 서브 내비게이션 링크 목록 (홈 / 실무 / 개인)
export function useSubpageLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
    ]);
}
