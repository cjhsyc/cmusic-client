<template>
  <div class="header">
    <!--图标-->
    <div class="header-logo" @click="goPage('','')">
      <c-icon :icon="Icon.ERJI"></c-icon>
      <span>{{ musicName }}</span>
    </div>
    <header-nav class="header-nav" :styleList="headerNavList" :activeName="activeNavName"
                @click="goPage"></header-nav>
    <!--搜索框-->
    <div class="header-search">
      <el-input placeholder="搜索" :prefix-icon="Search" v-model="keywords" @keyup.enter="goSearch"/>
    </div>
    <!--设置-->
    <header-nav v-if="!token" :styleList="signList" :activeName="activeNavName" @click="goPage"></header-nav>
    <el-dropdown class="user-wrap" v-if="token" trigger="click">
      <el-image class="user" fit="cover" :src="attachImageUrl(userPic)"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in menuList" :key="index" @click.stop="goMenuList(item.path)">
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import CIcon from '../../components/CIcon.vue'
import HeaderNav from './HeaderNav.vue'
import {Search} from "@element-plus/icons-vue"
import {getCurrentInstance, ComponentInternalInstance, ref, computed} from "vue"
import {Icon, NavName, RouterName, HEADERNAVLIST, MUSICNAME, SIGNLIST, MENULIST} from '@/enums'
import hook from '@/hooks'
import {useConfigStore, useUserStore} from '@/store'
import {attachImageUrl} from '@/api'

const {routerManager, changeIndex} = hook()
const configStore = useConfigStore()
const userStore = useUserStore()

const {proxy} = getCurrentInstance() as ComponentInternalInstance
const keywords = ref('')
const headerNavList = ref(HEADERNAVLIST) // 左侧导航栏
const musicName = ref(MUSICNAME)
const signList = ref(SIGNLIST) // 右侧导航栏
const menuList = ref(MENULIST) // 用户下拉菜单项

const activeNavName = computed(() => configStore.activeNavName)
const userPic = computed(() => userStore.userPic)
const token = computed(() => configStore.token)

const goPage = (path: string, name: string) => {
  if (!path && !name) {
    changeIndex(NavName.Home)
    routerManager(RouterName.Home, {path: RouterName.Home})
  } else {
    changeIndex(name)
    routerManager(path, {path})
  }
}
const goSearch = () => {
  if (keywords.value !== "") {
    configStore.setSearchWord(keywords.value)
    routerManager(RouterName.Search, {path: RouterName.Search, query: {keywords: keywords.value}})
  } else {
    (proxy as any).$message({
      message: "搜索内容不能为空",
      type: "error",
    })
  }
}

const goMenuList = (path: string) => {
  if (path == RouterName.SignOut) {
    configStore.setToken(false)
    userStore.$reset()
    changeIndex(NavName.Home)
    routerManager(RouterName.Home, {path: RouterName.Home})
  } else {
    routerManager(path, {path})
  }
}

</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";
@import (reference) "src/assets/css/global";

@media screen and (min-width: @sm) {
  .header-logo {
    margin: 0 1rem;
  }
}

@media screen and (max-width: @sm) {
  .header-logo {
    margin: 0 1rem;

    span {
      display: none;
    }
  }

  .header-search {
    display: none;
  }
}

.header {
  position: fixed;
  width: 100%;
  height: @header-height;
  line-height: @header-height;
  padding: @header-padding;
  margin: @header-margin;
  //margin: 0;
  background-color: @theme-header-color;
  box-shadow: @box-shadow;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
}

/* LOGO */
.header-logo {
  font-size: @font-size-logo;
  font-weight: bold;
  cursor: pointer;

  .cicon {
    .icon(1.9rem, @color-black);
    vertical-align: middle;
  }

  span {
    margin-left: 1rem;
  }
}

.header-nav {
  flex: 1;
}

/*搜索输入框*/
.header-search {
  margin: 0 20px;
  width: 100%;

  :deep(input) {
    text-indent: 5px;
    max-width: @header-search-max-width;
    min-width: @header-search-min-width;
    border-radius: @header-search-radius;
    box-shadow: none;
    background-color: @color-light-grey;
    color: @color-black;
  }
}

/*用户*/
.user-wrap {
  position: relative;
  display: flex;
  align-items: center;

  .user {
    width: @header-user-width;
    height: @header-user-width;
    border-radius: @header-user-radius;
    margin-right: @header-user-margin;
    cursor: pointer;
  }
}
</style>