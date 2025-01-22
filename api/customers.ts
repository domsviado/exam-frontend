import type { CustomerDetails } from "~/types/customer";

export default () => ({
  async fetchAll(page = 1) {
    const config = useRuntimeConfig();
    const { addAuthHeaders } = interceptors();

    // Prepare request options with Authorization header
    const options = addAuthHeaders({
      method: "GET",
    });
    return useFetch(
      `${config.public.api_base_url}/customers?page=${page}`,
      options
    );
  },
  async createCustomer(body: CustomerDetails) {
    const config = useRuntimeConfig();
    const { addAuthHeaders } = interceptors();
    const options = addAuthHeaders({
      method: "POST",
      body,
    });
    return useFetch(`${config.public.api_base_url}/customers`, options);
  },
});
