<template>
  <div class="content">
    <el-table highlight-current-row :data="dataList" @row-click="handleClick">
      <el-table-column prop="songName" label="歌曲" />
      <el-table-column prop="singerName" label="歌手" />
      <el-table-column prop="introduction" label="专辑" />
      <el-table-column label="编辑" width="80" align="center">
        <template #default="scope">
          <el-dropdown>
            <el-icon @click="handleEdit(scope.row)">
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :icon="Download"
                  @click="
                    download({
                      songUrl: scope.row.url,
                      songName: scope.row.name
                    })
                  "
                  >下载
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import hook from '@/hooks'
import { MoreFilled, Download } from '@element-plus/icons-vue'
import { useAudioStore } from '@/store'

interface Props {
  songList: Array<Song>
}

const props = defineProps<Props>()

const { getSongTitle, getSingerName, playMusic, download } = hook()
const audioStore = useAudioStore()

const { songList } = toRefs(props)
const singerName = computed(() => audioStore.singerName)
const dataList = computed(() => {
  const list: any[] = []
  songList.value.forEach((item: any, index) => {
    item['songName'] = getSongTitle(item.name)
    item['singerName'] = getSingerName(item.name)
    item['index'] = index
    list.push(item)
  })
  return list
})

function handleClick(row: PlayMusicAddName) {
  playMusic({
    id: row.id,
    url: row.url,
    pic: row.pic,
    index: row.index,
    name: row.name,
    lyric: row.lyric,
    currentSongList: songList.value
  })
}

function handleEdit(row: PlayMusic) {
  console.log('row', row)
}
</script>

<style lang="less" scoped>
@import (reference) 'src/assets/css/var';
@import (reference) 'src/assets/css/global';

.content {
  background-color: @color-white;
  border-radius: @border-radius-songlist;
  padding: 10px;
}

.content:deep(.el-table__row.current-row) {
  color: @color-black;
  font-weight: bold;
}

.content:deep(.el-table__row) {
  cursor: pointer;
}

.cicon {
  .icon(1.2em, @color-black);
}
</style>
