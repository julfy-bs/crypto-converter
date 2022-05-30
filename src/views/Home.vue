<template>
  <h1 class="content__title">
    Currency exchange converter
  </h1>
  <history-chart v-if="!isLoading">
    <currency-converter />
  </history-chart>
  <element-loader v-else />
</template>

<script setup lang="ts">
import HistoryChart from '@/components/HistoryChart.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'
import ElementLoader from '@/components/UI/ElementLoader.vue'
import { useLoading } from '@/hooks/useLoading'

const { isLoading } = useLoading()
</script>
