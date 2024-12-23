import { defineStore } from "pinia";
import type { Employees } from "@/service/interface/employee";
import type { Employee } from "@/service/interface/booking";

interface State {
  isEmployeePassengerModalOpen: boolean;
  employeePassengerDetails: Employees[];
  employeePassenger: Employee[];
  employeePassengerSelected: Employees[];
}

export const useEmployeePassengerStore = defineStore("employee-passenger", {
  state: (): State => ({
    isEmployeePassengerModalOpen: false,
    employeePassengerDetails: [],
    employeePassenger: [],
    employeePassengerSelected: [],
  }),
});
