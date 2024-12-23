<template>
  <div
    class="request-booking-header flex items-center justify-between rounded-tl-[.5rem] rounded-tr-[.5rem]"
  >
    <v-card-item>
      <h1 class="text-[1rem]">Request Booking</h1>
      <h5 class="text-[.7rem] opacity-80">OWTO PHILIPPINES</h5>
    </v-card-item>
    <div class="flex gap-2">
      <BackButton />
      <SummaryOverview v-if="passengerNumberStore.passengerNumberCount" />
      <div class="mr-5">
        <PanelButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePassengerNumberStore } from "@/components/booking-request/store";
import BackButton from "./BackButton.vue";
import PanelButton from "./PanelButton.vue";
import SummaryOverview from "./summary-overview/SummaryOverview.vue";

const passengerNumberStore = usePassengerNumberStore();
</script>

<style scoped>
.request-booking-header {
  background: linear-gradient(45deg, #ca3535, #a54f4f);
}
</style>
