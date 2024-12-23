<template>
  <div
    v-if="employeePassengerStore.employeePassengerDetails.length > 0"
    class="flex flex-col"
  >
    <p
      class="details-font flex gap-1 text-[.900rem]"
      v-for="employee in employeePassengerList"
      :key="employee.id"
    >
      <BaseIcon icon="mdi-account" class="pr-2" />
      {{ `${employee.firstName} ${employee.middleName} ${employee.lastName}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { useEmployeePassengerStore } from "@/components/booking-request/store";
import { computed, type ComputedRef } from "vue";
import type { Employees } from "@/service/interface/employee";

const employeePassengerStore = useEmployeePassengerStore();

const employeePassengerList: ComputedRef<Employees[]> = computed(() => {
  return employeePassengerStore.employeePassengerDetails.map(
    (employee: Employees) => employee,
  );
});
</script>

<style scoped></style>
