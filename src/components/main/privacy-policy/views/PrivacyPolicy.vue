<template>
  <Suspense>
    <template #default>
      <BaseContainer>
        <PrivacyPolicy />
      </BaseContainer>
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
import BaseContainer from "@/shared/components/BaseContainer.vue";
import PrivacyPolicy from "../components/PrivacyPolicy.vue";
</script>

<style></style>
