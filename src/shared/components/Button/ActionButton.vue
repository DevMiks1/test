<template>
  <v-btn
    @click="handleAction"
    :color="color"
    :block="block"
    :size="size"
    :density="density"
    :variant="variant"
    :prepend-icon="prependIcon"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  block: {
    type: Boolean,
    default: false,
  },
  density: {
    type: String,
    default: "default",
  },
  variant: {
    type: String,
    default: "flat",
  },
  size: {
    type: String,
  },

  color: {
    type: String,
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["action"]);

const handleAction = () => {
  emit("action");
};
</script>

<style></style>
