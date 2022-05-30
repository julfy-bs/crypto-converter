<template>
  <div class="wallet">
    <div class="wallet__general-price">
      <span class="general-price__title">
        Total wallet price:
      </span>
      <span class="general-price__amount">
        {{ formatCurrency(totalPrice) }}
      </span>
    </div>
    <div class="wallet__list">
      <wallet-profile-item-header />
      <wallet-profile-item />
    </div>
    <div class="arithmetic-operations">
      <h3 class="arithmetic-operations__title">
        Arithmetic operations
      </h3>
      <div class="wallet__subtraction">
        <select
          v-model="modelSelect"
          class="currency__select"
        >
          <option
            v-for="item in wallet"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <input
          v-model="modelInput"
          type="text"
          class="currency__input"
        >
        <button
          v-if="isSummation"
          role="button"
          type="button"
          class="currency__button"
          @click="doArithmetic({modelSelect,
                                modelInput})"
        >
          Sum up
        </button>
      </div>
      <button
        role="button"
        type="button"
        class="arithmetic-operations__button"
        @click="toggleArithmetic"
      >
        Toggle
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import WalletProfileItem from '@/components/WalletProfileItem.vue'
import WalletProfileItemHeader from '@/components/WalletProfileItemHeader.vue'
import { useWallet } from '@/hooks/useWallet'
import { formatCurrency } from '@/helpers/formatCurrency'
import { useArithmetic } from '@/hooks/useArithmetic'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Wallet from '@/models/Wallet'
import { WalletKey, WalletPayload, WalletValue } from '@/models/WalletPayload'

const { totalPrice } = useWallet()
const { isSummation, toggleArithmetic } = useArithmetic()

const modelSelect = ref<HTMLSelectElement | string>('btc')
const modelInput = ref<HTMLInputElement | string>('')

const doArithmetic = (payload: WalletPayload<WalletKey, WalletValue>) => {
  if (isSummation) {
    addCurrency(payload)
  } else {
    subtractCurrency(payload)
  }
}

const store = useStore()
const wallet = computed((): Wallet => store.state.wallet.wallet)
const { addCurrency, subtractCurrency } = useArithmetic()
</script>

<style lang="scss">
@import "../assets/styles/variables";
@import "../assets/styles/mixins";


.wallet {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
}

.wallet__general-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 120%;
  font-weight: 500;
  font-size: 20px;

  @include tablets() {
    font-weight: 500;
    font-size: 36px;
  }

  .general-price__title, .general-price__amount {
    transition: color .25s;
  }

  .general-price__title {
    color: $text-1;
  }

  .general-price__amount {
    color: $secondary;
  }
}

.wallet__list {
  display: flex;
  flex-flow: column nowrap;
  gap: .5rem;
}

.wallet__item {
  display: grid;
  grid-template-columns: 2.5fr 2fr 1fr;
  width: 100%;
}

.arithmetic-operations {
  display: flex;
  flex-flow: column nowrap;

  gap: 1rem;
}

.arithmetic-operations__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
}


.wallet__subtraction {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: .5rem;
}

.currency__select {
  -webkit-appearance: none;
  position: relative;
}

.currency__select, .currency__input {
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
}

.currency__button[role='button'],
.arithmetic-operations__button[role='button'] {
  color: $white;
  transition: background-color .5s, color .25s;
  background-color: $main;
  border-radius: $btn-br;
  padding: $btn-pdn;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: $btn-height;

  &:focus {
    outline: none;
  }
}

.arithmetic-operations__button {
  margin: 0 auto;
  width: 50%;
}

</style>