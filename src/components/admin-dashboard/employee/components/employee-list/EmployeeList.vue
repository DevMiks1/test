<template>
  <div>
    <div v-if="props.isLoading">
      <div class="fixed inset-0 z-50 bg-white">
        <ProgressbarLoading />
      </div>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :search="employeeStore.search"
        :items="employeeList"
        items-per-page="5"
      >
        <!-- headers -->
        <template
          v-for="header in headers"
          v-slot:[`header.${header.value}`]="{ column }"
        >
          <p class="text-uppercase text-no-wrap text-[.800rem] font-[500]">
            {{ column.title }}
          </p>
        </template>

        <!-- items -->
        <template v-slot:[`item.fullName`]="{ item }">
          <p class="text-no-wrap">
            {{ item.fullName }}
          </p>
        </template>
        <template v-slot:[`item.email`]="{ item }">
          <p class="text-no-wrap">
            {{ item.email }}
          </p>
        </template>
        <template v-slot:[`item.riderId`]="{ item }">
          <BaseChip
            :color="item.riderId === null ? 'red' : 'green'"
            class="text-uppercase"
            size="small"
            :label="true"
          >
            {{ item.riderId === null ? "Pending" : "Verified" }}
          </BaseChip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="flex gap-2">
            <ActionButton
              class="bg-green-lighten-4 text-green-darken-2"
              variant="flat"
              @action="openEditEmployeeModal({ id: item.id })"
            >
              <BaseIcon icon="mdi-pencil" />
            </ActionButton>

            <div v-if="item.riderId === null">
              <ActionButton
                class="bg-blue-lighten-4 text-blue-darken-2"
                variant="flat"
                :loading="isLoading"
                @click="
                  handleVerificationRequest({ id: item.id, email: item.email })
                "
              >
                <BaseIcon icon="mdi-lock" />
              </ActionButton>
            </div>
          </div>
        </template>
      </v-data-table>
    </div>

    <EditEmployeeModal />
    <RequestVerificationModal
      v-if="employeeStore.isVerificationRequestEmployeeModalOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, type Ref } from "vue";
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";
import BaseChip from "@/shared/components/Chip/BaseChip.vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { useEmployeeStore } from "@/components/admin-dashboard/store/index";
import type { Employees } from "@/service/interface/employee";
import { capitalizeFirstLetter } from "@/utility/capitalizeFirstLetter";
import { vericationRequest } from "@/service/api/employee";
import { snackbarInstance } from "@/composables/useSnackbar";

const RequestVerificationModal = defineAsyncComponent(
  () => import("./RequestVerificationModal.vue"),
);
const EditEmployeeModal = defineAsyncComponent(
  () => import("./EditEmployeeModal.vue"),
);

const isLoading: Ref<boolean> = ref(false);

const { showSnackbar } = snackbarInstance;

const employeeStore = useEmployeeStore();

const props = defineProps<{
  isLoading: Boolean;
}>();

const openEditEmployeeModal = ({ id }: { id: number }) => {
  employeeStore.idToEdit = id;
  employeeStore.isEditEmployeeModalOpen = true;
};

const handleVerificationRequest = async ({
  id,
  email,
}: {
  id: number;
  email: string;
}) => {
  const employeeStore = useEmployeeStore();

  isLoading.value = true;

  employeeStore.idToVerificationRequest = id;
  employeeStore.email = email;

  try {
    await vericationRequest({
      id: id,
    });
    employeeStore.isVerificationRequestEmployeeModalOpen = true;
  } catch (error) {
    showSnackbar("error", `${email} verification denied`);
  } finally {
    isLoading.value = false;
  }
};

const employeeList = computed((): Employees[] => {
  return employeeStore.employees
    .map((rider: Employees) => {
      const suffix: string = rider.suffix
        ? ` ${capitalizeFirstLetter(rider.suffix)}`
        : "";
      return {
        ...rider,
        fullName: `${capitalizeFirstLetter(rider.firstName)} ${capitalizeFirstLetter(rider.middleName)} ${capitalizeFirstLetter(rider.lastName)}${suffix}`,
      };
    })
    .reverse();
});

const headers = [
  { title: "Employee Name", value: "fullName" },
  { title: "Email", value: "email" },
  { title: "Verify Status", value: "riderId" },
  { title: "Actions", value: "actions" },
];
</script>
