<template>
  <div
    v-for="location in locationDetails"
    :key="location.id"
    :class="location.title === 'Pickup' ? 'pb-[.5rem]' : ''"
  >
    <DetailsList :title="location.title" :detailsExist="location.detailsExist">
      {{ truncateText(location.details.value, 60) }}
    </DetailsList>
  </div>
</template>

<script setup lang="ts">
import DetailsList from "@/components/booking-request/shared/DetailsList.vue";
import { useLocationStore } from "@/components/booking-request/store/index";
import { truncateText } from "@/utility/truncate";
import { storeToRefs } from "pinia";

const locationStore = useLocationStore();

const { pickupLocationDetails, dropoffLocationDetails } =
  storeToRefs(locationStore);

const locationDetails = [
  {
    id: 1,
    title: "Pickup",
    detailsExist:
      !!pickupLocationDetails.value && !!dropoffLocationDetails.value,
    details: pickupLocationDetails,
  },
  {
    id: 2,
    title: "Dropoff",
    detailsExist:
      !!pickupLocationDetails.value && !!dropoffLocationDetails.value,
    details: dropoffLocationDetails,
  },
];
</script>
