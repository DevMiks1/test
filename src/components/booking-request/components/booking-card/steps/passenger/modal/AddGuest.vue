<template>
  <BaseDialog
    v-model="guestPassengerStore.isGuestPassengerModalOpen"
    mWidth="500px"
    persistent
  >
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!guestPassengerStore.isGuestPassengerModalOpen"
          class="y-axis-scrollbar bg-lightGrey"
        >
          <div class="bg-red-darken-4 flex items-center justify-between p-4">
            <BaseChip label prependIcon="mdi-account-outline">
              {{ "Guest Passenger" }}
            </BaseChip>
            <ActionIconButton
              size="small"
              color="red"
              variant="flat"
              icon="mdi-close"
              @action="closeGuestPassengerModal"
            />
          </div>
          <BaseContainer>
            <!-- guest card reminder -->
            <BaseCard :isVisible="!!guestPassengerReminder">
              <div class="p-2">
                <div class="pb-2 text-right">
                  <ActionIconButton
                    icon="mdi-close"
                    size="small"
                    color="red"
                    density="comfortable"
                    @action="closeGuestReminderCard"
                  />
                </div>
                <p class="text-wrap text-[.9rem] opacity-80">
                  The guest name is optional, but if left empty when adding, it
                  will display 'Guest' by default.
                </p>
              </div>
            </BaseCard>

            <div class="flex gap-5 py-5">
              <BaseInput
                v-model="guestPassengerName"
                label="Guest name (Optional)"
              />

              <div class="mt-[.5rem]">
                <ActionButton
                  class="bg-red"
                  variant="tonal"
                  @action="addingGuestPassengerList"
                >
                  <BaseIcon icon="mdi-plus" />
                  <p>Add</p>
                </ActionButton>
              </div>
            </div>

            <!-- guest list -->
            <div class="x-axis-scrollbar mb-10 max-w-[450px] overflow-x-auto">
              <div
                v-if="guestPassengerStore.guestPassengerList.length === 0"
                class="text-center text-[1.5rem] font-[500]"
              >
                {{ "There are no guest passenger" }}
              </div>

              <div class="flex w-fit gap-3 text-nowrap pb-3" v-else>
                <div
                  v-for="(
                    guest, index
                  ) in guestPassengerStore.guestPassengerList"
                  :key="index"
                  class="flex flex-col items-center justify-center"
                >
                  <div class="relative">
                    <v-avatar color="red" size="50">
                      <v-icon icon="mdi-account-circle" size="40"></v-icon>
                    </v-avatar>

                    <div class="absolute right-[-5px] top-[-3px]">
                      <ActionIconButton
                        @action="removeGuestPassengerList(index)"
                        class="bg-red cursor-pointer p-4"
                        density="compact"
                        icon="mdi-close"
                      />
                    </div>
                  </div>

                  <p class="text-[.9rem] font-bold">
                    {{ guest.name ? guest.name : "Guest" }}
                  </p>
                </div>
              </div>
            </div>
            <ActionButton
              block
              class="bg-red"
              variant="tonal"
              @action="handleGuestPassenger"
            >
              {{ "Confirm" }}
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
import {
  useGuestPassengerStore,
  usePassengerNumberStore,
  usePassengerStore,
} from "@/components/booking-request/store/index";
import type { Guest } from "@/service/interface/booking";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { snackbarInstance } from "@/composables/useSnackbar";
import { defineAsyncComponent } from "vue";

const Loading = defineAsyncComponent(
  () => import("@/shared/components/Loading.vue"),
);
const BaseDialog = defineAsyncComponent(
  () => import("@/shared/components/Dialog/BaseDialog.vue"),
);
const BaseInput = defineAsyncComponent(
  () => import("@/shared/components/Input/BaseInput.vue"),
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

const { showSnackbar } = snackbarInstance;

const guestPassengerStore = useGuestPassengerStore();
const passengerNumberStore = usePassengerNumberStore();
const passengerStore = usePassengerStore();

const guestPassengerName = ref("");
const guestPassengerReminder = ref(true);

const closeGuestReminderCard = (): boolean =>
  (guestPassengerReminder.value = false);

const closeGuestPassengerModal = () => {
  guestPassengerStore.isGuestPassengerModalOpen = false;
  guestPassengerStore.guestPassengerList = [];
};

const addingGuestPassengerList = (): void => {
  const newGuestPassenger: Guest = {
    name: guestPassengerName.value,
    employeeId: null,
  };

  guestPassengerStore.guestPassengerList.push(newGuestPassenger);

  guestPassengerName.value = "";
};

const removeGuestPassengerList = (index: number): void => {
  guestPassengerStore.guestPassengerList.splice(index, 1);
};

const handleGuestPassenger = () => {
  if (
    Number(passengerNumberStore.passengerNumberCount) !==
    passengerStore.totalPassenger.length
  ) {
    showSnackbar(
      "warning",
      `You have selected ${passengerStore.totalPassenger.length} passengers, which does not match to ${passengerNumberStore.passengerNumberCount} passengers.`,
    );
    return;
  }

  guestPassengerStore.guestPassenger = guestPassengerStore.guestPassengerList;

  guestPassengerStore.isGuestPassengerModalOpen = false;
};
</script>

<style scoped></style>
