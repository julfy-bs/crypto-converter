<template>
  <section class="converter">
    <div
      class="converter__content"
    >
      <currency-input
        :active-option="optionsFrom"
        :options="options"
        :model-value="valueFrom"
        type="from"
        @update:modelValue="newValue => valueFrom = newValue"
      />
      <currency-input
        :active-option="optionsTo"
        :options="options"
        :model-value="valueTo"
        type="to"
        @update:modelValue="newValue => valueTo = newValue"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CurrencyInput from '@/components/CurrencyInput.vue'
import { CurrencyOption } from '@/models/CurrencyOption'
import { useConverter } from '@/hooks/useConverter'
const options: CurrencyOption[] = [
  {
    'id': 'bitcoin',
    'symbol': 'btc',
    'name': 'Bitcoin'
  },
  {
    'id': 'ethereum',
    'symbol': 'eth',
    'name': 'Ethereum'
  },
  {
    'id': 'usd',
    'symbol': 'usd',
    'name': 'US Dollar'
  }
]
const { valueTo, optionsTo, valueFrom, optionsFrom } = useConverter()
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