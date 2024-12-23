<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

// Register components
use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

interface RawDataItem {
  name: string;
  value: number;
}

interface ResultSet {
  rawData: () => Array<RawDataItem>;
}

const props = defineProps<{
  title?: string;
  resultSet: ResultSet;
}>();

provide(THEME_KEY, "light");

const headers = computed(() => {
  return props.resultSet.rawData().map((item) => item.name);
});

const data = computed(() => {
  return props.resultSet.rawData().map((item) => ({
    name: item.name,
    value: item.value,
  }));
});

// Define the option as a computed property to reactively update when props change
const option = computed(() => ({
  title: {
    text: props.title || "Pie Chart",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    bottom: "left",
    data: headers.value,
  },
  series: [
    {
      name: props.title || "Data",
      type: "pie",
      radius: "50%",
      data: data.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}));
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>