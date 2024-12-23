<template>
  <div>
    <BaseDialog
      v-model="employeeStore.isCreateEmployeeModalOpen"
      persistent
      transition="dialog-bottom-transition"
      mWidth="450"
    >
      <Suspense>
        <template #default>
          <BaseCard
            :isVisible="!!employeeStore.isCreateEmployeeModalOpen"
            class="y-axis-scrollbar bg-lightGrey"
          >
            <div class="bg-red-darken-3 flex justify-between p-4">
              <p class="text-[1.2rem] font-[500]">Create Emloyee</p>
              <ActionIconButton
                size="small"
                icon="mdi-close"
                color="red"
                density="comfortable"
                variant="flat"
                @action="closeModal"
              />
            </div>
            <BaseContainer>
              <form @submit.prevent="handleCreateEmployee">
                <v-row>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Name"
                      :rules="firstNameRules()"
                      v-model="employeeData.firstName"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Middlename"
                      placeholder="Optional"
                      v-model="employeeData.middleName"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Lastname"
                      :rules="lastNameRules()"
                      v-model="employeeData.lastName"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Suffix"
                      placeholder="Optional"
                      v-model="employeeData.suffix"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Email"
                      :rules="emailRules()"
                      v-model="employeeData.email"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <BaseInput
                      label="Contact Number"
                      :prefix="countryCodes.Philippines"
                      :rules="mobileNumberRules()"
                      v-model="employeeData.mobileNumber"
                    />
                  </v-col>
                </v-row>
                <BaseButton
                  type="submit"
                  class="bg-red"
                  variant="tonal"
                  block
                  :disabled="!isValidForm"
                  :loading="isLoading"
                  >{{ "Add" }}</BaseButton
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
  type ComputedRef,
} from "vue";
import { createEmployee } from "@/service/api/employee";
import { useEmployeeStore } from "@/components/admin-dashboard/store/index";
import {
  emailRules,
  firstNameRules,
  lastNameRules,
  mobileNumberRules,
} from "@/utility/formValidationRules";
import type { CreateEmployee, Employees } from "@/service/interface/employee";
import { snackbarInstance } from "@/composables/useSnackbar";

const BaseButton = defineAsyncComponent(
  () => import("@/shared/components/Button/BaseButton.vue"),
);
const BaseInput = defineAsyncComponent(
  () => import("@/shared/components/Input/BaseInput.vue"),
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

const employeeStore = useEmployeeStore();

const { showSnackbar } = snackbarInstance;

const countryCodes = {
  Philippines: "+63",
};
const isLoading = ref(false);

const closeModal = (): boolean =>
  (employeeStore.isCreateEmployeeModalOpen = false);

const initialEmployeeData = () => {
  return {
    firstName: "",
    middleName: "",
    suffix: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    riderId: null,
  };
};

let employeeData: CreateEmployee = reactive(initialEmployeeData());

const handleCreateEmployee = async () => {
  isLoading.value = true;

  const body = {
    ...employeeData,
    mobileNumber: `${countryCodes.Philippines}${employeeData.mobileNumber}`,
  };

  try {
    const response: Employees = await createEmployee(body);

    if (response) {
      employeeStore.employees = [...employeeStore.employees, { ...response }];

      showSnackbar("success", "Successfully Added Employee");
      employeeStore.isCreateEmployeeModalOpen = false;

      setTimeout(() => {
        employeeData = initialEmployeeData();
      }, 500);
    }
  } catch (error: any) {
    const errorMessage =
      `${error.response?.data?.data?.email}` || "Error Occured";

    showSnackbar("error", errorMessage);
  } finally {
    isLoading.value = false;
  }
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  return (
    firstNameRules().every((rule) => rule(employeeData.firstName) === true) &&
    lastNameRules().every((rule) => rule(employeeData.lastName) === true) &&
    emailRules().every((rule) => rule(employeeData.email) === true) &&
    mobileNumberRules().every(
      (rule) => rule(employeeData.mobileNumber) === true,
    )
  );
});
</script>

<style scoped></style>
