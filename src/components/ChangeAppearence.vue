<template>
  <div class="appearance">
    <button
      class="switch"
      role="switch"
      type="button"
      aria-label="toggle dark/light mode"
      @click="toggleTheme"
    >
      <span class="switch__check">
        <span class="switch__icon">
          <span class="switch__sun">
            <element-svg
              file-name="sun"
            />
            <span>Day mode</span>
          </span>
          <span class="switch__moon">
            <element-svg
              file-name="moon"
            />
            <span>Night mode</span>
          </span>
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg.vue'
import { useAppearance } from '@/hooks/useAppearance.ts'

const { toggleTheme } = useAppearance()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/variables.scss";
@import "../assets/styles/mixins";

.switch {
  position: relative;
  display: flex;
  align-items: center;
  width: 44px;
  height: 44px;

  &:hover {
    .switch__moon, .switch__sun {
      background-color: $bg-mute;
    }
  }
}

.switch__check {
  width: 100%;
  overflow: hidden;
  height: 44px;

  @include tablets-big() {
    height: 48px;
  }
}

.switch__icon {
  display: flex;
  flex-flow: column nowrap;
}

.switch__moon, .switch__sun {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $btn-pdn;
  border-radius: $btn-br;
  transition: background-color .5s, color .5s;

  @include tablets-big() {
    justify-content: space-between;
    gap: 1rem;
  }

  svg {
    max-width: 20px;
    max-height: 20px;
    flex: 0 0 auto;
    color: $text-3;
  }

  span {
    display: none;
    flex: 1 0 auto;
    font-weight: 300;
    color: $text-2;

    @include tablets-big() {
      display: block;
    }
  }
}

.dark-theme .appearance .switch__icon {
  transform: translateY(-44px);

  @include tablets-big() {
    transform: translateY(-48px);
  }
}

.switch__sun, .dark-theme .switch__moon {
  opacity: 1;
}

.switch__moon, .dark-theme .switch__sun {
  opacity: 0;
}
</style>
