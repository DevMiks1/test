<template>
  <router-link to="/dashboard">
    <BaseIconButton
      icon="mdi-arrow-left"
      size="small"
      color="red"
      density="comfortable"
      variant="flat"
    />
  </router-link>
</template>

<script setup lang="ts">
import BaseIconButton from "@/shared/components/Button/BaseIconButton.vue";
</script>
