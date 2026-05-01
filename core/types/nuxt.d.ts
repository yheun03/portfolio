import type { AxiosInstance } from 'axios';

declare module '#app' {
    interface NuxtApp {
        $api: AxiosInstance;
        $axios: AxiosInstance;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $api: AxiosInstance;
        $axios: AxiosInstance;
    }
}

export {};
