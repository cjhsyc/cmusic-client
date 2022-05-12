<template>
    <div class="play-list-container">
      <c-nav :styleList="songStyle" :activeName="activeName" @click="handleChangeView"></c-nav>
      <play-list :playList="data" path="song-sheet-detail"></play-list>
      <el-pagination class="pagination" background layout="prev, pager, next, total" :current-page="currentPage"
                     :page-size="pageSize" :total="allPlayList.length" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import CNav from "@/components/CNav.vue";
import PlayList from "@/components/PlayList.vue";
import {SONGSTYLE} from "@/enums";
import {getSongList, getSongListOfStyle} from "@/api";

const activeName = ref("全部歌单")
const pageSize = ref(15) // 页数
const currentPage = ref(1) // 当前页
const songStyle = ref(SONGSTYLE) // 歌单导航栏类别
const allPlayList = ref([]) // 歌单
const data = computed(() =>
    allPlayList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))

// 获取全部歌单
async function querySongList() {
  allPlayList.value = (await getSongList()).data
  currentPage.value = 1
}

// 通过类别获取歌单
async function querySongListOfStyle(style) {
  allPlayList.value = (await getSongListOfStyle(style)).data
  currentPage.value = 1
}

try {
  querySongList()
} catch (error) {
  console.error(error)
}

// 获取歌单
async function handleChangeView(item) {
  activeName.value = item.name
  allPlayList.value = []
  try {
    if (item.name === "全部歌单") {
      await querySongList()
    } else {
      await querySongListOfStyle(item.name)
    }
  } catch (error) {
    console.error(error)
  }
}

// 获取当前页
function handleCurrentChange(val) {
  currentPage.value = val
}
</script>
