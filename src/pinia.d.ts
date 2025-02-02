// src/pinia.d.ts
import { Router } from "vue-router";
import "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}
