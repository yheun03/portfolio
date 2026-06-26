// i18n 번역(t), 다국어 값 선택(pick), 언어 전환(toggleLocale) 제공
import ko from '@i18n/ko.json';
import en from '@i18n/en.json';
import { useLocaleStore, type Locale } from '@stores/locale';

type LocaleMessageValue = string | { readonly [key: string]: LocaleMessageValue };
type LocaleMessages = Record<string, LocaleMessageValue>;

const messages = { ko, en } satisfies Record<Locale, LocaleMessages>;

function getByPath(obj: LocaleMessages, path: string): string {
    const value = path.split('.').reduce<LocaleMessageValue | undefined>((acc, key) => {
        if (!acc || typeof acc === 'string') return undefined;
        return acc[key];
    }, obj);
    return typeof value === 'string' ? value : path;
}

export function useLocale() {
    const store = useLocaleStore();
    const locale = computed(() => store.current);

    function t(key: string) {
        return getByPath(messages[locale.value], key);
    }

    function pick<R extends { readonly ko: unknown; readonly en: unknown }>(record: R): R['ko'] | R['en'] {
        return record[locale.value];
    }

    return { locale, t, pick, toggleLocale: store.toggleLocale };
}
