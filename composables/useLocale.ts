import ko from '@i18n/ko.json';
import en from '@i18n/en.json';
import { useLocaleStore, type Locale } from '@stores/appPreferenceStore';

type LocaleMessageValue = string | { readonly [key: string]: LocaleMessageValue };
type LocaleMessages = Record<string, LocaleMessageValue>;
type LocalizedValue<T> = Readonly<Record<Locale, T>>;

const messages = { ko, en } satisfies Record<Locale, LocaleMessages>;

const getByPath = (obj: LocaleMessages, path: string): string => {
    const value = path.split('.').reduce<LocaleMessageValue | undefined>((acc, key) => {
        if (!acc || typeof acc === 'string') return undefined;
        return acc[key];
    }, obj);

    return typeof value === 'string' ? value : path;
};

export const useLocale = () => {
    const store = useLocaleStore();
    const locale = computed(() => store.current);

    const t = (key: string) => getByPath(messages[locale.value], key);
    const pick = <T>(record: LocalizedValue<T>) => record[locale.value];

    return {
        locale,
        t,
        pick,
        toggleLocale: store.toggleLocale,
    };
};
