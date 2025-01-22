// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    strict: false,
    typeCheck: false,
    tsConfig: {
      compilerOptions: {},
      exclude: ["../web-boilerplate-bricks"],
    },
  },
  ignore: ["../web-boilerplate-bricks"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "nuxt-quasar-ui",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  quasar: {
    extras: {
      fontIcons: ["material-icons"],
    },
    plugins: ["Notify", "Loading"],
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      "postcss-nested": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      api_base_url: process.env.API_URL,
    },
  },
});
