// 현재 언어의 문구와 콘텐츠, 언어 전환 기능 제공
import ko from '@i18n/ko.json';
import en from '@i18n/en.json';

export type Locale = 'ko' | 'en';

type LocaleMessageValue = string | number | boolean | null | LocaleMessageValue[] | { readonly [key: string]: LocaleMessageValue };
type LocaleMessages = Record<string, LocaleMessageValue>;
export type PortfolioContent = typeof ko.content;

const messages = { ko, en } satisfies Record<Locale, LocaleMessages>;
const STORAGE_KEY = 'portfolio-locale';

function isLocale(value: string | null): value is Locale {
    return value === 'ko' || value === 'en';
}

function getByPath(obj: LocaleMessages, path: string): string {
    const value = path.split('.').reduce<LocaleMessageValue | undefined>((acc, key) => {
        if (!acc || typeof acc !== 'object' || Array.isArray(acc)) return undefined;
        return acc[key];
    }, obj);
    return typeof value === 'string' ? value : path;
}

export function useLocale() {
    const locale = useState<Locale>('locale', () => 'ko');
    const content = computed(() => messages[locale.value].content as PortfolioContent);

    function t(key: string) {
        return getByPath(messages[locale.value], key);
    }

    function setLocale(value: Locale) {
        locale.value = value;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, value);
            document.documentElement.lang = value;
        }
    }

    function initLocale() {
        if (!import.meta.client) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        setLocale(isLocale(saved) ? saved : 'ko');
    }

    function toggleLocale() {
        setLocale(locale.value === 'ko' ? 'en' : 'ko');
    }

    return { locale, t, content, initLocale, toggleLocale };
}
