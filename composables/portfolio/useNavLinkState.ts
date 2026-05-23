import type { MaybeRefOrGetter } from 'vue';

export type AppNavLink = {
    href: string;
    label: string;
};

export function useNavLinkState(options: {
    activeId?: MaybeRefOrGetter<string | undefined>;
    activePath?: MaybeRefOrGetter<string | undefined>;
}) {
    const route = useRoute();

    function isActive(href: string): boolean {
        const activeId = toValue(options.activeId) ?? '';
        const activePath = toValue(options.activePath);

        if (href.startsWith('#')) {
            return !activePath && Boolean(activeId) && activeId === href.slice(1);
        }

        if (!href.startsWith('/')) {
            return false;
        }

        if (activePath) {
            return href === '/' ? route.path === '/' : activePath === href;
        }

        return href === '/' ? route.path === '/' : route.path === href || route.path.startsWith(`${href}/`);
    }

    return { isActive };
}
