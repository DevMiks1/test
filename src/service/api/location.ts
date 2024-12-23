import axiosInstance from "@/service/http/axiosInstance";

import type {
  PinCoordinates,
  SearchResponse,
  LocationResponse,
} from "../interface/location";

const DEFAULT_LONGITUDE = import.meta.env.VITE_DEFAULT_LONGITUDE;
const DEFAULT_LATITUDE = import.meta.env.VITE_DEFAULT_LATITUDE;

let latitude: string = DEFAULT_LATITUDE;
let longitude: string = DEFAULT_LONGITUDE;

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

try {
  const position: GeolocationPosition = await getCurrentPosition();
  latitude = String(position.coords.latitude);
  longitude = String(position.coords.longitude);
} catch (geoError) {
  console.error("Error getting current location:", geoError);
}

export const searchLocation = async ({
  newQuery,
}: {
  newQuery: string;
}): Promise<SearchResponse[]> => {
  const response = await axiosInstance.get<{ data: SearchResponse[] }>(
    "/locations/search",
    {
      params: {
        q: newQuery,
        coordinates: `${latitude},${longitude}`,
      },
    },
  );
  const { data } = response.data;
  return data;
};

export const pinLocation = async ({
  coordinatesObj,
}: {
  coordinatesObj: PinCoordinates;
}): Promise<LocationResponse> => {
  const response = await axiosInstance.get<{ data: LocationResponse[] }>(
    "/locations/identify",
    {
      params: coordinatesObj,
    },
  );

  return response.data.data[0];
};
