<template>
  <NavigationButton
    iconWhenIsCompleted="mdi-check"
    iconWhenIsNotCompleted="mdi-message-text"
    :isActive="true"
    :isCompleted="!!noteStore.noteMessageDetails"
    :isLastStep="true"
    label="Note"
    @click="openMessageModal"
  />
  <MessageModal v-if="noteStore.isNoteModalOpen" />
</template>

<script setup lang="ts">
import NavigationButton from "@/components/booking-request/shared/NavigationButton.vue";
import { useNoteStore } from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

const MessageModal = defineAsyncComponent(() => import("./MessageModal.vue"));

const noteStore = useNoteStore();

const openMessageModal = () => {
  noteStore.isNoteModalOpen = true;
};
</script>
