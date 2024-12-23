import axiosInstance from "@/service/http/axiosInstance";
import type { ProfileAuth } from "../interface/company-profile";

export const updateCompanyProfile = async ({
  body,
}: {
  body: any;
}): Promise<ProfileAuth> => {
  const response = await axiosInstance.patch<{ data: ProfileAuth }>(
    "/clients/me",
    JSON.stringify(body),
  );

  const { data } = response.data;
  return data;
};

export const retrieveCompanyprofile = async (): Promise<ProfileAuth> => {
  const response = await axiosInstance.get<{ data: ProfileAuth }>(
    "/clients/me",
  );
  const { data } = response.data;
  return data;
};
