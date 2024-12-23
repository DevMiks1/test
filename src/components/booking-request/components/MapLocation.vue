<template>
  <div ref="mapContainer" class="h-[100vh] w-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fromLonLat, toLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";
import type { MapBrowserEvent } from "ol";
import { useLocationStore } from "@/components/booking-request/store/index";
import { pinLocation } from "@/service/api/location";
import { useAuthenticationStore } from "@/store";
import type { PinCoordinates } from "@/service/interface/location";

const authenticationStore = useAuthenticationStore();
const locationStore = useLocationStore();

const mapContainer = ref<HTMLElement | null>(null);
let map: Map | undefined;
let pickupMarker: Feature<Point> | undefined;
let dropoffMarker: Feature<Point> | undefined;

const initializeMap = () => {
  map = new Map({
    target: mapContainer.value!,
    layers: [new TileLayer({ source: new OSM() })],
    controls: defaultControls({ attribution: false, zoom: false }),
    view: new View({
      center: fromLonLat([121.0437, 14.676]),
      zoom: 12,
    }),
  });

  initializeMarkers();
};

const initializeMarkers = () => {
  pickupMarker = createMarker();
  dropoffMarker = createMarker();

  const vectorSource = new VectorSource({
    features: [pickupMarker, dropoffMarker],
  });
  const vectorLayer = new VectorLayer({ source: vectorSource });
  map?.addLayer(vectorLayer);
};

const createMarker = () => {
  const marker = new Feature({
    geometry: new Point(fromLonLat([0, 0])),
  });

  marker.setStyle(
    new Style({
      image: new Icon({
        src: "https://openlayers.org/en/latest/examples/data/icon.png",
        scale: 0.5,
      }),
    }),
  );

  return marker;
};

const handleMapClick = async (event: MapBrowserEvent<any>) => {
  const coordinates = toLonLat(event.coordinate);
  const [longitude, latitude] = coordinates;

  const pinCoordinates: string = `${latitude},${longitude}`;

  if (locationStore.isPinPickupClick) {
    await pinOnMapPickupResults(pinCoordinates);
  } else if (locationStore.isPinDropoffClick) {
    await pinOnMapDropoffResults(pinCoordinates);
  }
};

const pinOnMapPickupResults = async (pinCoordinates: string) => {
  const token = authenticationStore.token;

  try {
    const coordinatesObj: PinCoordinates = {
      coordinates: pinCoordinates,
    };
    const response = await pinLocation({ coordinatesObj });

    locationStore.pickupCoordinates = [
      Number(response.coordinates.lng),
      Number(response.coordinates.lat),
    ];

    locationStore.queryPickupLocation = response.label;
  } catch (error) {
    console.error(error);
  } finally {
    locationStore.isPinPickupClick = false;
    locationStore.isLocationModalOpen = true;
  }
};

const pinOnMapDropoffResults = async (pinCoordinates: string) => {
  const token: string | null = authenticationStore.token;
  try {
    const coordinatesObj: PinCoordinates = {
      coordinates: pinCoordinates,
    };
    const response = await pinLocation({
      coordinatesObj,
    });

    locationStore.dropoffCoordinates = [
      Number(response.coordinates.lng),
      Number(response.coordinates.lat),
    ];
    locationStore.queryDropoffLocation = response.label;
  } catch (error) {
    console.error(error);
  } finally {
    locationStore.isPinDropoffClick = false;
    locationStore.isLocationModalOpen = true;
  }
};

const resetMarkers = () => {
  locationStore.dropoffCoordinates = null;
  locationStore.pickupCoordinates = null;
  pickupMarker?.getGeometry()?.setCoordinates(fromLonLat([0, 0]));
  dropoffMarker?.getGeometry()?.setCoordinates(fromLonLat([0, 0]));
  map?.getView().setCenter(fromLonLat([121.0437, 14.676]));
  map?.getView().setZoom(12);
};

const updateMarkers = () => {
  if (locationStore.queryPickupLocation && locationStore.pickupCoordinates) {
    pickupMarker
      ?.getGeometry()
      ?.setCoordinates(fromLonLat(locationStore.pickupCoordinates));
  }

  if (locationStore.queryDropoffLocation && locationStore.dropoffCoordinates) {
    dropoffMarker
      ?.getGeometry()
      ?.setCoordinates(fromLonLat(locationStore.dropoffCoordinates));
  }

  const newCenter =
    locationStore.pickupCoordinates || locationStore.dropoffCoordinates;
  if (newCenter) {
    map?.getView().setCenter(fromLonLat(newCenter));
    map?.getView().setZoom(14);
  }
};

onMounted(() => {
  initializeMap();
  map?.on("click", handleMapClick);
});

watch(
  () => ({
    queryPickup: locationStore.queryPickupLocation,
    queryDropoff: locationStore.queryDropoffLocation,
    pickupCoordinates: locationStore.pickupCoordinates,
    dropoffCoordinates: locationStore.dropoffCoordinates,
  }),
  ({ queryPickup, queryDropoff }) => {
    if (!queryPickup && !queryDropoff) {
      resetMarkers();
    } else {
      updateMarkers();
    }
  },
);
</script>
