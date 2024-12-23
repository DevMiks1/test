<template>
  <BaseDialog
    v-model="props.isSummaryOverviewModalOpen"
    mWidth="400"
    persistent
  >
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!passengerNumberStore.passengerNumberCount"
          class="y-axis-scrollbar"
        >
          <div
            class="bg-red-darken-3 flex items-center justify-between px-5 py-3"
          >
            <div>
              <h2 class="text-[1.2rem]">Summary Overview</h2>

              <p class="opacity-80">OWTOSKED</p>
            </div>
            <ActionIconButton
              @action="closeSummaryOverviewModal"
              icon="mdi-close"
              color="red"
            >
            </ActionIconButton>
          </div>
          <BaseContainer>
            <Details />
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
import { defineAsyncComponent, inject } from "vue";
import Loading from "@/shared/components/Loading.vue";
import BaseDialog from "@/shared/components/Dialog/BaseDialog.vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
import BaseCard from "@/shared/components/Card/BaseCard.vue";
import { usePassengerNumberStore } from "@/components/booking-request/store/index";
import ActionIconButton from "@/shared/components/Button/ActionIconButton.vue";

const props = defineProps<{
  isSummaryOverviewModalOpen: boolean;
}>();

const emit = defineEmits(["updateSummaryOverviewModal"]);

const Details = defineAsyncComponent(() => import("./details/Details.vue"));

const passengerNumberStore = usePassengerNumberStore();

const closeSummaryOverviewModal = () => {
  emit("updateSummaryOverviewModal", false);
};
</script>

<style></style>
