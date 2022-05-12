<template>
  <ul class="c-nav">
    <li v-for="(item, index) in styleList" :key="index" :class="{ active: item.name === activeName }" @click="handleChangeView(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  styleList: Array
  activeName: String
}

defineProps<Props>()
const emit = defineEmits(['click'])

function handleChangeView(val) {
  emit("click", val);
}
</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

.c-nav {
  width: 100%;
  li {
    line-height: 2rem;
    font-size: 1rem;
    color: @color-grey;
    border-bottom: none;
    cursor: pointer;
  }
  li.active {
    color: @color-black;
    font-weight: 600;
  }
}

@media screen and (min-width: @sm) {
  .c-nav {
    li {
      margin: 0.5rem 1rem;
    }
  }
}

@media screen and (max-width: @sm) {
  .c-nav{
    li {
      margin: 0.3rem 0.4rem;
    }
  }
}
</style>
