<template>
  <div>
    <div class="fixed z-50 w-full">
      <v-toolbar color="white" class="py-5">
        <BaseContainer>
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="auto">
              <router-link to="/">
                <img
                  src="/assets/owtosked-logo.png"
                  alt="owosked logo"
                  class="h-[2rem] md:h-[3rem]"
                />
              </router-link>
            </v-col>
            <v-col cols="auto">
              <v-row align="center">
                <div class="hidden sm:flex">
                  <router-link to="/about">
                    <p class="p-[1rem] text-[1.2rem] font-[500]">ABOUT</p>
                  </router-link>
                  <router-link to="/login">
                    <p class="p-[1rem] text-[1.2rem] font-[500]">LOGIN</p>
                  </router-link>
                </div>
                <div class="block sm:hidden">
                  <v-app-bar-nav-icon
                    @click.stop="toggleDrawer"
                  ></v-app-bar-nav-icon>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </BaseContainer>
      </v-toolbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import { toggleDrawer } from "@/components/main/helper/toggle-navbar";
</script>

<style scoped>
.router-link-active:not(.logo-link) {
  color: #e63835;
}

a:hover {
  color: #e63835;
}

.border-bottom {
  border-bottom: 1px solid #ffffff14;
}
</style>
