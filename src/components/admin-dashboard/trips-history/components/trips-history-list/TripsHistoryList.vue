<template>
  <div>
    <div v-if="props.isLoading">
      <div class="fixed inset-0 z-50 bg-white">
        <ProgressbarLoading />
      </div>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :search="tripsHistoryStore.search"
        :items="tripsHistoryList"
        items-per-page="5"
      >
        <!-- header -->
        <template
          v-for="header in headers"
          v-slot:[`header.${header.value}`]="{ column }"
        >
          <p class="text-no-wrap text-[.850rem] font-[500] uppercase">
            {{ column.title }}
          </p>
        </template>

        <!-- item -->
        <template v-slot:[`item.bookingId`]="{ item }">
          <p class="text-nowrap">
            {{ item.bookingId }}
          </p>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <BaseChip label :color="item.status === 'Success' ? 'green' : 'red'">
            <p class="text-nowrap">
              {{ item.status }}
            </p>
          </BaseChip>
        </template>
        <template v-slot:[`item.driverName`]="{ item }">
          <p class="text-nowrap">
            {{ item.driverName }}
          </p>
        </template>
        <template v-slot:[`item.bookingDate`]="{ item }">
          <p class="text-nowrap text-[.875rem]">
            {{ item.bookingDate }}
          </p>
        </template>
        <template v-slot:[`item.scheduleDate`]="{ item }">
          <p class="text-nowrap text-[.875rem]">
            {{ item.scheduleDate }}
          </p>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <ActionButton
            class="bg-blue-lighten-4 text-blue-darken-2"
            variant="flat"
            @action="openTrisDetailModal({ id: item.id })"
          >
            <BaseIcon icon="mdi-eye" />
          </ActionButton>
        </template>
      </v-data-table>
    </div>
  </div>

  <TripsDetailModal v-if="tripsHistoryStore.isTripHistoryModalOpen" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useTripsHistoryStore } from "@/components/admin-dashboard/store";
import BaseChip from "@/shared/components/Chip/BaseChip.vue";
import ActionButton from "@/shared/components/Button/ActionButton.vue";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";

const TripsDetailModal = defineAsyncComponent(
  () => import("./TripsDetailModal.vue"),
);

const props = defineProps({
  isLoading: Boolean,
});

const tripsHistoryStore = useTripsHistoryStore();

const tripsHistoryList = computed(() => {
  return tripsHistoryStore.tripsHistoryList.map((trip: any) => trip).reverse();
});

const openTrisDetailModal = ({ id }: { id: number }): void => {
  tripsHistoryStore.idToView = id;
  tripsHistoryStore.isTripHistoryModalOpen = true;
};

const headers = [
  { title: "Booking id", value: "bookingId" },
  { title: "Trip Status", value: "status" },
  { title: "Driver Name", value: "driverName" },
  { title: "Booking Date", value: "bookingDate" },
  { title: "Schedule Date", value: "scheduleDate" },
  { title: "Actions", value: "actions" },
];
</script>
