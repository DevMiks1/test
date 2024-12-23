<template>
  <section class="bg-red content h-[100vh]">
    <v-container class="h-full py-0">
      <div class="flex h-full flex-col justify-around">
        <div>
          <h1 class="pb-5 text-[1.8rem] font-[600]">Corporate Booking</h1>
          <p class="">
            Hi Corporate, you will need to comply with the requirements to
            activate your account. For further questions, please contact our
            technical support.
          </p>
        </div>
        <v-form class="mt-20" @submit.prevent="handleLogin">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email"
                v-model="userDetails.email"
                type="email"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="-mt-8"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :label="'Password'"
                v-model="userDetails.password"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                variant="outlined"
                class="-mt-5"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mb-[1rem] mt-[.2rem]">
            <ActionButton
              :loading="isLoading"
              block
              class="bg-red-lighten-1"
              type="submit"
              :disabled="!isValidForm"
              >login</ActionButton
            >
          </div>
          <p class="text-center text-[.870rem]">
            Don't have an account?
            <router-link to="/signup"
              ><span class="text-red-400">Signup</span></router-link
            >
          </p>
        </v-form>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import "../styles/login.css";
import { computed, reactive, ref, type ComputedRef } from "vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import { requiredValidator } from "@/utility/formValidationRules";
import { login } from "@/service/api/authentication";
import { useAuthenticationStore } from "@/store";
import { useRouter } from "vue-router";
import { snackbarInstance } from "@/composables/useSnackbar";
import { retrieveCompanyprofile } from "@/service/api/profile";

const authenticationStore = useAuthenticationStore();
const router = useRouter();
const { showSnackbar } = snackbarInstance;

const isLoading = ref(false);
const showPassword = ref(false);
const userDetails = reactive({
  email: "",
  password: "",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isValidForm: ComputedRef<boolean> = computed(() => {
  const emailValid =
    requiredValidator("Name must not be empty", userDetails.email) === true;
  const passwordValid =
    requiredValidator("Password must not be empty", userDetails.password) ===
    true;

  return emailValid && passwordValid;
});

const handleLogin = async () => {
  isLoading.value = true;

  const body = {
    email: userDetails.email,
    password: userDetails.password,
  };
  try {
    const response = await login({ body });

    authenticationStore.setToken(response.data.accessToken);

    const companyProfile = await retrieveCompanyprofile();

    authenticationStore.profileDetails = companyProfile;

    router.replace("/dashboard");
  } catch (error: any) {
    const errorMessage = error.response.data.data.password;

    showSnackbar("error", errorMessage);
  } finally {
    isLoading.value = false;
  }
};
</script>
