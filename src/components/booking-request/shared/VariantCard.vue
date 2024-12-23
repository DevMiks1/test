<template>
  <v-card
    :class="[
      props.estimateId === props.variantId
        ? 'owto-selected bg-grey-lighten-4'
        : 'owto-img bg-grey-lighten-4',
      'transform transition-all duration-300 ease-in-out',
    ]"
    width="250"
    height="350"
    class="rounded-lg shadow-md"
  >
    <v-card-item class="px-0 py-0">
      <div class="h-[190px] w-full overflow-hidden rounded-t-lg">
        <v-img :src="props.variantImg" class="h-100 w-100" cover></v-img>
      </div>

      <v-card-title
        class="text-uppercase borer-b px-2 py-2 text-center text-lg font-semibold"
      >
        {{ props.title }}
      </v-card-title>

      <v-card-item class="px-3 py-1">
        <div class="flex items-center">
          <span class="mr-2 text-[1.125rem]"
            ><v-icon>mdi-seat-passenger</v-icon></span
          >
          <v-card-text class="py-0">{{ props.capacity }}</v-card-text>
        </div>
      </v-card-item>
      <v-card-item class="px-3 py-1">
        <div class="flex items-center">
          <v-icon class="mr-2">mdi-cash</v-icon>
          <v-card-text class="py-0 text-lg font-bold">{{
            props.varintPrice
          }}</v-card-text>
        </div>
      </v-card-item>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  estimateId: String,
  variantId: String,
  variantImg: String,
  title: String,
  varintPrice: Number,
  capacity: String,
});
</script>

<style scoped>
.owto-img {
  transform: scale(1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.owto-card:hover .owto-img {
  cursor: pointer;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.owto-selected {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid red;
}

.owto-img,
.owto-selected {
  transition: all 0.3s ease-in-out;
}

.v-card-title {
  font-weight: 600;
  text-align: center;
}

.v-card-item {
  padding: 0;
}

.v-card-text {
  font-size: 14px;
}

.owto-card {
  border-radius: 10px;
}
</style>
