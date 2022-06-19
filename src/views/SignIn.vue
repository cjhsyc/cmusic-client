<template>
  <login-logo></login-logo>
  <div class="sign">
    <div class="sign-head">
      <span>帐号登录</span>
    </div>
    <el-form ref="signInForm" status-icon :model="registerForm" :rules="SignInRules">
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model.trim="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model.trim="registerForm.password"
          @keyup.enter="handleLoginIn"
        ></el-input>
      </el-form-item>
      <el-form-item class="sign-btn">
        <el-button @click="handleSignUp">注册</el-button>
        <el-button type="primary" @click="handleLoginIn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import LoginLogo from '@/components/LoginLogo.vue'
import { reactive, ref } from 'vue'
import hook from '@/hooks'
import { login } from '@/api'
import { NavName, RouterName, SignInRules } from '@/enums'
import { useUserStore, useConfigStore } from '@/store'

const { routerManager, changeIndex } = hook()
const userStore = useUserStore()
const configStore = useConfigStore()

// 登录用户名密码
const registerForm = reactive({
  username: '',
  password: ''
})

const signInForm = ref<any>()

async function handleLoginIn() {
  let canRun = true
  signInForm.value!.validate((valid: boolean) => {
    if (!valid) return (canRun = false)
  })
  if (!canRun) return

  const params = new URLSearchParams()
  params.append('username', registerForm.username)
  params.append('password', registerForm.password)

  try {
    const result = await login(params)
    console.log(result)
    ElMessage({
      message: result.message,
      type: result.type
    })

    if (result.success) {
      userStore.setUserId(result.data[0].id)
      userStore.setUsername(result.data[0].username)
      userStore.setUserPic(result.data[0].avator)
      configStore.setToken(true)
      changeIndex(NavName.Home)
      routerManager(RouterName.Home, { path: RouterName.Home })
    }
  } catch (error) {
    console.error(error)
  }
}

function handleSignUp() {
  routerManager(RouterName.SignUp, { path: RouterName.SignUp })
}
</script>

<style lang="less" scoped>
@import 'src/assets/css/sign';
</style>
