<template>
  <v-snackbar
    v-model="snackbarProperties.isVisible"
    :timeout="snackbarProperties.timeout"
    :color="snackbarProperties.color"
    location="top"
    dark
  >
    {{ snackbarProperties.message }}
  </v-snackbar>
</template>

<script setup>
import { snackbarInstance } from "@/composables/useSnackbar";

const { snackbarProperties } = snackbarInstance;
</script>
