<template>
  <div class="mb-5">
    <div class="mb-3">
      <BaseCard :isVisible="true">
        <p class="text-wrap p-2 text-[.75rem]">
          Note: Please complete all the steps for a successful booking schedule.
          Note that changing the number of passengers may require you to clear
          the booking.
        </p>
      </BaseCard>
    </div>

    <div class="flex">
      <PassengerNumberSteps />
      <RepresentativePassengerSteps />
      <LocationSteps />
      <EstimateSteps />
      <ScheduleSteps />
      <PassengerSteps />
      <NoteSteps />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/shared/components/Card/BaseCard.vue";
import PassengerNumberSteps from "./passenger-number/PassengerNumber.vue";
import RepresentativePassengerSteps from "./representative-passenger/RepresentativePassenger.vue";
import LocationSteps from "./location/Location.vue";
import ScheduleSteps from "./schedule/Schedule.vue";
import PassengerSteps from "./passenger/Passenger.vue";
import NoteSteps from "./note/Note.vue";
import EstimateSteps from "./estimate/SelectVariantModal.vue";
</script>
