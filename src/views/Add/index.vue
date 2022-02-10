<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElSwitch,
} from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/switch/style/css'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRoute, useRouter } from 'vue-router'
import { getMenus } from '@/api/tag'
import { addBlog, getBlogDetail, modBlog } from '@/api/blog'

const router = useRouter()

const menus = ref([
  {
    name: '',
    displayName: '',
    children: [
      {
        name: '',
        displayName: '',
      },
    ],
  },
])

const blogDetail = ref({
  title: '',
  cover: '',
  description: '',
  category: '',
  tags: [] as string[],
  content: '',
  hide: 0,
})

getMenus().then((data) => {
  menus.value = data.menus
})

const { params, query } = useRoute()

// 有id 为修改
if (params.id) {
  getBlogDetail({ _id: params.id }).then(({ blog }) => {
    blogDetail.value = blog
  })
} else {
  // 新增
  const { category, tag } = query as { category?: string; tag?: string }
  if (category) blogDetail.value.category = category
  if (tag) blogDetail.value.tags.push(tag)
}

function submitForm(formEl: any, leave = true) {
  formEl.validate((valid: boolean) => {
    if (valid) {
      const isAdd = !params.id
      const reqApi = isAdd ? addBlog : modBlog
      reqApi(blogDetail.value)
        .then((data) => {
          if (isAdd || leave) {
            const targetId = data.insertedId || params.id
            router.push(`/detail/${targetId}`)
          }
        })
        .catch((msg) => {
          alert(msg)
        })
      return true
    }
    console.log('error submit!')
    return false
  })
}

const ruleFormRef = ref()

const rules = reactive({
  title: { required: true },
  content: { required: true },
})
</script>
<template>
  <div class="add__container">
    <ElForm
      ref="ruleFormRef"
      :model="blogDetail"
      :rules="rules"
      label-position="right"
      :label-width="55"
    >
      <ElFormItem label="标题" prop="title">
        <ElInput v-model="blogDetail.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="封面">
        <ElInput v-model="blogDetail.cover"></ElInput>
      </ElFormItem>
      <ElFormItem label="描述">
        <ElInput v-model="blogDetail.description"></ElInput>
      </ElFormItem>
      <ElFormItem label="分类">
        <ElSelect v-model="blogDetail.category">
          <ElOption
            v-for="menu in menus"
            :key="'category_' + menu.name"
            :value="menu.name"
            :label="menu.displayName"
          >
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="标签">
        <ElSelect v-model="blogDetail.tags" :multiple="true">
          <template v-for="(menu, mi) in menus">
            <ElOption
              v-for="(tag, ti) in menu.children"
              :key="'category_' + mi + '_' + ti"
              :value="tag.name"
              :label="tag.displayName"
            >
            </ElOption>
          </template>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="正文" prop="content">
        <MdEditor
          v-model="blogDetail.content"
          :preview="false"
          @save="submitForm(ruleFormRef, false)"
        />
      </ElFormItem>
      <ElFormItem label="私密">
        <ElSwitch
          v-model="blogDetail.hide"
          :active-value="1"
          :inactive-value="0"
        ></ElSwitch>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(ruleFormRef)">
          提交
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<style lang="stylus" scoped>
.add__container
  padding 100px 20px 60px
  *
    margin-bottom 20px
</style>
