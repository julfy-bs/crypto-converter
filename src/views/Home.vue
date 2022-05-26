<template>
  <div class="home">
    <div class="">
      <history-chart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
import HistoryChart from '@/components/HistoryChart.vue'
const getGraph = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false'
    const { data } = await axios.get(url)
    console.log(data)
  } catch (e) {
    throw new Error(e.message)
  }
}

onMounted(() => {
  getGraph()
})
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.home {
  background: $bg-mute;
  height: 100%;
  width: 100%;
  padding: var(--page-pdn);
  border-radius: 48px;
  transition: color .5s, background-color .5s;
}

.widget {
  height: 100px;
  width: 800px;
}

.crypto__widget {

}
</style>