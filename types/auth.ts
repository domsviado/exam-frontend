export interface AuthState {
  isAuthenticated: boolean;
  auth: {
    userDetails: {
      user_id: string | null | undefined;
      email: string | null | undefined;
      name: string | null | undefined;
    };
    token: string | null | undefined;
    tokenExpiration: number | null | undefined;
  };
}
