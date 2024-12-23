<template>
  <div>
    <v-card-title class="text-red-darken-2 text-h5 px-0 pb-5"
      >Recent Request Booking</v-card-title
    >

    <v-row>
      <v-col cols="12" md="6">
        <div class="y-axis-scrollbar max-h-[28rem] overflow-y-auto px-2">
          <div class="mb-3 w-full rounded-lg bg-white pb-5">
            <v-container>
              <div
                class="flex flex-col pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5"
              >
                <p
                  class="text-no-wrap px-0 text-[.800rem] font-[400] sm:text-[1rem]"
                >
                  BOOKING_ID 06754B2S1SD
                </p>

                <p class="text-[.800rem] font-[400] sm:text-[1rem]">
                  July 24, 2024 - 10:26am
                </p>
              </div>
              <div class="max-w-[180px]">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                      Passenger
                    </v-expansion-panel-title>
                    <v-expansion-panel-text
                      v-for="passenger in passengers"
                      :key="passenger.name"
                      >{{ passenger.name }}</v-expansion-panel-text
                    >
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-container>
          </div>

          <div class="mb-3 w-full rounded-lg bg-white pb-5">
            <v-container>
              <div
                class="flex flex-col pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5"
              >
                <p
                  class="text-no-wrap px-0 text-[.800rem] font-[400] sm:text-[1rem]"
                >
                  BOOKING_ID 06754B2S1SD
                </p>

                <p class="text-[.800rem] font-[400] sm:text-[1rem]">
                  July 24, 2024 - 10:26am
                </p>
              </div>
              <div class="max-w-[180px]">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                      Passenger
                    </v-expansion-panel-title>
                    <v-expansion-panel-text
                      v-for="passenger in passengers"
                      :key="passenger.name"
                      >{{ passenger.name }}</v-expansion-panel-text
                    >
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-container>
          </div>
          <div class="mb-3 w-full rounded-lg bg-white pb-5">
            <v-container>
              <div
                class="flex flex-col pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5"
              >
                <p
                  class="text-no-wrap px-0 text-[.800rem] font-[400] sm:text-[1rem]"
                >
                  BOOKING_ID 06754B2S1SD
                </p>

                <p class="text-[.800rem] font-[400] sm:text-[1rem]">
                  July 24, 2024 - 10:26am
                </p>
              </div>
              <div class="max-w-[180px]">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                      Passenger
                    </v-expansion-panel-title>
                    <v-expansion-panel-text
                      v-for="passenger in passengers"
                      :key="passenger.name"
                      >{{ passenger.name }}</v-expansion-panel-text
                    >
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-container>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="mx-2 rounded-lg bg-white px-3 py-3">
          <!-- <PieChart :resultSet="resultSet" title="Accounts Status" /> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import PieChart from "@/components/Dashboard/Dashboard/components/e-chart/PieChart.vue";

const passengers = ref([{ name: "Mike" }, { name: "karl" }, { name: "Jerry" }]);
// @todo: I will comment this out because it causes an error.
// const resultSet = ref({
//   rawData: () => [
//     { name: "Verified", value: 10 },
//     { name: "Non-Verified", value: 5 },
//   ],
// });
</script>

<style scoped></style>
