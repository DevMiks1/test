<template>
  <v-card v-if="isVisible" :max-width="width" :max-height="height">
    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  width: { type: String, default: "" },
  height: { type: String, default: "" },
  isVisible: { type: Boolean, default: false },
});
</script>

<style></style>