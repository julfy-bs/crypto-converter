<template>
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
      {{ props.activeOption.symbol.toUpperCase() }}
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
        :class="{'dropdown__item--active': option.symbol === activeOption.symbol}"
        type="button"
        role="button"
        aria-label="change active currency"
        @click="updateApp(option)"
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
</template>

<script setup lang="ts">
import { useFlayout } from '@/hooks/useFlayout'
import { defineProps, ref } from 'vue'
import { CurrencyOption } from '@/models/CurrencyOption'
import { useConverter } from '@/hooks/useConverter'
import { InputType } from '@/models/InputType'


interface Props {
  options: CurrencyOption[];
  type: InputType;
  activeOption: CurrencyOption;
}

const props = defineProps<Props>()
const { closeFlyout, toggleFlyout } = useFlayout()
const group = ref<HTMLDivElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)

const {
  changePayload,
  optionsFrom,
  optionsTo,
  getCoinData,
  changeActiveOptions,
  eraseInput
} = useConverter()

const updateApp = async (option: CurrencyOption) => {
  eraseInput()
  changeActiveOptions({
    id: option.id,
    symbol: option.symbol,
    name: option.name,
  }, props.type)
  await getCoinData(optionsFrom.value.id)
  await changePayload('currency', optionsTo.value.symbol)
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.input__button, input {
  height: $btn-height;
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 100%;

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