import { defineStore } from "pinia";
import type { EstimateResponse } from "@/service/interface/booking";

interface State {
  variants: EstimateResponse[];
  variantId: string;
  variantsSelected: EstimateResponse | null;
  variantDetails: string;
  isVariantModalOpen: boolean;
}

export const useEstimateStore = defineStore("estimate", {
  state: (): State => ({
    variants: [],
    variantId: "",
    variantsSelected: null,
    variantDetails: "",
    isVariantModalOpen: false,
  }),
  getters: {},
  actions: {},
});
