<template>
  <v-btn
    @click="handleAction"
    :size="size"
    :color="color"
    :icon="icon"
    :density="density"
    :variant="variant"
  >
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: "small",
  },
  color: {
    type: String,
    default: "",
  },
  density: {
    type: String,
    default: "default",
  },
  variant: {
    type: String,
    default: "flat",
  },
  icon: String,
});
const emit = defineEmits(["action"]);

const handleAction = () => {
  emit("action");
};
</script>

<style></style>