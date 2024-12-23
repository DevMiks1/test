import { defineStore } from "pinia";
import type { Employees } from "@/service/interface/employee";
import type { Representative } from "@/service/interface/booking";

interface State {
  isRepresentativeModalOpen: boolean;
  representativeDetails: Employees | null;
  representativeSelected: number | null;
  representativePassenger: null | Representative;
  representativeRiderId: string | number | null;
  representativeId: null | number;
}

export const useRepresentativePassengerStore = defineStore(
  "representative-passenger",
  {
    state: (): State => ({
      isRepresentativeModalOpen: false,
      representativeDetails: null,
      representativePassenger: null,
      representativeRiderId: null,
      representativeId: null,
      representativeSelected: null,
    }),
    getters: {},
  },
);
