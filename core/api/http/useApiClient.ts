import axios, { type AxiosInstance } from "axios";

let apiClient: AxiosInstance | null = null;

export const createApiClient = (): AxiosInstance => {
  if (apiClient) {
    return apiClient;
  }

  const config = useRuntimeConfig();

  const baseURL = typeof config.public.apiBase === "string" ? config.public.apiBase : "/api";

  apiClient = axios.create({
    baseURL
  });

  return apiClient;
};
