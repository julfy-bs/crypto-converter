<template>
  <div class="chart">
    <div class="chart__header">
      <div class="chart__select">
        <button
          class="chart__button"
          :class="{'chart__button--active' : payload.days === '1'}"
          role="switch"
          type="button"
          aria-label="choose price selection"
          @click="changePayload('days', '1')"
        >
          24h
        </button>
        <button
          class="chart__button"
          :class="{'chart__button--active' : payload.days === '7'}"
          role="switch"
          type="button"
          aria-label="choose price selection"
          @click="changePayload('days', '7')"
        >
          7d
        </button>
        <button
          class="chart__button"
          :class="{'chart__button--active' : payload.days === '14'}"
          role="switch"
          type="button"
          aria-label="choose price selection"
          @click="changePayload('days', '14')"
        >
          14d
        </button>
      </div>
      <div class="chart__select">
        <button
          class="chart__button"
          :class="{'chart__button--active' : payload.interval !== 'daily'}"
          role="switch"
          type="button"
          aria-label="choose price selection"
          @click="changePayload('interval', 'frequent')"
        >
          frequent
        </button>
        <button
          class="chart__button"
          :class="{'chart__button--active' : payload.interval === 'daily'}"
          role="switch"
          type="button"
          aria-label="choose price selection"
          @click="changePayload('interval', 'daily')"
        >
          daily
        </button>
      </div>
    </div>
    <element-loader v-if="isLoading" />
    <element-line-chart
      v-else-if="labelArray && pointsArray"
      :labels="labelArray"
      :points="pointsArray"
    />
  </div>
</template>

<script setup lang="ts">
import ElementLineChart from '@/components/UI/ElementLineChart.vue'
import ElementLoader from '@/components/UI/ElementLoader.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

const store = useStore()

interface ChartPayload {
  id: string;
  currency: string;
  days: string;
  interval: string;
}

const isLoading = ref<boolean>(false)

const getChartData = async (payload: ChartPayload) => await store.dispatch('coin/getChartData', payload)
const labelArray = computed((): string[] => store.getters['coin/labelArray'])
const pointsArray = computed((): string[] => store.getters['coin/pointsArray'])

const payload = ref<ChartPayload>({
  id: 'bitcoin',
  currency: 'usd',
  days: '14',
  interval: ''
})

const changePayload = async <K extends keyof ChartPayload> (key?: K, value?: ChartPayload[K]): Promise<ChartPayload> => {
  console.log('start loading', isLoading.value)
  isLoading.value = true
  if(key && value) {
  payload.value[key] = value
  }
  const data = await getChartData(payload.value)
  isLoading.value = false
  console.log('end loading', isLoading.value)
  return data
}

onMounted(() => {
  changePayload()
})
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.chart {
  display: flex;
  flex-flow: column nowrap;
  gap: 40px;
  min-height: 580px;
}

.chart__title {
  font-weight: 700;
  font-size: 40px;
  line-height: 120%;
  color: $text-1;
}

.chart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.chart__select {
  display: inline-flex;
  width: fit-content;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);


  .chart__button {
    color: $text-1;
    background-color: $bg;
    border: 1px solid $border-1;
    padding: .5rem 1rem;
    transition: color .5s, background-color .5s;
    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
      color: $white;
      background-color: $main;
    }

    &:first-child {
      border-top-left-radius: $btn-br;
      border-bottom-left-radius: $btn-br;
      border-right: none;
    }

    &:last-child:not(:nth-child(2)) {
      border-left: none;
    }

    &:last-child {
      border-top-right-radius: $btn-br;
      border-bottom-right-radius: $btn-br;
    }

  }
}
</style>