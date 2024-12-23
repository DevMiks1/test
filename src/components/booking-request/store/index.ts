import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export { useBookingStore } from "@/components/booking-request/store/modules/booking";

export { usePassengerNumberStore } from "@/components/booking-request/store/modules/passenger-number/passengerNumber";

export { usePassengerStore } from "@/components/booking-request/store/modules/passenger/passenger";
export { useEmployeePassengerStore } from "@/components/booking-request/store/modules/passenger/employee";
export { useRepresentativePassengerStore } from "@/components/booking-request/store/modules/passenger/representative";
export { useGuestPassengerStore } from "@/components/booking-request/store/modules/passenger/guest";

export { useLocationStore } from "@/components/booking-request/store/modules/location/location";

export { useEstimateStore } from "@/components/booking-request/store/modules/estimate/estimate";

export { useScheduleStore } from "@/components/booking-request/store/modules/schedule/schedule";

export { useNoteStore } from "@/components/booking-request/store/modules/note/note";
