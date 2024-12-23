<template>
  <div class="flex items-center justify-center">
    <v-card height="200px" width="200px">
      <div class="flex h-full items-center justify-center">
        <v-progress-circular
          :size="100"
          :width="5"
          color="red"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-card>
  </div>
</template>
