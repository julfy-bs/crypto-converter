<template>
  <div class="notification notification--active">
    <button
      class="notification__button"
      role="button"
      type="button"
      aria-label="toggle notifications"
    >
      <element-svg
        file-name="notification"
        class="notification__icon"
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
.notification {
  &--active {
    position: relative;

    &::after {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      top: 12px;
      right: 13px;
      background-color: $secondary-500;
    }
  }
}

.notification__button {
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

.notification__icon {
  color: $text-3;
  width: 20px;
  height: 19px;
}
</style>