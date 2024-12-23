<template>
  <BaseDialog
    mWidth="550px"
    v-model="representativePassengerStore.isRepresentativeModalOpen"
  >
    <BaseCard
      class="y-axis-scrollbar bg-lightGrey"
      :isVisible="!!representativePassengerStore.isRepresentativeModalOpen"
    >
      <div class="bg-red-lighten-1 flex items-center justify-between p-4">
        <BaseChip prependIcon="mdi-account-supervisor-circle" label>
          {{ "Rider's Representative" }}
        </BaseChip>
        <ActionIconButton
          @action="closeRepresentativePassengerModal"
          class="bg-white"
          size="small"
          icon="mdi-close"
          density="comfortable"
          variant="flat"
        />
      </div>
      <div class="bg p-4">
        <BaseSearch
          density="compact"
          label="Search name"
          prependInnerIcon="mdi-magnify"
          v-model="search"
        />
      </div>
      <v-data-table
        :headers="headers"
        :search="searchQuery"
        :item-value="(item: Employees) => `${item.id}`"
        :items="representativePassengerList"
        select-strategy="single"
      >
        <template v-slot:[`header.fullName`]="{ column }">
          <div class="flex items-center justify-between px-3 py-2">
            <p class="text-uppercase text-no-wrap text-[.800rem] font-[500]">
              {{ column.title }}
            </p>
          </div>
        </template>

        <template v-slot:item="{ item }">
          <v-radio-group
            v-model="representativePassengerStore.representativeSelected"
            hide-details
            class="mt-1"
          >
            <v-radio
              :value="item.id"
              :label="item.fullName"
              color="red"
              :class="[
                representativePassengerStore.representativeSelected === item.id
                  ? 'border-red border-dashed border-opacity-100'
                  : 'border-red border border-opacity-25',
                'border-md mx-5 my-1 rounded-md',
              ]"
            />
          </v-radio-group>
        </template>
      </v-data-table>
      <div class="m-4">
        <ActionButton
          class="bg-red"
          block
          @click="handleRepresentativePassenger"
        >
          {{ "Confirm" }}
        </ActionButton>
      </div>
    </BaseCard>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, defineAsyncComponent } from "vue";
import { debounce } from "lodash";
import { useEmployeeStore } from "@/components/admin-dashboard/store";
import type { Employees } from "@/service/interface/employee";
import { snackbarInstance } from "@/composables/useSnackbar";
import { useRepresentativePassengerStore } from "@/components/booking-request/store/index";

const BaseSearch = defineAsyncComponent(
  () => import("@/shared/components/Search/BaseSearch.vue"),
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

const searchQuery: Ref<string> = ref("");

const headers = [{ title: "Name", value: "fullName" }];
const { showSnackbar } = snackbarInstance;

const representativePassengerStore = useRepresentativePassengerStore();
const employeeStore = useEmployeeStore();

const closeRepresentativePassengerModal = (): boolean =>
  (representativePassengerStore.isRepresentativeModalOpen = false);

const representativePassengerList = computed(() => {
  return employeeStore.employees
    .filter((employee: Employees) => employee.riderId !== null)
    .map((employee: Employees) => ({
      ...employee,
      fullName: `${employee.firstName} ${employee.lastName}`,
    }));
});

const search = computed({
  get: () => searchQuery.value,
  set: debounce((newSearchQuery: string) => {
    searchQuery.value = newSearchQuery;
  }, 300),
});

const handleRepresentativePassenger = (): void => {
  const representativeId = representativePassengerStore.representativeSelected;

  const representativeData = employeeStore.employees.find(
    (emp: Employees) => emp.id === representativeId,
  );

  if (!representativeData) {
    showSnackbar("warning", "Choose Representative");
    return;
  }
  representativePassengerStore.representativeDetails = representativeData;

  representativePassengerStore.representativePassenger = {
    employeeId: representativeData.id,
    isRepresentative: true,
  };

  representativePassengerStore.isRepresentativeModalOpen = false;
};
</script>
