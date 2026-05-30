/**
 * 목표: 갤러리와 상세 페이지에서 반복되는 서브 내비게이션 링크를 표준화한다.
 * 기능: 다국어 홈/실무/개인 아카이브 링크 목록을 제공한다.
 */
export function useSubpageNavLinks() {
    const { t } = useLocale();

    return computed(() => [
        { href: '/', label: t('nav.home') },
        { href: '/projects', label: t('nav.worksArchive') },
        { href: '/personal', label: t('nav.personalArchive') },
    ]);
}
