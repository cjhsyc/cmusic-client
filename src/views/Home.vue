<template>
  <!--轮播图-->
  <el-carousel class="swiper-container" type="card" height="20vw" :interval="4000">
    <el-carousel-item v-for="(item, index) in swiperList" :key="index">
      <img :src="item.picImg" alt=""/>
    </el-carousel-item>
  </el-carousel>
  <!--热门歌单-->
  <play-list class="play-list-container" title="歌单" path="song-sheet-detail" :playList="songList"></play-list>
  <!--热门歌手-->
  <play-list class="play-list-container" title="歌手" path="singer-detail" :playList="singerList"></play-list>
</template>

<script setup lang="ts">
import PlayList from '@/components/PlayList.vue'
import {swiperList} from "@/enums"
import {useSongStore} from '@/store'
import {ref} from "vue";

const songList = ref<Song[]>([])
const singerList = ref<Singer[]>([])

const songStore = useSongStore()

songStore.reqSongList().then(() => {
  songList.value = songStore.popularSong
}).catch(err => {
  console.log(err)
})
songStore.reqSingerList().then(() => {
  singerList.value = songStore.popularSinger
}).catch(err => {
  console.log(err)
})
</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

/*轮播图*/
.swiper-container {
  width: 90%;
  margin: auto;
  padding-top: 20px;

  img {
    width: 100%;
  }
}

.swiper-container:deep(.el-carousel__indicators, .el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

.el-slider__runway {
  background-color: @color-blue;
}
</style>