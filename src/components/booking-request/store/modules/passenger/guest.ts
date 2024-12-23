import { defineStore } from "pinia";
import type { Guest } from "@/service/interface/booking";

interface State {
  isGuestPassengerModalOpen: boolean;
  guestPassenger: Guest[];
  guestPassengerList: Guest[];
}

export const useGuestPassengerStore = defineStore("guest-passenger", {
  state: (): State => ({
    isGuestPassengerModalOpen: false,
    guestPassenger: [],
    guestPassengerList: [],
  }),
  getters: {},
  actions: {},
});
