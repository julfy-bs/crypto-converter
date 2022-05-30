<template>
  <div
    class="app__container"
  >
    <main-header />
    <main class="main">
      <div class="main__container">
        <div
          id="content"
          class="content__wrapper"
        >
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
</script>

<style lang="scss">
/* General variables */
:root {
  --font: 'Codec Pro', -apple-system, sans-serif;
  --header-height: 80px;
  --screen-max-width: 1376px;
  --screen-min-width: 380px;
  // colors
  --c-base-0: #FCFCFC;
  --c-base-0-op-1: rgba(252, 252, 252, .1);
  --c-base-50: #F3F4F6;
  --c-base-200: #99A7B5;
  --c-base-300: #677B8F;
  --c-base-500: #012345;
  --c-base-500-op-1: rgba(1, 35, 69, .1);
  --c-base-600: #011C37;
  --c-main-400: #4959FF;
  --c-main-400-op-1: rgba(73, 89, 255, .5);
  --c-secondary: #F84AB3;
  --c-secondary-500: #F61D9F;
  --c-secondary-100: #42B883;
  //// decorators
  // btn
  --btn-br: 6px;
  --btn-pdn: 12px;
  --btn-height: 40px;
  // page content
  --header-padding: 0 16px;
  --page-pdn: 32px 16px;
  --page-pdn-small: 4px 8px;
  --page-br: 24px;
  // box-shadow
  --shadow-1: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06);

  @media (min-width: 460px) {
    --header-height: 90px;
    --header-padding: 0 24px;
    --page-pdn: 40px 24px;
    --page-pdn-small: 8px 16px;
    --page-br: 32px;
  }

  @media (min-width: 768px) {
    --header-height: 100px;
    --header-padding: 0 32px;
    --page-pdn: 48px 32px;
    --page-pdn-small: 16px 24px;
    --page-br: 40px;
  }

  @media (min-width: 960px) {
    --header-height: 100px;
    --header-padding: 0 40px;
    --page-pdn: 48px 40px;
    --page-pdn-small: 28px 32px;
    --page-br: 48px;
  }

  @media (min-width: 1280px) {
    --header-height: 100px;
    --header-padding: 0 8px 0 0;
    --page-pdn: 56px 64px;
    --page-pdn-small: 28px 32px;
    --page-br: 48px;
  }
}

/* Light mode variables */
:root.light-theme {
  --text-1: var(--c-base-500);
  --text-2: var(--c-base-300);
  --text-3: var(--c-base-200);
  --border-1: var(--c-base-500-op-1);

  --bg: var(--c-base-0);
  --bg-mute: var(--c-base-50);
}

/* Dark mode variables */
:root.dark-theme {
  --text-1: var(--c-base-0);
  --text-2: var(--c-base-200);
  --text-3: var(--c-base-200);
  --border-1: var(--c-base-0-op-1);

  --bg: var(--c-base-500);
  --bg-mute: var(--c-base-600);
}

@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

html {
  scroll-behavior: smooth;
  font-size: 12px;
  background-color: var(--bg);

  @include phones() {
    font-size: 14px;
  }

  @include tablets() {
    font-size: 16px;
  }
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
  height: 100vh;
  min-width: $screen-min-width;
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

.app__container {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background-color: $bg;
  transition: background-color .5s;
}

.main {
  background-color: $bg;
  transition: color .5s, background-color .5s;
}

.main__container {
  padding-bottom: 20px;
  max-width: $screen-max-width;
  margin: 0 auto;
}

.content__wrapper {
  background: $bg-mute;
  height: 100%;
  width: 100%;
  border-radius: $page-br;
  transition: color .5s, background-color .5s;
  padding: var(--page-pdn);
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  min-height: calc((100vh - #{$header-height} - 20px));
}

.content__title {
  color: $text-1;
  transition: color .25s;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 120%;
}
</style>
