import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export { useAuthenticationStore } from "./modules/auth/authentication";
