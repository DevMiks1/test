<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-calendar-clock"
    :isActive="!!estimateStore.variantDetails"
    :isCompleted="!!scheduleStore.scheduleDetails"
    label="Schedule"
    @click="toggleScheduleModal"
  />
  <SelectScheduleModal v-if="scheduleStore.isScheduleModalOpen" />
</template>

<script setup lang="ts">
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import {
  useEstimateStore,
  useScheduleStore,
} from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

const SelectScheduleModal = defineAsyncComponent(
  () => import("./SelectScheduleModal.vue"),
);

const scheduleStore = useScheduleStore();
const estimateStore = useEstimateStore();

const toggleScheduleModal = (): void => {
  if (estimateStore.variantDetails) {
    scheduleStore.isScheduleModalOpen = true;
  }
};
</script>
