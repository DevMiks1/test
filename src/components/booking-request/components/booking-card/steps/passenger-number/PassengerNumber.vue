<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-car"
    label="No. of Passenger"
    :isDisabled="!!passengerNumberStore.passengerNumberCount"
    :isCompleted="!!passengerNumberStore.passengerNumberCount"
    :isActive="true"
    @click="togglePassengerNumberModal"
  />
  <CardModal v-if="passengerNumberStore.isPassengerNumberModalOpen" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import { usePassengerNumberStore } from "@/components/booking-request/store/index";

const CardModal = defineAsyncComponent(() => import("./CardModal.vue"));

const passengerNumberStore = usePassengerNumberStore();

const togglePassengerNumberModal = () => {
  if (!passengerNumberStore.passengerNumberCount) {
    passengerNumberStore.isPassengerNumberModalOpen = true;
  }
};
</script>
