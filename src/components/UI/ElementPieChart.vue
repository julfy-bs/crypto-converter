<template>
  <PieChart
    ref="myChart"
    :chart-data="testData"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script setup lang="ts">
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed, onBeforeUnmount, ref, toRefs, watch, watchPostEffect } from 'vue'

Chart.register(...registerables)
Chart.defaults.font.family = 'Codec Pro'
Chart.defaults.font.size = 10
Chart.defaults.font.weight = '300'

interface Props {
  labels: string[];
  data: number[];
}

const myChart = ref<Chart | null>(null)
const props = defineProps<Props>()
const { labels, data } = toRefs(props)
const labelArray = computed(() => labels.value)
const dataArray = computed(() => data.value)

const testData = {
  labels: labelArray.value,
  datasets: [
    {
      data: dataArray.value,
      backgroundColor: ['#4959FF', '#4959FF', 'rgba(73, 89, 255, .3)'],
    },
  ],
}

const options = ref({
  responsive: true,
})
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.chart-container {
  transition: color .5s, background-color .5s;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>