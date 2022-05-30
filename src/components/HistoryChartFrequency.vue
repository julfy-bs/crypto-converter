<template>
  <div class="chart__select chart__frequency">
    <button
      class="chart__button"
      :class="{'chart__button--active' : payload.interval !== 'daily'}"
      role="switch"
      type="button"
      aria-label="choose price selection"
      @click="changePayload('interval', 'frequent')"
    >
      frequent
    </button>
    <button
      class="chart__button"
      :class="{'chart__button--active' : payload.interval === 'daily'}"
      role="switch"
      type="button"
      aria-label="choose price selection"
      @click="changePayload('interval', 'daily')"
    >
      daily
    </button>
  </div>
</template>

<script setup lang="ts">
import { useConverter } from '@/hooks/useConverter'
const { changePayload, payload } = useConverter()
</script>