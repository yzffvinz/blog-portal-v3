<script setup lang="ts">
import { ref } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/button/style/css'
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
  tags: [],
  content: '',
})

getMenus().then((data) => {
  menus.value = data.menus
})

const { params } = useRoute()

if (params.id) {
  getBlogDetail({ _id: params.id }).then(({ blog }) => {
    blogDetail.value = blog
  })
}

function submitForm() {
  const reqApi = params.id ? modBlog : addBlog
  reqApi(blogDetail.value)
    .then((data) => {
      const targetId = data.insertedId || params.id
      router.push(`/detail/${targetId}`)
    })
    .catch((msg) => {
      alert(msg)
    })
}
</script>
<template>
  <div class="add__container">
    <ElForm ref="formRef" :model="blogDetail" label-position="top">
      <ElFormItem label="标题">
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
      <ElFormItem label="正文">
        <MdEditor
          v-model="blogDetail.content"
          :preview="false"
          preview-theme="github"
          :toolbars="[
            'bold',
            'title',
            'quote',
            'unorderedList',
            'orderedList',
            'code',
            'codeRow',
            'table',
            'image',
            '-',
            'pageFullscreen',
            'preview',
          ]"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm()">提交</ElButton>
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
