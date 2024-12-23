<template>
  <BaseDialog
    mWidth="350px"
    mHeight="600px"
    v-model="passengerNumberStore.isPassengerNumberModalOpen"
  >
    <BaseCard :isVisible="!!passengerNumberStore.isPassengerNumberModalOpen">
      <div class="bg-red-lighten-1 flex items-center justify-between p-4">
        <BaseChip prependIcon="mdi-car" label>
          {{ "No. of Passenger" }}
        </BaseChip>
        <ActionIconButton
          @action="closePassengerNumberModal"
          size="small"
          class="text-red bg-white"
          icon="mdi-close"
          density="comfortable"
          variant="flat"
        />
      </div>
      <BaseContainer>
        <v-radio-group v-model="passengerNumberStore.passengerNumberSelected">
          <v-radio
            v-for="passengerNumber in passengerNumbers"
            :key="passengerNumber"
            :label="passengerNumber"
            :value="passengerNumber"
            :class="[
              passengerNumberStore.passengerNumberSelected === passengerNumber
                ? 'border-opacity-100'
                : 'border-opacity-25',
              'border-md border-red my-1 rounded-md',
            ]"
          ></v-radio>
        </v-radio-group>

        <ActionButton
          class="bg-red"
          :block="true"
          @action="handlePassengerNumberCount"
        >
          {{ "Confirm" }}
        </ActionButton>
      </BaseContainer>
    </BaseCard>
  </BaseDialog>
</template>

<script setup lang="ts">
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
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);
const BaseChip = defineAsyncComponent(
  () => import("@/shared/components/Chip/BaseChip.vue"),
);

import { usePassengerNumberStore } from "@/components/booking-request/store/index";
import { passengerNumbers } from "@/service/json/Booking/passengerNumber";
import { snackbarInstance } from "@/composables/useSnackbar";
import { defineAsyncComponent } from "vue";

const { showSnackbar } = snackbarInstance;

const passengerNumberStore = usePassengerNumberStore();

const closePassengerNumberModal = () =>
  (passengerNumberStore.isPassengerNumberModalOpen = false);

const handlePassengerNumberCount = (): void => {
  if (!passengerNumberStore.passengerNumberSelected) {
    showSnackbar("warning", "Please select No. of Passenger");
    return;
  }

  passengerNumberStore.passengerNumberCount = Number(
    passengerNumberStore.passengerNumberSelected,
  );

  passengerNumberStore.isPassengerNumberModalOpen = false;
};
</script>

<style></style>
