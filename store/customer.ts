export const useCustomerStore = defineStore({
  id: "customer",
  persist: true,
  state: () => {
    const state = {
      customers: [],
      selectedCustomer: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        birthdate: null,
      },
    };
    return state;
  },
  actions: {
    loadCustomers(customers: []) {
      this.customers = customers;
    },
  },
});
