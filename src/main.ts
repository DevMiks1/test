import "./global.css";
import "@mdi/font/css/materialdesignicons.css";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { createApp } from "vue";
import { markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueEcharts from "vue-echarts";
import router from "./router/index";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const customColor = {
  colors: {
    red: "#d32027",
    green: "#388E3C",
    dark: "#1d1d1b",
    lightGrey: "#ededed",
  },
};
const vuetify = createVuetify({
  components: {
    VDateInput,
    VTimePicker,
    ...components,
  },
  directives: {
    ...directives,
  },
  theme: {
    defaultTheme: "customColor",
    themes: {
      customColor,
    },
  },
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.component("v-chart", VueEcharts);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");
