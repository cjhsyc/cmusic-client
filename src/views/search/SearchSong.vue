<template>
  <div class="search-song">
    <song-list :songList="currentSongList"></song-list>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from "vue";
import {useConfigStore} from "@/store";
import SongList from "@/components/SongList.vue";
import {getSongOfSingerName} from "@/api";
import {useRoute} from 'vue-router'

const configStore = useConfigStore();
const route = useRoute();

const currentSongList = ref([]); // 存放的音乐
const searchWord = computed(() => configStore.searchWord);
watch(searchWord, (value) => {
  searchSong(value);
});

// 搜索音乐
async function searchSong(value: string) {
  if (!value) {
    currentSongList.value = []
    return;
  }
  const result = await getSongOfSingerName(value)
  if (!result.data.length) {
    currentSongList.value = []
    ElMessage({
      message: "暂时没有相关歌曲",
      type: "warning",
    })
  } else {
    currentSongList.value = result.data
  }
}

onMounted(() => {
  searchSong(route.query.keywords)
})
</script>
