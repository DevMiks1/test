import { defineStore } from "pinia";
interface State {
  isScheduleModalOpen: boolean;
  scheduleDetails: string;
  date: null | string;
  time: null | string;
}

export const useScheduleStore = defineStore("schedule", {
  state: (): State => ({
    isScheduleModalOpen: false,
    scheduleDetails: "",
    date: null,
    time: null,
  }),
});
