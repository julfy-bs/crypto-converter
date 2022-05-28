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

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.content__title {
  color: $text-1;
  transition: color .25s;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 120%;
}
</style>