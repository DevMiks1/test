<template>
  <v-icon :icon="icon" :color="color">
    <slot></slot>
  </v-icon>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  color: {
    type: String,
    default: "",
  },
  icon: String,
});
</script>

<style></style>
