<template>
  <div>
    <BaseDialog
      v-model="employeeStore.isEditEmployeeModalOpen"
      transition="dialog-bottom-transition"
      mWidth="400"
      persistent
    >
      <Suspense>
        <template #default>
          <BaseCard
            :isVisible="!!employeeStore.isEditEmployeeModalOpen"
            class="y-axis-scrollbar bg-lightGrey"
          >
            <div class="bg-dark flex justify-between p-4">
              <p class="text-[1.2rem] font-[500]">Edit Emloyee</p>
              <ActionIconButton
                size="small"
                variant="tonal"
                density="comfortable"
                class="bg-red"
                icon="mdi-close"
                @action="closeEditEmployeeModal"
              />
            </div>
            <BaseContainer>
              <form @submit.prevent="handleEditEmployee">
                <BaseInput
                  label="Firstname"
                  :rules="firstNameRules()"
                  v-model="employeeData.firstName"
                />

                <BaseInput
                  label="Middlename"
                  v-model="employeeData.middleName"
                />

                <BaseInput
                  label="Lastname"
                  :rules="lastNameRules()"
                  v-model="employeeData.lastName"
                />
                <BaseInput label="Suffix" v-model="employeeData.suffix" />

                <BaseInput
                  label="Contact Number"
                  :rules="mobileNumberRules()"
                  v-model="employeeData.mobileNumber"
                  :prefix="'+63'"
                />
                <BaseButton
                  type="submit"
                  class="bg-red"
                  variant="tonal"
                  block
                  :disabled="!isValidForm"
                  :loading="isLoading"
                  >{{ "Edit" }}</BaseButton
                >
              </form>
            </BaseContainer>
          </BaseCard>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  reactive,
  ref,
  watch,
  type ComputedRef,
} from "vue";
import { useEmployeeStore } from "@/components/admin-dashboard/store/index";
import { updateEmployee } from "@/service/api/employee";
import {
  firstNameRules,
  lastNameRules,
  mobileNumberRules,
} from "@/utility/formValidationRules";
import type { Employees, BaseEmployee } from "@/service/interface/employee";
import { snackbarInstance } from "@/composables/useSnackbar";

const BaseInput = defineAsyncComponent(
  () => import("@/shared/components/Input/BaseInput.vue"),
);
const BaseButton = defineAsyncComponent(
  () => import("@/shared/components/Button/BaseButton.vue"),
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
const BaseContainer = defineAsyncComponent(
  () => import("@/shared/components/BaseContainer.vue"),
);
const ActionIconButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionIconButton.vue"),
);

const { showSnackbar } = snackbarInstance;

const countryCodes = {
  Philippines: "+63",
};
const isLoading = ref(false);

const initialEmployeeData = () => {
  return {
    firstName: "",
    middleName: "",
    suffix: "",
    lastName: "",
    mobileNumber: "",
    riderId: null,
  };
};

let employeeData: BaseEmployee = reactive(initialEmployeeData());

const employeeStore = useEmployeeStore();

const closeEditEmployeeModal = (): boolean =>
  (employeeStore.isEditEmployeeModalOpen = false);

const handleEditEmployee = async () => {
  isLoading.value = true;
  try {
    const body = {
      ...employeeData,
      mobileNumber: `${countryCodes.Philippines}${employeeData.mobileNumber}`,
    };

    const response: Employees = await updateEmployee({
      id: employeeStore.idToEdit,
      body,
    });

    if (response) {
      employeeStore.employees = employeeStore.employees.map(
        (employee: Employees) =>
          employee.id === employeeStore.idToEdit
            ? { ...employee, ...body }
            : employee,
      );

      showSnackbar("success", "Successfully Edited");
      employeeStore.isEditEmployeeModalOpen = false;
    }
  } catch (error: any) {
    const errorMessage = "Mobile Number already exist";

    showSnackbar("error", errorMessage);
  } finally {
    isLoading.value = false;
  }
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  return (
    firstNameRules().every((rule) => rule(employeeData.firstName) === true) &&
    lastNameRules().every((rule) => rule(employeeData.lastName) === true) &&
    mobileNumberRules().every(
      (rule) => rule(employeeData.mobileNumber) === true,
    )
  );
});

watch(
  () => employeeStore.idToEdit,
  (id: number | null) => {
    const employee: Employees | undefined = employeeStore.employees.find(
      (employee: Employees) => employee.id === id,
    );

    if (employee) {
      Object.assign(employeeData, {
        firstName: employee.firstName || "",
        middleName: employee.middleName || "",
        suffix: employee.suffix || "",
        lastName: employee.lastName || "",
        mobileNumber: employee.mobileNumber
          ? employee.mobileNumber.slice(3)
          : "",
      });
    }
  },
);
</script>
