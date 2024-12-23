export interface BaseProfile {
  email: string;
  mobileNumber: string;
  companyName: string;
  companyAddress: string;
  companySize: string;
  name: string;
}

export type ACTIVATION_STATUS = "ACTIVATED" | "DEACTIVATED";

export interface ProfileAuth extends BaseProfile {
  id: number;
  isVerified: boolean;
  activationStatus: ACTIVATION_STATUS;
  createdAt: string;
  updatedAt: string;
  tagId: null;
}
