import Auth from "~/api/auth";
import Customers from "~/api/customers";
export default defineNuxtPlugin(() => {
  const api = {
    auth: Auth(),
    customers: Customers(),
  };
  return {
    provide: {
      api,
    },
  };
});
