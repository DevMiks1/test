export interface BaseEmployee {
  firstName: string;
  middleName: string;
  suffix?: string;
  lastName: string;
  mobileNumber: string;
}
export interface CreateEmployee extends BaseEmployee {
  email: string;
  riderId?: null | string;
}

export interface Employees extends BaseEmployee {
  clientId: number;
  createdAt: string;
  email: string;
  id: number;
  otp: null;
  otpExp: null;
  riderId: string | number | null;
  updatedAt: string;
}
