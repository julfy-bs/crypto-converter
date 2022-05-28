<template>
  <div class="input__group">
    <label
      :for="name"
    >
      {{ capitalizeFirstLetter(name) }}
    </label>
    <input
      v-model="input"
      :type="type"
      :name="name"
      :placeholder="placeholder ? placeholder : `Enter ${name}`"
    >
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRefs } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter.ts'

type inputType = 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'color' | 'date' | 'file'

interface Props {
  type: inputType;
  name: string;
  placeholder?: string;
}

const props = defineProps<Props>()
const { type = 'text', name, placeholder } = toRefs(props)

const input = ref<string>('')

onMounted(() => {
  if (placeholder?.value) {
    input.value = placeholder.value
  }
})
</script>

<style scoped lang='scss'>
@import "../../assets/styles/variables";

.input__group {
  display: flex;
  flex-flow: column nowrap;
  gap: .5rem;

  label {
    transition: color 0.25s;
    color: $text-1;
  }

  input {
    border: 1px solid $border-1;
    border-radius: 8px;
    padding: 6px 12px;
    transition: color 0.25s;
    color: $text-1;

    &::placeholder {
      color: $text-3;
    }
  }
}
</style>
