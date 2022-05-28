<template>
  <div class="slogan">
    <span>World's first convenient cryptocurrency converter</span>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.slogan {
  flex: 1 0 fit-content;
  display: none;

  @include desktop() {
    display: block;
  }

  span {
    font-weight: 300;
    font-size: 16px;
    line-height: 152%;
    color: $text-2;
  }
}
</style>