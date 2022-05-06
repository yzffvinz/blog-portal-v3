<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import md5 from 'js-md5'
import { userLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/user'

const user = ref({
  username: '',
  password: '',
})

const router = useRouter()

function toHome() {
  router.push('/')
}

function login() {
  const password = md5(user.value.password)
  userLogin({ username: user.value.username, password }).then(() => {
    toHome()
  })
}

if (useUserStore().isLogin) {
  toHome()
}
</script>

<template>
  <div class="login__wrapper pt-40 px-5">
    <ElForm ref="formRef" :model="user" :label-width="90" label-position="top">
      <ElFormItem label="用户名">
        <ElInput v-model="user.username"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput
          v-model="user.password"
          type="password"
          show-password
        ></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="login()">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
