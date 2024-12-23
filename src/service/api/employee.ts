import axiosInstance from "@/service/http/axiosInstance";
import type {
  BaseEmployee,
  CreateEmployee,
  Employees,
} from "@/service/interface/employee";

const clientEmployeesUrl = "/client-employees";

export const retrieveAllEmployees = async (): Promise<Employees[]> => {
  const response = await axiosInstance.get<{ data: Employees[] }>(
    clientEmployeesUrl,
  );
  const { data } = response.data;
  return data;
};

export const createEmployee = async (
  body: CreateEmployee,
): Promise<Employees> => {
  const response = await axiosInstance.post<{ data: Employees }>(
    clientEmployeesUrl,
    JSON.stringify(body),
  );
  const { data } = response.data;
  return data;
};

export const updateEmployee = async ({
  body,
  id,
}: {
  body: BaseEmployee;
  id: number | null;
}): Promise<Employees> => {
  const response = await axiosInstance.patch<{ data: Employees }>(
    `${clientEmployeesUrl}/${id}`,
    JSON.stringify(body),
  );
  const { data } = response.data;
  return data;
};

export const verificationOtp = async ({
  id,
  body,
}: {
  id: number | null;
  body: string;
}): Promise<Employees> => {
  const response = await axiosInstance.patch<Employees>(
    `${clientEmployeesUrl}/${id}/verify`,
    { otp: body },
  );
  return response.data;
};

export const vericationRequest = async ({ id }: { id: number | null }) => {
  const response = await axiosInstance.patch(
    `${clientEmployeesUrl}/${id}/request-verification`,
  );
  return response.data;
};
