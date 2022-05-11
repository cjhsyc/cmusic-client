<template>
  <ul class="header-nav">
    <li :class="{ active: item.name === activeName }" v-for="item in styleList" :key="item"
        @click="handleChangeView(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  activeName: string,
  styleList: Array<string>
}

defineProps<Props>()
const emit = defineEmits(['click'])

function handleChangeView(item: any) {
  emit("click", item.path, item.name);
}
</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

li {
  margin: @header-nav-margin;
  padding: @header-nav-padding;
  line-height: 3.3rem;
  color: @color-grey;
  border-bottom: none;
  cursor: pointer;
}

li.active {
  color: @color-black;
  font-weight: 600;
  border-bottom: 5px solid @color-black;
}
</style>