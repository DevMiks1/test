<template>
  <v-row align="center" dense>
    <v-col
      v-for="variant in estimateStore.variants"
      :key="variant.variantId"
      cols="12"
      lg="4"
      md="4"
      sm="6"
      class="px-5 pb-10"
      @click="isVariantSelectable(variant) && selectVariant(variant)"
    >
      <div
        :class="[
          { 'disabled-card': !isVariantSelectable(variant) },
          'owto-card flex justify-center',
        ]"
      >
        <VariantCard
          :estimateId="estimateStore.variantsSelected?.estimateId"
          :variantImg="
            getVariantImage(variant.matrix.variantName as VariantName)
          "
          :variantId="variant.estimateId"
          :title="variant.matrix.variantName"
          :varintPrice="variant.estimatedFare"
          :capacity="getCapacity(variant.matrix.variantName as VariantName)"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import owtoPremium from "/assets/booking/variants/owto-premium.png";
import owtoClass from "/assets/booking/variants/owto-class.jpg";
import owtoMore from "/assets/booking/variants/owto-more.png";
import VariantCard from "@/components/booking-request/shared/VariantCard.vue";
import {
  useEstimateStore,
  usePassengerNumberStore,
} from "@/components/booking-request/store/index";
import type { EstimateResponse } from "@/service/interface/booking";

const estimateStore = useEstimateStore();
const passengerNumberStore = usePassengerNumberStore();

type VariantName = "Owto Premium" | "Owto Class" | "Owto More";
type VariantImages = { [key in VariantName]: string };
type VariantCapacity = { [key in VariantName]: number };

const selectVariant = (variant: EstimateResponse) => {
  estimateStore.variantsSelected = variant;
};

const isVariantSelectable = (variant: EstimateResponse) => {
  const passengerNumberCount = passengerNumberStore.passengerNumberCount;
  const variantName = variant.matrix.variantName;

  const variantCapacity: VariantCapacity = {
    "Owto Premium": 4,
    "Owto Class": 5,
    "Owto More": 6,
  };
  return passengerNumberCount <= variantCapacity[variantName as VariantName];
};

const getVariantImage = (variantImage: VariantName): string => {
  const images: VariantImages = {
    "Owto Premium": owtoPremium,
    "Owto Class": owtoClass,
    "Owto More": owtoMore,
  };

  return images[variantImage] || "";
};

const getCapacity = (variantName: VariantName): string => {
  const capacities: { [key in VariantName]: string } = {
    "Owto Premium": "4 Capacity",
    "Owto Class": "5 Capacity",
    "Owto More": "6 Capacity",
  };
  return capacities[variantName] || "";
};
</script>

<style scoped>
.disabled-card {
  pointer-events: none;
  opacity: 0.6;
}
</style>
