<template>
  <el-form ref="passwordForm" label-width="70px" :model="form" :rules="rules">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model.trim="form.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model.trim="form.newPassword" />
    </el-form-item>
    <el-form-item label="密码确认" prop="confirmPassword">
      <el-input type="password" v-model.trim="form.confirmPassword" />
    </el-form-item>
    <el-form-item>
      <el-button @click="clearData()">重置</el-button>
      <el-button type="primary" @click="confirm()">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import hook from '@/hooks'
import { updateUserPassword } from '@/api'
import { validatePassword } from '@/enums'

const userStore = useUserStore()
const { goBack } = hook()

const passwordForm = ref<any>()

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const userId = computed(() => userStore.userId)
const username = computed(() => userStore.username)

const validateCheck = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value !== form.newPassword) {
    callback(new Error('请输入正确密码'))
  } else {
    callback()
  }
}
const rules = reactive({
  oldPassword: [{ validator: validatePassword, trigger: 'blur', min: 3 }],
  newPassword: [{ validator: validatePassword, trigger: 'blur', min: 3 }],
  confirmPassword: [{ validator: validateCheck, trigger: 'blur', min: 3 }]
})

async function clearData() {
  form.oldPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
}

async function confirm() {
  let canRun = true
  passwordForm.value.validate((valid: boolean) => {
    if (!valid) return (canRun = false)
  })
  if (!canRun) return

  const params = new URLSearchParams()
  params.append('id', userId.value)
  params.append('username', username.value)
  params.append('old_password', form.oldPassword)
  params.append('password', form.newPassword)

  const result = await updateUserPassword(params)
  ElMessage({
    message: result.message,
    type: result.type
  })
  if (result.success) goBack()
}
</script>

<style></style>
