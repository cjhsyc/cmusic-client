<template>
  <div class="login-logo">
    <c-icon :icon="Icon.ERJI"></c-icon>
  </div>
</template>

<script setup lang="ts">
import CIcon from './CIcon.vue'
import { Icon } from '@/enums'
</script>

<style lang="less" scoped>
@import (reference) 'src/assets/css/var';
@import (reference) 'src/assets/css/global';

.login-logo {
  background-color: @color-blue-light;
  height: calc(100vh - @header-height - @footer-height);
  min-width: 50vw;
  overflow: hidden;
  .layout(center, center);
  .cicon {
    .icon(36rem, @color-blue-dark);
    transform: rotate(-30deg);
  }
}

@media screen and (min-width: @sm) {
  .login-logo {
    width: 50vw;
  }
}

@media screen and (max-width: @sm) {
  .login-logo {
    width: 100vw;
  }
}
</style>
