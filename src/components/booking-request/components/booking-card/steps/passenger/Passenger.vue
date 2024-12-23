<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-account-circle"
    :isCompleted="
      !!employeePassengerStore.employeePassengerDetails.length ||
      !!guestPassengerStore.guestPassenger.length
    "
    :isActive="!!scheduleStore.scheduleDetails"
    label="Passengers"
    @click="openEmployeePassenger"
  />
  <SelectEmployee v-if="employeePassengerStore.isEmployeePassengerModalOpen" />
</template>

<script setup lang="ts">
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import {
  useGuestPassengerStore,
  useEmployeePassengerStore,
  useScheduleStore,
} from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

const SelectEmployee = defineAsyncComponent(
  () => import("./modal/SelectEmployee.vue"),
);

const employeePassengerStore = useEmployeePassengerStore();
const guestPassengerStore = useGuestPassengerStore();
const scheduleStore = useScheduleStore();

const openEmployeePassenger = (): void => {
  if (scheduleStore.scheduleDetails) {
    employeePassengerStore.isEmployeePassengerModalOpen = true;
  }
};
</script>
