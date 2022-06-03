<template>
  <el-container>
    <el-aside class="album-slide">
      <el-image class="album-img" fit="contain" :src="attachImageUrl(songDetails.pic)"/>
      <h3 class="album-info">{{ songDetails.title }}</h3>
    </el-aside>
    <el-main class="album-main">
      <h1>简介</h1>
      <p>{{ songDetails.introduction }}</p>
      <!--评分-->
      <div class="album-score">
        <div>
          <h3>歌单评分</h3>
          <el-rate v-model="rank" allow-half disabled></el-rate>
        </div>
        <span>{{ rank * 2 }}</span>
        <div>
          <h3>{{ assistText }} {{ score * 2 }}</h3>
          <el-rate allow-half v-model="score" :disabled="disabledRank" @click="pushValue()"></el-rate>
        </div>
      </div>
      <!--歌曲-->
      <song-list class="album-body" :songList="currentSongList"></song-list>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {ref, computed} from "vue"
import hook from "@/hooks"
import SongList from "@/components/SongList.vue"
import {getListSongOfSongId, getSongOfId, setRank, getUserRank, getRankOfSongListId, attachImageUrl} from "@/api"
import {useUserStore, useAudioStore,} from '@/store'

const userStore = useUserStore()
const audioStore = useAudioStore();
const {checkStatus} = hook()

const currentSongList = ref(<any>[]) // 存放的音乐
const songListId = ref("") // 歌单 ID
const score = ref(0)
const rank = ref(0)
const disabledRank = ref(false)
const assistText = ref("评价")
const songDetails = computed(() => <Song>audioStore.songDetails) // 单个歌单信息
const userId = computed(() => userStore.userId)

songListId.value = songDetails.value.id // 给歌单ID赋值

// 收集歌单里面的歌曲
async function getSongId(id: string) {
  const result = await getListSongOfSongId(id)
  // 获取歌单里的歌曲信息
  for (const item of result.data) {
    // 获取单里的歌曲
    const resultSong = await getSongOfId(item.songId)
    currentSongList.value.push(resultSong.data[0])
  }
}

// 获取评分
async function getRank(id: string) {
  const result = await getRankOfSongListId(id)
  rank.value = result.data / 2
}

async function getRankOfUser(userId: string, songListId: string) {
  if (userId) {
    const result = await getUserRank(userId, songListId)
    console.log(result)
    score.value = result.data / 2
    if (result.success){
      disabledRank.value = true
      assistText.value = "已评价"
    }
  }
}

// 提交评分
async function pushValue() {
  if (disabledRank.value || !checkStatus()) return

  const params = new URLSearchParams()
  params.append("songListId", songListId.value)
  params.append("consumerId", userId.value)
  params.append("score", (score.value * 2).toString())

  const result = await setRank(params)
  ElMessage({
    message: result.message,
    type: result.type,
  })

  if (result.success) {
    getRank(songListId.value)
    disabledRank.value = true
    assistText.value = "已评价"
  }
}

getRankOfUser(userId.value, songListId.value)
getRank(songListId.value) // 获取评分
getSongId(songListId.value) // 获取歌单里面的歌曲ID
</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

.album-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .album-img {
    height: 250px;
    width: 250px;
    border-radius: 10%;
  }

  .album-info {
    width: 70%;
    padding-top: 2rem;
    text-align: center;
  }
}

.album-main {
  h1 {
    font-size: 22px;
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0 20px 0;
  }

  /*歌单打分*/

  .album-score {
    display: flex;
    align-items: center;
    margin: 1vw;

    h3 {
      margin: 10px 0;
    }

    span {
      font-size: 60px;
    }

    & > div:last-child {
      margin-left: 10%;
    }
  }

  .album-body {
    margin: 20px 0 20px 0;
  }
}

@media screen and (min-width: @sm) {
  .album-slide {
    position: fixed;
    width: 400px;
  }

  .album-main {
    min-width: 600px;
    padding-right: 10vw;
    margin-left: 400px;
  }
}

@media screen and (max-width: @sm) {
  .album-slide {
    display: none;
  }
}
</style>
