<template>
  <v-text-field
    v-model="input"
    :prefix="prefix"
    :rules="rules"
    :label="label"
    :placeholder="placeholder"
  ></v-text-field>
</template>

<script setup lang="ts">
const input = defineModel("input");
const props = defineProps({
  label: String,
  rules: { type: Array, default: [] },
  prefix: { type: String, default: "" },
  suffix: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});
</script>

<style></style>