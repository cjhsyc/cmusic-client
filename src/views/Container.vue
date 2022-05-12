<template>
  <el-container>
    <el-header>
      <c-header></c-header>
    </el-header>
    <el-main>
      <div id="box">
        <router-view></router-view>
      </div>
      <current-play></current-play>
      <play-bar></play-bar>
      <scroll-top></scroll-top>
      <c-audio></c-audio>
    </el-main>
    <el-footer>
      <c-footer></c-footer>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import CHeader from '@/layout/CHeader/index.vue'
import CFooter from '@/layout/CFooter.vue'
import CurrentPlay from '@/layout/CurrentPlay.vue'
import PlayBar from '@/components/PlayBar.vue'
import ScrollTop from '@/layout/ScrollTop.vue'
import CAudio from '@/layout/CAudio.vue'
</script>

<style scoped>
.el-container {
  min-height: calc(100% - 40px);
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
}
#box{
  min-height: calc(100vh - 200px);
}
</style>