<template>
  <div class="footer">
    <p v-for="(item, index) in footerList" :key="index">
      {{ item }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { readonly } from "vue";

const footerList = readonly([
  "关于 | 帮助 | 条款 | 反馈",
  "Copyright © 2019 Yin-Hongwei",
])
</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";
@import (reference) "src/assets/css/global";

.footer {
  width: 100%;
  height: @footer-height;
  padding: 20px 0;
  box-sizing: border-box;
  font-size: 14px;
  .layout(center, center, column);
}

p {
  height: 30px;
}
</style>
