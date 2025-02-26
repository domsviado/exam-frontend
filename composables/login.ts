import { useAuthStore } from "~/store/auth";
export const loginApi = async (body: object) => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const { data, error } = await $api.auth.login(body);
  let response;

  if (data.value?.data) {
    authStore.authenticateUser(data.value.data);
    response = { success: true };
  }

  if (error.value?.data) {
    response = { success: false, message: error.value.data.error };
  }

  return response;
};

export const loginAmplify = async (body: object) => {};
