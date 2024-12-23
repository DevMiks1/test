<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-map-marker"
    :isActive="!!representativePassengerStore.representativeDetails"
    :isCompleted="
      !!locationStore.pickupLocationDetails &&
      !!locationStore.dropoffLocationDetails
    "
    label="Location"
    @click="openLocationModal"
  />
  <SelectLocationModal v-if="locationStore.isLocationModalOpen" />
</template>

<script setup lang="ts">
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import {
  useLocationStore,
  useRepresentativePassengerStore,
} from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

const SelectLocationModal = defineAsyncComponent(
  () => import("./modal/SelectLocation.vue"),
);

const locationStore = useLocationStore();
const representativePassengerStore = useRepresentativePassengerStore();

const openLocationModal = () => {
  if (representativePassengerStore.representativeDetails) {
    locationStore.isLocationModalOpen = true;
  }
};
</script>
