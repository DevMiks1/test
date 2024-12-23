<template>
  <div class="fixed inset-0 z-50 bg-white" v-if="isLoading">
    <ProgressbarLoading />
  </div>
  <v-app v-else>
    <div>
      <TheSidebar v-model="isSidebarOpen" />
      <TheNavbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      <v-main class="bg-grey-lighten-3">
        <v-container class="px-6 py-8" fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";
import { retrieveCompanyprofile } from "@/service/api/profile";
import { useAuthenticationStore } from "@/store";
import TheSidebar from "./components/Sidebar/TheSidebar.vue";
import TheNavbar from "./components/Navbar/TheNavbar.vue";

const isSidebarOpen: any = ref(null);

const authenticationStore = useAuthenticationStore();

const isLoading = ref(false);

onMounted(() => {
  const fetchCompanyProfile = async () => {
    try {
      isLoading.value = true;
      const response = await retrieveCompanyprofile();
      if (response) {
        authenticationStore.profileDetails = response;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  fetchCompanyProfile();
});
</script>
