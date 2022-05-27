<template>
  <div class="home">
    <div class="content__wrapper">
      <history-chart />
    </div>
  </div>
</template>

<script setup lang="ts">
import HistoryChart from '@/components/HistoryChart.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.home {
  background: $bg-mute;
  height: 100%;
  width: 100%;
  border-radius: 48px;
  transition: color .5s, background-color .5s;
}

.content__wrapper {
  padding: var(--page-pdn);
}
</style>