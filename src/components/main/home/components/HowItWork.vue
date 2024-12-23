<template>
  <section class="_how-it-work py-[5rem]">
    <BaseContainer>
      <v-row>
        <v-col cols="12" md="6" order="2" order-md="1">
          <div class="pr-5 text-white">
            <h2
              class="text-uppercase pb-[1rem] text-[1.8rem] font-[700] md:text-[2.625rem]"
            >
              How it works
            </h2>

            <p class="pb-[1rem] font-[500] opacity-90">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
              animi est, dolorum tenetur tempora doloremque inventore voluptates
              officia saepe corrupti accusantium, aliquam iste excepturi quod,
              natus fuga nam exercitationem! Exercitationem!
            </p>
            <p class="font-[500] opacity-90">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
              animi est, dolorum tenetur tempora doloremque inventore voluptates
              officia saepe corrupti accusantium, aliquam iste excepturi quod,
              natus fuga nam exercitationem! Exercitationem!
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6" order="1" order-md="2">
          <div>
            <img
              src="/assets/main/monitoring-logo.png"
              alt="Monitoring of Transactions Image"
              class="rounded-3xl"
            />
          </div>
        </v-col>
      </v-row>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
</script>

<style scoped>
._how-it-work {
  background: linear-gradient(40deg, #d32027, #f1a7a2);
}
</style>
