<template>
  <div class="chart__select chart__range">
    <button
      class="chart__button"
      :class="{'chart__button--active' : payload.days === '1'}"
      role="switch"
      type="button"
      aria-label="choose price selection"
      @click="changePayload('days', '1')"
    >
      24h
    </button>
    <button
      class="chart__button"
      :class="{'chart__button--active' : payload.days === '7'}"
      role="switch"
      type="button"
      aria-label="choose price selection"
      @click="changePayload('days', '7')"
    >
      7d
    </button>
    <button
      class="chart__button"
      :class="{'chart__button--active' : payload.days === '14'}"
      role="switch"
      type="button"
      aria-label="choose price selection"
      @click="changePayload('days', '14')"
    >
      14d
    </button>
  </div>
</template>

<script setup lang="ts">
import { useConverter } from '@/hooks/useConverter'
const { changePayload, payload } = useConverter()
</script>