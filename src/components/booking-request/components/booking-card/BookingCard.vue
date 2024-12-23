<template>
  <div>
    <div
      class="booking-card absolute z-50 ml-3 mt-2 flex w-[29rem] flex-col text-white sm:ml-10 sm:max-h-[500px]"
    >
      <BookingController />
      <div
        v-show="isRequestBookingBodyVisible"
        class="bg-grey-darken-3 overflow-y-auto rounded-bl-[.5rem] rounded-br-[.5rem]"
      >
        <BaseContainer>
          <BookingSteps />

          <BookingAction />
        </BaseContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import { provide, ref } from "vue";
import BookingController from "./controller/BookingController.vue";
import BookingSteps from "./steps/BookingSteps.vue";
import BookingAction from "./action/BookingAction.vue";

const isRequestBookingBodyVisible = ref(true);

const updateRequestBookingBodyVisible = (toggleModal: boolean): boolean => {
  return (isRequestBookingBodyVisible.value = toggleModal);
};

provide("isRequestBookingBodyVisible", isRequestBookingBodyVisible);
provide("updateRequestBookingBodyVisible", updateRequestBookingBodyVisible);
</script>

<style scoped>
@media (max-width: 370px) and (min-width: 335px) {
  .booking-card {
    width: 20rem;
  }
}

@media (max-width: 334px) and (min-width: 300px) {
  .booking-card {
    width: 18rem;
  }
}
</style>
