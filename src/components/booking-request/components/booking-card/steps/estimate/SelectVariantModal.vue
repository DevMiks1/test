<template>
  <BaseDialog v-model="estimateStore.isVariantModalOpen" :persistent="true">
    <Suspense>
      <template #default>
        <BaseCard
          class="card y-axis-scrollbar mx-auto"
          :isVisible="isCardVisible"
        >
          <div class="bg-red-lighten-1 p-4">
            <BaseChip prependIcon="mdi-car" label>
              {{ "Select Variant" }}
            </BaseChip>
          </div>

          <BaseContainer class="mt-10">
            <VariantCard />
            <ActionButton
              @action="handleVariant"
              class="bg-red"
              variant="tonal"
              block
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
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import type {
  EstimateResponse,
  EstimateParams,
} from "@/service/interface/booking";
import { retrieveAllEstimate } from "@/service/api/booking";
import { snackbarInstance } from "@/composables/useSnackbar";
import VariantCard from "./VariantCard.vue";
import {
  useEstimateStore,
  usePassengerNumberStore,
  useRepresentativePassengerStore,
  useLocationStore,
} from "@/components/booking-request/store/index";

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
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);
const BaseChip = defineAsyncComponent(
  () => import("@/shared/components/Chip/BaseChip.vue"),
);

const estimateStore = useEstimateStore();
const passengerNumberStore = usePassengerNumberStore();
const representativePassengerStore = useRepresentativePassengerStore();
const locationStore = useLocationStore();

const { showSnackbar } = snackbarInstance;

const { passengerNumberCount } = storeToRefs(passengerNumberStore);

const {
  pickupLocationDetails,
  dropoffLocationDetails,
  pickupCoordinates,
  dropoffCoordinates,
} = storeToRefs(locationStore);

const isLoading = ref(false);

const isCardVisible = computed(() => {
  return (
    !!passengerNumberCount.value &&
    !!representativePassengerStore.representativeDetails?.riderId &&
    !!representativePassengerStore.representativePassenger?.employeeId &&
    !!pickupLocationDetails.value &&
    !!dropoffLocationDetails.value &&
    !!pickupCoordinates.value &&
    !!dropoffCoordinates.value
  );
});

const getEstimate = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const pickupCoords = pickupCoordinates.value
      ? [pickupCoordinates.value[1], pickupCoordinates.value[0]]
      : undefined;

    const dropOffCoords = dropoffCoordinates.value
      ? [dropoffCoordinates.value[1], dropoffCoordinates.value[0]]
      : undefined;

    const riderId = representativePassengerStore.representativeDetails?.riderId
      ? representativePassengerStore.representativeDetails?.riderId
      : null;
    const employeeId = representativePassengerStore.representativePassenger
      ?.employeeId
      ? representativePassengerStore.representativePassenger?.employeeId
      : null;

    const param: EstimateParams = {
      seatCount: passengerNumberCount.value,
      riderId: riderId,
      employeeId: employeeId,

      pickUpAddress: pickupLocationDetails.value,
      dropOffAddress: dropoffLocationDetails.value,
      pickUpPoint: pickupCoords?.join(","),
      dropOffPoint: dropOffCoords?.join(","),
    };

    const response: EstimateResponse[] = await retrieveAllEstimate({
      param,
    });
    estimateStore.variants = response;
    estimateStore.isVariantModalOpen = true;
  } catch (error) {
    showSnackbar("error", `Error fetching estimate ${error}`);
  } finally {
    isLoading.value = false;
  }
};

const handleVariant = () => {
  if (!estimateStore.variantsSelected) {
    showSnackbar("warning", "Choose Variant");
    return;
  }

  estimateStore.variantDetails =
    estimateStore.variantsSelected?.matrix.variantName;
  estimateStore.variantId = estimateStore.variantsSelected?.estimateId;
  estimateStore.isVariantModalOpen = false;
};

watch(
  [
    () => passengerNumberCount.value,
    () => representativePassengerStore.representativeDetails?.riderId,
    () => representativePassengerStore.representativePassenger?.employeeId,
    () => pickupLocationDetails.value,
    () => dropoffLocationDetails.value,
    () => pickupCoordinates.value,
    () => dropoffCoordinates.value,
  ],
  (newValues) => {
    if (newValues.every((value) => !!value)) {
      getEstimate();
    }
  },

  { immediate: true },
);
</script>

<style scoped>
.card {
  max-width: "1200px";
  height: "700px";
}
@media (max-width: 350px) and (min-width: 300px) {
  .card {
    width: 18rem;
    margin-inline: auto;
  }
}
</style>
