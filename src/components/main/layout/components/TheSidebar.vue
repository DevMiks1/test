<template>
  <v-navigation-drawer v-model="isDrawerOpen" temporary class="bg-red-darken-2">
    <div>
      <div class="border-bottom mb-3 py-5">
        <p class="text-uppercase pl-4 text-[1.5rem]">owtosked</p>
        <v-card-subtitle>Corporate Booking</v-card-subtitle>
      </div>

      <v-list
        v-for="(navbar, index) in navbarItems"
        :key="navbar.icon"
        class="py-1"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="navbar.icon"
            :title="navbar.title"
            link
            :class="[
              selectedItem === index
                ? 'bg-red-darken-3 rounded-lg text-white'
                : '',
              isHovering ? 'bg-red-darken-3 rounded-lg text-white' : '',
              'mx-2 px-2',
            ]"
            @click="() => navigate(navbar.to, index)"
          ></v-list-item>
        </v-hover>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { navbarItems } from "@/service/json/Main/navbarItems";
import { isDrawerOpen } from "@/components/main/helper/toggle-navbar";

const router = useRouter();
const route = useRoute();

const selectedItem = ref(0);

const navigate = (to: string, index: number) => {
  selectedItem.value = index;
  router.push(to);
};

const updateSelectedItem = () => {
  const currentRoute = route.path;
  const index = navbarItems.findIndex((item) => item.to === currentRoute);

  selectedItem.value = index !== -1 ? index : -1;
};

watch(
  () => route.path,
  () => {
    updateSelectedItem();
  },
  { immediate: true },
);

onMounted(() => {
  updateSelectedItem();
});
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #ffffff14;
}
</style>
