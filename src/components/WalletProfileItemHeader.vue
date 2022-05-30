<template>
  <div
    class="wallet__item
          currency-list__header-template"
  >
    <span
      class="currency__name
            currency-list__header-template"
    >
      Name
    </span>
    <span
      v-if="!isWalletEditing"
      class="currency__value
            currency-list__header-template"
    >
      Value
    </span>
    <span
      v-else
      class="currency__input
            currency-list__header-template"
    >
      Enter value
    </span>
    <span
      class="currency__button
            currency-list__header-template"
    >
      Edit
    </span>
  </div>
</template>

<script setup lang="ts">
import { useWallet } from '@/hooks/useWallet'

const { isWalletEditing } = useWallet()
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.wallet__item .currency-list__header-template {
  border-bottom: 1px solid $text-3;
}

.currency__button.currency-list__header-template {
  text-align: center;
}

.currency-list__header-template {
  color: $text-1;
  transition: color .25s;
}
</style>