<template>
  <section class="py-[5rem]">
    <BaseContainer>
      <v-row>
        <v-col cols="12" md="6">
          <div>
            <img
              src="/assets/main/monitoring-logo.png"
              alt="Monitoring of Transactions Image"
              class="rounded-3xl"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="pl-[1rem]">
            <h2
              class="text-uppercase text-red text-[1.8rem] font-[700] md:text-[2.625rem]"
            >
              Easily Monitoring Transactions
            </h2>

            <v-card-title class="text-h2 px-0 pb-5"></v-card-title>

            <div class="flex pb-5">
              <BaseAvatar class="bg-red rounded-full" size="20">
                <div class="text-[.5rem]">
                  <BaseIcon icon="mdi-check" />
                </div>
              </BaseAvatar>

              <p class="pl-5">
                With our system, you have complete control over employee
                management, allowing you to streamline tasks and maintain
                oversight effortlessly.
              </p>
            </div>
            <div class="flex pb-5">
              <BaseAvatar class="bg-red rounded-full" size="20">
                <div class="text-[.5rem]">
                  <BaseIcon icon="mdi-check" />
                </div>
              </BaseAvatar>

              <p class="pl-5">
                Our platform also simplifies the process of monitoring and
                recording trip expenses, making it easy to keep accurate records
                and manage budgets effectively.
              </p>
            </div>
            <div class="flex">
              <BaseAvatar class="bg-red rounded-full" size="20">
                <div class="text-[.5rem]">
                  <BaseIcon icon="mdi-check" />
                </div>
              </BaseAvatar>

              <p class="pl-5">
                Our solution provides you with the tools needed to oversee
                employee activities and ensure smooth operations. You can
                effortlessly handle various aspects of employee management,
                making your job simpler and more efficient
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseAvatar from "@/shared/components/Avatar/BaseAvatar.vue";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import BaseContainer from "@/shared/components/BaseContainer.vue";
</script>

<style scoped></style>
