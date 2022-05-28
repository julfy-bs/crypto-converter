<template>
  <header
    class="header"
  >
    <div class="navbar">
      <div class="navbar__container">
        <main-logo />
        <div class="content">
          <main-slogan />
          <change-appearance />
          <main-messages />
          <main-notification />
          <main-profile />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MainLogo from '@/components/MainLogo.vue'
import ChangeAppearance from '@/components/ChangeAppearence.vue'
import MainSlogan from '@/components/MainSlogan.vue'
import MainMessages from '@/components/MainMessages.vue'
import MainNotification from '@/components/MainNotification.vue'
import MainProfile from '@/components/MainProfile.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.header {
  position: relative;
  z-index: $z-index-nav;
}

.navbar {
  padding: $header-pdn;
  height: $header-height;
  background-color: $bg;
  transition: color .5s, background-color .5s;
}

.navbar__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  height: 100%;
  max-width: $screen-max-width;
  margin: 0 auto;

  @include tablets-big() {
    gap: 1rem;
  }
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  gap: 5px;

  @include tablets-big() {
    gap: 10px;
  }
}

.nav-screen {
  position: fixed;
  top: $header-height;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: $bg;
  transition: background-color .5s;
  overflow-y: auto;
}

.nav-screen__container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
}

.appearance--burger {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: $bg-mute;
  transition: background-color .5s;
}

.appearance__text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: $text-2;
  transition: color .5s;
}
</style>
