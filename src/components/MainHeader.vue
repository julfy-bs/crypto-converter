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
          <!--          <main-socials />-->
          <!--          <main-extra />-->
          <!--          <main-profile />-->
          <!--          <main-burger />-->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MainLogo from '@/components/MainLogo.vue'
import ChangeAppearance from '@/components/ChangeAppearence.vue'
import MainSlogan from '@/components/MainSlogan.vue'
// import MainProfile from '@/components/MainProfile.vue'
// import MainBurger from '@/components/MainBurger.vue'
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.header {
  position: relative;
  top: 0;
  left: 0;
  z-index: $z-index-nav;
}

.navbar {
  position: relative;
  padding: 0 12px 0 24px;
  height: $header-height;
  background-color: $bg;
  transition: color .5s, background-color .5s;

  @include tablets() {
    padding: 0 12px 0 32px;
  }

  @include desktop() {
    padding: 0 32px;
  }
}

.navbar__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: $screen-max-width;
  margin: 0 auto;
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
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
