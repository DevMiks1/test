import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const exchangeToken = `${BASE_URL}/owto-biz/api/auth/google/exchange/token`;

export const retrieveToken = async (code: string): Promise<string> => {
  try {
    const response = await axios.post(exchangeToken, { code: code });
    return response.data;
  } catch (error) {
    console.error("Error retrieve token:", error);
    throw error;
  }
};
