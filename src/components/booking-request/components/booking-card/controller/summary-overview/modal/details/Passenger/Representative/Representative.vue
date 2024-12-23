<template>
  <div class="flex gap-1">
    <BaseIcon icon="mdi-account-supervisor-circle" class="pr-2" />
    <p class="details-font text-[.900rem]">
      {{ fullName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { useRepresentativePassengerStore } from "@/components/booking-request/store";
import { computed } from "vue";

const representativePassengerStore = useRepresentativePassengerStore();

const representative = representativePassengerStore.representativeDetails;

const fullName = computed(() => {
  return `${representative?.firstName} ${representative?.lastName}`;
});
</script>
