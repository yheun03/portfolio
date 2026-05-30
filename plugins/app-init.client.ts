import { useLocaleStore } from '@stores/appPreferenceStore';

/** 클라이언트 부팅 시 저장된 locale 복원 */
export default defineNuxtPlugin(() => {
    useLocaleStore().initLocale();
});
