<template>
  <div class="profile__chart">
    <element-pie-chart
      v-if="labelArray && dataArray"
      :labels="labelArray"
      :data="dataArray"
    />
  </div>
</template>

<script setup lang="ts">
import ElementPieChart from '@/components/UI/ElementPieChart.vue'
import { useWallet } from '@/hooks/useWallet'

const {
  labelArray,
  dataArray,
} = useWallet()
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";
</style>