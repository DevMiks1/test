<template>
  <DetailsList title="Date and Time" :detailsExist="!!formattedDateTime">
    {{ formattedDateTime }}
  </DetailsList>
</template>

<script setup lang="ts">
import DetailsList from "@/components/booking-request/shared/DetailsList.vue";
import { useScheduleStore } from "@/components/booking-request/store/index";
import { computed } from "vue";

const scheduleStore = useScheduleStore();

const formattedDateTime = computed((): string => {
  if (scheduleStore.scheduleDetails) {
    const parsedDate: Date = new Date(scheduleStore.scheduleDetails);
    const formattedDate: string = parsedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  }
  return "";
});
</script>

<style scoped></style>
