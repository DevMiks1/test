<template>
  <div class="mb-10 rounded-lg pb-5 md:px-5">
    <v-row class="">
      <v-col cols="12" md="12" lg="6">
        <v-row>
          <v-col cols="12" md="6" class="px-0">
            <div class="rounded-bl-lg rounded-tl-lg bg-white md:h-[425px]">
              <h2 class="py-5 pl-3 text-[2rem]">
                Transactions<span class="block">Consume</span>
              </h2>

              <v-card-title>₱ 54,000.00</v-card-title>
              <v-card-text
                >Amount consumed for the transaction booking, including all
                related fees and charges but excluding taxes.</v-card-text
              >
            </div>
          </v-col>
          <v-col cols="12" md="6" class="px-0">
            <div
              class="border-left rounded-br-lg rounded-tr-lg bg-white py-10 md:h-[425px]"
            >
              <v-card-subtitle class="text-uppercase text-body"
                >total transactions</v-card-subtitle
              >
              <v-card-text class="py-2">20</v-card-text>

              <v-card-subtitle class="text-uppercase text-body pt-3"
                >successful trips</v-card-subtitle
              >
              <v-card-text class="py-2">10</v-card-text>

              <v-card-subtitle class="text-uppercase text-body pt-3"
                >ongoing trips</v-card-subtitle
              >
              <v-card-text class="py-2">3</v-card-text>

              <v-card-subtitle class="text-uppercase text-body pt-3"
                >cancel trips</v-card-subtitle
              >
              <v-card-text class="py-2">3</v-card-text>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="12" lg="6" class="px-0">
        <div class="rounded-lg bg-white px-2 py-3 md:mx-2">
          <!-- <BarChart :monthlyReport="monthlyReport" /> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import BarChart from "@/components/Dashboard/Dashboard/components/e-chart/Barchart.vue";
// @todo: I will comment this out because it causes an error.
// const monthlyReport = ref({
//   rawData: () => [
//     { name: "Data", value: 10000 },
//     { name: "Data", value: 8000 },
//     { name: "Data", value: 2000 },
//     { name: "Data", value: 4000 },
//     { name: "Data", value: 8000 },
//     { name: "Data", value: 19000 },
//     { name: "Data", value: 12000 },
//     { name: "Data", value: 15000 },
//     { name: "Data", value: 20000 },
//     { name: "Data", value: 6000 },
//     { name: "Data", value: 7000 },
//     { name: "Data", value: 8000 },
//   ],
// });
</script>

<style scoped>
.border-left {
  border-left: 1px solid #1f0c0c14;
}
</style>
