<template>
  <div class="personal">
    <div class="personal-info">
      <el-image class="personal-img" fit="cover" :src="attachImageUrl(userPic)" @click="dialogTableVisible = true"/>
      <div class="personal-msg">
        <div class="username">{{ personalInfo.username }}</div>
        <div class="introduction">{{ personalInfo.introduction }}</div>
      </div>
      <el-button class="edit-info" round :icon="Edit" @click="goPage">修改个人信息</el-button>
    </div>
    <div class="personal-body">
      <song-list :songList="collectSongList" :show="true" @changeData="changeData"></song-list>
    </div>
    <el-dialog v-model="dialogTableVisible" title="修改头像">
      <upload></upload>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref, computed, watch, reactive} from "vue";
import {useUserStore} from "@/store";
import {Edit} from "@element-plus/icons-vue";
import SongList from "@/components/SongList.vue";
import Upload from "@/views/setting/Upload.vue";
import hook from "@/hooks";
import {getCollectionOfUser, getSongOfId, getUserOfId, attachImageUrl} from "@/api";
import {RouterName} from "@/enums";

const {routerManager} = hook();
const userStore = useUserStore();

const dialogTableVisible = ref(false);
const collectSongList = ref<Song[]>([]); // 收藏的歌曲
const personalInfo = reactive({
  username: "",
  userSex: "",
  birth: "",
  location: "",
  introduction: "",
});
const userId = computed(() => userStore.userId);
const userPic = computed(() => userStore.userPic);
watch(userPic, () => {
  dialogTableVisible.value = false;
});

function goPage() {
  routerManager(RouterName.Setting, {path: RouterName.Setting});
}

async function getUserInfo(id: string) {
  const result = await getUserOfId(id)
  personalInfo.username = result.data.username;
  personalInfo.userSex = result.data.sex;
  personalInfo.birth = result.data.birth;
  personalInfo.introduction = result.data.introduction;
  personalInfo.location = result.data.location;
}

// 获取收藏的歌曲
async function getCollection(userId: string) {
  collectSongList.value = []
  const result = await getCollectionOfUser(userId)
  const collectIDList = result.data || []; // 存放收藏的歌曲ID
  // 通过歌曲ID获取歌曲信息
  for (const item of collectIDList) {
    const result = await getSongOfId(item.songId)
    collectSongList.value.push(result.data[0]);
  }
}

function changeData() {
  getCollection(userId.value);
}

nextTick(() => {
  getUserInfo(userId.value);
  getCollection(userId.value);
});

</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

.personal {
  padding-top: @header-height + 150px;

  &::before {
    content: "";
    background-color: @color-blue-shallow;
    position: absolute;
    top: 0;
    width: 100%;
    height: @header-height + 150px;
  }
}

.personal-info {
  position: relative;
  margin-bottom: 60px;

  .personal-img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 5px solid @color-white;
    position: absolute;
    top: -180px;
    left: 50px;
    background-color: @color-white;
    cursor: pointer;
  }

  .personal-msg {
    margin-left: 300px;
    position: absolute;
    top: -120px;

    .username {
      font-size: 50px;
      font-weight: 600;
    }

    .introduction {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .edit-info {
    position: absolute;
    right: 10vw;
    margin-top: -120px;
  }
}

@media screen and (min-width: @sm) {
  .personal-body {
    padding: 0 100px;
  }
}

@media screen and (max-width: @sm) {
  .edit-info {
    display: none;
  }
}
</style>
