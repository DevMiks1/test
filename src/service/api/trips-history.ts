import axiosInstance from "@/service/http/axiosInstance";
import type { TripsHistory } from "@/service/interface/trips-history";

const clientsBookingUrl = "clients/bookings/me";

export const retrieveAllTripsHistory = async (): Promise<TripsHistory[]> => {
  const response = await axiosInstance.get<{ data: TripsHistory[] }>(
    clientsBookingUrl,
  );
  const { data } = response.data;
  return data;
};
