<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-account-supervisor-circle"
    :isActive="!!passengerNumberStore.passengerNumberCount"
    :isCompleted="!!representativePassengerStore.representativeDetails"
    label="Representative Passenger"
    @click="openRepresentativePassengerModal"
  />
  <SelectRepresentativeModal
    v-if="representativePassengerStore.isRepresentativeModalOpen"
  />
</template>
<script setup lang="ts">
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import {
  usePassengerNumberStore,
  useRepresentativePassengerStore,
} from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

const SelectRepresentativeModal = defineAsyncComponent(
  () => import("./SelectRepresentativeModal.vue"),
);

const representativePassengerStore = useRepresentativePassengerStore();
const passengerNumberStore = usePassengerNumberStore();

const openRepresentativePassengerModal = (): void => {
  if (passengerNumberStore.passengerNumberCount) {
    representativePassengerStore.isRepresentativeModalOpen = true;
  }
};
</script>
