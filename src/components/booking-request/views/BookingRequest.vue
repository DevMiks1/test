<template>
  <div>
    <Suspense>
      <template #default>
        <div>
          <Bookingcard />

          <MapLocation />
        </div>
      </template>
      <template #fallback>
        <div class="fixed inset-0 z-50 bg-white">
          <ProgressbarLoading />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from "vue";
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";
import { useSnackbar } from "@/composables/useSnackbar";
import { retrieveAllEmployees } from "@/service/api/employee";
import { capitalizeFirstLetter } from "@/utility/capitalizeFirstLetter";
import { useEmployeeStore } from "@/components/admin-dashboard/store/index";
import { useBookingStore } from "@/components/booking-request/store/index";
import type { Employees } from "@/service/interface/employee";

const MapLocation = defineAsyncComponent(
  () => import("../components/MapLocation.vue"),
);
const Bookingcard = defineAsyncComponent(
  () => import("../components/booking-card/BookingCard.vue"),
);

const { showSnackbar } = useSnackbar();

const employeeStore = useEmployeeStore();
const bookingStore = useBookingStore();

const isLoading = ref(false);

onMounted(() => {
  const fetchEmployees = async (): Promise<void> => {
    try {
      isLoading.value = true;
      const response: Employees = await retrieveAllEmployees();

      employeeStore.employees = response;

      employeeStore.employeeDetails = employeeStore.employees.map(
        (employee: Employees) => {
          const suffix: string = employee.suffix
            ? ` ${capitalizeFirstLetter(employee.suffix)}`
            : "";
          return {
            ...employee,
            fullName: `${capitalizeFirstLetter(
              employee.firstName,
            )} ${capitalizeFirstLetter(
              employee.middleName,
            )} ${capitalizeFirstLetter(employee.lastName)} ${suffix}`,
          };
        },
      );
    } catch (error: any) {
      showSnackbar(
        "error",
        `Error fetching employee ${error.message || error}`,
      );
    } finally {
      isLoading.value = false;
    }
  };

  fetchEmployees();
});

onBeforeUnmount(() => {
  setTimeout(() => {
    bookingStore.handleClearBookingData();
  }, 500);
});
</script>

<style scoped></style>
