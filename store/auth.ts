import type { AuthState } from "~/types/auth";
import { defineStore } from "pinia";
import type { UserDetails } from "~/types/user_details";

export const useAuthStore = defineStore({
  id: "auth",
  persist: true,
  state: () => {
    const state: AuthState = {
      isAuthenticated: false,
      auth: {
        userDetails: {
          user_id: null,
          email: null,
          name: null,
        },
        token: null,
        tokenExpiration: null,
      },
    };
    return state;
  },
  actions: {
    authenticateUser(userDetails: UserDetails) {
      this.isAuthenticated = true;
      this.auth = {
        userDetails: {
          user_id: userDetails.id,
          email: userDetails.email,
          name: userDetails.name,
        },
        token: userDetails.token,
        tokenExpiration: userDetails.tokenExpiration,
      };
    },
    async load() {
      // TODO reload token
    },
  },
  getters: {
    userDetails: (state) => state.auth.userDetails,
    tokenExpiration: (state) => state.auth.tokenExpiration,
    token: (state) => state.auth.token,
  },
});
