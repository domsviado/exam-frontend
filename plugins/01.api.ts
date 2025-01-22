import Auth from "~/api/auth";

export default defineNuxtPlugin(() => {
  const api = {
    auth: Auth(),
  };
  return {
    provide: {
      api,
    },
  };
});
