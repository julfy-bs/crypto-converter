<template>
  <div class="user">
    <router-link
      to="/profile"
      class="user__button"
      role="button"
      type="button"
      aria-label="toggle notifications"
    >
      <span
        class="user__name"
      >
        Bessie Cooper
      </span>
      <img
        src="@/static/images/user.png"
        alt="user"
        class="user__image"
      >
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.user {

}

.user__button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.user__name {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 152%;
  color: $text-1;
  display: none;

  @include tablets-big() {
    display: block;
  }
}

.user__image {
  width: 32px;
  height: 32px;
  border-radius: 50%;

  @include tablets() {
    width: 44px;
    height: 44px;
  }

  @include tablets-big() {
    width: 56px;
    height: 56px;
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