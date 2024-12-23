<template>
  <div>
    <div class="flex gap-2">
      <v-text-field
        v-model="searchQuery"
        color="red"
        density="compact"
        label="Pickup Location"
        variant="outlined"
        placeholder="Enter pickup location"
      >
        <template v-slot:prepend-inner>
          <BaseIcon icon="mdi-map-marker" color="red" />
        </template>
      </v-text-field>
      <ActionButton class="bg-red" variant="tonal" @action="startPinOnMap">
        <BaseIcon icon="mdi-map-marker" />
        {{ "PIN" }}
      </ActionButton>
    </div>
    <div
      v-if="pickupSuggestion.length"
      class="y-axis-scrollbar mb-5 h-[200px] overflow-auto bg-white"
    >
      <ul>
        <li
          class="m-4 cursor-pointer rounded-lg border-2 p-4 transition-all duration-100 ease-in hover:border-red-500"
          v-for="suggestion in pickupSuggestion"
          :key="suggestion.id"
          @click="selectPickupSuggestion(suggestion)"
        >
          <div class="flex items-center gap-3">
            <v-icon class="text-red-darken-2">mdi-map-marker</v-icon>
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
import { useLocationStore } from "@/components/booking-request/store/index";
import type { SearchResponse } from "@/service/interface/location";
import { debounce } from "lodash";
import { searchLocation } from "@/service/api/location";

const BaseIcon = defineAsyncComponent(
  () => import("@/shared/components/Icon/BaseIcon.vue"),
);
const ActionButton = defineAsyncComponent(
  () => import("@/shared/components/Button/ActionButton.vue"),
);

const locationStore = useLocationStore();

const pickupSuggestion: Ref<SearchResponse[]> = ref([]);

const emptyPickupSuggestion = () => {
  pickupSuggestion.value = [];
};

const displayPickupSuggestion = async (newQuery: string) => {
  try {
    const response = await searchLocation({ newQuery });

    pickupSuggestion.value = response;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

const searchQuery = computed({
  get: () => locationStore.queryPickupLocation,
  set: debounce((newQuery) => {
    locationStore.queryPickupLocation = newQuery;

    if (newQuery.length > 0) {
      displayPickupSuggestion(newQuery);
    } else {
      emptyPickupSuggestion();

      locationStore.pickupLocationDetails = "";
      locationStore.pickupCoordinates = null;
    }
  }, 300),
});

const startPinOnMap = (): void => {
  locationStore.isPinPickupClick = true;
  locationStore.isLocationModalOpen = false;
};

const selectPickupSuggestion = (suggestion: SearchResponse) => {
  locationStore.queryPickupLocation = suggestion.label;

  locationStore.pickupCoordinates = [
    Number(suggestion.coordinates.lng),
    Number(suggestion.coordinates.lat),
  ];

  emptyPickupSuggestion();
};
</script>
