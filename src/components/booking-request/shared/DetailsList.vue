<template>
  <div v-if="detailsExist">
    <div class="flex">
      <p class="details-font w-[48%] text-[1rem] font-[500]">
        {{ title }}
      </p>
      <p class="details-font w-[52%] text-[.900rem]">
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  detailsExist: {
    type: Boolean,
    default: false,
  },
  title: String,
});
</script>

<style scoped>
@media (max-width: 334px) and (min-width: 300px) {
  .details-font {
    font-size: 0.7rem;
  }
}
</style>
