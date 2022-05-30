<template>
  <h1 class="content__title">
    Currency exchange converter
  </h1>
  <history-chart>
    <currency-converter />
  </history-chart>
</template>

<script setup lang="ts">
import HistoryChart from '@/components/HistoryChart.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'
</script>
