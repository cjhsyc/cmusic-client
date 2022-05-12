<template>
  <div class="search-song-list">
    <play-list :playList="playList" path="song-sheet-detail"></play-list>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from "vue";
import {useConfigStore} from "@/store";
import PlayList from "@/components/PlayList.vue";
import {getSongListOfLikeTitle} from "@/api";
import {useRoute} from 'vue-router'

const configStore = useConfigStore();
const route = useRoute();

const playList = ref([]);
const searchWord = computed(() => configStore.searchWord);
watch(searchWord, (value) => {
  getSearchList(value);
});

async function getSearchList(value) {
  if (!value) return;
  const result = await getSongListOfLikeTitle(value)
  if (!result.data.length) {
    (proxy as any).$message({
      message: "暂无该歌曲内容",
      type: "warning",
    });
  } else {
    playList.value = result.data;
  }
}

onMounted(() => {
  getSearchList(route.query.keywords);
});
</script>
