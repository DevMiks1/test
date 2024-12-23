import { defineStore } from "pinia";
import type { TripsHistory } from "@/service/interface/trips-history";

interface State {
  tripsHistory: TripsHistory[];
  isTripHistoryModalOpen: boolean;
  idToView: null | number;
  search: string;
}

export const useTripsHistoryStore = defineStore("tripsHistory", {
  state: (): State => ({
    tripsHistory: [],
    isTripHistoryModalOpen: false,
    idToView: null,
    search: "",
  }),

  getters: {
    formatDate(): (date: string | null) => string {
      return (date: any) => {
        if (date) {
          return new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        }
        return "";
      };
    },

    tripsHistoryList(): TripsHistory[] {
      return this.tripsHistory.map((trip: TripsHistory) => ({
        ...trip,
        scheduleDate: this.formatDate(trip.scheduleDate),
        bookingDate: this.formatDate(trip.bookingDate),
      }));
    },
  },

  actions: {},
});
