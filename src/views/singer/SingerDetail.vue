<template>
  <el-container>
    <el-aside class="album-slide">
      <el-image
        class="singer-img"
        fit="contain"
        :src="attachImageUrl(songDetails?.pic as string)"
      />
      <div class="album-info">
        <h2>基本资料</h2>
        <ul>
          <li v-if="songDetails?.sex !== 2">性别：{{ getUserSex(songDetails?.sex) }}</li>
          <li>生日：{{ getBirth(songDetails?.birth) }}</li>
          <li>故乡：{{ songDetails?.location }}</li>
        </ul>
      </div>
    </el-aside>
    <el-main class="album-main">
      <h1>{{ songDetails?.name }}</h1>
      <p>{{ songDetails?.introduction }}</p>
      <song-list :songList="currentSongList"></song-list>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import hook from '@/hooks'
import SongList from '@/components/SongList.vue'
import { getSongOfSingerId, attachImageUrl } from '@/api'
import { getBirth } from '@/utils'
import { useAudioStore } from '@/store'

const { getUserSex } = hook()
const audioStore = useAudioStore()

const currentSongList = ref([])
const songDetails = computed(() => audioStore.songDetails)

onMounted(async () => {
  try {
    const result = await getSongOfSingerId(songDetails.value!.id)
    currentSongList.value = result.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style lang="less" scoped>
@import (reference) 'src/assets/css/var';

.album-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .singer-img {
    height: 250px;
    width: 250px;
    border-radius: 10%;
  }

  .album-info {
    width: 60%;
    padding-top: 2rem;

    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
  }
}

.album-main {
  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0 20px 0;
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
