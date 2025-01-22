export default () => ({
  login(data: object) {
    const config = useRuntimeConfig();
    return useFetch(`${config.public.api_base_url}/auth/login`, {
      method: "POST",
      body: data,
    });
  },
});
