<template>
  <Suspense>
    <template #default>
      <TripsHistoryTable />
    </template>
    <template #fallback>
      <v-skeleton-loader :elevation="24" type="table"></v-skeleton-loader>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const TripsHistoryTable = defineAsyncComponent(
  () => import("../components/TripsHistoryTable.vue"),
);
</script>
