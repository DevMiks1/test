<template>
  <div>
    <div class="flex gap-2">
      <v-text-field
        id="dropoff"
        color="red"
        density="compact"
        label="Drofoff Location"
        variant="outlined"
        v-model="searchQuery"
        placeholder="Enter drop-off location"
        ><template v-slot:prepend-inner>
          <BaseIcon icon="mdi-map-marker" color="red" /> </template
      ></v-text-field>
      <ActionButton class="bg-red" variant="tonal" @click="startPinOnMap">
        <BaseIcon icon="mdi-map-marker" />
        {{ "PIN" }}
      </ActionButton>
    </div>
    <div
      v-if="dropoffSuggestion.length"
      class="y-axis-scrollbar mb-5 h-[200px] overflow-auto bg-white"
    >
      <ul>
        <li
          v-for="suggestion in dropoffSuggestion"
          class="m-4 cursor-pointer rounded-lg border-2 p-4 transition-all duration-100 ease-in hover:border-red-500"
          :key="suggestion.id"
          @click="selectDropoffSuggestion(suggestion)"
        >
          <div class="flex items-center gap-3">
            <BaseIcon class="text-red-darken-2">{{
              "mdi-map-marker"
            }}</BaseIcon>
            <div>
              <p>{{ suggestion.label }}</p>
              <p>{{ suggestion.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, type Ref } from "vue";
import { debounce } from "lodash";
import type { SearchResponse } from "@/service/interface/location";
import { useLocationStore } from "@/components/booking-request/store/index";
import { searchLocation } from "@/service/api/location";

const BaseIcon = defineAsyncComponent(
  () => import("@/shared/components/Icon/BaseIcon.vue"),
);
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);

const locationStore = useLocationStore();

const dropoffSuggestion: Ref<SearchResponse[]> = ref([]);

const emptyDropoffSuggestion = () => {
  dropoffSuggestion.value = [];
};

const displayDropoffSuggestion = async (newQuery: string) => {
  try {
    const response: SearchResponse[] = await searchLocation({
      newQuery,
    });

    dropoffSuggestion.value = response;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

const searchQuery = computed({
  get: () => locationStore.queryDropoffLocation,
  set: debounce((newQuery) => {
    locationStore.queryDropoffLocation = newQuery;

    if (newQuery.length > 0) {
      displayDropoffSuggestion(newQuery);
    } else {
      emptyDropoffSuggestion();

      locationStore.dropoffLocationDetails = "";
      locationStore.dropoffCoordinates = null;
    }
  }, 300),
});

const startPinOnMap = (): void => {
  locationStore.isPinDropoffClick = true;
  locationStore.isLocationModalOpen = false;
};

const selectDropoffSuggestion = (suggestion: SearchResponse) => {
  locationStore.queryDropoffLocation = suggestion.label;

  locationStore.dropoffCoordinates = [
    Number(suggestion.coordinates.lng),
    Number(suggestion.coordinates.lat),
  ];
  emptyDropoffSuggestion();
};
</script>
