<template>
  <v-text-field
    v-model="search"
    :density="density"
    :label="label"
    :prepend-inner-icon="prependInnerIcon"
    variant="solo"
    flat
    hide-details
    single-line
  ></v-text-field>
</template>

<script setup lang="ts">
const search = defineModel("search");
const props = defineProps({
  vModel: String,
  density: String,
  label: String,
  prependInnerIcon: String,
});
</script>

<style></style>