<template>
  <LineChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { LineChart } from 'vue-chart-3'
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ActiveElement
} from 'chart.js'

interface Props {
  labels: string[];
  points: string[];
}

const props = defineProps<Props>()
const { labels, points } = toRefs(props)
const dataValues = computed(() => points.value)
const labelValues = computed(() => labels.value)
const data = computed(() => ({
  labels: labelValues.value,
  datasets: [
    {
      label: 'Bitcoin price',
      data: dataValues.value
    }
  ]
}))

Chart.defaults.font.family = 'Codec Pro'
Chart.defaults.font.size = 10
Chart.defaults.font.weight = '300'

const tooltipLine = {
  id: 'tooltipLine',
  type: 'line',
  beforeDraw: (chart: Chart) => {
    const active: ActiveElement[] = chart.getActiveElements()
    if (active && active.length) {
      const ctx = chart.ctx
      ctx.save()
      const activePoint = active[0]
      // bottom line - red
      ctx.beginPath()
      ctx.moveTo(activePoint.element.x, activePoint.element.y)
      ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#F61D9F'
      ctx.stroke()
      ctx.restore()
      // top line - green
      ctx.beginPath()
      ctx.moveTo(activePoint.element.x, chart.chartArea.top)
      ctx.lineTo(activePoint.element.x, activePoint.element.y)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#42B883'
      ctx.stroke()
      ctx.restore()
    }
  }
}


const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  hoverBackgroundColor: ['#F84AB3'],
  hoverBorderColor: ['#FCFCFC'],
  backgroundColor: ['#4959FF'],
  borderColor: ['#4959FF'],
  borderWidth: 2,
  tension: .3,
  pointRadius: 0,
  pointBorderWidth: 0,
  pointBackgroundColor: ['#FCFCFC'],
  pointHoverBorderWidth: 10,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: ['rgba(73, 89, 255, 1)'],
  pointHoverBorderColor: ['rgba(73, 89, 255, .3)'],
  scales: {
    xAxes: {
      ticks: {
        color: '#677B8F',
      }
    },
    yAxes: {
      display: true,
      ticks: {
        display: true,
        color: '#677B8F',
        callback: (value: number): string => {
          return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'USD' }).format(value)
        }
      }
    }
  },
  plugins: [{
    tooltipLine,
    title: {
      display: true,
      text: 'Custom Chart Title'
    }
  }]
})

Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    tooltipLine
)
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.chart-container {
  transition: color .5s, background-color .5s;
  font: $font;
  background-color: $bg;
  border-radius: $page-br;
  border: 1px solid $border-1;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 400px;
  padding: $page-pdn-small;
}
</style>