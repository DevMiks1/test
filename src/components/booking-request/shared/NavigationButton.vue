<template>
  <div
    :class="{
      'step-container': true,
      'connected-step': !isLastStep,
      'is-completed': isCompleted,
    }"
  >
    <div>
      <div @click="toggleModal" class="w-[70px] text-center">
        <v-btn
          icon
          size="x-small"
          :class="[
            isDisabled ? 'bg-grey-darken-1' : '',
            !isActive ? 'bg-grey-darken-1' : '',
          ]"
          :disabled="isDisabled || !isActive"
        >
          <v-icon
            :class="[isCompleted ? 'text-green-darken-2' : 'text-red-darken-2']"
            >{{
              isCompleted ? iconWhenIsCompleted : iconWhenIsNotCompleted
            }}</v-icon
          >
        </v-btn>

        <p class="py-1 text-[.6rem]">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./styles/steps.css";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconWhenIsCompleted: {
    type: String,
  },
  iconWhenIsNotCompleted: {
    type: String,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isLastStep: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["click"]);

const toggleModal = () => {
  emit("click");
};
</script>
