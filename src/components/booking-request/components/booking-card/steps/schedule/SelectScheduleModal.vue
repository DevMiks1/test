<template>
  <BaseDialog mWidth="400px" v-model="scheduleStore.isScheduleModalOpen">
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!scheduleStore.isScheduleModalOpen"
          class="bg-grey-darken-3 y-axis-scrollbar"
        >
          <div class="py-3">
            <!-- reminder card -->
            <div class="mb-5 px-5">
              <BaseCard
                :isVisible="!!isScheduleReminderCardOpen"
                class="bg-red"
              >
                <BaseContainer>
                  <div class="flex justify-between">
                    <BaseChip size="small" label class="text-uppercase">{{
                      "reminder"
                    }}</BaseChip>
                    <ActionIconButton
                      icon="mdi-close"
                      size="small"
                      color="red"
                      density="comfortable"
                      @action="closeReminderCard"
                    />
                  </div>
                  <p class="mt-5 text-wrap text-[.9rem] opacity-80">
                    We remind our corporate clients to select a time at least 3
                    hours from the current time.
                  </p>
                </BaseContainer>
              </BaseCard>
            </div>

            <div>
              <!-- date picker -->
              <div class="date-picker mx-auto w-full px-5">
                <v-date-picker
                  v-model="scheduleStore.date"
                  color="red"
                  class="w-100"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </div>

              <!-- time picker -->
              <div class="px-5">
                <v-text-field
                  class="mt-5"
                  variant="solo-filled"
                  v-model="scheduleStore.time"
                  label="Select Time"
                  type="time"
                  suffix="GMT"
                ></v-text-field>
              </div>
            </div>
            <div class="m-4">
              <ActionButton
                class="bg-red"
                variant="tonal"
                @action="handleSchedule"
                block
              >
                {{ "Confirm" }}
              </ActionButton>
            </div>
          </div>
        </BaseCard>
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </BaseDialog>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { useScheduleStore } from "@/components/booking-request/store/index";
import { snackbarInstance } from "@/composables/useSnackbar";

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

const scheduleStore = useScheduleStore();

const { showSnackbar } = snackbarInstance;

const isScheduleReminderCardOpen = ref(true);

const closeReminderCard = () => {
  isScheduleReminderCardOpen.value = false;
};

const handleSchedule = () => {
  if (!scheduleStore.date || !scheduleStore.time) {
    showSnackbar("warning", "Please select a date and time");
    return;
  }

  const selectedDate: Date = new Date(scheduleStore.date);
  const [selectedHour, selectedMinute]: number[] = scheduleStore.time
    .split(":")
    .map(Number);

  selectedDate.setHours(selectedHour);
  selectedDate.setMinutes(selectedMinute);

  const currentTime: Date = new Date();
  const minTime: Date = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours from now
  // @this will need later
  // if (selectedDate < minTime) {
  //   showSnackbar(
  //     "warning",
  //     "Please select a time that is at least 3 hours from the current time.",
  //   );

  //   return;
  // }

  scheduleStore.scheduleDetails = selectedDate.toISOString();

  scheduleStore.isScheduleModalOpen = false;
};
</script>

<style scoped>
@media (max-width: 375px) and (min-width: 350px) {
  .date-picker {
    padding: 0 0.5rem;
  }
}
</style>
