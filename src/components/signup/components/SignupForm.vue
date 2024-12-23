<template>
  <section class="flex min-h-screen flex-col items-center justify-center">
    <BaseContainer fluid>
      <div class="mx-auto flex w-full max-w-md flex-col justify-center">
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-semibold md:text-3xl">
            Sign up for OWTOSKED
          </h1>
        </div>

        <v-form @submit.prevent="proceedCompanyDetails">
          <BaseInput
            label="Work Email"
            type="email"
            v-model="clientDetails.email"
            :rules="emailRules()"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            class="mb-6"
          />

          <div class="mb-6 flex justify-start space-x-3">
            <div>
              <input
                v-model="isChecked"
                type="checkbox"
                class="h-4 w-4 cursor-pointer rounded border-gray-300 text-red-500"
              />
            </div>
            <p class="text-sm">
              By proceeding, I agree that Owtosked can collect and use my
              information in accordance with the
              <router-link to="/privacy-policy"
                ><span class="text-red-500 underline"
                  >Privacy</span
                ></router-link
              >
              Notice and
              <router-link to="terms"
                ><p class="text-red-500 underline">
                  Terms & Conditions.
                </p></router-link
              >
            </p>
          </div>

          <div class="mb-6">
            <ActionButton
              block
              type="submit"
              class="bg-red-lighten-1"
              :disabled="!isValidForm"
            >
              Sign up
            </ActionButton>
          </div>

          <p class="text-center text-sm">
            Have an account?
            <router-link to="/login">
              <span class="font-semibold text-red-500">Login</span>
            </router-link>
          </p>
        </v-form>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import "../styles/signup.css";
import { computed, ref, type ComputedRef } from "vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseInput from "@/shared/components/Input/BaseInput.vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
import { emailRules } from "@/utility/formValidationRules";
import { snackbarInstance } from "@/composables/useSnackbar";
import type { ClientDetails } from "@/service/interface/signup";

const { showSnackbar } = snackbarInstance;

const isChecked = ref(false);

const emit = defineEmits(["updateCurrentView"]);

const props = defineProps<{
  clientDetails: ClientDetails;
}>();

const proceedCompanyDetails = () => {
  if (!isChecked.value) {
    showSnackbar("warning", "Please Accept the Terms & Condition to proceed");
    return;
  }

  emit("updateCurrentView", "companyDetails");
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  return emailRules().every((rule) => rule(props.clientDetails.email) === true);
});
</script>
