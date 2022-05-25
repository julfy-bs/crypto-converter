<template>
  <main-header />
  <router-view />
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
</script>

<style lang="scss">
/* General variables */
:root {
  --font: 'Codec Pro', -apple-system, sans-serif;
  --header-height: 60px;
  --screen-max-width: 1376px;
  --screen-min-width: 320px;
  // colors
  --c-base-0: #FCFCFC;
  --c-base-50: #F3F4F6;
  --c-base-200: #99A7B5;
  --c-base-300: #677B8F;
  --c-base-500: #012345;
  --c-base-600: #011C37;
  --c-main-400: #4959FF;
  --c-secondary: #F84AB3;
  --c-secondary-500: #F61D9F;
  // decorators
  --btn-br: 6px;
  --btn-pdn: 12px;
}

/* Light mode variables */
:root.light-theme {
  --text-1: var(--c-base-500);
  --text-2: var(--c-base-300);

  --bg: var(--c-base-0);
  --bg-mute: var(--c-base-50);
}

/* Dark mode variables */
:root.dark-theme {
  --text-1: var(--c-base-0);
  --text-2: var(--c-base-200);

  --bg: var(--c-base-500);
  --bg-mute: var(--c-base-600);
}

@import "src/assets/styles/_variables.scss";

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

.app__container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $bg;
  transition: background-color .5s;
}

*, :before, :after {
  box-sizing: border-box;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

body {
  margin: 0;
}

body {
  width: 100%;
  min-width: $screen-min-width;
  min-height: 100vh;
  font-family: $font;
  letter-spacing: .2px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  color: $text-1;
  background-color: $bg;
  transition: color .5s, background-color .5s;

  &.modal-open {
    overflow: hidden;
  }
}

button, input, optgroup, select, textarea {
  border: 0;
  padding: 0;
  line-height: inherit;
  color: inherit;
}

ul, ol {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: inherit;
}

button, input, select, textarea {
  border: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  background-color: transparent;
}

a, area, button, [role=button], input, label, select, summary, textarea {
  touch-action: manipulation;
}

button {
  padding: 0;
  background-color: transparent;
  background-image: none;
}

button, [role=button] {
  cursor: pointer;
}

img, video {
  max-width: 100%;
  height: auto;
}

section {
  padding: 100px 32px;
  max-width: 960px;
  margin: 0 auto;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 100%;
  font-size: 12px;
  opacity: 0;
  transition: .5s;
  pointer-events: none;
  padding: 1rem;
  text-align: center;
  background: $bg-mute;
  color: inherit;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3)
}

[data-tooltip]:hover::after {
  opacity: 1;
  top: 3rem;
}
</style>
