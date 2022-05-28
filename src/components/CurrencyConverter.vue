<template>
  <section class="converter">
    <div
      class="converter__content"
    >
      <currency-input
        :options="options"
        default-value="btc"
      />
      <currency-input
        :options="options"
        default-value="usd"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CurrencyInput from '@/components/CurrencyInput.vue'
import { CurrencyOption } from '@/models/CurrencyOption'
const options: CurrencyOption[] = [
  {
    'id': 'bitcoin',
    'symbol': 'btc',
    'name': 'Bitcoin',
    'price': 1,
  },
  {
    'id': 'ethereum',
    'symbol': 'eth',
    'name': 'Ethereum',
    'price': 1,
  },
  {
    'id': 'usd',
    'symbol': 'usd',
    'name': 'US Dollar',
    'price': 1,
  }
]
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.converter {
  display: flex;
  flex-flow: column nowrap;
  gap: 40px;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;

  @include desktop() {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 2;
  }
}

.converter__content {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 1rem;

  @include tablets() {
    flex-direction: row;
  }
}

</style>