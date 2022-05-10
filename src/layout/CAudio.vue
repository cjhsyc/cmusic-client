<template>
  <audio :src="attachImageUrl(songUrl)" controls="controls" ref="player" preload @canplay="canplay"
         @timeupdate="timeupdate" @ended="ended">
    <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
    <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）-->
    <!--preload：属性规定是否在页面加载后载入音频-->
    <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
    <!--timeupdate：当目前的播放位置已更改时-->
    <!--ended：当目前的播放列表已结束时-->
  </audio>
</template>

<script setup lang="ts">
import {ref, computed, watch, Ref} from "vue"
import {attachImageUrl} from "@/api"
import {useAudioStore} from '@/store'

const audioStore = useAudioStore();
const player = ref<HTMLAudioElement>() as Ref<HTMLAudioElement>

const songUrl = computed(() => audioStore.songUrl) // 音乐链接
const isPlay = computed(() => audioStore.isPlay) // 播放状态
const volume = computed(() => audioStore.volume) // 音量
const changeTime = computed(() => audioStore.changeTime) // 指定播放时刻
const autoNext = computed(() => audioStore.autoNext) // 用于触发自动播放下一首
// 监听播放还是暂停
watch(isPlay, () => togglePlay());
// 跳到指定时刻播放
watch(changeTime, () => (player.value.currentTime = changeTime.value))
watch(volume, (value) => (player.value.volume = value))

// 开始 / 暂停
function togglePlay() {
  isPlay.value ? player.value.play() : player.value.pause()
}

// 获取歌曲链接后准备播放
function canplay() {
  //  记录音乐时长
  audioStore.setDuration(player.value.duration)
  //  开始播放
  player.value.play()
  audioStore.setIsPlay(true)
}

// 音乐播放时记录音乐的播放位置
function timeupdate() {
  audioStore.setCurTime(player.value.currentTime)
}

// 音乐播放结束时触发
function ended() {
  audioStore.setIsPlay(false)
  audioStore.setCurTime(0)
  audioStore.setAutoNext(!autoNext.value)
}
</script>

<style scoped>
audio {
  display: none;
}
</style>
