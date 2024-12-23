<template>
  <ActionIconButton
    :icon="isRequestBookingBodyVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'"
    @action="
      updateRequestBookingBodyVisible
        ? updateRequestBookingBodyVisible(!isRequestBookingBodyVisible)
        : ''
    "
    color="red"
    size="small"
    density="comfortable"
    variant="flat"
  />
</template>

<script setup lang="ts">
import { inject } from "vue";
import ActionIconButton from "@/shared/components/Button/ActionIconButton.vue";

const isRequestBookingBodyVisible = inject("isRequestBookingBodyVisible");
const updateRequestBookingBodyVisible = inject<(toggleModal: boolean) => void>(
  "updateRequestBookingBodyVisible",
);
</script>
