<template>
  <BaseDialog v-model="tripsHistoryStore.isTripHistoryModalOpen" mWidth="400">
    <Suspense>
      <template #default>
        <BaseCard
          :isVisible="!!tripsHistoryStore.isTripHistoryModalOpen"
          class="y-axis-scrollbar bg-lightGrey"
        >
          <div
            class="bg-red-darken-3 flex items-center justify-between px-5 py-3"
          >
            <div>
              <h1 class="text-[1rem]">Request Booking</h1>
              <h5 class="text-[.7rem] opacity-80">OWTO PHILIPPINES</h5>
            </div>

            <ActionIconButton
              icon="mdi-close"
              color="red"
              @action="closeTripsDetailModal"
            >
            </ActionIconButton>
          </div>
          <BaseContainer>
            <div class="flex flex-col gap-4">
              <!-- booking id section -->
              <div
                class="flex justify-between rounded-[.5rem] border p-4 text-[.7rem]"
              >
                <p class="opacity-90">Booking ID:</p>

                <p>{{ tripsDetails.bookingId }}</p>
              </div>
              <!-- drivers profile section -->
              <div class="flex flex-col gap-5 rounded-[.5rem] border p-4">
                <p class="text-[.9rem] opacity-90">Driver's Profile</p>

                <v-row no-gutters>
                  <v-col cols="4"
                    ><v-avatar size="80">
                      <v-img
                        v-if="tripsDetails?.driverImage"
                        alt="Profile Image"
                        :src="tripsDetails?.driverImage"
                      >
                      </v-img>
                      <v-avatar color="error" size="120" rounded="0" v-else>
                        <BaseIcon icon="mdi-account-circle" size="100" />
                      </v-avatar> </v-avatar
                  ></v-col>
                  <v-col cols="8">
                    <div
                      class="flex h-full flex-col justify-end pb-5 text-[.8rem] font-[500]"
                    >
                      <p>{{ tripsDetails.driverName }}</p>
                    </div>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="4">
                    <div class="text-[.7rem] opacity-90">
                      <p class="opacity-90">Variant</p>
                      <p>Plate No.</p>
                    </div>
                  </v-col>
                  <v-col cols="8">
                    <div class="text-[.7rem] font-[500]">
                      <p class="font-[500]">{{ tripsDetails.variantName }}</p>
                      <p class="font-[500]">{{ tripsDetails.plateNumber }}</p>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <!-- trips information -->
              <div class="flex flex-col gap-3 rounded-[.5rem] border p-4">
                <h3 class="border-b-2 border-gray-300 pb-2 text-[.9rem]">
                  Trips Information
                </h3>
                <div>
                  <TripsDetail
                    v-for="tripsInformation in tripsInformations"
                    :key="tripsInformation.id"
                    :label="tripsInformation.label"
                    :value="tripsInformation.value"
                  />

                  <div class="flex">
                    <p class="w-[30%] text-[.7rem] opacity-90">Passenger's</p>
                    <div class="flex w-[70%] flex-col">
                      <p
                        v-for="passengerName in passengerNames"
                        class="font-weight-medium text-[.7rem]"
                      >
                        {{ passengerName }}
                      </p>
                    </div>
                  </div>
                  <div></div>

                  <div class="mt-2 border-t-2 border-gray-300">
                    <div class="flex justify-between pt-2">
                      <p class="text-[.7rem] opacity-90">Status</p>
                      <p
                        class="text-[.7rem] font-medium"
                        :class="{
                          'text-green-500': tripsDetails.status === 'SUCCESS',
                        }"
                      >
                        {{ tripsDetails.status }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- fare breakdown -->
              <div class="flex flex-col gap-3 rounded-[.5rem] border p-4">
                <h3 class="border-b-2 border-gray-300 pb-2 text-[.9rem]">
                  Fare Breakdown
                </h3>
                <div class="flex justify-between">
                  <p class="text-[.7rem] opacity-90">TotalFare</p>
                  <p class="font-weight-medium text-[.7rem]">
                    ₱ {{ tripsDetails.fare }}
                  </p>
                </div>
              </div>
            </div>
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
import { computed } from "vue";
import {
  useEmployeeStore,
  useTripsHistoryStore,
} from "@/components/admin-dashboard/store/index";
import Loading from "@/shared/components/Loading.vue";
import BaseDialog from "@/shared/components/Dialog/BaseDialog.vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
import BaseCard from "@/shared/components/Card/BaseCard.vue";
import ActionIconButton from "@/shared/components/Button/ActionIconButton.vue";
import type { ComputedRef } from "vue";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import TripsDetail from "@/components/admin-dashboard/shared/TripsDetail.vue";
import type { TripsHistory } from "@/service/interface/trips-history";

interface RepresentativePassenger {
  employeeId: number;
  isRepresentative: boolean;
}

interface GuestPassenger {
  employeeId: null;
  name: string;
}

const tripsHistoryStore = useTripsHistoryStore();
const employeeStore = useEmployeeStore();

const tripsDetails: ComputedRef<any | undefined> = computed(() => {
  const tripsHistory = useTripsHistoryStore();

  return tripsHistory.tripsHistory.find(
    (trip: TripsHistory) => trip.id === tripsHistory.idToView,
  );
});

const passengers = tripsDetails?.value.passengers;
const employees = employeeStore.employees;

const passengerNames = passengers.map(
  (passenger: RepresentativePassenger | GuestPassenger) => {
    const employee = employees.find((emp) => emp.id === passenger.employeeId);

    if (employee) {
      return employee.firstName;
    } else {
      return "guest";
    }
  },
);

const formattedScheduleDate: ComputedRef<string | null> = computed(() => {
  return tripsDetails.value.scheduleDate
    ? tripsHistoryStore.formatDate(tripsDetails.value.scheduleDate)
    : null;
});

const formattedBookingDate: ComputedRef<string | null> = computed(() => {
  return tripsDetails.value?.bookingDate
    ? tripsHistoryStore.formatDate(tripsDetails.value.bookingDate)
    : null;
});

const closeTripsDetailModal = (): boolean => {
  return (tripsHistoryStore.isTripHistoryModalOpen = false);
};

const tripsInformations = [
  {
    id: 1,
    label: "Pickup Address",
    value: tripsDetails.value.pickUpAddress,
  },
  {
    id: 2,
    label: "Dropoff Address",
    value: tripsDetails.value.dropOffAddress,
  },
  {
    id: 3,
    label: "Booking Date",
    value: formattedBookingDate.value,
  },
  {
    id: 4,
    label: "Schedule Date",
    value: formattedScheduleDate.value,
  },
];
</script>
