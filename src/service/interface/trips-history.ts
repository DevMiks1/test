export interface Passenger {
  employeeId: number | null;
  isRepresentative?: boolean;
  name?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface TripsHistory {
  id: number;
  bookingId: string;
  acceptedAt: string;
  passengers: Passenger[];
  bookingDate: string;
  scheduleDate: string;
  cancelledAt: string | null;
  tripStartDate: string | null;
  tripEndDate: string | null;
  pickUpAddress: string;
  dropOffAddress: string;
  pickUpPoint: Point;
  dropOffPoint: Point;
  fare: number;
  variantName: string;
  driverName: string;
  driverImage: string | null;
  plateNumber: string;
  status: string;
}
