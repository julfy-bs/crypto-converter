<template>
  <section class="chart">
    <div class="chart__header">
      <history-chart-range />
      <slot />
      <history-chart-frequency />
    </div>
    <element-line-chart
      v-if="labelArray && pointsArray"
      :labels="labelArray"
      :points="pointsArray"
    />
  </section>
</template>

<script setup lang="ts">
import ElementLineChart from '@/components/UI/ElementLineChart.vue'
import { useConverter } from '@/hooks/useConverter'
import HistoryChartRange from '@/components/HistoryChartRange.vue'
import HistoryChartFrequency from '@/components/HistoryChartFrequency.vue'
const { labelArray, pointsArray } = useConverter()
</script>

<style lang="scss">
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.chart {
  display: flex;
  flex-flow: column nowrap;
  gap: 40px;
}

.chart__title {
  font-weight: 700;
  font-size: 40px;
  line-height: 120%;
  color: $text-1;
}

.chart__header {
  display: grid;
  width: 100%;
  height: fit-content;
  gap: 1rem;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 2fr 1fr;

  @include tablets() {
    grid-template-rows: 1fr 1fr;
  }

  @include desktop() {
    grid-column-gap: 1rem;
    grid-row-gap: 0;
    grid-template-rows: 1fr;
  }
}

.chart__select.chart__range,
.chart__select.chart__frequency {
  width: 100%;
  height: fit-content;
  grid-row-start: 2;
  grid-row-end: 2;

  @include tablets() {
    width: fit-content;
  }
}

.chart__select.chart__range {
  grid-column-start: 1;
  grid-column-end: 2;

  @include tablets() {
    grid-column-start: 1;
  }
}

.chart__select.chart__frequency {
  grid-column-start: 4;
  @include tablets() {
    margin-left: auto;
  }
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
    height: $btn-height;
    flex: 1 1 auto;

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

    &:focus {
      outline: none;
      background-color: $main-op-1;
    }
  }
}
</style>