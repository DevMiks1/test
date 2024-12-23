<template>
  <section>
    <BaseContainer
      class="flex min-h-screen flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center space-y-4">
        <h2 class="text-[2rem] font-[500]">
          Let’s create your company account
        </h2>

        <p>
          You’re creating an Owtosked Corporate account using
          {{ clientDetails.email }}
        </p>
      </div>
      <div class="mt-6 flex w-full justify-center">
        <form
          class="flex w-full max-w-lg flex-col gap-2"
          @submit.prevent="accountCreation"
        >
          <BaseInput
            label="Name"
            :rules="[
              requiredValidator('Name must not be empty', clientDetails.name),
            ]"
            v-model="clientDetails.name"
            type="text"
            prepend-inner-icon="mdi-account"
            variant="outlined"
          />

          <BaseInput
            :label="'Password'"
            :type="showPassword ? 'text' : 'password'"
            v-model="clientDetails.password"
            :rules="passwordRules()"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="togglePasswordVisibility"
            variant="outlined"
          />

          <BaseInput
            label="Contact Number"
            v-model="clientDetails.mobileNumber"
            :prefix="countryCodes.Philippines"
            :rules="mobileNumberRules()"
            prepend-inner-icon="mdi-cellphone"
          />

          <div class="flex justify-end gap-4">
            <ActionButton
              class="bg-red"
              type="submit"
              variant="flat"
              :loading="isLoading"
              :disabled="!isValidForm"
              >Create Account</ActionButton
            >
            <ActionButton @action="backToCompanyDetails">Back</ActionButton>
          </div>
        </form>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef } from "vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseInput from "@/shared/components/Input/BaseInput.vue";
import {
  mobileNumberRules,
  passwordRules,
  requiredValidator,
} from "@/utility/formValidationRules";
import type { ClientDetails } from "@/service/interface/signup";
import { signup } from "@/service/api/authentication";

const showPassword = ref(false);
const isLoading = ref(false);

const props = defineProps<{
  clientDetails: ClientDetails;
}>();

const countryCodes = {
  Philippines: "+63",
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const emit = defineEmits(["updateCurrentView"]);

const accountCreation = async () => {
  isLoading.value = true;
  const body = {
    ...props.clientDetails,
    mobileNumber: `${countryCodes.Philippines}${props.clientDetails.mobileNumber}`,
  };

  try {
    await signup({ body });
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
  emit("updateCurrentView", "otp");
};

const backToCompanyDetails = () => {
  emit("updateCurrentView", "companyDetails");
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  const nameValid =
    requiredValidator("Name must not be empty", props.clientDetails.name) ===
    true;

  const mobileValid = mobileNumberRules().every(
    (rule) => rule(props.clientDetails.mobileNumber) === true,
  );
  const passwordValid = passwordRules().every(
    (rule) => rule(props.clientDetails.password) === true,
  );

  return nameValid && mobileValid && passwordValid;
});
</script>
