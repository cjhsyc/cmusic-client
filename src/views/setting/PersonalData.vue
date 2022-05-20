<template>
  <el-form ref="updateForm" label-width="70px" :model="registerForm" :rules="SignUpRules">
    <el-form-item prop="username" label="用户名">
      <el-input v-model.trim="registerForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="registerForm.sex">
        <el-radio :label="0">女</el-radio>
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="birth" label="生日">
      <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%"></el-date-picker>
    </el-form-item>
    <el-form-item prop="introduction" label="签名">
      <el-input type="textarea" placeholder="签名" v-model.trim="registerForm.introduction"></el-input>
    </el-form-item>
    <el-form-item prop="location" label="地区">
      <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%">
        <el-option v-for="item in AREA" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="phoneNum" label="手机">
      <el-input placeholder="手机" v-model.trim="registerForm.phoneNum"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model.trim="registerForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="goBack(-1)">取消</el-button>
      <el-button type="primary" @click="saveMsg()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {useUserStore} from "@/store";
import hook from "@/hooks";
import {AREA, SignUpRules} from "@/enums";
import {updateUserMsg, getUserOfId} from "@/api";
import {getBirth} from "@/utils";

const userStore = useUserStore()
const {goBack} = hook()

const updateForm = ref<any>()

// 注册
const registerForm = reactive({
  username: "",
  sex: "",
  phoneNum: "",
  email: "",
  birth: new Date().toString(),
  introduction: "",
  location: "",
  userPic: "",
})
const userId = computed(() => userStore.userId)

async function getUserInfo(id: string) {
  const result = await getUserOfId(id)
  registerForm.username = result.data.username
  registerForm.sex = result.data.sex
  registerForm.phoneNum = result.data.phoneNum
  registerForm.email = result.data.email
  registerForm.birth = result.data.birth
  registerForm.introduction = result.data.introduction
  registerForm.location = result.data.location
  registerForm.userPic = result.data.avator
}

async function saveMsg() {
  let canRun = true
  updateForm.value.validate((valid: boolean) => {
    if (!valid) return (canRun = false)
  })
  if (!canRun) return

  const params = new URLSearchParams()
  params.append("id", userId.value)
  params.append("username", registerForm.username)
  params.append("sex", registerForm.sex)
  params.append("phone_num", registerForm.phoneNum)
  params.append("email", registerForm.email)
  params.append("birth", getBirth(registerForm.birth))
  params.append("introduction", registerForm.introduction)
  params.append("location", registerForm.location)

  const result = await updateUserMsg(params)
  ElMessage({
    message: result.message,
    type: result.type,
  })
  if (result.success) {
    userStore.setUsername(registerForm.username)
    goBack(-1)
  }
}

onMounted(() => {
  getUserInfo(userId.value)
})
</script>

<style lang="less" scoped>
.btn :deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
}
</style>
