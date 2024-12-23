,<
<template>
  <BaseDialog mWidth="450px" v-model="locationStore.isLocationModalOpen">
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!locationStore.isLocationModalOpen"
          class="y-axis-scrollbar"
        >
          <div class="bg-red-lighten-1 flex items-center justify-between p-4">
            <BaseChip prependIcon="mdi-map-marker" label>
              {{ "Select Your Location" }}
            </BaseChip>
            <ActionIconButton
              @click="closeLocationModal"
              class="text-red bg-white"
              size="small"
              density="comfortable"
              variant="tonal"
              icon="mdi-close"
            />
          </div>
          <BaseContainer>
            <PickupLocation />

            <DropoffLocation />
            <ActionButton
              class="bg-red"
              variant="tonal"
              block
              @action="handleLocations"
            >
              {{ "Confirm" }}
            </ActionButton>
          </BaseContainer>
        </BaseCard>
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </BaseDialog>
</template>

<script setup lang="ts">
import PickupLocation from "./PickupLocation.vue";
import DropoffLocation from "./DropoffLocation.vue";
import { useLocationStore } from "@/components/booking-request/store/index";
import { snackbarInstance } from "@/composables/useSnackbar";
import { defineAsyncComponent } from "vue";

const Loading = defineAsyncComponent(
  () => import("@/shared/components/Loading.vue"),
);
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

const locationStore = useLocationStore();
const { showSnackbar } = snackbarInstance;

const closeLocationModal = (): boolean =>
  (locationStore.isLocationModalOpen = false);

const handleLocations = () => {
  if (
    !locationStore.queryPickupLocation ||
    !locationStore.queryDropoffLocation
  ) {
    showSnackbar("warning", "Choose Desire Location");
    return;
  }

  locationStore.pickupLocationDetails = locationStore.queryPickupLocation;
  locationStore.dropoffLocationDetails = locationStore.queryDropoffLocation;

  locationStore.isLocationModalOpen = false;
};
</script>
