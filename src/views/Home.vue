<template>
  <div
    id="content"
    class="content__wrapper"
  >
    <history-chart />
  </div>
</template>

<script setup lang="ts">
import HistoryChart from '@/components/HistoryChart.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.content__wrapper {
  background: $bg-mute;
  height: 100%;
  width: 100%;
  border-radius: $page-br;
  transition: color .5s, background-color .5s;
  padding: var(--page-pdn);
}
</style>