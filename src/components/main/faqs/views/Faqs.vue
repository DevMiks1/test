<template>
  <Suspense>
    <template #default>
      <Faqs />
    </template>
    <template #fallback>
      <div class="fixed inset-0 z-50 bg-white">
        <ProgressbarLoading />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import ProgressbarLoading from "@/shared/components/ProgressbarLoading.vue";
import Faqs from "../components/FaqQuestion.vue";
</script>

<style></style>
