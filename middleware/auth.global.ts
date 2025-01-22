import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $_ } = useNuxtApp();

  const auth = useAuthStore();
  await auth.load();

  if (auth.isAuthenticated) {
    // Redirect authenticated users from login/register to home
    // ideal if there is revoke token api already. Commented to revisit login page
    // if ($_.includes(["/login"], to.path)) {
    //   return navigateTo("/customers");
    // }
  } else {
    const publicPaths = ["/login"];

    // Redirect unauthenticated users trying to access protected routes
    if (!publicPaths.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
