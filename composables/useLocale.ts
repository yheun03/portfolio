import ko from '@i18n/ko.json';
import en from '@i18n/en.json';
import { useLocaleStore } from '@stores/appPreferenceStore';

const messages: Record<'ko' | 'en', Record<string, any>> = { ko, en };

const getByPath = (obj: Record<string, any>, path: string): string => {
    return path.split('.').reduce((acc: any, key: string) => acc?.[key], obj) ?? path;
};

export const useLocale = () => {
    const store = useLocaleStore();
    const locale = computed(() => store.current);

    const t = (key: string) => getByPath(messages[locale.value], key);
    const pick = <T extends Record<string, any>>(record: T) => record[locale.value];

    return {
        locale,
        t,
        pick,
        initLocale: store.initLocale,
        setLocale: store.setLocale,
        toggleLocale: store.toggleLocale,
    };
};
