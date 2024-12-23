<template>
  <section class="_hero-section pt-[10rem] text-white md:pb-[5rem]">
    <BaseContainer>
      <v-row>
        <v-col cols="12" md="6" order="2" order-md="1">
          <h2
            class="text-uppercase text-md-left pb-[1rem] text-center text-[1.8rem] font-[700] opacity-90 md:text-left md:text-[2.625rem]"
          >
            Make Your Booking a Safe Journey
          </h2>

          <p
            class="text-md-left pb-[2rem] text-center text-[1.125rem] opacity-90 md:text-[1.3rem]"
          >
            Our easy-to-use interface allows you to find and secure the perfect
            option to suit your needs. With clear pricing and straightforward
            booking, you can trust that there are no hidden fees or surprises.
            We prioritize your satisfaction by providing high-quality options
            and ensuring that every detail is handled with care.
          </p>
          <div class="text-md-left text-center">
            <BaseButton class="bg-dark">get started</BaseButton>
          </div>
        </v-col>
        <v-col order="1" order-md="2">
          <img
            src="/assets/main/booking-logo.png"
            alt="Booking Image"
            class="rounded-3xl"
          />
        </v-col>
      </v-row>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/shared/components/Button/BaseButton.vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
</script>

<style scoped>
._hero-section {
  background: linear-gradient(40deg, #d32027, #f1a7a2);
}
</style>
