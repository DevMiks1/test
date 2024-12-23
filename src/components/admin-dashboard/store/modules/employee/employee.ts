import { defineStore } from "pinia";
import type { Employees } from "@/service/interface/employee";
import { retrieveAllEmployees } from "@/service/api/employee";

type State = {
  employees: Employees[];
  employeeDetails: Employees[];
  isCreateEmployeeModalOpen: boolean;
  isEditEmployeeModalOpen: boolean;
  idToEdit: number | null;
  isVerificationRequestEmployeeModalOpen: boolean;
  idToVerificationRequest: number | null;
  email: string;
  search: string;
  isLoading: boolean;
};

export const useEmployeeStore = defineStore("employee", {
  state: (): State => ({
    employees: [] as Employees[],
    employeeDetails: [],
    isCreateEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    idToEdit: null,
    isVerificationRequestEmployeeModalOpen: false,
    idToVerificationRequest: null,
    email: "",
    search: "",
    isLoading: false,
  }),
  getters: {
    VerifiedEmployees(): Employees[] {
      return this.employees
        .filter((rider: Employees) => rider.riderId !== null)
        .map((rider: Employees) => ({
          ...rider,
          fullName: `${rider.firstName} ${rider.lastName}`,
        }));
    },
  },
  actions: {
    async fetchEmployees() {
      try {
        this.isLoading = true;
        const response: any = await retrieveAllEmployees();
        this.employees = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
