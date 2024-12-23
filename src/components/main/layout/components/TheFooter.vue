<template>
  <div>
    <v-footer>
      <BaseContainer>
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <div>
              <v-img
                src="/assets/owtosked-logo.png"
                alt="Owtosked Logo"
                height="100"
                width="200"
              ></v-img>
              <div>
                <p class="pb-[1rem] text-[1rem] font-[500]">
                  iPARA Technologies and Solutions Inc.
                </p>
                <p class="pb-[1rem] text-[1rem] font-[500]">
                  1008 One Executive Building 5 West Avenue, Nayong Kanluran
                  Quezon City 1104, Metro Manila
                </p>
                <p class="text-red-darken-2 text-[1rem] font-[500]">
                  <a href="mailto:support@owtoph.com">support@owtoph.com</a>
                </p>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div>
              <h2 class="text-red-darken-2 pb-3 text-[1.2rem] font-[600]">
                Useful Links
              </h2>

              <div
                v-for="footerLink of footerLinks"
                :key="footerLink.title"
                class="flex pb-3"
              >
                <v-icon class="text-red-darken-2">{{ footerLink.icon }}</v-icon>
                <router-link :to="footerLink.url"
                  ><p class="hover:text-red-600">
                    {{ footerLink.title }}
                  </p></router-link
                >
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div>
              <div>
                <h2 class="text-red-darken-2 pb-3 text-[1.2rem] font-[600]">
                  Our Social Networks
                </h2>
                <p class="pb-[1rem] text-[1rem] font-[500]">
                  Follow us on social media and feel free to reach out to us
                  there.
                </p>
              </div>
              <div class="flex gap-2">
                <div
                  v-for="social in footerSocial"
                  :key="social.name"
                  class="rounded-[.275rem] bg-red-500 text-white hover:bg-red-600"
                >
                  <a :href="social.url">
                    <v-chip label>
                      <v-icon>{{ social.icon }}</v-icon>
                    </v-chip>
                  </a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </BaseContainer>
    </v-footer>
    <div class="bg-red-darken-2 flex items-center justify-center py-10">
      <p class="text-center">© Copyright. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseContainer from "@/shared/components/BaseContainer.vue";
import { footerLinks } from "@/service/json/Main/footerLinks";
import { footerSocial } from "@/service/json/Main/FooterSocial";
</script>

<style scoped></style>
