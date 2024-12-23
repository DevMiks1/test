import { defineStore } from "pinia";
import type { ProfileAuth } from "@/service/interface/company-profile";

interface State {
  token: string | null;
  profileDetails: ProfileAuth | null;
}
export const useAuthenticationStore = defineStore("authentication", {
  state: (): State => ({
    token: localStorage.getItem("authToken") || null,
    profileDetails: null,
  }),
  actions: {
    setToken(token: string) {
      if (!token) {
        this.clearToken();
        return;
      }
      this.token = token;

      localStorage.setItem("authToken", token);
    },
    clearToken(): void {
      this.token = null;
      localStorage.removeItem("authToken");
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
  },
});
