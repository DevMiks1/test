<template>
  <div class="mx-auto">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue";
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

// Register ECharts components
use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

// Define interfaces for props
interface MonthlyReportItem {
  name: string; // Adjust if the actual key is different
  value: number; // Adjust based on your data structure
}

interface MonthlyReport {
  rawData: () => MonthlyReportItem[]; // Array of monthly report items
}

// Define props with types
const props = defineProps<{
  title?: string;
  monthlyReport: MonthlyReport; // Use the defined interface
}>();

// Provide theme key
provide(THEME_KEY, "light");

// Compute headers and data from monthlyReport
const headers = computed(() => {
  return props.monthlyReport.rawData().map((item) => item.name); // Assuming name is the first property
});

const data = computed(() => {
  return props.monthlyReport.rawData().map((item) => ({
    name: item.name,
    value: item.value,
  }));
});

// Define the option as a computed property to reactively update when props change
const option = computed(() => ({
  title: {
    text: props.title || "Monthly Consume",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: headers.value,
    right: "right",
  },
  xAxis: {
    type: "category",
    data: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: props.title || "Data",
      type: "bar",
      data: data.value,
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
