<template>
  <div>
    <div>
      <div>
        <div class="bg-red p-4">
          <BaseSearch
            prependInnerIcon="mdi-magnify"
            label="Search"
            density="compact"
            v-model="searchQuery"
          />
        </div>
        <v-toolbar class="bg-dark px-5">
          <h2 class="text-[1.1rem] font-[500]">List of Trips</h2>
        </v-toolbar>
      </div>

      <TripsHistoryList :isLoading="isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { tripsHistoryData } from "@/service/json/dummy-content";
import {
  useEmployeeStore,
  useTripsHistoryStore,
} from "@/components/admin-dashboard/store/index";
import BaseSearch from "@/shared/components/Search/BaseSearch.vue";
import { debounce } from "lodash";
import TripsHistoryList from "./trips-history-list/TripsHistoryList.vue";
import { retrieveAllTripsHistory } from "@/service/api/trips-history";

const tripsHistoryStore = useTripsHistoryStore();
const employeeStore = useEmployeeStore();

const isLoading = ref(false);

const searchQuery = computed({
  get: () => tripsHistoryStore.search,
  set: debounce((newQuery) => {
    tripsHistoryStore.search = newQuery;
  }, 300),
});

onMounted(() => {
  const fetchTripsHistory = async (): Promise<void> => {
    try {
      isLoading.value = true;

      const response = await retrieveAllTripsHistory();

      tripsHistoryStore.tripsHistory = response;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  fetchTripsHistory();
  employeeStore.fetchEmployees();
});
</script>
