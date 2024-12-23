<template>
  <section>
    <BaseContainer
      class="flex min-h-screen flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center space-y-4">
        <h2 class="text-[2rem] font-[500]">Tell us about your company</h2>

        <p>
          You’re creating an Owtosked Corporate account using
          {{ clientDetails.email }}
        </p>
      </div>
      <div class="mt-6 flex w-full justify-center">
        <form class="w-full max-w-lg" @submit.prevent="proceedCreateAccount">
          <BaseInput
            label="Company Name"
            v-model="clientDetails.companyName"
            :rules="[
              requiredValidator(
                'Company name must not be empty',
                clientDetails.companyName,
              ),
            ]"
            class="mb-2"
            type="text"
            prepend-inner-icon="mdi-office-building"
            variant="outlined"
          />
          <BaseInput
            label="Company Address"
            v-model="clientDetails.companyAddress"
            type="text"
            prepend-inner-icon="mdi-map-marker"
            variant="outlined"
          />

          <v-radio-group v-model="clientDetails.companySize">
            <v-radio
              v-for="companySize in companySizes"
              :key="companySize"
              :label="companySize"
              :value="companySize"
            ></v-radio>
          </v-radio-group>

          <div class="flex justify-end gap-4">
            <ActionButton class="bg-red" type="submit" :disabled="!isValidForm"
              >Proceed</ActionButton
            >
            <ActionButton @action="backToSignupForm">Back</ActionButton>
          </div>
        </form>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseInput from "@/shared/components/Input/BaseInput.vue";
import { companySizes } from "@/service/json/clientDetails";
import type { ClientDetails } from "@/service/interface/signup";
import { emailRules, requiredValidator } from "@/utility/formValidationRules";
import { computed, type ComputedRef } from "vue";

const props = defineProps<{
  clientDetails: ClientDetails;
}>();

const emit = defineEmits(["updateCurrentView"]);

const proceedCreateAccount = () => {
  emit("updateCurrentView", "createAccount");
};

const backToSignupForm = () => {
  emit("updateCurrentView", "signupForm");
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  const emailValid = emailRules().every(
    (rule) => rule(props.clientDetails.email) === true,
  );
  const companyNameValid =
    requiredValidator(
      "Company name must not be empty",
      props.clientDetails.companyName,
    ) === true;

  const companySizeValid = !!props.clientDetails.companySize;

  return emailValid && companyNameValid && companySizeValid;
});
</script>
