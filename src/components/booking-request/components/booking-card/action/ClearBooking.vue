<template>
  <div v-if="passengerNumberStore.passengerNumberCount">
    <ActionButton
      @action="bookingStore.handleClearBookingData"
      block
      class="bg-dark"
    >
      {{ "Clear" }}
    </ActionButton>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import {
  useBookingStore,
  usePassengerNumberStore,
} from "@/components/booking-request/store/index";

const passengerNumberStore = usePassengerNumberStore();
const bookingStore = useBookingStore();
</script>
