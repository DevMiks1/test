<template>
  <div class="mt-5" v-if="noteMessageDetails">
    <v-card-text class="text-break px-0 py-0">
      {{ truncateText(noteMessageDetails, 120) }}
    </v-card-text>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { truncateText } from "@/utility/truncate";
import { useNoteStore } from "@/components/booking-request/store/index";

const noteStore = useNoteStore();

const { noteMessageDetails } = storeToRefs(noteStore);
</script>
