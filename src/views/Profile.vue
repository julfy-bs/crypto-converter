<template>
  <h1 class="content__title">
    Profile
  </h1>
  <section
    v-if="!isLoading"
    class="profile"
  >
    <wallet-chart />
    <wallet-profile />
  </section>
  <element-loader v-else />
</template>

<script setup lang="ts">
import WalletChart from '@/components/WalletChart.vue'
import WalletProfile from '@/components/WalletProfile.vue'
import ElementLoader from '@/components/UI/ElementLoader.vue'
import { useLoading } from '@/hooks/useLoading'

const { isLoading } = useLoading()
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.profile {
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;

  @include tablets-big() {
    flex-direction: row;
    gap: 1rem;
  }
}

.profile__chart, .wallet {
  flex: 1 1 100%;
  max-width: 100%;

  @include tablets-big() {
    flex: 1 1 50%;
    max-width: 50%;
  }
}
</style>