<template>
  <v-navigation-drawer v-model="drawerInternal" class="bg-red">
    <div class="border-bottom p-5">
      <h2 class="text-[1.3rem] font-[500] uppercase">
        {{ authentication.profileDetails?.companyName }}
      </h2>
      <h3 class="text-[1rem] font-[400] opacity-90">Administrator</h3>
    </div>
    <v-container>
      <v-list
        v-for="(sidebar, index) in sidebarItems"
        :key="sidebar.icon"
        class="py-1"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="sidebar.icon"
            :title="sidebar.title"
            link
            :class="[
              selectedItem === index
                ? 'bg-red-darken-1 rounded-lg text-white'
                : '',
              isHovering ? 'bg-red-darken-1 rounded-lg text-white' : '',
              !isActivated && isDeactivatedItem(sidebar.title)
                ? 'text-grey=ligten-2 opacity-60'
                : '',
              'my-0 px-2',
            ]"
            @click="() => navigate(sidebar.to, index)"
          ></v-list-item>
        </v-hover>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { sidebarItems } from "@/service/json/Dashboard/sidebarItems";
import { useAuthenticationStore } from "@/store";

const props = defineProps(["isSidebarOpen"]);

const selectedItem = ref(0);
const drawerInternal = ref(props.isSidebarOpen);

const router = useRouter();
const route = useRoute();

const authentication = useAuthenticationStore();

const activationStatus = authentication.profileDetails?.activationStatus;

const isActivated = activationStatus === "ACTIVATED";

const isDeactivatedItem = (title: string) => {
  const sidebarItemToGrayedOut = ["Employee", "Trips History", "Booking"];
  return sidebarItemToGrayedOut.includes(title);
};

const navigate = (to: string, index: number) => {
  selectedItem.value = index;
  router.push(to);
  nextTick(() => {
    updateSelectedItem();
  });
};
const updateSelectedItem = () => {
  const currentRoute = route.path;
  const index: number = sidebarItems.findIndex(
    (item) => item.to === currentRoute,
  );

  selectedItem.value = index !== -1 ? index : -1;
};

watch(
  () => props.isSidebarOpen,
  (newVal) => {
    drawerInternal.value = newVal;
  },
);
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
  border-bottom: 2px solid #ffffff14;
}
</style>
