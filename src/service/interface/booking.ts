export interface Representative {
  employeeId: number;
  isRepresentative: boolean;
}
export interface Guest {
  name: string;
  employeeId: null;
}

export interface Employee {
  employeeId: number;
}

export type AllPassenger = Representative | Employee | Guest;

export interface EstimateParams {
  seatCount: number;
  riderId: string | number | null;
  employeeId: number | null;
  pickUpAddress: string;
  dropOffAddress: string;
  pickUpPoint?: string;
  dropOffPoint?: string;
}

export interface EstimateResponse {
  variantId: string;
  estimateId: string;
  matrix: {
    variantName: string;
  };
  seatCount: number;
  estimatedFare: number;
}

export interface BookingResponse {
  estimateId: string;
  scheduleDate: string;
  passengers: AllPassenger[];
  noteToDriver: string;
}
