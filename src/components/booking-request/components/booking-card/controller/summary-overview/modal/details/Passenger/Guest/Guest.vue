<template>
  <div
    class="flex flex-col"
    v-if="guestPassengerStore.guestPassenger.length > 0"
  >
    <p
      class="details-font flex gap-1 text-[.900rem]"
      v-for="guest in guestPassengerStore.guestPassenger"
      :key="guest.name"
    >
      <BaseIcon icon="mdi-account-outline" class="pr-2" />
      {{ guest.name || "Guest" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { useGuestPassengerStore } from "@/components/booking-request/store/index";

const guestPassengerStore = useGuestPassengerStore();
</script>

<style scoped></style>
