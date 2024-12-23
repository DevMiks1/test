import { defineStore } from "pinia";

interface State {
  isPassengerNumberModalOpen: boolean;
  passengerNumberSelected: null;
  passengerNumberCount: number;
  passengerNumberDetails: null;
}

export const usePassengerNumberStore = defineStore("passenger-number", {
  state: (): State => ({
    isPassengerNumberModalOpen: false,
    passengerNumberSelected: null,
    passengerNumberCount: 0,
    passengerNumberDetails: null,
  }),
  getters: {},
  actions: {},
});
