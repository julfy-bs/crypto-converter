<template>
  <div class="chart">
    <h1>123</h1>

    <element-chart
      v-if="loaded"
      :chart-data="dateArray"
    />

    <div class="chart-button">
      <button>
        24h
      </button>
      <button>
        7d
      </button>
      <button>
        14d
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ElementChart from '@/components/UI/ElementChart.ts'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
const store = useStore()
interface ChartPayload {
  id: string;
  currency: string;
  days: string;
  interval: string;
}

const loaded = ref<boolean>(false)

const getChartData = (payload: ChartPayload) => store.dispatch('coin/getChartData', payload)
const chartData = computed((): string[] => store.state.coin.chart)
const labelArray = ref<string[]>([])
const dateArray = ref<Date[]>([])
chartData.value.forEach(item => {
  labelArray?.value.push(item[0])
  dateArray?.value.push(new Date(item[1]))
})



getChartData({
  id: 'bitcoin',
  currency: 'usd',
  days: '14',
  interval: 'daily'
})

if (chartData.value && dateArray && labelArray) {
  loaded.value = true
}

console.log(chartData)


</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";
</style>