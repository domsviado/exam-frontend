import { useAuthStore } from "~/store/auth";
export const interceptors = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  return {
    baseURL: config.public.api_base_url,
    server: false,
    addAuthHeaders(options: any) {
      // Ensure headers object exists
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${authStore.token}`;
      return options;
    },

    onResponse({ response }: any) {
      // Process the response data
      return response;
    },
    onResponseError({ response }: any) {
      throw createError(response._data.error.message);
    },
  };
};
