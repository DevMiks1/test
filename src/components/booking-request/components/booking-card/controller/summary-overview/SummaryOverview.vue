<template>
  <div>
    <ActionIconButton
      @action="updateSummaryOverviewModal(true)"
      icon="mdi-eye"
      color="red"
      size="small"
      density="comfortable"
      variant="flat"
    />

    <Modal
      v-if="isSummaryOverviewModalOpen"
      :isSummaryOverviewModalOpen="isSummaryOverviewModalOpen"
      @updateSummaryOverviewModal="updateSummaryOverviewModal"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject, ref } from "vue";
import { usePassengerNumberStore } from "@/components/booking-request/store/index";
import ActionIconButton from "@/shared/components/Button/ActionIconButton.vue";

const Modal = defineAsyncComponent(() => import("./modal/Modal.vue"));

const isSummaryOverviewModalOpen = ref(false);

const passengerNumberStore = usePassengerNumberStore();

const updateSummaryOverviewModal = (isModalOpen: boolean) => {
  isSummaryOverviewModalOpen.value = isModalOpen;
};
</script>

<style></style>
