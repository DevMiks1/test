import type {
  BookingResponse,
  EstimateParams,
  EstimateResponse,
} from "@/service/interface/booking";
import axiosInstance from "@/service/http/axiosInstance";

export const createBooking = async ({
  body,
}: {
  body: BookingResponse;
}): Promise<BookingResponse> => {
  const response = await axiosInstance.post<BookingResponse>(
    "/clients/bookings/request",
    JSON.stringify(body),
  );

  return response.data;
};

export const retrieveAllEstimate = async ({
  param,
}: {
  param: EstimateParams;
}): Promise<EstimateResponse[]> => {
  const response = await axiosInstance.get<{ data: EstimateResponse[] }>(
    "/clients/bookings/estimate",
    {
      params: param,
    },
  );

  const { data } = response.data;
  return data;
};
