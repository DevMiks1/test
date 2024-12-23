<template>
  <v-card class="bg-red mb-5">
    <v-container>
      <div class="flex justify-between">
        <v-chip label class="text-uppercase">{{ header }}</v-chip>
        <v-btn
          @click="closeReminder"
          icon="mdi-close"
          color="red"
          size="small"
        ></v-btn>
      </div>

      <p class="mt-5 text-wrap text-[.9rem]">
        {{ description }}
      </p>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  header: String,
  description: String,
});

const emit = defineEmits(["close"]);

const closeReminder = () => {
  emit("close");
};
</script>

<style></style>
