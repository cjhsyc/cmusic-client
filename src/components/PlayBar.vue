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
        <el-image class="song-bar-img" fit="contain" :src="attachImageUrl(songPic)" @click="goPlayerPage"/>
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
        <c-icon :icon="Icon.BOFANG" @click="togglePlay"></c-icon>
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
        <c-icon
            class="play-show"
            :class="{ active: isCollection }"
            :icon="isCollection ? Icon.Like : Icon.Dislike"
            @click="changeCollection"
        ></c-icon>
        <!--下载-->
        <c-icon
            class="play-show"
            :icon="Icon.XIAZAI"
            @click="
            downloadMusic({
              songUrl,
              songName: singerName + '-' + songTitle,
            })
          "
        ></c-icon>
        <!--歌曲列表-->
        <c-icon :icon="Icon.LIEBIAO" @click="changeAside"></c-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CIcon from './CIcon.vue'
import {Icon} from '@/enums'
import {attachImageUrl} from '@/api'
import {ref} from "vue";

const toggle = ref(true)
const nowTime = '000'
const songId = 0
const songTitle = ''
const songPic = ''
const singerName = ''
const songUrl = ''
const isCollection = true
const volume = null
const playStateList = [1]
const playStateIndex = 0

const changeTime = () => {
}
const goPlayerPage = () => {
  
}
const changePlayState = () => {
  
}
const togglePlay = () => {
  
}
const prev = () => {
  
}
const next = () => {
  
}
const changeCollection = () => {

}
const downloadMusic = (data) => {

}
const changeAside = () => {

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