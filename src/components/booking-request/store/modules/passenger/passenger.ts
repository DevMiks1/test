import { defineStore } from "pinia";
import {
  useRepresentativePassengerStore,
  useGuestPassengerStore,
  useEmployeePassengerStore,
} from "@/components/booking-request/store/index";
import type { Employees } from "@/service/interface/employee";
import type { Guest } from "@/service/interface/booking";
import { useEmployeeStore } from "@/components/admin-dashboard/store";

type TotalPassenger = Employees | Guest;

export const usePassengerStore = defineStore("passenger", {
  getters: {
    totalPassenger(): TotalPassenger[] {
      const employeePassengerStore = useEmployeePassengerStore();
      const representativePassengerStore = useRepresentativePassengerStore();
      const guestPassengerStore = useGuestPassengerStore();
      const employeeStore = useEmployeeStore();

      const representativeId =
        representativePassengerStore.representativeSelected;

      const representativeData = representativeId
        ? employeeStore.employees.find(
            (emp: Employees) => emp.id === representativeId,
          )
        : null;

      const validPassengers = [
        ...employeePassengerStore.employeePassengerSelected,
        representativeData,
        ...guestPassengerStore.guestPassengerList,
      ].filter(
        (passenger): passenger is TotalPassenger =>
          passenger !== null && passenger !== undefined,
      );

      return validPassengers;
    },
  },
  actions: {},
});
