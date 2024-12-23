<template>
  <v-chip
    :label="label"
    :prepend-icon="prependIcon"
    :color="color"
    :size="size"
  >
    <slot></slot>
  </v-chip>
</template>

<script setup lang="ts">
const props = defineProps({
  prependIcon: String,
  color: { type: String, default: "" },
  label: {
    type: Boolean,
    default: false,
  },
  size: String,
});
</script>

<style></style>