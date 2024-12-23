<template>
  <div>
    <div>
      <div>
        <div class="bg-red p-4">
          <BaseSearch
            prependInnerIcon="mdi-magnify"
            label="Search"
            density="compact"
            v-model="searchQuery"
          />
        </div>
        <v-toolbar class="bg-dark px-5">
          <h2 class="text-[1.1rem] font-[500]">List of Employee</h2>
          <v-spacer></v-spacer>
          <ActionButton
            class="bg-red"
            prependIcon="mdi-plus"
            variant="tonal"
            @action="openCreateEmployeeModal(true)"
          >
            <span class="hidden sm:inline">{{ "Add Employee" }}</span>
            <span class="mdi mdi-account text-[1rem] sm:hidden"></span>
          </ActionButton>
        </v-toolbar>
      </div>
      <EmployeeList :isLoading="isLoading" />
    </div>
    <CreateEmployeeModal v-if="employeeStore.isCreateEmployeeModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, defineAsyncComponent } from "vue";
import { debounce } from "lodash";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseSearch from "@/shared/components/Search/BaseSearch.vue";
import { capitalizeFirstLetter } from "@/utility/capitalizeFirstLetter";
import type { Employees } from "@/service/interface/employee";
import { retrieveAllEmployees } from "@/service/api/employee";
import { useEmployeeStore } from "@/components/admin-dashboard/store";
import EmployeeList from "./employee-list/EmployeeList.vue";

const CreateEmployeeModal = defineAsyncComponent(
  () => import("./CreateEmployeeModal.vue"),
);

const isLoading = ref(false);

const employeeStore = useEmployeeStore();

const searchQuery = computed({
  get: () => employeeStore.search,
  set: debounce((value) => {
    employeeStore.search = value;
  }, 300),
});

const openCreateEmployeeModal = (modalOpen: boolean): boolean => {
  return (employeeStore.isCreateEmployeeModalOpen = modalOpen);
};

onMounted(() => {
  const fetchEmployees = async (): Promise<void> => {
    try {
      isLoading.value = true;

      const response = await retrieveAllEmployees();

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
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  fetchEmployees();
});
</script>

<style></style>
