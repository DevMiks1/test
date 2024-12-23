<template>
  <DetailsList title="Passenger's" :detailsExist="!!representativeDetails">
    <Representative />
    <Employee />
    <Guest />
  </DetailsList>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import DetailsList from "@/components/booking-request/shared/DetailsList.vue";
import { useRepresentativePassengerStore } from "@/components/booking-request/store/index";

const Representative = defineAsyncComponent(
  () => import("./Representative/Representative.vue"),
);
const Employee = defineAsyncComponent(() => import("./Employee/Employee.vue"));
const Guest = defineAsyncComponent(() => import("./Guest/Guest.vue"));

const representativePassengerStore = useRepresentativePassengerStore();

const { representativeDetails } = storeToRefs(representativePassengerStore);
</script>

<style scoped></style>
