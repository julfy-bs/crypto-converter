<template>
  <div>
    <router-link
      class="logo"
      to="/"
      aria-label="move to main page"
    >
      <element-svg
        file-name="logo"
        class="logo__icon"
      />
      <span class="logo__text">Cryptolane</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import ElementSvg from '@/components/UI/ElementSvg.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.logo {
  color: $text-1;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: color .5s;
}

.logo__icon {
  width: 48px;
  height: 48px;
}

.logo__text {
  font-weight: 500;
  font-size: 30px;
  line-height: 120%;
  letter-spacing: -0.03em;
  transition: color .25s;
}
</style>