<template>
  <DetailsList title="Variant" :detailsExist="!!variantDetails">
    {{ variantDetails }}
  </DetailsList>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import DetailsList from "@/components/booking-request/shared/DetailsList.vue";
import { useEstimateStore } from "@/components/booking-request/store/index";

const estimateStore = useEstimateStore();

const { variantDetails } = storeToRefs(estimateStore);
</script>

<style scoped></style>
