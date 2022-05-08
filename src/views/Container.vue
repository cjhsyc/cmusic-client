<template>
  <el-container>
    <el-header>
      <c-header></c-header>
    </el-header>
    <el-main>
      <router-view></router-view>
      <play-bar></play-bar>
    </el-main>
    <el-footer>
      <c-footer></c-footer>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import CHeader from '@/layout/CHeader/index.vue'
import CFooter from '@/layout/CFooter.vue'
import PlayBar from '@/components/PlayBar.vue'
</script>

<style scoped>
.el-container {
  min-height: calc(100% - 60px);
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
}
</style>