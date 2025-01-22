import { useAuthStore } from "~/store/auth";
export const interceptors = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const { $dayjs }: any = useNuxtApp();
  return {
    baseURL: config.public.api_base_url,
    server: false,
    async onRequest({ options }: any) {
      // Set the request headers
      const expirationInMinutes = $dayjs
        .duration($dayjs.unix(authStore.tokenExpiration).diff($dayjs()))
        .asMinutes();
      // if token expiration < 10 mins, refresh
      if (expirationInMinutes < 10) {
        // refresh token out of scope
      }
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${authStore.token}`;
    },

    onResponse({ response }: any) {
      // Process the response data
      return response;
    },
    onResponseError({ response }: any) {
      console.log(response._data.error);
      throw createError(response._data.error.message);
    },
  };
};
