import { defineStore } from "pinia";

interface State {
  isLocationModalOpen: boolean;
  pickupLocationDetails: string;
  dropoffLocationDetails: string;
  queryPickupLocation: string;
  queryDropoffLocation: string;
  isPinPickupClick: boolean;
  isPinDropoffClick: boolean;
  pickupCoordinates: null | number[];
  dropoffCoordinates: null | number[];
}

export const useLocationStore = defineStore("location", {
  state: (): State => ({
    isLocationModalOpen: false,
    pickupLocationDetails: "",
    dropoffLocationDetails: "",
    queryPickupLocation: "",
    queryDropoffLocation: "",
    isPinPickupClick: false,
    isPinDropoffClick: false,
    pickupCoordinates: null,
    dropoffCoordinates: null,
  }),
});
