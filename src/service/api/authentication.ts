import axios from "axios";
import axiosInstance from "../http/axiosInstance";
import type { ClientDetails } from "../interface/signup";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authLogin = `${BASE_URL}/owto-biz/api/auth/login`;

interface BaseEmail {
  email: string;
}

interface VerifyOtp extends BaseEmail {
  otp: number;
}
interface Login extends BaseEmail {
  password: string;
}

export const signup = async ({
  body,
}: {
  body: ClientDetails;
}): Promise<ClientDetails> => {
  const response = await axiosInstance.post<ClientDetails>(
    "/auth/signup",
    JSON.stringify(body),
  );

  return response.data;
};

export const verifyOtp = async ({
  body,
}: {
  body: VerifyOtp;
}): Promise<VerifyOtp> => {
  const response = await axiosInstance.patch<VerifyOtp>(
    "/auth/verify",
    JSON.stringify(body),
  );
  return response.data;
};

export const login = async ({ body }: { body: Login }): Promise<Login> => {
  const response = await axios.post<Login>(authLogin, body);
  return response.data;
};
