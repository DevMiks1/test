<template>
  <BaseDialog mWidth="400px" v-model="noteStore.isNoteModalOpen">
    <Suspense>
      <template #default>
        <BaseCard :isVisible="!!noteStore.isNoteModalOpen">
          <div class="bg-red flex items-center justify-between p-4">
            <BaseChip prependIcon="mdi-message-text" label>
              {{ "Note" }}
            </BaseChip>
            <ActionIconButton
              @action="closeNoteModal"
              icon="mdi-close"
              density="comfortable"
              size="small"
              color="red"
            />
          </div>
          <BaseContainer>
            <v-textarea
              label="Put your message here"
              variant="solo"
              bg-color="grey-lighten-2"
              auto-grow
              v-model="note"
            ></v-textarea>

            <ActionButton
              @action="handleNote"
              block
              class="bg-red"
              variant="tonal"
            >
              {{ "CONFIRM" }}
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
import { ref } from "vue";
import { useNoteStore } from "@/components/booking-request/store/index";
import { defineAsyncComponent } from "vue";

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
const ActionIconButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionIconButton.vue"),
);
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);
const BaseChip = defineAsyncComponent(
  () => import("@/shared/components/Chip/BaseChip.vue"),
);

const noteStore = useNoteStore();

const note = ref(noteStore.noteMessageDetails || "");

const closeNoteModal = () => (noteStore.isNoteModalOpen = false);

const handleNote = (): void => {
  noteStore.noteMessageDetails = note.value;
  noteStore.isNoteModalOpen = false;
};
</script>

<style scoped></style>
