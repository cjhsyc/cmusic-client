<template>
  <div class="search">
    <c-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></c-nav>
    <component class="search-list" :is="currentView"></component>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import CNav from "@/components/CNav.vue";
import SearchSong from "./SearchSong.vue";
import SearchSongList from "./SearchSongList.vue";

const searchNavList = reactive([
  {
    name: "歌曲",
    value: "SearchSong",
  },
  {
    name: "歌单",
    value: "SearchSongList",
  }
])
const activeName = ref('歌曲')
const currentViewName = ref('SearchSong')
const currentView = computed(()=>{
  return currentViewName.value === 'SearchSong' ? SearchSong : SearchSongList
})

const handleChangeView = (item) => {
  activeName.value = item.name;
  currentViewName.value = item.value;
}
</script>

<style lang="less" scoped>
.search {
  margin: auto;
  width: 900px;

  .search-list {
    min-height: 480px;
  }
}
</style>
