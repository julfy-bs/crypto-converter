<template>
  <div class="chat">
    <button
      class="message"
      role="button"
      type="button"
      aria-label="toggle chat"
    >
      <element-svg
        file-name="message"
        class="message__icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import ElementSvg from '@/components/UI/ElementSvg.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.message {
  width: 44px;
  height: 44px;
  color: $text-1;
  padding: $btn-pdn;
  border-radius: $btn-br;
  transition: background-color .5s, color .5s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $bg-mute;
  }
}

.message__icon {
  color: $text-3;
  width: 24px;
  height: 24px;
}
</style>