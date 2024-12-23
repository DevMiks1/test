<template>
  <Suspense>
    <template #default>
      <div class="py-40">
        <HeroSection />
      </div>
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
import HeroSection from "../components/HeroSection.vue";
</script>
