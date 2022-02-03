<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import fetchApi from '@/libs/fetchApi'
import md5 from 'js-md5'

const user = ref({
  username: '',
  password: '',
})

function login() {
  const password = md5(user.value.password)
  fetchApi.post('/api/user/login', { ...user.value, password }).then(() => {})
}
</script>

<template>
  <div class="login__wrapper">
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

<style lang="stylus">
.login__wrapper
  padding 120px 20px 0px
</style>
