import { defineStore } from "pinia";

interface State {
  isNoteModalOpen: boolean;
  noteMessageDetails: string;
}

export const useNoteStore = defineStore("note", {
  state: (): State => ({
    isNoteModalOpen: false,
    noteMessageDetails: "",
  }),
  getters: {},
  actions: {},
});
