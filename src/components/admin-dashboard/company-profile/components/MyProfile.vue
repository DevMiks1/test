<template>
  <div class="flex flex-col gap-5 md:flex-row">
    <!-- Avatar Section -->
    <div
      class="flex w-[100%] items-center justify-center rounded-[.3rem] bg-white p-10 md:w-[30%]"
    >
      <v-avatar size="180" class="shadow-2xl">
        <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
      </v-avatar>
    </div>

    <!-- Profile Details Section -->
    <div class="w-full rounded-[.3rem] bg-white p-5 md:w-[70%]">
      <div class="flex justify-between pb-10">
        <h2 class="text-h6 font-bold">My Profile</h2>
        <div>
          <ActionButton
            :class="[isEdit ? 'bg-green' : 'bg-red', ,]"
            class="text-white"
            @action="toggleEditMode"
            :loading="isLoading"
            :disabled="!isValid"
            >{{ isEdit ? "Update Profile" : "Edit Profile" }}</ActionButton
          >
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <div
          v-for="field in companyDetails"
          :key="field.id"
          class="flex w-full flex-col gap-1 text-[.8rem] font-[500] sm:w-[48%]"
        >
          <p class="text-red text-[.875rem] font-[600]">
            {{ field.label }}
          </p>

          <BaseInput
            v-model="companyProfile[field.name as keyof typeof companyProfile]"
            :rules="getFieldRules(field.name as FieldName)"
            :variant="isEdit ? 'outlined' : 'solo'"
            :readonly="!isEdit"
            :hint="isEdit ? 'Editable' : ''"
            :persistent-hint="isEdit"
            :base-color="isEdit ? 'red' : ''"
            color="red"
            :prefix="
              field.name === 'mobileNumber' ? countryCodes?.Philippines : ''
            "
          />
        </div>

        <div class="flex w-full flex-col gap-1 text-[.8rem] font-[500]">
          <p class="text-red text-[.875rem] font-[600]">
            {{ "Company Size" }}
          </p>
          <v-select
            :readonly="!isEdit"
            :variant="isEdit ? 'outlined' : 'solo'"
            color="red"
            :items="companySize"
            density="comfortable"
            :hint="isEdit ? 'Editable' : ''"
            :persistent-hint="isEdit"
            :base-color="isEdit ? 'red' : ''"
            v-model="companyProfile.companySize"
          ></v-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, type ComputedRef } from "vue";
import { useAuthenticationStore } from "@/store";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseInput from "@/shared/components/Input/BaseInput.vue";
import {
  mobileNumberRules,
  requiredValidator,
} from "@/utility/formValidationRules";

const authenticationStore = useAuthenticationStore();

type FieldName = "name" | "companyName" | "mobileNumber";
const props = defineProps({
  isLoading: Boolean,
  isEdit: Boolean,
  countryCodes: Object,
});

const emit = defineEmits(["updateProfile", "toggleEditMode"]);

const companySize = ["Below 50", "51-250", "251-500", "Above 500"];
const companyProfile = reactive({
  mobileNumber: "",
  companyName: "",
  companyAddress: "",
  companySize: "",
  name: "",
});

const toggleEditMode = () => {
  emit("toggleEditMode", companyProfile);
};

const getFieldRules = (fieldName: FieldName) => {
  const rules = {
    name: [requiredValidator(" name is required", companyProfile.name)],
    companyName: [
      requiredValidator("Company name is required", companyProfile.companyName),
    ],
    mobileNumber: mobileNumberRules(),
  };

  return rules[fieldName] || [];
};

const isValid: ComputedRef<boolean> = computed(() => {
  const validName =
    requiredValidator("Name must not be empty", companyProfile.name) === true;
  const validCompanyName =
    requiredValidator(
      "Password must not be empty",
      companyProfile.companyName,
    ) === true;
  const validMobileNumber = mobileNumberRules().every(
    (rule) => rule(companyProfile.mobileNumber) === true,
  );

  return validName && validCompanyName && validMobileNumber;
});

const companyDetails = computed(() => [
  { id: 1, label: "Name", name: "name" },
  { id: 2, label: "Mobile Number", name: "mobileNumber" },
  { id: 3, label: "Company Name", name: "companyName" },
  { id: 4, label: "Company Address", name: "companyAddress" },
]);

const loadCompanyProfile = () => {
  if (authenticationStore?.profileDetails) {
    companyProfile.mobileNumber =
      authenticationStore?.profileDetails.mobileNumber.slice(3) || "";
    companyProfile.companyName =
      authenticationStore?.profileDetails.companyName || "";
    companyProfile.companyAddress =
      authenticationStore?.profileDetails.companyAddress || "";
    companyProfile.companySize =
      authenticationStore?.profileDetails.companySize || "";
    companyProfile.name = authenticationStore?.profileDetails.name || "";
  }
};

onMounted(() => {
  loadCompanyProfile();
});
</script>
