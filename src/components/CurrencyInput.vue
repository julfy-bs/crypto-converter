<template>
  <div class="currency__input">
    <currency-input-dropdown
      :active-option="activeOption"
      :options="options"
      :type="type"
    />
    <input
      type="text"
      name="exchange input"
      :value="modelValue"
      @focusin="clearInput(modelValue, type)"
      @keydown="validateCurrency($event)"
      @keyup="convertMoney(modelValue, type)"
      @focusout="activateCurrencyMask(modelValue, props.activeOption.symbol, type)"
      @input="$emit('update:modelValue', $event.currentTarget.value)"
    >
  </div>
</template>

<script setup lang="ts">
import CurrencyInputDropdown from '@/components/CurrencyInputDropdown.vue'
import { defineEmits, defineProps, ref } from 'vue'
import { CurrencyOption } from '@/models/CurrencyOption.ts'
import { validateCurrency } from '@/helpers/validateCurrency.ts'
import { useConverter } from '@/hooks/useConverter'
import { InputType } from '@/models/InputType'

interface Props {
  options: CurrencyOption[];
  modelValue: string;
  type: InputType;
  activeOption: CurrencyOption;
}

const props = defineProps<Props>()
defineEmits(['update:modelValue'])
const {
  convertMoney,
  activateCurrencyMask,
  clearInput,
} = useConverter()

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
}
</style>