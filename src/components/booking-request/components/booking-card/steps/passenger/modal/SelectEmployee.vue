<template>
  <BaseDialog
    mWidth="600px"
    persistent
    v-model="employeePassengerStore.isEmployeePassengerModalOpen"
  >
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!employeePassengerStore.isEmployeePassengerModalOpen"
          class="y-axis-scrollbar bg-lightGrey"
        >
          <!-- search employee -->
          <div class="bg-grey-lighten-2 p-3">
            <BaseSearch
              density="compact"
              label="Search"
              prependInnerIcon="mdi-magnify"
              v-model="search"
            />
          </div>

          <div class="bg-red flex items-center px-3 py-3">
            <BaseChip label prependIcon="mdi-account">{{
              "List of Employees"
            }}</BaseChip>
            <v-spacer></v-spacer>
            <div>
              <div class="_btn-text">
                <ActionButton @action="openGuestPassengerModal" color="red">
                  <BaseIcon icon="mdi-plus" />
                  {{ "Add Guest" }}
                </ActionButton>
              </div>
              <div class="_btn-icon hidden">
                <ActionIconButton
                  icon="mdi-account-plus"
                  class="bg-red-lighten-1"
                  size="small"
                  @action="openGuestPassengerModal"
                />
              </div>
            </div>
          </div>
          <!-- list of employee -->
          <v-data-table
            :headers="headers"
            :search="searchQuery"
            :item-value="(item: Employees) => `${item.id}`"
            :items="employeePassengerList"
            items-per-page="5"
            show-select
            return-object
            v-model="employeePassengerStore.employeePassengerSelected"
          ></v-data-table>

          <div class="m-5 flex justify-end gap-5">
            <ActionButton
              class="bg-dark"
              variant="tonal"
              @action="closeEmployeePassengerModal"
            >
              {{ "Close" }}
            </ActionButton>

            <ActionButton
              class="bg-red"
              variant="tonal"
              @action="handleEmployeePassenger"
            >
              {{ "Confirm" }}
            </ActionButton>
          </div>
        </BaseCard>
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </BaseDialog>

  <AddGuest v-if="guestPassengerStore.isGuestPassengerModalOpen" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { debounce } from "lodash";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import {
  useEmployeePassengerStore,
  useGuestPassengerStore,
  usePassengerNumberStore,
  usePassengerStore,
  useRepresentativePassengerStore,
} from "@/components/booking-request/store";
import type { Employees } from "@/service/interface/employee";
import { useEmployeeStore } from "@/components/admin-dashboard/store";
import { snackbarInstance } from "@/composables/useSnackbar";

const BaseSearch = defineAsyncComponent(
  () => import("@/shared/components/Search/BaseSearch.vue"),
);
const Loading = defineAsyncComponent(
  () => import("@/shared/components/Loading.vue"),
);
const BaseDialog = defineAsyncComponent(
  () => import("@/shared/components/Dialog/BaseDialog.vue"),
);
const BaseCard = defineAsyncComponent(
  () => import("@/shared/components/Card/BaseCard.vue"),
);
const ActionIconButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionIconButton.vue"),
);
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);
const BaseChip = defineAsyncComponent(
  () => import("@/shared/components/Chip/BaseChip.vue"),
);

const AddGuest = defineAsyncComponent(() => import("./AddGuest.vue"));

const { showSnackbar } = snackbarInstance;

const employeePassengerStore = useEmployeePassengerStore();
const representativePassengerStore = useRepresentativePassengerStore();
const employeeStore = useEmployeeStore();
const passengerStore = usePassengerStore();
const passengerNumberStore = usePassengerNumberStore();
const guestPassengerStore = useGuestPassengerStore();

const searchQuery = ref("");

const search = computed({
  get: () => searchQuery.value,
  set: debounce((newSearchQuery: string) => {
    searchQuery.value = newSearchQuery;
  }, 300),
});

const employeePassengerList = computed(() => {
  const representativeSelectedId =
    representativePassengerStore.representativePassenger?.employeeId;

  if (representativeSelectedId) {
    return [...employeeStore.employeeDetails]
      .filter((employee) => employee.id !== representativeSelectedId)
      .reverse();
  }
});

const closeEmployeePassengerModal = () => {
  employeePassengerStore.isEmployeePassengerModalOpen = false;
  employeePassengerStore.employeePassengerSelected = [];
};

const openGuestPassengerModal = (): boolean =>
  (guestPassengerStore.isGuestPassengerModalOpen = true);

const handleEmployeePassenger = (): void => {
  if (
    Number(passengerNumberStore.passengerNumberCount) !==
    passengerStore.totalPassenger.length
  ) {
    showSnackbar(
      "warning",
      `You have selected ${passengerStore.totalPassenger.length} passengers, which does not match to ${passengerNumberStore.passengerNumberCount} passengers.`,
    );
    return;
  }

  employeePassengerStore.employeePassenger =
    employeePassengerStore.employeePassengerSelected.map(
      (employee: Employees) => ({
        employeeId: employee.id,
      }),
    );

  const selectedPassengerIds: number[] =
    employeePassengerStore.employeePassengerSelected.map(
      (empPassenger: Employees) => empPassenger.id,
    );

  employeePassengerStore.employeePassengerDetails =
    employeePassengerStore.employeePassengerSelected;

  const remainingEmployees = employeeStore.employeeDetails.filter(
    (employee: Employees) => !selectedPassengerIds.includes(employee.id),
  );

  employeeStore.employeeDetails = [
    ...remainingEmployees,
    ...employeePassengerStore.employeePassengerSelected,
  ];

  employeePassengerStore.isEmployeePassengerModalOpen = false;
};
const headers = [{ title: "Name", value: "fullName" }];
</script>

<style scoped></style>
