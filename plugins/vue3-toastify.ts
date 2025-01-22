import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    hideProgressBar: false,
    theme: "light",
    clearOnUrlChange: false,
    multiple: false,
    position: "top-center",
  });

  return {
    provide: { toast },
  };
});
