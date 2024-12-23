import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import dashboardRoutes from "@/components/admin-dashboard/router/index";
import loginRoutes from "@/components/login/router/index";
import bookingRoutes from "@/components/booking-request/router/index";
import mainRoutes from "@/components/main/router/index";
import signupRoutes from "@/components/signup/router";
import { useAuthenticationStore } from "@/store/index";
import { snackbarInstance } from "@/composables/useSnackbar";

const { showSnackbar } = snackbarInstance;

const routes = [
  ...mainRoutes,
  ...loginRoutes,
  ...signupRoutes,
  ...dashboardRoutes,
  ...bookingRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const isAuthenticated = (token: string | null): boolean => {
  return !!token;
};

const checkActivationStatus = (
  activationStatus: string,
  to: RouteLocationNormalized,
) => {
  const isActivated = activationStatus === "ACTIVATED";
  if (!isActivated && to.meta.requiresActivation) {
    showSnackbar("error", "You don't have access to this page");
    return;
  }

  return true;
};

const handleRouthAuthUser = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  isAuthenticatedUser: boolean,
) => {
  if (to.meta.requiresAuth && !isAuthenticatedUser) {
    next("/login");
    return;
  }

  if (!to.meta.requiresAuth && isAuthenticatedUser) {
    next("/dashboard");
    return false;
  }

  return true;
};

router.beforeEach((to, from, next) => {
  const authenticationStore = useAuthenticationStore();

  const token = authenticationStore.token;
  const isAuthenticatedUser = isAuthenticated(token);

  if (to.path !== "/" && to.path.endsWith("/")) {
    const newPath = to.path.slice(0, -1);
    next({ path: newPath });
    return;
  }

  if (authenticationStore.profileDetails?.activationStatus) {
    const activationStatus =
      authenticationStore.profileDetails?.activationStatus || "";

    if (isAuthenticatedUser && !checkActivationStatus(activationStatus, to)) {
      next("/dashboard");
      return;
    }
  }

  if (!handleRouthAuthUser(to, next, isAuthenticatedUser)) return;

  next();
});

export default router;
