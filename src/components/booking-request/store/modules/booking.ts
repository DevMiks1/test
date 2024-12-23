import { defineStore } from "pinia";
import {
  useEmployeePassengerStore,
  useEstimateStore,
  useGuestPassengerStore,
  useLocationStore,
  useNoteStore,
  usePassengerNumberStore,
  useRepresentativePassengerStore,
  useScheduleStore,
} from "@/components/booking-request/store/index";

export const useBookingStore = defineStore("booking", {
  actions: {
    handleClearBookingData() {
      const representativePassengerStore = useRepresentativePassengerStore();
      const locationStore = useLocationStore();
      const estimateStore = useEstimateStore();
      const scheduleStore = useScheduleStore();
      const employeePassengerStore = useEmployeePassengerStore();
      const guestPassengerStore = useGuestPassengerStore();
      const noteStore = useNoteStore();
      const passengerNumberStore = usePassengerNumberStore();

      passengerNumberStore.passengerNumberCount = 0;
      passengerNumberStore.passengerNumberSelected = null;

      representativePassengerStore.representativePassenger = null;
      representativePassengerStore.representativeDetails = null;
      representativePassengerStore.representativeSelected = null;

      locationStore.pickupLocationDetails = "";
      locationStore.dropoffLocationDetails = "";
      locationStore.pickupCoordinates = null;
      locationStore.dropoffCoordinates = null;
      locationStore.queryPickupLocation = "";
      locationStore.queryDropoffLocation = "";

      estimateStore.variantDetails = "";

      scheduleStore.scheduleDetails = "";
      scheduleStore.date = null;
      scheduleStore.time = null;

      employeePassengerStore.employeePassengerSelected = [];
      employeePassengerStore.employeePassenger = [];
      employeePassengerStore.employeePassengerDetails = [];

      guestPassengerStore.guestPassengerList = [];
      guestPassengerStore.guestPassenger = [];

      noteStore.noteMessageDetails = "";
    },
  },
});
