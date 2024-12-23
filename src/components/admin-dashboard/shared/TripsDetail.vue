<template>
  <div class="flex">
    <p class="w-[30%] text-[.7rem] opacity-90">{{ props.label }}</p>
    <p class="font-weight-medium w-[70%] text-[.7rem]">
      {{ props.value }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: String;
  value: String | null;
}>();
</script>
