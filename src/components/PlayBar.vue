<template>
  <div class="play-bar" :class="{ show: !toggle }">
    <div class="fold" :class="{ turn: !toggle }">
      <c-icon :icon="Icon.ZHEDIE" @click="toggle = !toggle"></c-icon>
    </div>
    <!--播放进度-->
    <el-slider class="progress" v-model="nowTime" @change="changeTime" size="small"></el-slider>
    <div class="control-box">
      <div class="info-box">
        <!--歌曲图片-->
        <el-image class="song-bar-img" fit="contain" :src="attachImageUrl(songPic)"/>
        <!--播放开始结束时间-->
        <div v-if="songId">
          <div class="song-info">{{ songTitle }} - {{ singerName }}</div>
          <div class="time-info">{{ startTime }} / {{ endTime }}</div>
        </div>
      </div>
      <div class="song-ctr">
        <c-icon class="play-show" :icon="playStateList[playStateIndex]" @click="changePlayState"></c-icon>
        <!--上一首-->
        <c-icon class="play-show" :icon="Icon.SHANGYISHOU" @click="prev"></c-icon>
        <!--播放-->
        <c-icon :icon="playBtnIcon" @click="togglePlay"></c-icon>
        <!--下一首-->
        <c-icon class="play-show" :icon="Icon.XIAYISHOU" @click="next"></c-icon>
        <!--音量-->
        <el-dropdown class="play-show" trigger="click">
          <c-icon v-if="volume !== 0" :icon="Icon.YINLIANG"></c-icon>
          <c-icon v-else :icon="Icon.JINGYIN"></c-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-slider class="slider" style="height: 150px; margin: 10px 0" v-model="volume"
                         :vertical="true"></el-slider>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="song-ctr song-edit">
        <!--收藏-->
        <c-icon class="play-show" :class="{ active: isCollection }" :icon="isCollection ? Icon.Like : Icon.Dislike"
                @click="changeCollection"></c-icon>
        <!--下载-->
        <c-icon class="play-show" :icon="Icon.XIAZAI"
                @click="download({songUrl,songName: singerName + '-' + songTitle,})"></c-icon>
        <!--歌曲列表-->
        <c-icon :icon="Icon.LIEBIAO" @click.stop="changeAside"></c-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CIcon from './CIcon.vue'
import {Icon} from '@/enums'
import {attachImageUrl, collectionIs, deleteCollection, setCollection} from '@/api'
import {computed, onMounted, reactive, ref, watch} from "vue"
import {useAudioStore, useUserStore, useConfigStore} from "@/store"
import {formatSeconds} from '@/utils'
import hook from '@/hooks'

const {playMusic, checkStatus, download} = hook()
const audioStore = useAudioStore()
const userStore = useUserStore()
const configStore = useConfigStore();

const userId = computed(() => userStore.userId)
const token = computed(() => configStore.token)
const showAside = computed(() => configStore.showAside)
const startTime = ref('00:00')
const endTime = ref('00:00')
const toggle = ref(true)
const nowTime = ref(0)
const songId = computed(() => audioStore.songId)
const isPlay = computed(() => audioStore.isPlay)
const playBtnIcon = computed(() => audioStore.playBtnIcon)
const songTitle = computed(() => audioStore.songTitle)
const songPic = computed(() => audioStore.songPic)
const singerName = computed(() => audioStore.singerName)
const songUrl = computed(() => audioStore.songUrl)
const duration = computed(() => audioStore.duration)
const curTime = computed(() => audioStore.curTime)
const autoNext = computed(() => audioStore.autoNext)
const currentPlayList = computed(() => audioStore.currentPlayList)
const currentPlayIndex = computed(() => audioStore.currentPlayIndex)
const isCollection = ref(false)
const volume = ref(50)
const playState = ref(Icon.XUNHUAN)
const playStateList = reactive([Icon.XUNHUAN, Icon.LUANXU])
const playStateIndex = ref(0)

// 播放时间的开始和结束
watch(curTime, () => {
  startTime.value = formatSeconds(curTime.value)
  endTime.value = formatSeconds(duration.value)
  // 移动进度条
  nowTime.value = Math.floor((curTime.value / duration.value) * 10000) / 100
})

watch(isPlay, (value) => {
  audioStore.setPlayBtnIcon(value ? Icon.ZANTING : Icon.BOFANG)
})

watch(volume, () => {
  audioStore.setVolume(volume.value / 100)
})

// 自动播放下一首
watch(autoNext, () => {
  next()
})

watch(songId, () => {
  initCollection()
})

watch(token, (value) => {
  if (!value) isCollection.value = false
})

async function initCollection() {
  if (!checkStatus(false)) return

  const params = new URLSearchParams()
  params.append("userId", userId.value)
  params.append("type", "0") // 0 代表歌曲， 1 代表歌单
  params.append("songId", songId.value)
  isCollection.value = (await collectionIs(params)).data
}

async function changeCollection() {
  if (!checkStatus()) return

  const params = new URLSearchParams()
  params.append("userId", userId.value)
  params.append("type", "0") // 0 代表歌曲， 1 代表歌单
  params.append("songId", songId.value)

  console.log(params.toString())

  const result = isCollection.value
      ? (await deleteCollection(params))
      : (await setCollection(params))

  ElMessage({
    message: result.message,
    type: result.type,
  })

  if (result.data === true || result.data === false) isCollection.value = result.data
}

onMounted(() => {
  initCollection()
})

const changeTime = () => {
  audioStore.setChangeTime(duration.value * (nowTime.value * 0.01))
}

const changePlayState = () => {
  playStateIndex.value = playStateIndex.value >= playStateList.length - 1 ? 0 : ++playStateIndex.value
  playState.value = playStateList[playStateIndex.value]
}
const togglePlay = () => {
  audioStore.setIsPlay(!isPlay.value)
}

//上一首
const prev = () => {
  if (playState.value === Icon.LUANXU) {
    let playIndex = Math.floor(Math.random() * currentPlayList.value.length)
    playIndex = playIndex === currentPlayIndex.value ? playIndex + 1 : playIndex
    audioStore.setCurrentPlayIndex(playIndex)
    toPlay(currentPlayList.value[playIndex].url)
  } else if (currentPlayIndex.value !== -1 && currentPlayList.value.length > 1) {
    if (currentPlayIndex.value > 0) {
      audioStore.setCurrentPlayIndex(currentPlayIndex.value - 1)
      toPlay(currentPlayList.value[currentPlayIndex.value].url)
    } else {
      audioStore.setCurrentPlayIndex(currentPlayList.value.length - 1)
      toPlay(currentPlayList.value[currentPlayIndex.value].url)
    }
  }
}

//下一首
const next = () => {
  if (playState.value === Icon.LUANXU) {
    let playIndex = Math.floor(Math.random() * currentPlayList.value.length)
    playIndex = playIndex === currentPlayIndex.value ? playIndex + 1 : playIndex
    audioStore.setCurrentPlayIndex(playIndex)
    toPlay(currentPlayList.value[playIndex].url)
  } else if (currentPlayIndex.value !== -1 && currentPlayList.value.length > 1) {
    if (currentPlayIndex.value < currentPlayList.value.length - 1) {
      audioStore.setCurrentPlayIndex(currentPlayIndex.value + 1)
      toPlay(currentPlayList.value[currentPlayIndex.value].url)
    } else {
      audioStore.setCurrentPlayIndex(0)
      toPlay(currentPlayList.value[0].url)
    }
  }
}


// 选中播放
const toPlay = (url: string) => {
  if (url && url !== songUrl.value) {
    const song = currentPlayList.value[currentPlayIndex.value]
    playMusic({
      id: song.id,
      url,
      pic: song.pic,
      index: currentPlayIndex.value,
      name: song.name,
      lyric: song.lyric,
      currentSongList: currentPlayList.value,
    })
  }
}

const changeAside = () => {
  console.log('change')
  configStore.setShowAside(!showAside.value)
}

</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";
@import (reference) 'src/assets/css/global';

.play-bar {
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  transition: all 0.5s;

  .fold {
    position: absolute;
    bottom: @play-bar-height + 10px;
    left: 20px;
    cursor: pointer;
  }

  .progress {
    position: absolute;
    margin-top: -10px;
  }

  .control-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: @play-bar-height;
    width: 100%;
    background-color: @theme-play-bar-color;

    .song-ctr {
      position: relative;
      margin: auto;
      flex-wrap: nowrap;

      svg {
        width: 5rem;
        cursor: pointer;
      }
    }

    .info-box {
      .song-bar-img {
        width: calc(@play-bar-height - 15px);
        height: calc(@play-bar-height - 15px);
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
      }

      .song-info {
        font-size: 14px;
      }

      .time-info {
        font-size: 12px;
        color: @color-grey;
      }
    }

    .song-edit {
      width: 30%;
      justify-content: flex-end;
    }
  }
}

.turn {
  transform: rotate(180deg);
}

.show {
  bottom: -(@play-bar-height) + 5px;
}

.cicon {
  .icon(1.1em, @color-black);
}

.active.cicon {
  color: @color-red;
}

@media screen and (min-width: @sm) {
  .info-box {
    width: 30%;
    min-width: 200px;
    margin-left: 30px;
  }

  .song-ctr,
  .info-box,
  .song-edit {
    display: flex;
    align-items: center;
  }
}

@media screen and (max-width: @sm) {
  .info-box {
    display: flex;
    flex-direction: row;
    width: 70%;
    margin-left: 10px;
  }

  .play-show {
    display: none;
  }
}

</style>