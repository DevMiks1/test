<template>
  <Suspense>
    <template #default>
      <section id="signup">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="4"
            order="2"
            order-sm="1"
            class="bg-white"
          >
            <router-link to="/login">
              <div
                class="m-5 flex h-[40px] w-[40px] items-center justify-center rounded-full border text-start"
              >
                <ActionIconButton icon="mdi-keyboard-backspace" color="red" />
              </div>
            </router-link>
            <KeepAlive>
              <component
                :is="currentComponent"
                :clientDetails="clientDetails"
                @updateCurrentView="updateCurrentView"
              />
            </KeepAlive>
          </v-col>
          <v-col cols="12" sm="6" md="8" order="1" order-sm="2">
            <div class="background flex h-[100vh] items-center justify-center">
              <img
                src="/assets/login/car-logo.png"
                alt="Car Image"
                class="image pt-5 md:h-[20rem]"
              />
            </div>
          </v-col>
        </v-row>
      </section>
    </template>

    <template #fallback>
      <div class="fixed inset-0 z-50 bg-white">
        <ProgressbarLoading />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, onBeforeUnmount } from "vue";
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";
import SignupForm from "../components/SignupForm.vue";
import CompanyDetails from "../components/process/CompanyDetails.vue";
import CreateAccount from "../components/process/CreateAccount.vue";
import Otp from "../components/process/Otp.vue";
import ActionIconButton from "@/shared/components/Button/ActionIconButton.vue";

const step = ref("signupForm");
const unsavedChanges = ref(false);

const clientDetails = reactive({
  email: "",
  mobileNumber: "",
  companyName: "",
  companyAddress: "",
  companySize: "",
  name: "",
  password: "",
});

const currentComponent = computed(() => {
  switch (step.value) {
    case "signupForm":
      return SignupForm;
    case "companyDetails":
      return CompanyDetails;
    case "createAccount":
      return CreateAccount;
    case "otp":
      return Otp;
    default:
      return SignupForm;
  }
});

watch(
  clientDetails,
  () => {
    unsavedChanges.value = true;
  },
  { deep: true },
);

const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
  if (unsavedChanges.value) {
    const message = "Changes you made may not be saved.";
    // compatibility for older browser
    event.returnValue = message;
    return message;
  }
};

window.addEventListener("beforeunload", beforeUnloadHandler);

const popStateHandler = (event: PopStateEvent) => {
  if (unsavedChanges.value) {
    const confirmed = window.confirm(
      "You have unsaved changes. Do you really want to leave?",
    );
    if (!confirmed) {
      history.pushState(null, "", location.href);
    }
  }
};

window.addEventListener("popstate", popStateHandler);

history.pushState(null, "", location.href);

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler);
  window.removeEventListener("popstate", popStateHandler);
});

const updateCurrentView = (newView: string) => {
  step.value = newView;
};
</script>
