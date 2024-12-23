<template>
  <BaseDialog
    v-model="employeeStore.isVerificationRequestEmployeeModalOpen"
    mWidth="500"
    transition="dialog-bottom-transition"
  >
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!employeeStore.isVerificationRequestEmployeeModalOpen"
          class="px-sm-6 mx-auto px-3 py-8"
          elevation="12"
          max-width="400"
        >
          <div class="flex flex-col items-center">
            <div>
              <h3 class="text-h6 mb-4 text-center">Verify Your Account</h3>
              <div class="text-body-2">
                <p class="block">
                  {{ `We sent otp to ${employeeStore.email}` }}
                </p>

                <span>Please check your email and paste the code below.</span>
              </div>
            </div>
            <v-sheet color="surface">
              <v-otp-input
                v-model="otp"
                type="password"
                variant="solo"
              ></v-otp-input>
            </v-sheet>
            <div class="text-center">
              <div class="my-4">
                <ActionButton
                  variant="flat"
                  class="bg-red"
                  width="100%"
                  :loading="isLoading"
                  @action="handleVerificationOtp"
                >
                  {{ "Verify" }}
                </ActionButton>
              </div>

              <div class="text-caption flex gap-1">
                Didn't receive the code?
                <p class="cursor-pointer" @click="resendVerificationRequest">
                  Resend
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </template>

      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </BaseDialog>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, type Ref } from "vue";
import { useEmployeeStore } from "@/components/admin-dashboard/store/index";
import type { Employees } from "@/service/interface/employee";
import { verificationOtp, vericationRequest } from "@/service/api/employee";
import { snackbarInstance } from "@/composables/useSnackbar";

const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
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

const isLoading: Ref<boolean> = ref(false);
const otp: Ref<string> = ref("");

const { showSnackbar } = snackbarInstance;

const employeeStore = useEmployeeStore();

const resendVerificationRequest = async () => {
  const employeeStore = useEmployeeStore();

  try {
    await vericationRequest({
      id: employeeStore.idToVerificationRequest,
    });
    employeeStore.isVerificationRequestEmployeeModalOpen = true;
  } catch (error) {
    showSnackbar("error", `${employeeStore.email} verification denied`);
  }
};

const handleVerificationOtp = async () => {
  const verifiedEmployee = (id: number | null): void => {
    employeeStore.employees = employeeStore.employees.map(
      (employee: Employees) =>
        employee.id === id ? { ...employee, riderId: "verified" } : employee,
    );
  };

  if (!otp.value) {
    showSnackbar("warning", "fill the otp");
    return;
  }

  try {
    isLoading.value = true;
    const id: number | null = employeeStore.idToVerificationRequest;

    const response = await verificationOtp({
      id: employeeStore.idToVerificationRequest,
      body: otp.value,
    });

    if (response) {
      verifiedEmployee(id);
      showSnackbar("success", "Successfully verified");
    }
  } catch (error) {
    showSnackbar("error", "OTP not match");
  } finally {
    isLoading.value = false;
  }
};
</script>
