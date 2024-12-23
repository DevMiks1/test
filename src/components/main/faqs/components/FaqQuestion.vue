<template>
  <section class="py-[6.5rem]">
    <div
      class="bg-red text-grey-lighten-3 mb-[2rem] p-[2rem] text-center text-[2rem]"
    >
      Frequently Asked Questions
    </div>
    <BaseContainer>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="faq in faqList" :key="faq.question">
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              <p :class="expanded ? 'text-red' : ''">{{ faq.question }}</p>
            </template>
            <template v-slot:actions="{ expanded }">
              <v-icon
                :class="[expanded ? 'text-red' : '', ,]"
                :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
              ></v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p v-html="faq.answer" class="bg-dark rounded-md p-4"></p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import { faqList } from "@/service/json/dummy-content";
</script>

<style scoped></style>
