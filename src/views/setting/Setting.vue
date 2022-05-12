<template>
  <div class="setting">
    <h1>设置</h1>
    <el-tabs tab-position="left">
      <el-tab-pane label="个人资料" class="content">
        <Personal-data></Personal-data>
      </el-tab-pane>
      <el-tab-pane label="更改密码" class="content">
        <Password></Password>
      </el-tab-pane>
      <el-tab-pane label="账号和安全" class="content">
        <el-button type="danger" :icon="Delete" @click="cancelAccount">注销账号</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {Delete} from "@element-plus/icons-vue";
import PersonalData from "./PersonalData.vue";
import Password from "./Password.vue";
import {deleteUser} from "@/api";
import {useConfigStore, useUserStore} from "@/store";
import hook from "@/hooks";
import {RouterName} from "@/enums";

const configStore = useConfigStore()
const userStore = useUserStore()
const {routerManager} = hook()

const userId = computed(() => userStore.userId)

async function cancelAccount() {
  const result = await deleteUser(userId.value)
  ElMessage({
    message: result.message,
    type: result.type,
  })
  routerManager(RouterName.SignIn, {path: RouterName.SignIn})
  configStore.setToken(false)
}

</script>

<style lang="less" scoped>
@import (reference) "src/assets/css/var";

h1 {
  border-bottom: 3px solid @color-light-grey;
}

.content {
  padding-top: 20px;
  text-align: center;
}

@media screen and (min-width: @sm) {
  .setting {
    margin: 0 10% 30px;
    padding: 20px;
    min-height: 60vh;
  }
}

@media screen and (max-width: @sm) {
  .setting {
    padding: 20px;
  }
}
</style>
