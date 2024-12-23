<template>
  <v-app>
    <TheHeader />
    <TheSidebar />
    <v-main id="main" class="bg-grey-lighten-3">
      <router-view></router-view>
    </v-main>
    <TheFooter />
  </v-app>
</template>
<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import TheFooter from "./components/TheFooter.vue";
</script>
<style scoped></style>
