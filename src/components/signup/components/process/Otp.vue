<template>
  <section class="flex items-center justify-center pt-5">
    <BaseContainer class="w-full max-w-lg rounded-lg bg-white px-8 py-10">
      <div class="space-y-8">
        <div class="space-y-4">
          <h3 class="text-3xl font-semibold text-gray-900">Check Your Email</h3>
          <p class="text-lg text-gray-600">
            We’ve sent a verification code to your email
            <strong class="font-semibold text-gray-800">{{
              clientDetails.email
            }}</strong>
            to activate your account.
          </p>
        </div>

        <v-sheet color="surface my-10">
          <v-otp-input
            type="password"
            variant="solo"
            color="red"
            v-model.number="otp"
          />
        </v-sheet>

        <ActionButton
          variant="flat"
          class="bg-red w-full rounded-lg py-3 text-white"
          block
          @action="handleOtp"
          :loading="isLoading"
        >
          Verify
        </ActionButton>

        <div class="text-sm text-gray-500">
          <template v-if="isTimerActive">
            <span class="block text-center">
              Resend available in <strong>{{ formattedTime }}</strong>
            </span>
          </template>
          <template v-else>
            <span class="block text-center">
              Didn't receive the code?
              <span
                class="cursor-pointer font-semibold text-red-600 hover:underline"
                @click="startResendTimer"
              >
                Resend
              </span>
            </span>
          </template>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { signup, verifyOtp } from "@/service/api/authentication";
import type { ClientDetails } from "@/service/interface/signup";
import BaseContainer from "@/shared/components/BaseContainer.vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import { snackbarInstance } from "@/composables/useSnackbar";

const router = useRouter();
const { showSnackbar } = snackbarInstance;

const otp = ref("");
const isLoading = ref(false);

const isTimerActive = ref(false);
const remainingTime = ref(300);

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const props = defineProps<{
  clientDetails: ClientDetails;
}>();

let timer: number | null = null;

const handleOtp = async () => {
  isLoading.value = true;
  const body = {
    email: props.clientDetails.email,
    otp: Number(otp.value),
  };

  try {
    await verifyOtp({ body });
    router.push("/login");
  } catch (error: any) {
    const messageError = error.response.data.data.otp;
    showSnackbar("error", messageError);
  } finally {
    isLoading.value = false;
  }
};

const startResendTimer = async () => {
  isTimerActive.value = true;
  await resendOtp();

  timer = setInterval(() => {
    remainingTime.value -= 1;
    if (remainingTime.value <= 0) {
      resetTimer();
    }
  }, 1000);
};

const resetTimer = () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  isTimerActive.value = false;
  remainingTime.value = 300; // Reset timer to 5 minutes
};

const resendOtp = async () => {
  const body = {
    ...props.clientDetails,
    mobileNumber: `+63${props.clientDetails.mobileNumber}`,
  };

  try {
    await signup({ body });
  } catch (error) {
    console.error(error);
  }
};

onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
});
</script>
