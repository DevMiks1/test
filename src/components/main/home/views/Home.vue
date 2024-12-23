<template>
  <Suspense>
    <template #default>
      <div>
        <HeroSection />
        <MonitoringTransaction />
        <HowItWork />
        <Carousel />
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
import MonitoringTransaction from "../components/MonitoringTransaction.vue";
import HowItWork from "../components/HowItWork.vue";
import Carousel from "../components/Carousel.vue";
</script>

<style scoped></style>
