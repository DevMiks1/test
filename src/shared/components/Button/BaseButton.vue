<template>
  <v-btn :variant="variant" :density="density">
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'tonal', 
  },
  density: {
    type: String,
    default: 'default', 
  },
 
});


</script>