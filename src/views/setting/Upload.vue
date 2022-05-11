<template>
  <div class="upload">
    <el-upload drag :action="upload()" :show-file-list="false" :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">将文件拖到此处或点击上传</div>
      <template #tip>
        <p class="el-upload__tip">只能上传 {{ uploadTypes.join("、") }} 文件, 且不超过3M</p>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, getCurrentInstance, ComponentInternalInstance} from "vue";
import {useUserStore} from "@/store";
import {UploadFilled} from "@element-plus/icons-vue";
import {uploadUrl} from "@/api";

const {proxy} = getCurrentInstance() as ComponentInternalInstance
const userStore = useUserStore();

const uploadTypes = ref(["jpg", "jpeg", "png", "gif"]);
const userId = computed(() => userStore.userId);

function upload() {
  return uploadUrl(userId.value);
}

function beforeAvatarUpload(file: any) {
  const ltCode = 3;
  const isLt10M = file.size / 1024 / 1024;
  const isExistFileType = uploadTypes.value.includes(file.type.replace(/image\//, ""));

  if (isLt10M > ltCode || isLt10M <= 0) {
    (proxy as any).$message.error(`图片大小范围是 0~${ltCode}MB!`)
    return false
  }
  if (!isExistFileType) {
    (proxy as any).$message.error(`图片只支持 ${uploadTypes.value.join("、")} 格式!`)
    return false
  }

  return isLt10M && isExistFileType;
}

function handleAvatarSuccess(response: any, file: any) {
  (proxy as any).$message({
    message: response.message,
    type: response.type,
  });

  if (response.success) userStore.setUserPic(response.data)
}
</script>

<style scoped>
.upload {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
