<template>
  <div class="currency__input">
    <button
      ref="button"
      class="input__button"
      type="button"
      role="button"
      aria-label="toggle currency dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="toggleFlyout(group, button)"
    >
      <span>
        {{ props.defaultValue.toUpperCase() }}
      </span>
    </button>
    <transition name="modal-animation">
      <div
        ref="group"
        class="input__dropdown"
        @mouseleave="closeFlyout(group, button)"
      >
        <button
          v-for="option in options"
          :key="option.id"
          class="dropdown__item"
          :class="{'dropdown__item--active': option.symbol === currentData.symbol}"
          type="button"
          role="button"
          aria-label="change active currency"
        >
          <span class="item__symbol">
            {{ option.symbol }}
          </span>
          <span class="item__name">
            {{ option.name }}
          </span>
        </button>
      </div>
    </transition>
    <input
      v-model="input"
      type="text"
      name="exchange input"
      @focusin="clearInput"
      @keydown="convertAction($event)"
      @focusout="activateCurrencyMask(+input)"
    >
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { CurrencyOption } from '@/models/CurrencyOption.ts'
import { validateCurrency } from '@/helpers/validateCurrency.ts'
import { formatCurrency } from '@/helpers/formatCurrency.ts'
import { useFlayout } from '@/hooks/useFlayout'
import CurrentData from '@/models/CurrentData'
import { useStore } from 'vuex'
import { useConverter } from '@/hooks/useConverter'

interface Props {
  options: CurrencyOption[];
  defaultValue: string;
  name: string;
}
const store = useStore()
const currentData = computed((): CurrentData => store.getters['coin/currentData'])
const group = ref<HTMLDivElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)
const { closeFlyout, toggleFlyout } = useFlayout()
const props = defineProps<Props>()
const input = ref<HTMLInputElement | string>('')

const clearInput = () => {
  input.value = input.value
      .toString()
      .replace(',00', '')
      .replace('$', '')
      .replace(/\s/g, '')
}
const activateCurrencyMask = (value: number) => {
  input.value = ''
  input.value = formatCurrency(+value)
}
const { convertMoney } = useConverter()
const convertAction = (event: KeyboardEvent) => {
  convertMoney()
  validateCurrency(event)
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
@import "../assets/styles/_mixins.scss";

.currency__input {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid $border-1;
  border-radius: $btn-br;
  width: 100%;

  .input__button, input {
    height: $btn-height;
    padding: .5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 100%;
    color: $text-1;
    background-color: transparent;
    transition: color .5s, background-color .5s;

    &:focus {
      outline: none;
    }
  }

  .input__button {
    position: relative;
    border-right: 1px solid $border-1;
    padding-right: calc(1rem + 20px);
    color: $text-1;
    transition: color .25s;

    :before {
      content: "";
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  }
}

.input__dropdown {
  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  min-width: 100%;
  top: 100%;
  box-shadow: $shadow;
  z-index: $z-index-backdrop;
  background-color: $bg-mute;
  border-radius: $btn-br;
  border: 1px solid $border-1;

  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);

  @include tablets() {
    min-width: 390px;
  }

  .dropdown__item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 1px solid $border-1;
    border-radius: $btn-br;
    width: 100% ;

    &:first-child {
      border-top-left-radius: $btn-br;
      border-top-right-radius: $btn-br;
    }

    &:last-child:not(&:nth-child(2)) {
      border-bottom-left-radius: $btn-br;
      border-bottom-right-radius: $btn-br;
      border: none;
    }

    .item__name, .item__symbol {
      padding: $btn-pdn;
      color: $text-1;
      transition: color .25s;
    }

    .item__name {
      flex: 1 1 70%;
    }

    .item__symbol {
      flex: 0 0 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid $border-1;
      padding-right: calc(1rem + 20px);
    }

    &--active {
      background-color: $main;
      transition: background-color .5s, color .25s;

      .item__name, .item__symbol {
        color: $white;
      }
    }
  }
}

.currency__input.open {
  height: auto;
}
.input__button[aria-expanded=true] + .input__dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}


.modal-animation {
  &-enter-active {
    transition: all 0.2s ease-out;
  }

  &-leave-active {
    transition: all 0.2s ease-out;
  }

  &-leave-to {
    transform: translateY(-40px);
    opacity: 0;
  }

  &-enter-from {
    opacity: .3;
    transform: translateY(-40px);
  }

  &-enter {
    opacity: 1;
    transform: translateY(0px);
  }

  &-enter-to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>