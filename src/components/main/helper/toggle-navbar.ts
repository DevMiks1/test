import { ref } from "vue";

export const isDrawerOpen = ref(false);

export const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
