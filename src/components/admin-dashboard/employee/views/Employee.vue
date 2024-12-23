<template>
  <div>
    <Suspense>
      <template #default>
        <EmployeeTable />
      </template>
      <template #fallback>
        <v-skeleton-loader :elevation="24" type="table"></v-skeleton-loader>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const EmployeeTable = defineAsyncComponent(
  () => import("../components/EmployeeTable.vue"),
);
</script>

<style></style>
