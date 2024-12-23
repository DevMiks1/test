<template>
  <div
    v-if="
      representativePassengerStore.representativeDetails &&
      scheduleStore.scheduleDetails
    "
  >
    <ActionButton
      :loading="isLoading"
      block
      class="bg-red"
      variant="tonal"
      @action="handleRequestBooking"
    >
      {{ "Proceed" }}
    </ActionButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import {
  useEmployeePassengerStore,
  useEstimateStore,
  useGuestPassengerStore,
  useNoteStore,
  usePassengerNumberStore,
  usePassengerStore,
  useRepresentativePassengerStore,
  useScheduleStore,
} from "@/components/booking-request/store/index";
import { createBooking } from "@/service/api/booking";
import { snackbarInstance } from "@/composables/useSnackbar";
import type {
  BookingResponse,
  AllPassenger,
} from "@/service/interface/booking";

const representativePassengerStore = useRepresentativePassengerStore();
const scheduleStore = useScheduleStore();
const passengerNumberStore = usePassengerNumberStore();
const passengerStore = usePassengerStore();
const employeePassengerStore = useEmployeePassengerStore();
const guestPassengerStore = useGuestPassengerStore();
const estimateStore = useEstimateStore();
const noteStore = useNoteStore();

const { showSnackbar } = snackbarInstance;

const isLoading = ref(false);
const router = useRouter();

const passengersData = computed((): AllPassenger[] => {
  return [
    representativePassengerStore.representativePassenger,
    ...(employeePassengerStore.employeePassenger || []),
    ...(guestPassengerStore.guestPassenger || []),
  ].filter((passenger) => passenger !== null);
});

const handleRequestBooking = async () => {
  if (
    Number(passengerNumberStore.passengerNumberCount) !==
    passengerStore.totalPassenger.length
  ) {
    showSnackbar(
      "warning",
      `You have selected ${passengerStore.totalPassenger.length} passengers, which does not match to ${passengerNumberStore.passengerNumberCount} passengers.`,
    );

    return;
  }

  isLoading.value = true;
  try {
    const body: BookingResponse = {
      estimateId: estimateStore.variantId,
      scheduleDate: scheduleStore.scheduleDetails,
      passengers: passengersData.value,
      noteToDriver: noteStore.noteMessageDetails,
    };

    await createBooking({ body });
    showSnackbar("success", "Successfully request booking");
    router.push("/dashboard");
  } catch (error: any) {
    showSnackbar(
      "error",
      `Error while requesting booking: ${error.response.data.message || error}`,
    );
  } finally {
    isLoading.value = false;
  }
};
</script>
