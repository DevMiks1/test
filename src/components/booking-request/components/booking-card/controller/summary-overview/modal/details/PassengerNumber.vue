<template>
  <DetailsList
    :detailsExist="!!passengerNumberStore.passengerNumberCount"
    title="No. of Passenger"
  >
    {{ passengerNumberStore.passengerNumberCount }}
  </DetailsList>
</template>

<script setup lang="ts">
import DetailsList from "@/components/booking-request/shared/DetailsList.vue";
import { usePassengerNumberStore } from "@/components/booking-request/store/index";

const passengerNumberStore = usePassengerNumberStore();
</script>
