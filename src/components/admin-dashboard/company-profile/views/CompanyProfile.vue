<template>
  <MyProfile
    @updateProfile="updateProfile"
    @toggleEditMode="toggleEditMode"
    :countryCodes="countryCodes"
    :isLoading="isLoading"
    :isEdit="isEdit"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthenticationStore } from "@/store";
import { updateCompanyProfile } from "@/service/api/profile";
import { snackbarInstance } from "@/composables/useSnackbar";
import MyProfile from "../components/MyProfile.vue";

const authenticationStore = useAuthenticationStore();
const { showSnackbar } = snackbarInstance;

const countryCodes = {
  Philippines: "+63",
};

const isLoading = ref(false);
const isEdit = ref(false);

const updateProfile = async ({ ...companyProfile }) => {
  isLoading.value = true;

  if (!authenticationStore.profileDetails?.id) {
    throw new Error("Profile ID is undefined. Cannot update profile.");
  }

  try {
    const body = {
      ...companyProfile,
      mobileNumber: `${countryCodes.Philippines}${companyProfile.mobileNumber}`,
    };

    const response = await updateCompanyProfile({ body });

    if (response) {
      authenticationStore.profileDetails = response;
    }

    showSnackbar("success", "Updated Successfully");

    isEdit.value = false;
  } catch (error: any) {
    showSnackbar("error", error.message);
  } finally {
    isLoading.value = false;
  }
};

const toggleEditMode = ({ ...companyProfile }) => {
  if (isEdit.value) {
    updateProfile({ ...companyProfile });
  } else {
    isEdit.value = true;
  }
};
</script>
