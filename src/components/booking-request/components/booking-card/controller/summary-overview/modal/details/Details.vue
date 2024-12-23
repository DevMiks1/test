<template>
  <div>
    <div class="mb-5 flex gap-5">
      <BaseChip class="font-weight-bold text-uppercase" color="red" label>
        {{ "Details" }}
      </BaseChip>
      <BaseChip class="font-weight-bold text-uppercase" color="red" label>
        {{ " owto philippines" }}
      </BaseChip>
    </div>
    <div class="pb-[.5rem]">
      <PassengerNumber />
    </div>
    <div class="pb-[.5rem]">
      <Estimate />
    </div>
    <div class="pb-[.5rem]">
      <Passenger />
    </div>
    <div class="pb-[.5rem]">
      <Schedule />
    </div>
    <Location />
    <div class="mb-5 mt-5 flex gap-5" v-if="noteStore.noteMessageDetails">
      <BaseChip class="font-weight-bold text-uppercase" color="red" label>
        {{ "message" }}
      </BaseChip>
    </div>
    <Note />
  </div>
</template>

<script setup lang="ts">
import BaseChip from "@/shared/components/Chip/BaseChip.vue";
import { useNoteStore } from "@/components/booking-request/store/index";
import PassengerNumber from "./PassengerNumber.vue";
import Estimate from "./Estimate.vue";
import Passenger from "./Passenger/Passenger.vue";
import Schedule from "./Schedule.vue";
import Location from "./Location.vue";
import Note from "./Note.vue";

const noteStore = useNoteStore();
</script>

<style></style>
