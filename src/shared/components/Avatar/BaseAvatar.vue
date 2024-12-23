<template>
  <v-avatar :size="size">
    <slot></slot>
  </v-avatar>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: String, default: "" },
});
</script>

<style></style>
