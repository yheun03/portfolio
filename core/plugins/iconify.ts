import { Icon } from '@iconify/vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('IconifyIcon', Icon);
});
