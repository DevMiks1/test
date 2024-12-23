<template>
  <section class="py-10">
    <BaseContainer>
      <v-row>
        <v-col cols="12" md="4">
          <div class="mb-5 flex gap-5 rounded-lg bg-white p-4">
            <div>
              <BaseChip label color="red">
                <BaseIcon icon="mdi-alert" class="p-4" />
              </BaseChip>
            </div>
            <div>
              <h1 class="text-[1.2rem] font-[500]">Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="mb-5 flex gap-5 rounded-lg bg-white p-4">
            <div>
              <BaseChip label color="red">
                <BaseIcon icon="mdi-alert" class="p-4" />
              </BaseChip>
            </div>
            <div>
              <h1 class="text-[1.2rem] font-[500]">Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="mb-5 flex gap-5 rounded-lg bg-white p-4">
            <div>
              <BaseChip label color="red">
                <BaseIcon icon="mdi-alert" class="p-4" />
              </BaseChip>
            </div>
            <div>
              <h1 class="text-[1.2rem] font-[500]">Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="flex gap-5 rounded-lg bg-white p-4">
            <div>
              <BaseChip label color="red">
                <BaseIcon icon="mdi-alert" class="p-4" />
              </BaseChip>
            </div>
            <div>
              <h1 class="text-[1.2rem] font-[500]">Lorem, ipsum dolor.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-carousel hide-delimiters show-arrows="hover" cycle interval="2000">
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="image.src"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import BaseChip from "@/shared/components/Chip/BaseChip.vue";
import BaseIcon from "@/shared/components/Icon/BaseIcon.vue";
import { images } from "@/service/json/dummy-content";
</script>

<style></style>
