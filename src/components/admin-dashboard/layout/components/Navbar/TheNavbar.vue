<template>
  <div>
    <v-app-bar class="px-5">
      <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
      <ProfileMenu />
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const emit = defineEmits(["toggleSidebar"]);

const toggleSidebar = () => {
  emit("toggleSidebar");
};
const ProfileMenu = defineAsyncComponent(() => import("./Menu/Profile.vue"));
</script>

<style></style>
