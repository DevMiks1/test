import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export { useEmployeeStore } from "./modules/employee/employee";

export { useTripsHistoryStore } from "./modules/tripsHistory/tripsHistory";
