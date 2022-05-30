<template>
  <div
    v-for="item in wallet"
    :key="item.id"
    class="wallet__item"
  >
    <span class="currency__name">
      {{ item.name }}
    </span>
    <span
      v-if="!item.isEditable"
      class="currency__value"
    >
      {{ formatCurrency(item.value, item.id) }}
    </span>
    <input
      v-else
      v-model="item.value"
      type="text"
      class="currency__input"
      @keyup="editCurrency({key: item.id, value: item.value})"
    >
    <button
      v-if="!item.isEditable"
      role="button"
      type="button"
      class="currency__button"
      @click="toggleEditing(item.id)"
    >
      Edit
    </button>
    <button
      v-else
      role="button"
      type="button"
      class="currency__button currency__button--save"
      @click="toggleEditing(item.id)"
    >
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWallet } from '@/hooks/useWallet'
import { formatCurrency } from '@/helpers/formatCurrency'
import { computed } from 'vue'
import Wallet from '@/models/Wallet'
import { useStore } from 'vuex'

const store = useStore()
const wallet = computed((): Wallet => store.state.wallet.wallet)

const {
  editCurrency,
  toggleEditing
} = useWallet()
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.wallet__item {
  display: grid;
  grid-template-columns: 2.5fr 2fr 1fr;
  width: 100%;

  .currency__name,
  .currency__value,
  .currency__input, {
    margin: auto 0;
    color: $text-1;
    transition: color .25s;
  }

  .currency__input {
    max-width: 100%;
    width: 100%;
    background-color: transparent;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid $border-1;
    border-radius: $btn-br;
    padding: .5rem 1rem;
    height: $btn-height;

    &::placeholder {
      color: $text-2;
      transition: color .25s;
    }

    &:focus {
      outline: none;
    }

    @include tablets() {
      max-width: 60%;
    }
  }

  button.currency__button, [role='button'] {
    color: $white;
    transition: background-color .5s, color .25s;
    background-color: $main;
    border-radius: $btn-br;
    padding: $btn-pdn;
    height: $btn-height;
  }

  button.currency__button--save, [role='button'] {
    background-color: $green;
  }
}
</style>