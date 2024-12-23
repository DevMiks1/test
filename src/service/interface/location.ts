export interface BaseCoordinates {
  lat: number;
  lng: number;
}

export interface PinCoordinates {
  coordinates: string;
}

export interface LocationResponse {
  id: string;
  coordinates: BaseCoordinates;
  description: string;
  label: string;
}

export interface SearchResponse {
  id: string;
  coordinates: BaseCoordinates;
  description: string;
  label: string;
}
