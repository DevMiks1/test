<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="40"
            color="grey lighten-2"
            class="cursor-pointer"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John Doe"
            />
          </v-avatar>
        </template>
        <BaseCard class="bg-red mt-2 w-60 rounded-lg" :isVisible="true">
          <!-- we can refactor this soon -->
          <div class="border-bottom mb-3">
            <v-card-text class="py-0 pt-5"
              ><span class="text-[1rem]">Mikee Vargas</span></v-card-text
            >
            <v-card-subtitle class="pb-5">Administrator</v-card-subtitle>
          </div>

          <v-list
            v-for="profileMenuItem in profileMenuItems"
            :key="profileMenuItem.id"
            class="bg-red my-0 px-0 py-0"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-list-item
                v-bind="props"
                :class="[
                  isHovering ? 'bg-red-darken-1 rounded-lg text-white' : '',
                  'mx-2 my-0 px-2',
                ]"
                @click="() => navigate(profileMenuItem.to)"
              >
                <div class="flex items-center">
                  <span class="text-[0.7rem]">
                    <div class="mr-3">
                      <BaseIcon>
                        {{ profileMenuItem.icon }}
                      </BaseIcon>
                    </div>
                  </span>
                  <v-card-text class="px-0 py-0">{{
                    profileMenuItem.title
                  }}</v-card-text>
                </div>
              </v-list-item>
            </v-hover>
          </v-list>
          <div class="border-top mt-3 py-2">
            <v-hover v-slot="{ isHovering, props }">
              <div
                :class="[
                  isHovering
                    ? 'bg-red-darken-1 cursor-pointer rounded-lg text-white'
                    : '',
                  'mx-2 flex items-center px-2 py-3',
                ]"
                v-bind="props"
                @click="handleLogout"
              >
                <span class="text-[0.7rem]">
                  <div class="mr-3">
                    <BaseIcon icon="mdi-logout" />
                  </div>
                </span>
                <v-card-text class="px-0 py-0">Logout</v-card-text>
              </div>
            </v-hover>
          </div>
        </BaseCard>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import BaseCard from "@/shared/components/Card/BaseCard.vue";
import { useRouter } from "vue-router";
import { profileMenuItems } from "@/service/json/Dashboard/profileMenuItems";
import { useAuthenticationStore } from "@/store";
import { googleLogout } from "vue3-google-login";

const router = useRouter();
const authenticationStore = useAuthenticationStore();

const navigate = (to: string) => {
  router.push(to);
};

const handleLogout = () => {
  googleLogout();
  authenticationStore.clearToken();
  router.replace("/login");
};
</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid #ffffff14;
}
.border-top {
  border-top: 1px solid #ffffff14;
}
</style>
