<template>
  <v-dialog
    v-model="dialog"
    :max-width="mWidth"
    :max-height="mHeight"
    transition="dialog-bottom-transition"
    :persistent="persistent"
  >
    <slot></slot>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = defineModel("dialog");
const props = defineProps({
  mWidth: String,
  mHeight: String,
  vModel: Boolean,
  persistent: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>