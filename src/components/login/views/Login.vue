<template>
  <section id="login">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        order="2"
        order-sm="1"
        class="bg-white"
      >
        <LoginForm />
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="8" order="1" order-sm="2">
        <div class="background flex h-[100vh] items-center justify-center">
          <img
            src="/assets/login/car-logo.png"
            alt="Car Image"
            class="image pt-5 md:h-[20rem]"
          />
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import "../styles/login.css";
import LoginForm from "../components/LoginForm.vue";
</script>
